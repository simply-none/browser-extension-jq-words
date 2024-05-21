
const scriptUrlList = ["assets/src/entries/content/main-2J-B6DtA.js"];
scriptUrlList.forEach(url=>{
    const s = document.createElement('script');
    s.src = chrome.runtime.getURL(url);
    s.setAttribute('type', 'text/javascript');
    s.onload = function() {
    };
    (document.head || document.documentElement).appendChild(s);
})