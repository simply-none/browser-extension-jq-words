import cheerio from 'cheerio'
import wordDOMProps from './wordDOMProps'
import requestProps from './requestProps';
import { getLocalStorage, setLocalStorage } from '@/utils/storage';

interface ReqData<T> {
  type: 'error' | `info:${string}` | `req:${string}`;
  data: T;
}

// utils----start

function parsedWordDOM(type: DictType, html: string) {
  let id = 'browser-extension-jq-words-' + type

  const $new = cheerio.load(`<div id='${id}'></div>`);
  const $ = cheerio.load(html);
  // 克隆节点，防止由于后续的增删改查，改变节点的内容
  const $clone = cheerio.load($.html())

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
  

  wordDOMProps[type].selected.forEach(async selector => {
    // TODO：怎么处理style污染全局，同时能够确保插入到页面中的单词样式尽可能保持原样的问题。
    // 下面的样式处理不生效，希望换种方式
    // if (selector === 'style') {
    //   handleStyle($new(`#${id}`), $, selector, id)
    //   return true
    // }
    await elementToNewNode($new(`#${id}`), $, selector)
  })

  // -----------------------插入样式
  // $('head link').appendTo($new(`head`))
  // $('head script').appendTo($new(`head`))
  $('head style').appendTo($new(`body`))

  const getTestCssUrl = chrome.runtime.getURL(`assets/css/${type}/common.css`)
  console.log(getTestCssUrl, '测试图片地址')
  $(`
  <link crossorigin="anonymous" media="all" rel="stylesheet" href="${getTestCssUrl}"/>
  `).appendTo($new(`body`))

  if (insertedStyle) {
    insertedStyle.forEach(insertedEle => {
      $(insertedEle).appendTo($new(`body`))
    })
  }
  // -----------------------插入样式
  

  console.log($new, '$new in parsedWordDOM end')
  return {
    $new,
    type: 'success'
  }
}

export async function cacheWord(word: string, type: DictType, html: string, cacheOrigin: CacheOrigin) {
  const ele = cheerio.load(html);
  // TODO：应当保存之前，先获取之前该word保存的内容，然后进行更新操作
  let wordCache: WordCache = {
    word: '',
    HTML: '',
    origin: [],
    trans: [],
    phonetic: [],
    morph: [],
  }
  let cacheKey = `${type}:${word}`
  let items = await getLocalStorage(cacheKey)
  if (items[cacheKey]) {
    wordCache = items[cacheKey] as WordCache
  }
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
        // TODO: 多元素相加有点难，后续处理
        const parsedTextList = cacheDOMBy34StarDesign(ele, sel)

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

  setLocalStorage(`${type}:${wordCache.word}`, wordCache, {
    onSuccess() {
      // TODO:原先的内容是：
      // getLocalStorage(`${type}:${wordCache.word}`)
    }
  })
}

function cacheDOMBy34StarDesign($: any, sel: string) {
  let parsedTextList: string[] = []
  let star3 = '***'
  let star4 = '****'
  const is4Star = sel.includes(star4)
  // 有且仅有一个4星，必然有3星，否则无3星，仅有1-2星
  if (is4Star) {
    let [root, assembled3Star] = sel.split(star4)
    // 3星元素的个数
    let assembledEle3Star = assembled3Star.split(star3)
    // root下，把3星的内容 拼接起来
    console.log($(root).length, assembledEle3Star)
    $(root).each(function (this: any) {
      let assembledTuple: (string[])[] = []
      let thisRoot = $(this)
      assembledEle3Star.forEach(function (assembledItem, index) {
        console.log('开始运行', assembledItem, root)
        assembledTuple[index] = cacheDOMBy12StarDesign($, assembledItem, thisRoot)
      })
      let oneFluVal = assembledLevel2Array(assembledTuple)
      console.log(oneFluVal, 'oneFluVal')
      // 其中assembledA、B必然有一方为唯一元素，即一个root下，只能是A+多b，或者多A+b的情况
      parsedTextList.push(...oneFluVal)
    })
  } else {
    // 1-2星处理
    parsedTextList = cacheDOMBy12StarDesign($, sel, $('html'))
  }
  parsedTextList = beautyResult(parsedTextList)
  return parsedTextList
}

// 删除换行符、多个空格合并为一个
function beautyResult (result: string[]) {
  let res = result.map(item => item.replace(/([\r\n\t])*/g, '').replace(/([ ])+/g, ' ').trim())
  res = Array.from(new Set(res))
  console.log(res, '字符串数组结果美化')
  return res
}

// 嵌套数组，数组元素各自相加
function assembledLevel2Array(level2Array: string[][] = [[]]) {
  return level2Array.reduce((prev, cur) => {
    let total: string[] = []
    let defaultPrev =  prev.length === 0 ? [''] : prev
    let defaultCur = cur.length === 0 ? [''] : cur
    defaultPrev.forEach(item => {
      defaultCur.forEach(item2 => {
        total.push(item + ' ' + item2)
      })
    })
    return total
  })
}

function cacheDOMBy12StarDesign($: any, sel: string, rootSelThis: any) {
  console.log('运行次数')
  // *：剔除，**：挑选，***：多元素相加
  const is2Star = sel.includes('**')
  let [root, ...delOrAddClass] = is2Star ? sel.split('**') : sel.split('*')
  let selText: string[] = []

  if (delOrAddClass.length === 0) {
    console.log(rootSelThis.length, 'rootsel')
    rootSelThis.each(function (this: any) {
      console.log($(this).find(root).length, '测试1', sel)
      $(this).find(root).each(function (this: any) {
        const rootText = $(this).text()
        rootText && selText.push(rootText)
      })
    })

  } else {
    rootSelThis.each(function (this: any) {
      console.log($(this).find(root).length, '测试12', sel)
      $(this).find(root).each(function (this: any) {
        console.log($(this).text(), '怎么没进来')
        let selAssembledText = ''
        let rootT = $(this)
        // TODO：内容修改
        delOrAddClass.forEach(delOrAddItem => {
          console.log(delOrAddItem, '测试3')
          // 由于是类名相加，故而每个delOrAddItem都只能获取到一个，不然肯定有错误
          rootT.find(delOrAddItem).each(function (this: any) {
            console.log($(this).text(), '测试2', sel)
              if (is2Star) {
                let toAdd = selAssembledText ? ' ' + $(this).text() : $(this).text()
                selAssembledText = selAssembledText + toAdd
              } else {
                console.log('来删除了？？？？')
                $(this).remove()
              }
          })
        })
        !is2Star && (selAssembledText = $(this).text())
        console.log(selAssembledText, '完整的内容')
        selAssembledText && selText.push(selAssembledText)
        // TODO: 这里由选择类名，改成选择类名对应元素的文本
        // $(this).contents().each(function (this: any) {
        //   // 包含文本、注释
        //   const childNodeClass = $(this).attr('class')
          
        //   const isAddOrDel = delOrAddClass.some(del => {
        //     if (!childNodeClass) {
        //       return false
        //     }
        //     const delClassArray = del.split('|')
        //     return delClassArray.every(item => childNodeClass.includes(item))
        //   })
        //   // !isAddOrDel && !is2Star： 当不包含 （由于不是双星，则表示剔除）class选择器，即不包含剔除的元素，就加上
        //   // isAddOrDel && is2Star：当包含 （由于是双星，则表示添加）class选择器，即包含添加的元素，就加上
        //   if (!isAddOrDel && !is2Star || isAddOrDel && is2Star) {
        //     let toAdd = selAssembledText ? ' ' + $(this).text() : $(this).text()
        //     selAssembledText = selAssembledText + toAdd
        //   }
        // })
        // selAssembledText && selText.push(selAssembledText)
      })

    })

  }
  selText = beautyResult(selText)
  console.log(selText, '每次循环的值')
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
