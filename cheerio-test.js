import cheerio from "cheerio";

// import { html } from "./data.js";

import { readFileSync, writeFileSync } from "fs";

const html = readFileSync("data.js", "utf-8");

async function getText() {
  const link = $("head");
  const text = await link.html();
  console.log(text);
}

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

const collinsInsertedEle = [
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
]

const collinsDeletedEle = [
  'link',
  'body > div',
  'body > img',
  'body > input',
  'body > header',
  'body > footer',
  'body > script',
  'body > main > :not(#main_content)',
  '#main_content > div.res_cell_right',
  '#main_content > div.res_cell_center > .dc.res_cell_center_content > :not(.he)',
  '#main_content > div.res_cell_center > .dc.res_cell_center_content > .he > .page > .assets > :not(.cB.cB-e)',
]

function collins(resText) {
  const selectList = [
    "body",
    'script',
    "style",
  ];

  let parsedWordDesc = insert(
    selectList,
    resText,
    collinsInsertedEle,
    collinsDeletedEle
  );
  return parsedWordDesc.html() || "";
}

function handleDom() {
  const parsedWordDesc = youdao(html);
}

function insert(selectors, html, insertedEleArr, deletedEleArr) {
  let id = "browser-extension-jq-words";

  const $new = cheerio.load(`<div id='${id}'></div>`);
  const $ = cheerio.load(html);

  const div = $('div')
  console.log(div.length, 'div')

  if (deletedEleArr) {
    deletedEleArr.forEach((deletedEle) => {
      $(deletedEle).remove();
    });
  }

  selectors.forEach(async (selector) => {
    if (selector === 'style') {
      $(selector).each(function(i, elem) {
        let currentStyle = $(this).html()
        currentStyle = `
        <style>
          @scope (#${id}) {
            ${currentStyle}
          }
        </style>
        `
        $(currentStyle).appendTo($new(`#${id}`));
      });
      return true
    }
    await elementToNewNode($new(`#${id}`), $, selector);
  });

  if (insertedEleArr) {
    insertedEleArr.forEach((insertedEle) => {
      $(insertedEle).appendTo($new(`#${id}`));
    });
  }
  return $new;
}

async function elementToNewNode(newEle, oldEle, selector) {
  newEle.append(oldEle(selector));
  const newText = await newEle.html();
  // console.log(newText);
}

// const a = collins(html)
// writeFileSync('./cheerio-test.html', a, 'utf-8')

const a = cheerio.load(html)

a('#phrsListTab > div.trans-container > ul > li').each(function() {
  console.log(a(this).text(), '测试')
})
