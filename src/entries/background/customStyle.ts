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

const collinsInsertedEle: string[] = [
  `
  <style>
  .res_cell_center {
    width: 100%;
  }
  .res_cell_center_content {
    padding: 0;
  }
  .page .cit.type-example .title.credits, .credits {
    white-space: unset;
    width: 100%;
  }
  .dc .cB {
    border: unset;
    box-shadow: unset;
    padding: 0;
  }
  .cB-e .cit {
    font-size: 13px;
    font-family: sans-serif;
    font-style: normal;
  }
  span.gramGrp.pos {
    width: 100%;
  }
  .titleExType {
    margin-top: 6px;
  }
  .h2_entry {
    font-size: 18px !important;
  }
  .page .dictionary .sense {
    margin-bottom: 0;
    margin-top: 0;
  }
  .page .dictionary .sense.cit.type-translation:not(.type-example) .quote, .page .dictionary .sense.cit.type-translation:not(.type-example)>.quote, .page .dictionary .sense:not(.type-example)>.cit.type-translation.quote, .page .dictionary .sense:not(.type-example)>.cit.type-translation .quote, .page .dictionary .sense:not(.type-example)>.cit.type-translation .quote>.ref, .page .dictionary .sense:not(.type-example).cit.type-translation .quote>.ref {
    font-size: 16px;
  }
  .page .lbl, .page .colloc {
    font-size: 16px;
  }
  </style>
  `
]

const collinsDeletedEle: string[] = [
  'link',
  'body > :not(main, style)',
  'body > main > :not(#main_content)',
  '#main_content > div.res_cell_right',
  '#main_content > div.res_cell_center > .dc.res_cell_center_content > :not(.he)',
  '#main_content > div.res_cell_center > .dc.res_cell_center_content > .he > .page > .assets > :not(.cB.cB-e)',
  '#main_content .ex-info',
  '.ptr.hwd_sound.type-hwd_sound',
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
  collinsInsertedEle,
  collinsDeletedEle,
  bingInsertedEle,
  bingDeletedEle,
}