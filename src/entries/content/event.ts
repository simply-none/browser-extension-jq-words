import cheerio from 'cheerio'
window.addEventListener("message",function(ev){
  if (ev.data.text === '测试') {
  console.log(ev.data)
  fetch('https://www.bing.com/dict/search?q=a').then(async res => {
      const resText = await res.text()
      const $ = cheerio.load(resText)
      const parsedWordDesc = $('body > div.contentPadding > div > div > div.lf_area > div.qdef').html()
      console.log(parsedWordDesc, 1)

      const style = $('style').map(function() {
        // this === el
        return $(this).html();
      })
      insertStyle(style)
      console.log(style, 'style')

      console.log(resText, 'res')
    })
  }
})

function insertStyle (style: any) {
  let doc = document.body
  Object.values(style).forEach((item: any) => {
    const style = document.createElement('style')
    style.innerHTML = item
    doc.appendChild(style)
  })

}