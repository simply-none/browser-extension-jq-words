var _a = require('fs'), writeFileSync = _a.writeFileSync, readdirSync = _a.readdirSync;
var join = require('path').join;
var cdPath = join(__dirname, "./dist/assets/src/entries/content");
var jsFiles = readdirSync("".concat(cdPath));
var scriptUrlList = jsFiles.map(function (file) {
    return "\"assets/src/entries/content/".concat(file, "\"");
});
var text = "\nconst scriptUrlList = [".concat(scriptUrlList, "];\nscriptUrlList.forEach(url=>{\n    const s = document.createElement('script');\n    s.src = chrome.runtime.getURL(url);\n    s.setAttribute('type', 'text/javascript');\n    s.setAttribute('class', 'jousindea-script');\n    s.onload = function() {\n    };\n    (document.head || document.documentElement).appendChild(s);\n})");
var cssPath = join(__dirname, "./dist/assets/node_modules/element-plus/dist");
var cssFiles = readdirSync("".concat(cssPath));
var cssUrlList = cssFiles.map(function (file) {
    return "\"assets/node_modules/element-plus/dist/".concat(file, "\"");
});
var cssText = "\nconst cssUrlList = [".concat(cssUrlList, "];\nconsole.log(cssUrlList, 'list')\ncssUrlList.forEach(url=>{\n  console.log(url, 'url')\n    const s = document.createElement('link');\n    s.href = chrome.runtime.getURL(url);\n    s.setAttribute('rel', 'stylesheet');\n    s.setAttribute('class', 'jousindea-style');\n    s.onload = function() {\n    };\n    (document.head || document.documentElement).appendChild(s);\n})");
var scriptText = "\n".concat(text, "\n").concat(cssText, "\n");
writeFileSync("./dist/src/entries/contentScripts/script.js", scriptText, "utf-8");
