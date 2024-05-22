import cheerio from "cheerio";

import { html } from "./data.js";

import { readFileSync, writeFileSync } from 'fs'

async function getText() {
  const link = $("head");
  const text = await link.html();
  console.log(text);
}

async function insert(selectors) {
  let id = 'browser-extension-jq-words'

  const $new = cheerio.load(`<div id='${id}'></div>`);
  const $ = cheerio.load(html);

  selectors.forEach(async selector => {
    await elementToNewNode($new(`#${id}`), $, selector)
  })
}

async function elementToNewNode(newEle, oldEle, selector) {
  newEle.append(oldEle(selector));
  const newText = await newEle.html();
  console.log(newText);
}

const selectList = [
  '#phrsListTab > h2',
  '#phrsListTab > div.trans-container',
  '#authTrans',
  'link[rel="stylesheet"]',
  'style'
]

// insert(selectList);

console.log(manifest)