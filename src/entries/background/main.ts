import cheerio from 'cheerio'

chrome.runtime.onInstalled.addListener(async () => {
  const url = chrome.runtime.getURL('src/entries/popup/index.html')

  const tab = await chrome.tabs.create({ url: url })

  console.log(`Created tab ${tab.id}`)

  
})

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log(request, 'main.ts request')
    if (request.text) {
      console.log(request, sender, sendResponse, 'main ts background')
    }

    if (request.contentScriptsText) {
      console.log('从content-script接收消息')
      sendRequest(sendResponse, request.data)
    }
    // 不加这个要报错
    return true
  }
)

function sendRequest (sendResponse: Function, data: object & { word: string }) {
  let word = data.word
  if (!word) {
    return true
  }

  let url = `https://www.bing.com/dict/search?q=${word}`
  let querySelect = 'body > div.contentPadding > div > div > div.lf_area > div.qdef'

  let type = 'youdao'

  switch(type) {
    case 'youdao':
      url = `http://youdao.com/w/${word}`
      querySelect = '#results-contents'
      break
  }
  fetch(url).then(async res => {
      const resText = await res.text()
      const $ = cheerio.load(resText)
      const parsedWordDesc = $(querySelect).html()
      console.log(parsedWordDesc, 1)

      const style = $('style').map(function() {
        // this === el
        return $(this).html();
      })

    
      console.log(style, 'style')

      console.log(resText, 'res')

      sendResponse(parsedWordDesc)
    })
}
