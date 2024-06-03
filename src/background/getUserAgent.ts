import { formatDate } from "@/utils/common"
import { getLocalStorage, setLocalStorage } from "@/utils/storage"
import cheerio from "cheerio"

const useragentUrl = 'https://www.useragents.me/'
export const useragentsPrefix = 'user-agents:'
// 缓存 10天 时间间隔
const cacheTime = 1000 * 60 * 60 * 24 * 10

export async function useragentEntry() {
  console.log('进入入口')
  const cacheIndex = await getCacheIndex()
  if (!cacheIndex.length) {
    fetchUserAgents()
    return true
  }

  const moreThan3Days = await moreThan3DaysFn(cacheIndex[0])
  if (moreThan3Days) {
    fetchUserAgents()
    return true
  }

  const lastCache = await getLastCache(cacheIndex[0])
  if (!lastCache.length) {
    fetchUserAgents()
  }
}

function fetchUserAgents() {
  fetch(useragentUrl).then(async res => {
    const resText = await res.text()
    const useragents = parsedDOM(resText)
    console.log(useragents, '获取到的useragent')
    cacheUseragent(useragents)
  }).catch(err => {
    console.log(err)
  })
}

async function cacheUseragent(useragents: string[]) {
  console.log(useragents, '缓存的useragent')
  const useragentsIndex = useragentsPrefix + 'index'
  let curDate = formatDate(new Date(), 'date')

  let useragentsDate: string[] = []

  let items = await getLocalStorage([useragentsIndex])
  if (items[useragentsIndex]) {
    useragentsDate = items[useragentsIndex] || []
  }
  // 存入当前日期
  useragentsDate.push(curDate)

  // 缓存最新的useragent
  setLocalStorage({
    [useragentsIndex]: useragentsDate,
    [useragentsPrefix + curDate]: useragents
  })

  setTimeout(async () => {
    // 测试一下，是否已经缓存
    const items = await getLocalStorage()
    console.log(items, '测试一下，是否已经缓存')
  }, 3000)
}

function parsedDOM(html: string) {
  const $ = cheerio.load(html)

  const useragentEles = $("textarea.form-control.ua-textarea")
  const useragents: string[] = []

  useragentEles.each(function (this: any) {
    console.log($(this).text())
    if ($(this).text()) {
      useragents.push($(this).text())
    }
  })
  console.log(useragents, '解析后的useragent')

  return useragents
}

async function moreThan3DaysFn(lastCacheDate: string) {
  const curDate = formatDate(new Date(), 'date')
  let curDateTime = (new Date(curDate)).getTime()
  let lastDateTime = (new Date(lastCacheDate)).getTime()
  console.log(curDateTime, lastDateTime, '比较两次的时间')
  // 缓存时间间隔内，则不更新

  return curDateTime - lastDateTime >= cacheTime
}

async function getLastCache(lastCacheDate: string) {
  let lastCacheKey = useragentsPrefix + lastCacheDate
  let lastUsseragent: string[] = []
  const lastItems = await getLocalStorage(lastCacheKey)
  if (lastItems[lastCacheKey]) {
    lastUsseragent = lastItems[lastCacheKey] || []
  }

  console.log(lastUsseragent, '获取到的最后缓存的useragent')
  return lastUsseragent
}

async function getCacheIndex() {
  // 获取缓存
  const useragentsIndex = useragentsPrefix + 'index'

  let cacheUseragentDate: string[] = []
  const items = await getLocalStorage(useragentsIndex)
  if (items[useragentsIndex]) {
    cacheUseragentDate = items[useragentsIndex] || []
  }

  // 获取最近一次缓存的useragent,让其放在最前面
  cacheUseragentDate.sort((a, b) => {
    // 最近的排在前面
    if (a < b) return 1
    return -1
  })
  console.log(cacheUseragentDate, '获取到的缓存的useragent日期索引')

  // 如果无任何缓存，则请求数据
  return cacheUseragentDate
}
