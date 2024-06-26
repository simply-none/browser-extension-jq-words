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
    h1, h2 {
      font-size: 18px !important;
    }
    </style>
    `,
  ],
  deleted: [
    '#phrsListTab > :not(h2, div.trans-container, style)',
    'script[src]',
  ],
  selected: [
    '#phrsListTab',
    '#authTrans',
    'body style',
    'script:not([src])',
  ],
  existSelector: '#phrsListTab',
  cache: {
    trans: ['#phrsListTab > div.trans-container > ul > li', '#authTransToggle .trans-container****.title.trans-tip > span***.trans-content .ol > li > p***.trans-content .collinsMajorTrans > p'],
    phonetic: ['#phrsListTab  .pronounce'],
    morph: ['#discriminate .collapse-content > :not(.via)'],
    sound: ['.pronounce a']
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
    h1, h2 {
      font-size: 18px !important;
    }
    .res_cell_center {
      width: 100% !important;
    }
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
    'script[src]',
    '.mpuslot_b-container',
  ],
  selected: [
    'body',
    'body style',
    'script:not([src])',
  ],
  existSelector: '.cB.cB-def.dictionary.biling',
  cache: {
    trans: ['div.content.definitions.dictionary.biling > .hom****.gramGrp.pos***.sense**.gramGrp.subc**.cit.type-translation'],
    phonetic: ['div.mini_h2.form'],
    morph: [],
    sound: ['.pron a.sound']
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
    h1, h2 {
      font-size: 18px !important;
    }
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
    'script[src]',
  ],
  selected: [
    'div.contentPadding > div > div > div.lf_area',
    '#sentenceSeg > div.se_li',
    'body style',
    'script:not([src])',
  ],
  existSelector: '.rs_area.b_cards',
  cache: {
    trans: ['div.qdef > ul > li', '#authid .each_seg****.pos_lin .pos***.se_lis .de_co', '#crossid .def_row.df_div1****.pos.pos1***.def_fl > .de_li1.de_li3 .p1-1.b_regtxt', '#homoid .def_row.df_div1****.pos.pos1***.def_fl > .de_li1.de_li3 .df_cr_w', '#webid .df_div1 .def_row.de_li1.de_li4 .p1-1.b_regtxt'],
    phonetic: ['.hd_area div.b_primtxt'],
    morph: ['div.qdef > div.hd_div1'],
    sound: ['.hd_tf > .bigaud'],
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
    [class^=FoldBox_fold] {
      padding: 0;
    }
    h1, h2 {
      font-size: 18px !important;
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
    sound: ['#__NEXT_DATA__'],
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
    .entry_content, .page_content, .error_content {
      margin: 0;
    }
    h1, h2 {
      font-size: 18px !important;
    }
    </style>
    `,
  ],
  deleted: [
    'script[src]',
    '.pagetitle',
    'span.dictentry > span.dictionary_intro.span'
  ],
  selected: [
    '.entry_content',
    'script:not([src])',
    'style'
  ],
  existSelector: '.dictionary',
  cache: {
    trans: ['.dictlink****.Head > .POS***.Sense**.GRAM**.DEF'],
    phonetic: ['.PronCodes'],
    morph: ['.wordfams'],
    sound: ['.frequent.Head .speaker.fas'],
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
    .dpos-h_hw {
      margin: 0;
      font-size: 20px;
    }
    h1, h2 {
      font-size: 18px !important;
    }
    </style>
    `,
  ],
  deleted: [
    'script[src]',
    'audio > :not(source)',
  ],
  selected: [
    '.entry-body',
    'script:not([src])',
    'style'
  ],
  existSelector: '.pos-body',
  cache: {
    trans: ['.pr.entry-body__el .pr.dsense****.dsense_h***.def-block.ddef_block**.ddef_h**.def-body.ddef_b > .trans'],
    phonetic: ['.dpron-i*.daud'],
    morph: [],
    sound: ['.pos-header.dpos-h .dpron-i source[type="audio/mpeg"]'],
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
    h1, h2 {
      font-size: 18px !important;
    }
    </style>
    `,
  ],
  deleted: [
    '#subscribe-unabridged',
    '#more-from-mw',
    'h1 > span',
    '.videos',
    '.section.citation',
    'script[src]',
    'a > img',
  ],
  selected: [
    '#left-content',
    'script:not([src])',
    'style'
  ],
  existSelector: '.entry-word-section-container',
  cache: {
    trans: ['.sb-entry > .sense .sense-content', '.sb-entry > .pseq.no-subnum'],
    phonetic: ['.prons-entries-list-inline', '.prons-entries-list'],
    morph: ['.mw-grid-table-list'],
    sound: ['.entry-header .prons-entry-list-item'],
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
    h1, h2 {
      font-size: 18px !important;
    }
    </style>
    `,
  ],
  deleted: [
    '.dictlink-g',
    '.parallax-container',
    '#ring-links-box',
    'script[src]',
  ],
  selected: [
    '#main-container',
    'script:not([src])',
    'style'
  ],
  existSelector: '.phonetics',
  cache: {
    trans: ['.sense**.grammar**.def'],
    phonetic: ['.phon'],
    morph: [],
    sound: ['.phonetics .sound'],
  }
}

const vocabulary: WordDOMProps = {
  insertedStyle: [
    `
    <style>
    *::-webkit-scrollbar {
      display: none;
    }
    h1, h2 {
      font-size: 18px !important;
    }
    </style>
    `,
  ],
  deleted: [
    'script[src]',
    '.videos',
  ],
  selected: [
    '.definition-columns > .col-1',
    'script:not([src])',
    'style'
  ],
  existSelector: '.word-area',
  cache: {
    trans: ['.sense > .definition'],
    phonetic: ['.ipa-with-audio'],
    morph: ['.word-forms'],
    sound: ['.word-area .pron-audio', '.word-area .audio[data-audio]']
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
    h1, h2 {
      font-size: 18px !important;
    }
    </style>
    `,
  ],
  deleted: [
    '#FTintro',
    '#FTintro + .FTsource',
    '#FTintro + .FTsource + .FTlist',
    '#postArticle',
    'script[src]',
    '#listen_widget',
  ],
  selected: [
    '#centercolumn',
    'script:not([src])',
    'style'
  ],
  existSelector: '#articleWRD',
  cache: {
    trans: ['#articleWRD > table:nth-child(2)  .ToWrd>.zhgroup:first-child*.simplified*.pinyintxt*.copy'],
    phonetic: ['.pwrapper*span:not([class])'],
    morph: ['dl.ListInfl'],
    sound: ['#listen_widget script'],
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
    h1, h2 {
      font-size: 18px !important;
    }
    </style>
    `,
  ],
  deleted: [
    '.dict-chart',
    '#dshared',
    '.copyright',
    '.section.def > h2',
    'script[src]',
  ],
  selected: [
    '#content .main',
    'script:not([src])',
    'style'
  ],
  existSelector: '.def',
  cache: {
    trans: ['.def > .layout ol > li*p'],
    phonetic: ['.phonetic span'],
    morph: ['.section.rel > .layout > div:first-child', 'div.section.rel > .layout ul:nth-child(1) li'],
    sound: ['.phonetic .sound'],
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
