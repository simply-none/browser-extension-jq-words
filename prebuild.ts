const {writeFileSync, readdirSync, readFileSync} = require('fs');
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

// const cssPath1 = join(__dirname, "./dist/assets/node_modules/element-plus/dist");
const cssPath2 = join(__dirname, "./dist/assets");
// let cssFiles1 = readdirSync(`${cssPath1}`);
// cssFiles1 = cssFiles1.filter(file => /\.css$/.test(file)).map((file) => {
//   return `"assets/node_modules/element-plus/dist/${file}"`
// });
let cssFiles2 = readdirSync(`${cssPath2}`)
cssFiles2 = cssFiles2.filter(file => /\.css$/.test(file)).map((file) => {
  return `"assets/${file}"`
});
const cssFiles = [...cssFiles2]

const manifest = JSON.parse(readFileSync('./dist/manifest.json', { encoding: 'utf-8' }))

const webRes = manifest.web_accessible_resources[0].resources

cssFiles.forEach(file => {
  const newFile = file.replace(/\"/g, '')
  if (!webRes.includes(newFile)) {
    webRes.push(newFile)
  }
})

manifest.web_accessible_resources[0].resources = webRes

writeFileSync('./dist/manifest.json', JSON.stringify(manifest, null, 2))

const cssText = `
const cssUrlList = [${cssFiles}];
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