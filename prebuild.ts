const {writeFileSync, readdirSync} = require('fs');
const {join}  = require('path');

const cdPath = join(__dirname, "./dist/assets/src/entries/content");
const jsFiles = readdirSync(`${cdPath}`);
const scriptUrlList = jsFiles.map((file) => {
  return `"assets/src/entries/content/${file}"`;
});

const text = `
const scriptUrlList = [${scriptUrlList}];
scriptUrlList.forEach(url=>{
    const s = document.createElement('script');
    s.src = chrome.runtime.getURL(url);
    s.setAttribute('type', 'text/javascript');
    s.onload = function() {
    };
    (document.head || document.documentElement).appendChild(s);
})`;

writeFileSync("./src/entries/content/script.ts", text, "utf-8");