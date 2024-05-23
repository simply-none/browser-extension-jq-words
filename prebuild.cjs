var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a = require('fs'), writeFileSync = _a.writeFileSync, readdirSync = _a.readdirSync, readFileSync = _a.readFileSync;
var join = require('path').join;
var cdPath = join(__dirname, "./dist/assets/src/entries/content");
var jsFiles = readdirSync("".concat(cdPath));
var scriptUrlList = jsFiles.filter(function (file) { return /\.js$/.test(file); }).map(function (file) {
    return "\"assets/src/entries/content/".concat(file, "\"");
});
var text = "\nconst scriptUrlList = [".concat(scriptUrlList, "];\nscriptUrlList.forEach(url=>{\n    const s = document.createElement('script');\n    s.src = chrome.runtime.getURL(url);\n    s.setAttribute('type', 'module');\n    s.setAttribute('class', 'jousindea-script');\n    s.onload = function() {\n    };\n    (document.head || document.documentElement).appendChild(s);\n})");
// const cssPath1 = join(__dirname, "./dist/assets/node_modules/element-plus/dist");
var cssPath2 = join(__dirname, "./dist/assets");
// let cssFiles1 = readdirSync(`${cssPath1}`);
// cssFiles1 = cssFiles1.filter(file => /\.css$/.test(file)).map((file) => {
//   return `"assets/node_modules/element-plus/dist/${file}"`
// });
var cssFiles2 = readdirSync("".concat(cssPath2));
cssFiles2 = cssFiles2.filter(function (file) { return /\.css$/.test(file); }).map(function (file) {
    return "\"assets/".concat(file, "\"");
});
var cssFiles = __spreadArray([], cssFiles2, true);
var manifest = JSON.parse(readFileSync('./dist/manifest.json', { encoding: 'utf-8' }));
var webRes = manifest.web_accessible_resources[0].resources;
cssFiles.forEach(function (file) {
    var newFile = file.replace(/\"/g, '');
    if (!webRes.includes(newFile)) {
        webRes.push(newFile);
    }
});
manifest.web_accessible_resources[0].resources = webRes;
writeFileSync('./dist/manifest.json', JSON.stringify(manifest, null, 2));
var cssText = "\nconst cssUrlList = [".concat(cssFiles, "];\nconsole.log(cssUrlList, 'list')\ncssUrlList.forEach(url=>{\n  console.log(url, 'url')\n    const s = document.createElement('link');\n    s.href = chrome.runtime.getURL(url);\n    s.setAttribute('rel', 'stylesheet');\n    s.setAttribute('class', 'jousindea-style');\n    s.onload = function() {\n    };\n    (document.head || document.documentElement).appendChild(s);\n})");
var insertMainIframe = "\nlet div = document.createElement('div')\ndiv.setAttribute('id', 'jade-custom')\nlet firstChild = document.body.firstChild\ndocument.body.insertBefore(div, firstChild)\n";
var scriptText = "\n".concat(text, "\n").concat(cssText, "\n").concat(insertMainIframe, "\n");
writeFileSync("./dist/src/entries/contentScripts/script.js", scriptText, "utf-8");
