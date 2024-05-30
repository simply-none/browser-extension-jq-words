"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = __importDefault(require("cheerio"));
// const cheerio = require("cheerio");
var fs_1 = require("fs");
// import { html } from "./data.js";
// import { readFileSync, writeFileSync } from "fs";
// const html = readFileSync("data.js", "utf-8");
// async function getText() {
//   const link = $("head");
//   const text = await link.html();
//   console.log(text);
// }
// async function insert(selectors) {
//   let id = "browser-extension-jq-words";
//   const $new = cheerio.load(`<div id='${id}'></div>`);
//   const $ = cheerio.load(html);
//   selectors.forEach(async (selector) => {
//     await elementToNewNode($new(`#${id}`), $, selector);
//   });
// }
// async function elementToNewNode(newEle, oldEle, selector) {
//   newEle.append(oldEle(selector));
//   const newText = await newEle.html();
//   console.log(newText);
// }
var collinsInsertedEle = [
// `
// .cB {
//   padding: 0;
// }
// div.cB-h h2.h2_entry > span.orth {
//   letter-spacing: 1px;
//   font-family: "Lora",Helvetica;
//   color: #000;
//   background: white;
// }
// span.gramGrp.pos {
//   text-transform: uppercase;
//   font-weight: bold;
//   color: #000;
//   font-family: 'Zilla Slab',serif;
// }
// `
];
// const collinsDeletedEle = [
//   'link',
//   'body > div',
//   'body > img',
//   'body > input',
//   'body > header',
//   'body > footer',
//   'body > script',
//   'body > main > :not(#main_content)',
//   '#main_content > div.res_cell_right',
//   '#main_content > div.res_cell_center > .dc.res_cell_center_content > :not(.he)',
//   '#main_content > div.res_cell_center > .dc.res_cell_center_content > .he > .page > .assets > :not(.cB.cB-e)',
// ]
// function collins(resText) {
//   const selectList = [
//     "body",
//     'script',
//     "style",
//   ];
//   let parsedWordDesc = insert(
//     selectList,
//     resText,
//     collinsInsertedEle,
//     collinsDeletedEle
//   );
//   return parsedWordDesc.html() || "";
// }
// function handleDom() {
//   const parsedWordDesc = youdao(html);
// }
// function insert(selectors, html, insertedEleArr, deletedEleArr) {
//   let id = "browser-extension-jq-words";
//   const $new = cheerio.load(`<div id='${id}'></div>`);
//   const $ = cheerio.load(html);
//   const div = $('div')
//   console.log(div.length, 'div')
//   if (deletedEleArr) {
//     deletedEleArr.forEach((deletedEle) => {
//       $(deletedEle).remove();
//     });
//   }
//   selectors.forEach(async (selector) => {
//     if (selector === 'style') {
//       $(selector).each(function(i, elem) {
//         let currentStyle = $(this).html()
//         currentStyle = `
//         <style>
//           @scope (#${id}) {
//             ${currentStyle}
//           }
//         </style>
//         `
//         $(currentStyle).appendTo($new(`#${id}`));
//       });
//       return true
//     }
//     await elementToNewNode($new(`#${id}`), $, selector);
//   });
//   if (insertedEleArr) {
//     insertedEleArr.forEach((insertedEle) => {
//       $(insertedEle).appendTo($new(`#${id}`));
//     });
//   }
//   return $new;
// }
// async function elementToNewNode(newEle, oldEle, selector) {
//   newEle.append(oldEle(selector));
//   const newText = await newEle.html();
//   // console.log(newText);
// }
// const a = collins(html)
// writeFileSync('./cheerio-test.html', a, 'utf-8')
// const a = cheerio.load(html)
// a('#phrsListTab > div.trans-container > ul > li').each(function() {
//   console.log(a(this).text(), '测试')
// })
// const debounce= (func, delay) => {
//   let timer = null;
//   return function (a) {
//     console.log(a)
//     clearTimeout(timer); // 清除上一次的定时器
//     timer = setTimeout(() => {
//       // 设置新的定时器，延迟执行函数
//       func.apply(this, arguments);
//     }, delay);
//   };
// }
// // 使用防抖函数
// const debouncedFunction = debounce(myFunction, 1000);
// debouncedFunction()
// let $ = cheerio.load('<div></div>')
// console.log($.html())
// let length = 100000
// let types = ['bing', 'youdao', 'collins', 'jinshan', 'longman', 'cambridge', 'webster', 'oxford', 'vocabulary', 'wordreference', 'haici']
// let searchList = {}
// for (let i = 0; i < length; i++) {
//   types.forEach(type => {
//     if (!searchList[type + '-fewalfejwa-' + i]) {
//       searchList[type + '-fewalfejwa-' + i] = []
//     }
//     searchList[type + '-fewalfejwa-' + i].push({
//       date: Date.now()
//     })
//   })
// }
// writeFileSync('cheerio-test-a.json', JSON.stringify(searchList), 'utf-8')
// var html = readFileSync('./cheerio-test.html', { encoding: 'utf-8'})
// let $ = cheerio.load(html)
// // 一颗星代表剔除后面的元素，两颗星代表只加上后面元素的内容
// const sel = '.dpron-i*daud'
// const is2Star = sel.includes('**')
// let [root, ...delOrAddClass] = is2Star ? sel.split('**') : sel.split('*')
// let selText = []
// if (delOrAddClass.length === 0) {
//   $(root).each(function() {
//     const rootText = $(this).text()
//     rootText && selText.push(rootText)
//   })
// } else {
//   $(root).each(function() {
//     let selAssembledText = ''
//     $(this).contents().each(function() {
//       // 包含文本、注释
//       const childNodeClass = $(this).attr('class')
//       const isAddOrDel = delOrAddClass.some(del => childNodeClass && childNodeClass.includes(del))
//       // !isAddOrDel && !is2Star： 当不包含 （由于不是双星，则表示剔除）class选择器，即不包含剔除的元素，就加上
//       // isAddOrDel && is2Star：当包含 （由于是双星，则表示添加）class选择器，即包含添加的元素，就加上
//       if(!isAddOrDel && !is2Star || isAddOrDel && is2Star) {
//         let toAdd = selAssembledText ? ' ' + $(this).text() : $(this).text()
//         selAssembledText = selAssembledText + toAdd
//       }
//     })
//     selAssembledText && selText.push(selAssembledText)
//   })
// }
// console.log(selText, 'selTEXT')
// const example = '.hom****.gramGrp.pos***.sense**gramGrp|subc**cit|type-translation'
// // 一步一步来， 以免造成混乱
// const isStar4 = example.includes('****')
// // 4星必然和3星连用，解决在同一个祖先元素下，不同级别的元素能够加起来的问题
// const [eleRoot, ...addedEles] = isStar4 ? example.split('****') : []
// if (addedEles.length > 0) {
// }
// const [addOrDelRoot, ...addOrDelClass] = 
// var html = readFileSync('./cheerio-test.html', { encoding: 'utf-8'})
// let $ = cheerio.load(html)
// // 查找后代元素，有了。
// $('body').find('.aaa').each(function () {
//   $(this).find('.a').each(function(){
//     console.log('a', $(this).html())
//   })
// })
// console.log($('head link').html())
// let a = [[1], [2, 3]]
// // 将a数组的每一个元素分别相加
// const total = a.reduce((prev, cur) => {
//   let total = []
//   prev.forEach(item => {
//     cur.forEach(item2 => {
//       total.push(item + item2)
//       console.log(prev, cur, item, item2)
//     })
//   })
//   return total
// })
// console.log(total, 't')
var sel = '';
var html = (0, fs_1.readFileSync)('./cheerio-test.html', { encoding: 'utf-8' });
// let $ = cheerio.load(html)
var ele = cheerio_1.default.load(html);
var result = cacheDOMBy34StarDesign(ele, sel);
console.log(result, 'result');
function cacheDOMBy34StarDesign($, sel) {
    var parsedTextList = [];
    var star3 = '***';
    var star4 = '****';
    var is4Star = sel.includes(star4);
    // 有且仅有一个4星，必然有3星，否则无3星，仅有1-2星
    if (is4Star) {
        var _a = sel.split(star4), root_1 = _a[0], assembled3Star = _a[1];
        // 3星元素的个数
        var assembledEle3Star_1 = assembled3Star.split(star3);
        // root下，把3星的内容 拼接起来
        $(root_1).each(function () {
            var assembledTuple = [];
            assembledEle3Star_1.forEach(function (assembledItem, index) {
                assembledTuple[index] = cacheDOMBy12StarDesign($, assembledItem, root_1);
            });
            // 其中assembledA、B必然有一方为唯一元素，即一个root下，只能是A+多b，或者多A+b的情况
            parsedTextList = assembledLevel2Array(assembledTuple);
        });
    }
    else {
        // 1-2星处理
        parsedTextList = cacheDOMBy12StarDesign($, sel);
    }
    return parsedTextList;
}
// 嵌套数组，数组元素各自相加
function assembledLevel2Array(level2Array) {
    if (level2Array === void 0) { level2Array = [[]]; }
    return level2Array.reduce(function (prev, cur) {
        var total = [];
        prev.forEach(function (item) {
            cur.forEach(function (item2) {
                total.push(item + item2);
            });
        });
        return total;
    });
}
function cacheDOMBy12StarDesign($, sel, rootSel) {
    if (rootSel === void 0) { rootSel = 'html'; }
    // *：剔除，**：挑选，***：多元素相加
    var is2Star = sel.includes('**');
    var _a = is2Star ? sel.split('**') : sel.split('*'), root = _a[0], delOrAddClass = _a.slice(1);
    var selText = [];
    if (delOrAddClass.length === 0) {
        $(rootSel).find(root).each(function () {
            var rootText = $(this).text();
            rootText && selText.push(rootText);
        });
    }
    else {
        $(rootSel).find(root).each(function () {
            var selAssembledText = '';
            $(this).contents().each(function () {
                // 包含文本、注释
                var childNodeClass = $(this).attr('class');
                var isAddOrDel = delOrAddClass.some(function (del) { return childNodeClass && childNodeClass.includes(del); });
                // !isAddOrDel && !is2Star： 当不包含 （由于不是双星，则表示剔除）class选择器，即不包含剔除的元素，就加上
                // isAddOrDel && is2Star：当包含 （由于是双星，则表示添加）class选择器，即包含添加的元素，就加上
                if (!isAddOrDel && !is2Star || isAddOrDel && is2Star) {
                    var toAdd = selAssembledText ? ' ' + $(this).text() : $(this).text();
                    selAssembledText = selAssembledText + toAdd;
                }
            });
            selAssembledText && selText.push(selAssembledText);
        });
    }
    return selText;
}
