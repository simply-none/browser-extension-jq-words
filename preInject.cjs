/**
 * 脚本注入的方式，
 */

const { writeFileSync, readdirSync, readFileSync } = require('fs');
const { join } = require('path');
const copydir = require('node-copydir');

contentStyleInsertToPage()
copyContentToPublic()

function copyContentToPublic() {
  const dir = "./src/content/dist/assets"
  const newDir = "./public/assets/content"

  copydir(dir, newDir, () => { })
}

// 将content目录下的样式，写入content_scripts中，就能自动加载到页面中
function contentStyleInsertToPage() {
  const cssPath2 = join(__dirname, "./src/content/dist/assets");
  let cssFiles2 = readdirSync(`${cssPath2}`)
  cssFiles2 = cssFiles2.map((file) => {
    return `"assets/content/${file}"`
  });

  const cssList = cssFiles2.filter(item => {
    return item.endsWith('.css"')
  })
  const jsList = cssFiles2.filter(item => item.endsWith('.js"'))

  const injectionTSFile = `
  export function injectScript () {
    const cssList: string[] = [${cssList}];
    const jsList: string[] = [${jsList}];
    const css = cssList.map(item => {
      return item
      // return chrome.runtime.getURL(item);
    })
    const js = jsList.map(item => {
      return item
      // return chrome.runtime.getURL(item);
    })

    chrome.webNavigation.onDOMContentLoaded.addListener(async ({ tabId, url }) => {
      console.log(tabId, url, '脚本注入过程')
      // if (!url.startsWith('http')) {
      //   console.log('非http协议，不注入脚本')
      //   return false
      // }
      chrome.scripting.executeScript({
        target: { tabId },
        files: js,
      })
      .then(injectionResults => {
        console.log(injectionResults, 'injectionResults')
      })
      .catch(e => {
        console.log(e, 'js脚本注入过程错误')
      });

      chrome.scripting.insertCSS({
        target: { tabId },
        files: css,
      })
      .then(injectionResults => {
        console.log(injectionResults, 'injectionResults')
      })
      .catch(e => {
        console.log(e, 'css脚本注入过程错误')
      });
    });
  }
  `

  writeFileSync('./src/background/injection.ts', injectionTSFile)
}