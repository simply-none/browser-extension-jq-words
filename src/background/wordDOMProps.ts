
type DictDOMStyleType = 'insertedStyle' | 'deleted' | 'selected' | 'cache' | 'existSelector'

interface WordDOMProps {
  insertedStyle: string[];
  deleted: string[];
  selected: string[];
  existSelector: string;
  cache: Pick<WordCache, WordSimplyCacheType>
}

const youdao: WordDOMProps = {
  insertedStyle: [
    `
    <style>
    *::-webkit-scrollbar {
      display: none;
    }
    body {
      margin: 0;
    }
    h2.wordbook-js {
      margin: 0;
    }
    h2.wordbook-js {
      margin: 0;
      font-size: 1em;
    }
    ul {
      margin: 6px;
      padding-left: 1em;
    }
    h3, h4 {
      font-size: 1em;
      margin: 0;
    }
    .collinsMajorTrans p {
      display: inline;
      margin: 0;
    }
    .examples {
      display: inline;
    }
    .examples p {
      display: inline;
    }
    #collinsResult .exampleLists {
      margin: 6px 0 6px 1em;
    }
    #collinsResult .ol .collinsMajorTrans {
      width: unset;
  }
    // #collinsResult .exampleLists {
    //   margin: 0px 0 0px 24px;
    // }
    // #collinsResult .examples {
    //   height: unset;
    //   box-shadow: unset;
    //   padding: 0;
    // }
    // .tabs a span, .tab-current span {
    //   padding: 0;
    // }
    // .trans-wrapper h3 .toggleOpen {
    //   display: none;
    // }
    // .trans-container {
    //   margin: 3px 0;
    // }
    // .trans-container .ol li, #collinsResult .ol, .trans-wrapper h3 {
    //   margin: 0;
    // }
    </style>
    `,
  ],
  deleted: [
    '#phrsListTab > :not(h2, div.trans-container, style)'
  ],
  selected: [
    '#phrsListTab',
    '#authTrans',
    'body style',
    'body script',
  ],
  existSelector: '#phrsListTab',
  cache: {
    trans: ['#phrsListTab > div.trans-container > ul > li'],
    phonetic: ['#phrsListTab  .pronounce'],
    morph: ['#phrsListTab > div.trans-container > .additional'],
  }

}

const collins: WordDOMProps = {
  insertedStyle: [
    `
    <style>
    *::-webkit-scrollbar {
      display: none;
    }
    main {
      padding-top: 0;
    }
    .dc .cB-h .h2_entry {
      font-size: 1.2em;
    }
    .page .dictionary .sense {
      margin-left: 1em;
    }
    // .res_cell_center {
    //   width: 100%;
    // }
    // .res_cell_center_content {
    //   padding: 0;
    // }
    // .page .cit.type-example .title.credits, .credits {
    //   white-space: unset;
    //   width: 100%;
    // }
    .dc .cB {
      border: unset;
      box-shadow: unset;
      padding: 0;
    }
    .titleExType {
      margin-top: 0;
    }
    .dc .cit.type-quotation .quote, .dc .cB-q .quote, .dc .cB-e .quote, .dc .cB-th .quote {
      margin-top: .5em;
    }
    // .cB-e .cit {
    //   // font-size: 13px;
    //   font-family: sans-serif;
    //   font-style: normal;
    // }
    // span.gramGrp.pos {
    //   width: 100%;
    // }
    // .titleExType {
    //   margin-top: 6px;
    // }
    // .h2_entry {
    //   // font-size: 18px !important;
    // }
    // .page .dictionary .sense {
    //   margin-bottom: 0;
    //   margin-top: 0;
    // }
    // .page .dictionary .sense.cit.type-translation:not(.type-example) .quote, .page .dictionary .sense.cit.type-translation:not(.type-example)>.quote, .page .dictionary .sense:not(.type-example)>.cit.type-translation.quote, .page .dictionary .sense:not(.type-example)>.cit.type-translation .quote, .page .dictionary .sense:not(.type-example)>.cit.type-translation .quote>.ref, .page .dictionary .sense:not(.type-example).cit.type-translation .quote>.ref {
    //   // font-size: 16px;
    // }
    // .page .lbl, .page .colloc {
    //   // font-size: 16px;
    // }
    // main>div#main_content {
    //   width: 100% !important;
    // }
    </style>
    `
  ],
  deleted: [
    'link',
    'body > :not(main, style)',
    'body > main > :not(#main_content)',
    '#main_content > div.res_cell_right',
    '#main_content > div.res_cell_center > .dc.res_cell_center_content > :not(.he)',
    '#main_content > div.res_cell_center > .dc.res_cell_center_content > .he > .page > .assets > :not(.cB.cB-e)',
    '#main_content .ex-info',
    '.ptr.hwd_sound.type-hwd_sound',
    '.copyright',
  ],
  selected: [
    'body',
    'body style',
    'body script',
  ],
  existSelector: '.cB.cB-def.dictionary.biling',
  cache: {
    trans: ['div.content.definitions.dictionary.biling > .hom'],
    phonetic: ['div.mini_h2.form'],
    morph: [],
  }

}

const bing: WordDOMProps = {
  insertedStyle: [
    `
    <style>
    *::-webkit-scrollbar {
      display: none;
    }
    body, .lf_area {
      width: 100%;
      min-width: 100%;
      max-width: 100%;
    }
    div#thesaurusesid > div {
      display: block !important;
    }
    div#thesaurusesid > div + div {
      border-bottom: 1px solid;
    }
    // .se_li {
    //   display: inline-flex;
    // }
    // #headword {
    //   width: 100%;
    //   // font-size: 1.2em;
    // }
    // #headword > h1 {
    //   // font-size: 20px;
    // }
    // .hd_area {
    //   margin-bottom: 3px;
    // }
    .li_pos > div {
      display: block;
    }
    </style>
    `,
  ],
  deleted: [
    'div.contentPadding > div > div > div.lf_area > .qdef > .df_div > .tb_div > :not(#authtabid)',
    'div.contentPadding > div > div > div.lf_area > .qdef > .df_div > #defid > :not(#authid)',
    '#sentenceSeg .de_li > div.se_li1 > div.sen_li.b_regtxt',
    '#sentenceSeg .se_li .se_li1 > div.mm_div',
    '.b_pag.b_cards',
  ],
  selected: [
    'div.contentPadding > div > div > div.lf_area',
    '#sentenceSeg > div.se_li',
    'body style',
    'body script',
  ],
  existSelector: '.rs_area.b_cards',
  cache: {
    trans: ['div.qdef > ul > li'],
    phonetic: ['.hd_area div.b_primtxt'],
    morph: ['div.qdef > div.hd_div1'],
  }
}

const jinshan: WordDOMProps = {
  insertedStyle: [
    `
    <style>
    *::-webkit-scrollbar {
      display: none;
    }
    main::before {
      content: "" !important;
      display: unset !important;
      width: unset !important;
      height: unset !important;
      background: unset !important;
      position: unset !important;
      top: unset !important;
      left: unset !important;
      z-index: unset !important;
    }
    [class^=Content_fill] > ul {
      margin: 0;
      padding: 0;
    }
    </style>
    `,
  ],
  deleted: [
  ],
  selected: [
    '[class^=Content_fill]',
  ],
  existSelector: '[class^=Mean_word]',
  cache: {
    trans: ['[class^=Mean_part] > li'],
    phonetic: ['[class^=Mean_symbols] > li'],
    morph: ['[class^=Morphology_morphology] > li'],
  }
}

const longman: WordDOMProps = {
  insertedStyle: [
    `
    <style>
    *::-webkit-scrollbar {
      display: none;
    }
    span[id^="ad_"][class^="am-"] {
      display: none;
    }
    #onetrust-banner-sdk.otFlat {
      display: none;
    }
    </style>
    `,
  ],
  deleted: [
  ],
  selected: [
    '.entry_content',
    'script',
    'style'
  ],
  existSelector: '.dictionary',
  cache: {
    trans: ['.dictlink'],
    phonetic: ['.PronCodes'],
    morph: ['.wordfams'],
  }
}

const cambridge: WordDOMProps = {
  insertedStyle: [
    `
    <style>
    *::-webkit-scrollbar {
      display: none;
    }
    #onetrust-banner-sdk.otFlat {
      display: none;
    }
    </style>
    `,
  ],
  deleted: [
  ],
  selected: [
    '.entry-body',
    'script',
    'style'
  ],
  existSelector: '.pos-body',
  cache: {
    trans: ['.def-body > .trans'],
    phonetic: ['.dpron-i'],
    morph: [],
  }
}

const webster: WordDOMProps = {
  insertedStyle: [
    `
    <style>
    *::-webkit-scrollbar {
      display: none;
    }
    h1, h2, h3, h4 {
      font-weight: 300;
      margin: 0;
    }
    </style>
    `,
  ],
  deleted: [
    '#subscribe-unabridged',
    '#more-from-mw',
    'h1 > span',
    '.videos',
    '.section.citation'
  ],
  selected: [
    '#left-content',
    'script',
    'style'
  ],
  existSelector: '.entry-word-section-container',
  cache: {
    trans: ['.dtText'],
    phonetic: ['.prons-entries-list-inline'],
    morph: ['.mw-grid-table-list'],
  }
}

const oxford: WordDOMProps = {
  insertedStyle: [
    `
    <style>
    *::-webkit-scrollbar {
      display: none;
    }
    body {
      min-width: 100%;
      max-width: 100%;
      width: 100%;
    }
    #onetrust-banner-sdk.otFlat {
      display: none;
    }
    </style>
    `,
  ],
  deleted: [
    '.dictlink-g',
    '.parallax-container',
    '#ring-links-box',
  ],
  selected: [
    '#main-container',
    'script',
    'style'
  ],
  existSelector: '.senses_multiple',
  cache: {
    trans: ['.def'],
    phonetic: ['.phon'],
    morph: [],
  }
}

const vocabulary: WordDOMProps = {
  insertedStyle: [
    `
    <style>
    *::-webkit-scrollbar {
      display: none;
    }
    </style>
    `,
  ],
  deleted: [
  ],
  selected: [
    '.definition-columns > .col-1',
    'script',
    'style'
  ],
  existSelector: '.word-area',
  cache: {
    trans: ['.sense > .definition'],
    phonetic: ['.ipa-with-audio'],
    morph: ['.word-forms'],
  }
}

const wordreference: WordDOMProps = {
  insertedStyle: [
    `
    <style>
    *::-webkit-scrollbar {
      display: none;
    }
    #otherDicts {
      margin-bottom: 0;
    }
    div#article {
      padding: 0;
    }
    .extras {
      margin-top: 0;
    }
    </style>
    `,
  ],
  deleted: [
    '#FTintro',
    '#FTintro + .FTsource',
    '#FTintro + .FTsource + .FTlist',
    '#postArticle'
  ],
  selected: [
    '#centercolumn',
    'script',
    'style'
  ],
  existSelector: '#articleWRD',
  cache: {
    trans: ['.ToWrd'],
    phonetic: ['.pwrapper'],
    morph: ['dl.ListInfl'],
  }
}

const haici: WordDOMProps = {
  insertedStyle: [
    `
    <style>
    *::-webkit-scrollbar {
      display: none;
    }
    .main {
      margin-left: 0;
      padding-left: 1em;
      width: 100%;
    }
    </style>
    `,
  ],
  deleted: [
    '.dict-chart',
    '#dshared',
    '.copyright'
  ],
  selected: [
    '#content .main',
    'script',
    'style'
  ],
  existSelector: '.def',
  cache: {
    trans: ['.def > .layout ol > li'],
    phonetic: ['.phonetic span'],
    morph: ['.section.rel > .layout'],
  }
}

const wordDOMProps: Record<DictType, WordDOMProps> = {
  youdao,
  bing,
  collins,
  jinshan,
  longman,
  cambridge,
  webster,
  oxford,
  vocabulary,
  wordreference,
  haici,
}

export default wordDOMProps
