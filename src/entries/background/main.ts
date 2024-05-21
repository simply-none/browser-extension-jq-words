chrome.runtime.onInstalled.addListener(async () => {
  const url = chrome.runtime.getURL('src/entries/popup/index.html')

  const tab = await chrome.tabs.create({ url: url })

  console.log(`Created tab ${tab.id}`)

  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      if (request.text) {
        console.log(request, sender, sendResponse, 'main ts background')
      }
    }
  )
})