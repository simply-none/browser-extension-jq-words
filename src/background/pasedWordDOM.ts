import cheerio from 'cheerio'
import wordDOMProps from './wordDOMProps'
import { getWordStorage, setWordStorage } from './storage';
import requestProps from './requestProps';

interface ReqData<T> {
  type: 'error' | `info:${string}` | `req:${string}`;
  data: T;
}

// utils----start

function parsedWordDOM(word: string, type: DictType, html: string, cacheOrigin: CacheOrigin) {
  let id = 'browser-extension-jq-words-' + type

  const $new = cheerio.load(`<div id='${id}'></div>`);
  const $ = cheerio.load(html);

  const isExistWord = $(wordDOMProps[type].existSelector)

  console.log(wordDOMProps[type], isExistWord, '$, isExistword in parsedWordDOM')

  // 不存在单词，返回空
  if (isExistWord.length === 0) {
    console.log('不存在单词，返回空')
    return {
      $new,
      type: 'not'
    }
  }

  // 先删除，后插入

  // 存储单词信息
  // 克隆节点，防止由于后续的增删改查，改变节点的内容
  const $clone = cheerio.load($.html())
  cacheWord(word, type, $clone, cacheOrigin)

  let deleted = wordDOMProps[type].deleted
  if (deleted) {
    // 删掉所有的外链节点
    $('link').remove()
    $('script').each(function (this: any) {
      const text = $(this).text()
      if (text.includes('https://') || text.includes('http://') || text.includes('iaw') || text.includes('sendGAEvent')) {
        // 删除所有包含外链的script
        $(this).remove()
      }
    })
    $('script').remove()
    deleted.forEach(deletedEle => {
      $(deletedEle).remove()
    })
  }

  // 将相对路径替换为绝对路径(使得url正常)
  // Set the 'src' attribute of an image element
  const includesSourceHtml = ['src', 'href']
  includesSourceHtml.forEach(function (item) {
    $(`[${item}]`).each(function (this: any) {
      const itemAttr = $(this).attr(item)
      if (itemAttr && itemAttr.startsWith('/')) {
        $(this).attr(item, requestProps[type].host + itemAttr)
      }
      // src资源跨域，删除罢
      if (item === 'src') {
        $(this).remove()
      }
    })
  })
  $('style').each(function (this: any) {
    let style = $(this).text()
    const reg = /(url\((.*)\))/g
    style = style.replaceAll(reg, 'url(https://www.baidu.com$2)')
    $(this).text(style)
  })

  let insertedStyle = wordDOMProps[type].insertedStyle
  if (insertedStyle) {
    insertedStyle.forEach(insertedEle => {
      $(insertedEle).appendTo($new(`#${id}`))
    })
  }

  wordDOMProps[type].selected.forEach(async selector => {
    // TODO：怎么处理style污染全局，同时能够确保插入到页面中的单词样式尽可能保持原样的问题。
    // 下面的样式处理不生效，希望换种方式
    // if (selector === 'style') {
    //   handleStyle($new(`#${id}`), $, selector, id)
    //   return true
    // }
    await elementToNewNode($new(`#${id}`), $, selector)
  })

  // $('head link').appendTo($new(`head`))
  // $('head script').appendTo($new(`head`))
  $('head style').appendTo($new(`head`))



  console.log($new, '$new in parsedWordDOM end')
  return {
    $new,
    type: 'success'
  }
}

async function cacheWord(word: string, type: DictType, ele: any, cacheOrigin: CacheOrigin) {
  // TODO：应当保存之前，先获取之前该word保存的内容，然后进行更新操作
  let wordCache: WordCache = {
    word: '',
    HTML: '',
    origin: [],
    trans: [],
    phonetic: [],
    morph: [],
  }
  wordCache = await getWordStorage(type, word)
  console.log(wordCache, 'wordCache in cacheWord')

  // 仅当之前未存储，才将dom源存入
  if (!wordCache.word) {
    wordCache.word = word
    wordCache.origin = [cacheOrigin]
    wordCache.HTML = ele.html()

    Object.entries(wordDOMProps[type].cache).forEach(function ([item, selectorList]) {

      selectorList.forEach(function (sel) {

        // 当字符串中有(*, **)星号时，进行切割
        // sel: '.dpron-i*daud'(删除)
        // *：剔除，**：挑选，***：多元素相加，****：表示处于某个元素下的内容进行其他*的操作, |: 表示多个类名
        // 举例：Collins：.hom****.gramGrp.pos***.sense**gramGrp|subc**cit|type-translation
        let parsedTextList = []

        // TODO: 多元素相加有点难，后续处理
        // let star3 = '***'
        // let subParsedText = ''
        // const is3Star = sel.includes(star3)
        // sel.split(star3).forEach(subSel => {
        //   subParsedText = cacheDOMByStarDesign(ele, sel)
        // })
        
        parsedTextList = cacheDOMByStarDesign(ele, sel)
        // const assembledSel = sel.split('*')
        // let assembledText: string = ''
        // assembledSel.forEach(function (asebl) {
        //   ele(asebl).each(function (this: any) {
        //     console.log(ele(this).text(), type, asebl, item, 'text(), type, asebl, item 测试')
        //     assembledText = assembledText + ele(this).text()
        //   })
        // })
        // if (assembledText) {
        //   parsedTextList.push(assembledText)
        // }

        // ele(sel).each(function (this: any) {
        //   console.log(ele(this).text(), type, sel, item, 'text(), type, sel, item 测试')
        //   const thisText = ele(this).text()
        //   thisText && parsedTextList.push(thisText);
        // })
        // 声明类型，不然报错
        console.log(parsedTextList, 'parsedTextList')
        if (!wordCache[item as WordSimplyCacheType]) {
          wordCache[item as WordSimplyCacheType] = []
        }
        wordCache[item as WordSimplyCacheType].push(...parsedTextList)
        console.log(wordCache, parsedTextList, 'parsedTextList in cacheWord !wordCache.word')
      })
    })
  } else {
    wordCache.origin.push(cacheOrigin)
    console.log(wordCache, 'parsedTextList in cacheWord wordCache.word else')
  }

  setWordStorage(`${type}:${wordCache.word}`, wordCache)
}

function cacheDOMByStarDesign($: any, sel: string) {
  // *：剔除，**：挑选，***：多元素相加
  const is2Star = sel.includes('**')
  let [root, ...delOrAddClass] = is2Star ? sel.split('**') : sel.split('*')
  let selText: string[] = []

  if (delOrAddClass.length === 0) {
    $(root).each(function (this: any) {
      const rootText = $(this).text()
      rootText && selText.push(rootText)
    })
  } else {
    $(root).each(function (this: any) {
      let selAssembledText = ''
      $(this).contents().each(function (this: any) {
        // 包含文本、注释
        const childNodeClass = $(this).attr('class')
        const isAddOrDel = delOrAddClass.some(del => childNodeClass && childNodeClass.includes(del))
        // !isAddOrDel && !is2Star： 当不包含 （由于不是双星，则表示剔除）class选择器，即不包含剔除的元素，就加上
        // isAddOrDel && is2Star：当包含 （由于是双星，则表示添加）class选择器，即包含添加的元素，就加上
        if (!isAddOrDel && !is2Star || isAddOrDel && is2Star) {
          let toAdd = selAssembledText ? ' ' + $(this).text() : $(this).text()
          selAssembledText = selAssembledText + toAdd
        }
      })
      selAssembledText && selText.push(selAssembledText)
    })

  }
  return selText
}

async function elementToNewNode(newEle: any, oldEle: any, selector: string) {
  newEle.append(oldEle(selector));
  // const newText = await newEle.html();
  // console.log(newText);
}

// 怎么处理style污染全局，同时能够确保插入到页面中的单词样式尽可能保持原样的问题。
function handleStyle(newEle: any, oldEle: any, selector: string, id: string) {
  if (selector === 'style') {
    oldEle(selector).each(function (this: any) {
      let currentStyle = oldEle(this).html()
      currentStyle = `
      <style>
        @scope (#${id}) {
          ${currentStyle}
        }
      </style>
      `
      oldEle(currentStyle).appendTo(newEle(`#${id}`));
    });
    return true
  }
}

// utils------end

export {
  parsedWordDOM,
}

export type {
  ReqData,
}
