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
    s.setAttribute('class', 'jousindea-script');
    s.onload = function() {
    };
    (document.head || document.documentElement).appendChild(s);
})`;

const cssPath = join(__dirname, "./dist/assets/node_modules/element-plus/dist");
const cssFiles = readdirSync(`${cssPath}`);
const cssUrlList = cssFiles.map((file) => {
  return `"assets/node_modules/element-plus/dist/${file}"`
});

const cssText = `
const cssUrlList = [${cssUrlList}];
console.log(cssUrlList, 'list')
cssUrlList.forEach(url=>{
  console.log(url, 'url')
    const s = document.createElement('link');
    s.href = chrome.runtime.getURL(url);
    s.setAttribute('rel', 'stylesheet');
    s.setAttribute('class', 'jousindea-style');
    s.onload = function() {
    };
    (document.head || document.documentElement).appendChild(s);
})`;

const scriptText = `
${text}
${cssText}
`

writeFileSync("./dist/src/entries/contentScripts/script.js", scriptText, "utf-8");