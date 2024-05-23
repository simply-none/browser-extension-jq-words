import cheerio from 'cheerio'
import { youdaoInsertedEle, youdaoDeletedEle, bingInsertedEle, bingDeletedEle } from './customStyle'
import { bingHeaders } from './requestHeaders';

interface ReqData<T> {
  type: 'error' | `info:${string}` | `req:${string}`;
  data: T;
}

type DictType = 'youdao' | 'bing'

interface DictInfo {
  url: string,
  querySelect: string,
  type: DictType,
  headers: {
    [key: string]: string;
  }
}

const dictSet: DictInfo[] = [
  {
    type: 'youdao',
    url: `http://youdao.com/w/wordHolder`,
    querySelect: '#phrsListTab',
    headers: {

    }
  },
  {
    type: 'bing',
    url: `https://www.bing.com/dict/search?q=wordHolder&FORM=HDRSC6`,
    querySelect: 'body > div.contentPadding > div > div > div.lf_area > div.qdef',
    headers: bingHeaders,
  }
]

function listenOnceMsg(sendResponse: Function, data: ReqData<{ word: string }>) {
  let word = data.data.word
  if (!word) {
    return true
  }

  let url = `https://www.bing.com/dict/search?q=${word}&FORM=HDRSC6`
  let querySelect = 'body > div.contentPadding > div > div > div.lf_area > div.qdef'

  let type = 'youdao'

  switch (type) {
    case 'youdao':
      url = `http://youdao.com/w/${word}`
      querySelect = '#phrsListTab'
      break
  }
  fetch(url).then(async res => {
    const resText = await res.text()
    const $ = cheerio.load(resText)
    const parsedWordDesc = $(querySelect).html()

    sendResponse({
      type: 'info:word-desc',
      data: {
        text: parsedWordDesc,
        url: url,
        type: type,
        querySelect: querySelect
      }
    })
  })
}

function listenMultiMsg(port: chrome.runtime.Port, data: ReqData<{ word: string }>) {
  let word = data.data.word
  if (!word) {
    sendToEvent(port, {
      type: 'error',
      data: {
        msg: '单词为空'
      }
    })
    return true
  }

  let fetchList = getDictSet(['bing', 'youdao'], word)
  
  // 避免关闭请求连接的通道，特定保持5s的长连接
  // keepLongConnection(port)

  fetchList.forEach(item => {
    if (!item.type) {
      sendToEvent(port, {
        type: 'error',
        data: {
          msg: '单词源类型为空'
        }
      })
      return false
    }
    fetch(item.url, {
      headers: item.headers
    }).then(async res => {
      const resText = await res.text()

      const parsedWordDesc = handleDOM(resText, item)

      console.log(parsedWordDesc, 1)

      sendToEvent(port, {
        type: 'info:word-desc',
        data: {
          text: parsedWordDesc,
          ...item
        }
      })
    })
  })
}

// utils----start
// 保持扩展插件各个通道连接不关闭
export function keepLongConnection (port: chrome.runtime.Port) {
  let count = 0
  const timer = setInterval(() => {
    if (count >= 5) {
      clearInterval(timer)
      port.disconnect()
      return true
    }
    sendToEvent(port, {
      type: 'info:keep-long-connection',
      data: {
        text: '保持长连接',
      }
    })
    count++
  }, 1000)
}

// 发送请求
function sendToEvent(port: chrome.runtime.Port, data: ReqData<{}>) {
  port.postMessage(data)
}

function getDictSet(select: DictType[] = ['youdao', 'bing'], word: string = '') {
  let selectDictSet = dictSet.filter(item => select.includes(item.type))
  return selectDictSet.map(item => {
    return {
      url: (item.url.replace('wordHolder', word)),
      type: item.type,
      querySelect: item.querySelect,
      headers: item.headers,
    }
  })
}

function insert(selectors: string[], html: string, insertedEleArr?: string[], deletedEleArr?: string[]) {
  let id = 'browser-extension-jq-words'

  const $new = cheerio.load(`<div id='${id}'></div>`);
  const $ = cheerio.load(html);

  if (deletedEleArr) {
    deletedEleArr.forEach(deletedEle => {
      $(deletedEle).remove()
    })
  }

  selectors.forEach(async selector => {
    await elementToNewNode($new(`#${id}`), $, selector)
  })

  if (insertedEleArr) {
    insertedEleArr.forEach(insertedEle => {
      $(insertedEle).appendTo($new(`#${id}`))
    })
  }
  return $new
}

async function elementToNewNode(newEle: any, oldEle: any, selector: string) {
  newEle.append(oldEle(selector));
  const newText = await newEle.html();
  console.log(newText);
}

const handleDomInfo: {
  [key in DictType]: (resText: string, item: DictInfo) => string
} = {
  youdao(resText, item) {
    console.log(item)
    const selectList = [
      '#phrsListTab > h2',
      '#phrsListTab > div.trans-container',
      '#authTrans',
      'link[rel="stylesheet"]',
      'style'
    ]

    // const $ = cheerio.load(resText)
    // $('#webTrans').remove()
    // $('#wordArticle').remove()
    // $('#eTransform').remove()
    let parsedWordDesc = insert(selectList, resText, youdaoInsertedEle, youdaoDeletedEle)
    // $('<h1 class="plum" style="font-size: 36px;">Plum</h1>').prependTo(parsedWordDesc)
    // console.log(parsedWordDesc, 2)
    // chrome.storage.local.set({youdao: parsedWordDesc.html()}).then(() => {
    //   console.log("Value is set");
    // });
    return parsedWordDesc.html() || ''
  },
  bing(resText, item) {
    console.log(item)
    const selectList = [
      'div.contentPadding > div > div > div.lf_area > div.qdef > div.hd_area',
      'div.contentPadding > div > div > div.lf_area > div.qdef > ul',
      '#sentenceSeg > div.se_li',
      'link[rel="stylesheet"]',
      'style'
    ]
    // const $ = cheerio.load(resText)
    // $('.img_area').remove()
    
    let parsedWordDesc = insert(selectList, resText, bingInsertedEle, bingDeletedEle)
    
    // $('<h1 class="plum" style="font-size: 36px;">Plum</h1>').prependTo(parsedWordDesc)
    
    // console.log(parsedWordDesc, 2)
    return parsedWordDesc.html() || ''
  },

}

function handleDOM(resText: string, item: DictInfo) {

  let parsedText = ''
  if (item.type) {
    parsedText = handleDomInfo[item.type](resText, item)
  }
  return parsedText
}

// utils------end

export {
  listenOnceMsg,
  listenMultiMsg,
}

export type {
  ReqData,
}
