import cheerio from 'cheerio'
import requestProps from './requestProps';
import { parsedWordDOM } from './pasedWordDOM';
import { getWordStorage } from './storage';
interface ReqData<T> {
  type: 'error' | `info:${string}` | `req:${string}`;
  data: T;
}

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

function listenMultiMsg(port: chrome.runtime.Port, data: ReqData<{ word: string, cacheOrigin: CacheOrigin }>) {
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

  let selectWordTypeGroup: DictType[] = ['bing', 'youdao', 'collins', 'jinshan', 'longman', 'cambridge', 'webster', 'oxford', 'vocabulary', 'wordreference', 'haici']

  const requests = selectWordTypeGroup.map(type => {
    return getSingleWordByType(word, type, port, data.data.cacheOrigin)
  })

  Promise.all(requests).then(valarr => {
    console.log(valarr, '请求的所有参数数组')
  }).catch(e => {
    console.log(e, '请求失败原因')
  })
  // 避免关闭请求连接的通道，可特定保持5s的长连接
  // keepLongConnection(port)
}

function getSingleWordByType (word: string, type: DictType, port: chrome.runtime.Port, cacheOrigin: CacheOrigin) {
  return new Promise(async (res) => {
      // 获取之前是否存储过该值，有就不请求网络
      const wordCache:WordCache = await getWordStorage(type, word)
      console.log(wordCache, 'wordCache')
      if (wordCache.word) {
        parsedAndSendDOM(wordCache.HTML, word, type, port, cacheOrigin)
        return res(true)
      }
  
      fetchWordDOM(word, type, port, cacheOrigin)
      res(true)
  })
  
}

// utils----start
// 请求数据
function fetchWordDOM(word: string, type: DictType, port: chrome.runtime.Port, cacheOrigin: CacheOrigin) {
  const requestUrl = requestProps[type].url.replace('wordHolder', word)
  fetch(requestUrl, {
    headers: requestProps[type].headers
  }).then(async res => {
    const resText = await res.text()
    parsedAndSendDOM(resText, word, type, port, cacheOrigin)
  })
}

async function parsedAndSendDOM (resText: string, word: string, type: DictType, port: chrome.runtime.Port, cacheOrigin: CacheOrigin) {

    let $parsedWord = parsedWordDOM(word, type, resText, cacheOrigin)

    let parsedWordDesc = ''
    if ($parsedWord.type === 'success') {
      parsedWordDesc = $parsedWord.$new.html() || ''
    }

    sendToEvent(port, {
      type: 'info:word-desc',
      data: {
        text: parsedWordDesc,
        type,
        ...requestProps,
      }
    })
}

// 保持扩展插件各个通道连接不关闭
function keepLongConnection(port: chrome.runtime.Port) {
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

// utils------end

export {
  listenOnceMsg,
  listenMultiMsg,
}

export type {
  ReqData,
}
