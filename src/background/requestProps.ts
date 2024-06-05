type RequestProps = {
  url: string;
  host: string;
  headers: {
    [index: string]: string;
  }
}

const request: Record<DictType, RequestProps> = {
  webster: {
    url: `https://www.merriam-webster.com/dictionary/wordHolder`,
    host: 'https://www.merriam-webster.com',
    headers: {},
  },
  haici: {
    url: `https://dict.cn/wordHolder`,
    host: 'https://dict.cn',
    headers: {},
  },
  wordreference: {
    url: `https://www.wordreference.com/enzh/wordHolder`,
    host: 'https://www.wordreference.com',
    headers: {},
  },
  vocabulary: {
    url: `https://www.vocabulary.com/dictionary/wordHolder`,
    host: 'https://www.vocabulary.com',
    headers: {},
  },
  oxford: {
    url: `https://www.oxfordlearnersdictionaries.com/search/english/?q=wordHolder`,
    host: 'https://www.oxfordlearnersdictionaries.com',
    headers: {},
  },
  longman: {
    url: `https://www.ldoceonline.com/dictionary/wordHolder`,
    host: 'https://www.ldoceonline.com',
    headers: {},
  },
  cambridge: {
    url: `https://dictionary.cambridge.org/dictionary/english-chinese-simplified/wordHolder`,
    host: 'https://dictionary.cambridge.org',
    headers: {},
  },
  jinshan: {
    url: `https://www.iciba.com/word?w=wordHolder`,
    host: 'https://www.iciba.com',
    headers: {},
  },
  youdao: {
    url: `http://youdao.com/w/wordHolder`,
    host: 'http://youdao.com',
    headers: {},
  },
  bing: {
    url: `https://www.bing.com/dict/search?q=wordHolder&FORM=HDRSC6`,
    host: 'https://www.bing.com',
    headers: {
    },
  }
  ,
  collins: {
    url: `https://www.collinsdictionary.com/dictionary/english-chinese/wordHolder`,
    host: 'https://www.collinsdictionary.com',
    headers: {
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      Cookie: 'XSRF-TOKEN=e4ebefc0-c598-4b53-9b91-daef37d31baf; __cflb=02DiuFwNDm462z9fWfH2ofc6zGZ7XCat8wibKG2gndnKE; _sharedID=0a3b3118-abf0-4127-a733-d4e420e09932; _sharedID_cst=zix7LPQsHA%3D%3D; cf_clearance=bvwyUJWgFlJ7gZ68NxFVAwseJujgD5RejQ9n890l4BM-1716526667-1.0.1.1-X4x25SXhqfzabxF.jQLg.iDARn1nKAdY4WE6NMa.G0XIRPuPIC63biGaHYuqjMUJdxMXnly4kYodqfxuCk6LSQ; _ga=GA1.1.1894682082.1716526672; _lr_env_src_ats=false; dictcode=english-chinese; searchPanelOpen=true; search=word; _sp_ses.a65e=*; __cf_bm=wNFxp2r47inXEXL74c9UjmDl0KDOhnCc9IAqfuUrrVw-1716535205-1.0.1.1-kq1u4AM.XA43frMDp17304UKObB.XFc0jYSDvhBaZFzzTxd51gXzUjivd5OZ05iLqmaHrSTDOCIzTTFyuxRqhA; iawpvccs=1; iawsc1m=2; iawpvc=5; iawpvtc1m=5; OptanonConsent=isGpcEnabled=0&datestamp=Fri+May+24+2024+15%3A21%3A11+GMT%2B0800+(%E4%B8%AD%E5%9B%BD%E6%A0%87%E5%87%86%E6%97%B6%E9%97%B4)&version=202402.1.0&browserGpcFlag=0&isIABGlobal=false&hosts=&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1%2CC0004%3A1&AwaitingReconsent=false&geolocation=CN%3B; OptanonAlertBoxClosed=2024-05-24T07:21:11.655Z; _ga_SS7E5PDDSK=GS1.1.1716535176.2.1.1716535271.60.0.0; FCNEC=%5B%5B%22AKsRol-I7z60J_nuu2we7kVd5uGi7QWI4NQE7DKGe48BnuCZNALyvIAPodUind4QkQXFbT-VRCJ_2f13Br83KiNc6q6itVdC5LrYT6ab0BUpBJWtsTKTvdwJgztChoHgtvZdUCNTs0k9wKWvFNn8bLbM6xVsOc3pEA%3D%3D%22%5D%5D; _lr_retry_request=true; _sp_id.a65e=35542b27-b3eb-4200-aa7f-94b32fe98486.1716526669.2.1716535311.1716531504.484c320c-1dae-4b02-9366-3aa4e08f7565.d90e4f7c-d5d9-4a27-9593-8547cc3b6799.fd282007-14a2-4773-8c36-73aa35e26f1d.1716533364163.9; JSESSIONID=58232D73A3518F075991256A859D6ACB-n1',
    },
  },
}

export default request
