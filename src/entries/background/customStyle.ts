const youdaoInsertedEle = [
  `
  <style>
  #collinsResult .ol .collinsMajorTrans {
    width: unset;
  }
  #collinsResult .exampleLists {
    margin: 0px 0 0px 24px;
  }
  #collinsResult .examples {
    height: unset;
    box-shadow: unset;
    padding: 0;
  }
  .tabs a span, .tab-current span {
    padding: 0;
  }
  .trans-wrapper h3 .toggleOpen {
    display: none;
  }
  .trans-container {
    margin: 3px 0;
  }
  .trans-container .ol li, #collinsResult .ol, .trans-wrapper h3 {
    margin: 0;
  }
  </style>
  `,
]

const youdaoDeletedEle: string[] = [

]

const bingInsertedEle = [
  `
  <style>
  #browser-extension-jq-words .se_li {
    display: inline-flex;
  }
  #headword {
    width: 100%;
    font-size: 1.2em;
  }
  #headword > h1 {
    font-size: 20px;
  }
  .hd_area {
    margin-bottom: 3px;
  }
  </style>
  `,
]

const bingDeletedEle: string[] = [
  '#sentenceSeg .de_li > div.se_li1 > div.sen_li.b_regtxt',
  '#sentenceSeg .se_li .se_li1 > div.mm_div',
]

export {
  youdaoInsertedEle,
  youdaoDeletedEle,
  bingInsertedEle,
  bingDeletedEle,
}