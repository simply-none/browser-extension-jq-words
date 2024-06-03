import cheerio from 'cheerio'
import requestProps from './requestProps';
import { cacheWord, parsedWordDOM } from './pasedWordDOM';
import { getLocalStorage, setLocalStorage } from '@/utils/storage';
import { formatDate } from '@/utils/common';
import { useragentsPrefix } from './getUserAgent';
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

async function listenMultiMsg(port: chrome.runtime.Port, data: ReqData<{ word: string, cacheOrigin: CacheOrigin }>) {
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

  let selectWordTypes:DictType[] = ['youdao', 'bing', 'longman']
  const items = await getLocalStorage('setting:selectedWordTypes')
  console.log(items, "Value is get");
  const fetchWordTypes = items['setting:selectedWordTypes']
  if (fetchWordTypes) {
    selectWordTypes = JSON.parse(fetchWordTypes)
  }
  
  let selectWordTypeGroup: DictType[] = selectWordTypes

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

  // 缓存单词索引，方便后续选择性获取部分单词
  cacheWordIndex(word)
}

function getSingleWordByType (word: string, type: DictType, port: chrome.runtime.Port, cacheOrigin: CacheOrigin) {
  return new Promise(async (res) => {
      // 获取之前是否存储过该值，有就不请求网络
      let wordCache: WordCache = {} as WordCache
      let cacheKey = `${type}:${word}`
      let items = await getLocalStorage(cacheKey)
      if (items[cacheKey]) {
        wordCache = items[cacheKey] as WordCache
      }
      console.log(wordCache, 'wordCache')
      if (wordCache.word) {
        parsedAndSendDOM(wordCache.HTML, word, type, port, cacheOrigin)
        return res(true)
      }
  
      fetchWordDOM(word, type, port, cacheOrigin)
      res(true)
  })
  
}

async function getUserAgent() {
  const items = await getLocalStorage(useragentsPrefix + 'index')
  let userAgentsDate = items[useragentsPrefix + 'index'] as string[] || []
  userAgentsDate.sort((a, b) => {
    // 最近的排在前面
    if (a < b) return 1
    return -1
  })

  let useragentItems = await getLocalStorage(useragentsPrefix + userAgentsDate[0])
  let useragent = useragentItems[useragentsPrefix + userAgentsDate[0]] as string[]
  let randomIndex = Math.floor(Math.random() * useragent.length)
  return useragent[randomIndex]
}

// utils----start
// 请求数据
async function fetchWordDOM(word: string, type: DictType, port: chrome.runtime.Port, cacheOrigin: CacheOrigin) {
  const randomAgent = await getUserAgent()
  console.log(randomAgent, '随机请求的useragent')
  const requestUrl = requestProps[type].url.replace('wordHolder', word)
  fetch(requestUrl, {
    headers: {
      ...requestProps[type].headers,
      'User-Agent': randomAgent
    }
  }).then(async res => {
    const resText = await res.text()
    parsedAndSendDOM(resText, word, type, port, cacheOrigin)
  })
}

async function parsedAndSendDOM (resText: string, word: string, type: DictType, port: chrome.runtime.Port, cacheOrigin: CacheOrigin) {
    let resT = resText + ''
    let $parsedWord = parsedWordDOM(type, resText)

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

    // 缓存单词信息，放最后是保证不会阻碍页面渲染
    cacheWord(word, type, resT, cacheOrigin)
}

/**
 * word:index: 存单词，word-date:index：存记录过单词的日期，word-date:2024-02-23：存该日期下记录过的单词
 * @param word 
 */
async function cacheWordIndex(word: string) {
  let type = 'word'
  let dateType = 'word-date'
  let curDate = formatDate(new Date(), 'date')
  const items = await getLocalStorage([`${type}:index`, `${dateType}:index`, `${dateType}:${curDate}`])
  // 存单词列表，例如：['a', 'b']
  let wordIndexCache = items[`${type}:index`] as string[] || []
  // 存日期列表，例如：['2024-01-01', '2024-02-03']
  let dateIndexCache = items[`${dateType}:index`] as string[] || []
  // 存当天记录过的单词，例如：['a', 'b']
  let dateWordCache = items[`${dateType}:${curDate}`] as string[] || []

  console.log('缓存单词索引', word, wordIndexCache)
  if (!wordIndexCache.includes(word)) {
    wordIndexCache.push(word)
  }
  if (!dateIndexCache.includes(curDate)) {
    dateIndexCache.push(curDate)
  }
  if (!dateWordCache.includes(word)) {
    dateWordCache.push(word)
  }

  setLocalStorage({
    [`${type}:index`]: wordIndexCache,
    [`${dateType}:index`]: dateIndexCache,
    [`${dateType}:${curDate}`]: dateWordCache,
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
