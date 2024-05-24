var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/**
 * @file 将打包后的文件写入manifest.json的content_scripts中，方便chrome插件加载
 *
 * @desc content_scripts 在插件运行时，该字段下的资源文件会被自动加载到匹配的页面中
 *
 * @desc src/entires/content 仅有main.js及内部的其他组件的js、html会自动加载，但是样式并没有
 *        所以需要手动将该目录下打包后的css文件写入content_scripts中
 *
 * @note 如果想要注入其他内容到页面中，可以使用当前这种方式
 *
 * @note 另一种注入到页面的方式是找到打包后的文件名称（通过fs读取），然后创建script节点，插入到document某个节点中
 */
var _a = require('fs'), writeFileSync = _a.writeFileSync, readdirSync = _a.readdirSync, readFileSync = _a.readFileSync;
var join = require('path').join;
contentStyleInsertToPage();
// 将content目录下的样式，写入content_scripts中，就能自动加载到页面中
function contentStyleInsertToPage() {
    var cssPath2 = join(__dirname, "./dist/assets");
    var cssFiles2 = readdirSync("".concat(cssPath2));
    cssFiles2 = cssFiles2.filter(function (file) { return /\.css$/.test(file); }).map(function (file) {
        return "\"assets/".concat(file, "\"");
    });
    var cssFiles = __spreadArray([], cssFiles2, true);
    var manifest = JSON.parse(readFileSync('./dist/manifest.json', { encoding: 'utf-8' }));
    var cssWebRes = manifest.content_scripts[0].css;
    cssFiles.forEach(function (file) {
        var newFile = file.replace(/\"/g, '');
        if (!cssWebRes.includes(newFile)) {
            cssWebRes.push(newFile);
        }
    });
    manifest.content_scripts[0].css = cssWebRes;
    writeFileSync('./dist/manifest.json', JSON.stringify(manifest, null, 2));
}
// example
function insertToPage() {
    var cdPath = join(__dirname, "./dist/assets/src/entries/content");
    var jsFiles = readdirSync("".concat(cdPath));
    var scriptUrlList = jsFiles.filter(function (file) { return /\.js$/.test(file); }).map(function (file) {
        return "\"assets/src/entries/content/".concat(file, "\"");
    });
    var text = "\n    const scriptUrlList = [".concat(scriptUrlList, "];\n    scriptUrlList.forEach(url=>{\n      const s = document.createElement('script');\n      s.src = chrome.runtime.getURL(url);\n      s.setAttribute('type', 'module');\n      s.setAttribute('class', 'jousindea-script');\n      s.onload = function() {\n      };\n      (document.head || document.documentElement).appendChild(s);\n    })\n  ");
    var scriptText = "\n    ".concat(text, "\n  ");
    // ./dist/src/entries/contentScripts/script.js：该文件是在content_scripts中定义过的，
    // 这种不是最优解，最优解是直接将需要嵌入到页面中的文件，直接写入到manifest.json文件中
    writeFileSync("./dist/src/entries/contentScripts/script.js", scriptText, "utf-8");
}
