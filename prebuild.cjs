var _a = require('fs'), writeFileSync = _a.writeFileSync, readdirSync = _a.readdirSync;
var join = require('path').join;
var cdPath = join(__dirname, "./dist/assets/src/entries/content");
var jsFiles = readdirSync("".concat(cdPath));
var scriptUrlList = jsFiles.map(function (file) {
    return "\"assets/src/entries/content/".concat(file, "\"");
});
var text = "\nconst scriptUrlList = [".concat(scriptUrlList, "];\nscriptUrlList.forEach(url=>{\n    const s = document.createElement('script');\n    s.src = chrome.runtime.getURL(url);\n    s.setAttribute('type', 'text/javascript');\n    s.onload = function() {\n    };\n    (document.head || document.documentElement).appendChild(s);\n})");
writeFileSync("./src/entries/content/script.ts", text, "utf-8");
