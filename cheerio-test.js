import cheerio from "cheerio";

import { html } from "./data.js";

async function getText() {
  const link = $("head");
  const text = await link.html();
  console.log(text);
}

async function insert(selector) {
  const $ = cheerio.load(html);
  let id = 'browser-extension-jq-words'

  const $new = cheerio.load(`<div id='${id}'></div>`);

  const select = await $(selector).html();
  $new(`#${id}`).append(select);
  const newText = await $new(`#${id}`).html();
  console.log(newText);
}

insert('head');
