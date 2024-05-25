type RequestProps = {
  url: string;
  headers: {
    [index: string]: string;
  }
}

const request: Record<DictType, RequestProps> = {
  youdao: {
    url: `http://youdao.com/w/wordHolder`,
    headers: {},
  },
  bing: {
    url: `https://www.bing.com/dict/search?q=wordHolder&FORM=HDRSC6`,
    headers: {
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'Accept-Encoding': 'gzip, deflate, br, zsdch, zstd',
      'Cookie': 'ipv6=hit=1716436922982&t=6; SRCHD=AF=NOFORM; SRCHUID=V=2&GUID=5A9D1D92E23A4519876304A2ACD8F828&dmnchg=1; ANON=A=F5F1F683508EB5B4D72BE0A8FFFFFFFF; EDGSRCHHPGUSR=CIBV=1.1742.1; MMCASM=ID=82A0CCBFDFCF452EACC8CF908C5F87C7; MUIDB=30B3D8BFF95F665323F9CC3AF8F76778; _TTSS_IN=hist=WyJlbiIsImF1dG8tZGV0ZWN0Il0=&isADRU=0; _TTSS_OUT=hist=WyJ6aC1IYW5zIl0=; _tarLang=default=zh-Hans&newFeature=tonetranslation; ANIMIA=FRE=1; _UR=cdxcls=0&QS=0&TQS=0; MicrosoftApplicationsTelemetryDeviceId=6d5fc723-716d-476c-9dd9-46733d897bef; MUID=0BEFFCB2A932666E3668EFB9A8E06763; MUIDB=0BEFFCB2A932666E3668EFB9A8E06763; MSPTC=_1uN5CDLPl_JzGOtLGzgGJWeEGUAEHnS5P3C8JOqauw; _HPVN=CS=eyJQbiI6eyJDbiI6MiwiU3QiOjAsIlFzIjowLCJQcm9kIjoiUCJ9LCJTYyI6eyJDbiI6MiwiU3QiOjAsIlFzIjowLCJQcm9kIjoiSCJ9LCJReiI6eyJDbiI6MiwiU3QiOjAsIlFzIjowLCJQcm9kIjoiVCJ9LCJBcCI6dHJ1ZSwiTXV0ZSI6dHJ1ZSwiTGFkIjoiMjAyNC0wNS0yM1QwMDowMDowMFoiLCJJb3RkIjowLCJHd2IiOjAsIlRucyI6MCwiRGZ0IjpudWxsLCJNdnMiOjAsIkZsdCI6MCwiSW1wIjo2LCJUb2JuIjowfQ==; cct=-pMVvpID5s3b65P3XdiM0-Z_xKX1VBS4IHRYgcYVDgc7fWZ9Ccwk4A1AE6tz5XQrJNxXDYOmM_BK_f3yQmYQGg; WLS=C=9c49a6d028e41e07&N=sin; _U=1MvqTtPjibxkTErSDjPSYAr0oGE66m2ZhUVQ5FLqyK4Mqm5bov4DdX-Oj83l8KBgXPvpCYSLLl6Rp1QRcRc2E74GwdLXrM-sUDqGaguml7N0tymvsTqr2M6QT88XSac-9NpUSwhF3nT6kbgkP-15k6m8IzPp7N9lpQ3sW64kVw8nApOu9Poo5k6PLFRHkMqIJSXaL4g_ugyLMEhZdwXUW3g; SRCHUSR=DOB=20240520&T=1716433317000&POEX=W; _Rwho=u=d&ts=2024-05-23; _SS=SID=2B35FF514E9F6EF91104EBD94F976FEC&R=165&RB=165&GB=0&RG=0&RP=165; _EDGE_S=SID=2B35FF514E9F6EF91104EBD94F976FEC&mkt=zh-cn; USRLOC=HS=1&ELOC=LAT=30.704530715942383|LON=104.04573822021484|N=%E9%87%91%E7%89%9B%E5%8C%BA%EF%BC%8C%E5%9B%9B%E5%B7%9D%E7%9C%81|ELT=4|&BID=MjQwNTIzMTA0ODIxXzYxZjM5Njc5NWY1MjBjM2I3YzI1MzU0MmQ1NmExMDkzZTdhNzVhMGVlZjJmZmRiMWIyZTAxYzMzNTcwMjAwZTA=; ipv6=hit=1716436939664&t=6; _C_ETH=1; GC=MwxWa53mL7lJq0PkRxKqIuTaS2YmEOVF2HIB6ojNua9wgBvaTVUO7XebGf7DHsFc4YNFbCvF9OyBFLc-lqL_9A; _RwBf=mta=0&rc=165&rb=165&gb=0&rg=0&pc=165&mtu=0&rbb=0.0&g=0&cid=&clo=0&v=50&l=2024-05-22T07:00:00.0000000Z&lft=0001-01-01T00:00:00.0000000&aof=0&ard=0001-01-01T00:00:00.0000000&rwdbt=0001-01-01T16:00:00.0000000-08:00&rwflt=0001-01-01T16:00:00.0000000-08:00&o=0&p=MSAAUTOENROLL&c=MR000T&t=2031&s=2024-05-18T02:54:46.1899669+00:00&ts=2024-05-23T03:02:21.3842659+00:00&rwred=0&wls=0&wlb=0&wle=0&ccp=2&cpt=0&lka=0&lkt=0&aad=0&TH=&e=Rpdkk2cDZT8ufp_a0tBFSXDKO8JirxkQz7GLj3HxK4oBqO2rRnpyA3UTiO0gjUaONHh0aqqRncOh-LWDGrwp92_yoWjrtoAC-Ky4rqRczlg&A=; SRCHHPGUSR=SRCHLANG=zh-Hans&PV=10.0.0&BZA=0&BRW=M&BRH=T&CW=1272&CH=1291&SCW=1257&SCH=3288&DPR=1.0&UTC=480&DM=0&EXLTT=31&HV=1716433345&PRVCW=1272&PRVCH=1291&IG=7CB7AC5500DB4070A0704B1033CC1A3A&CIBV=1.1745.0&cdxupdttm=638517669308984748&PR=1',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 Edg/125.0.0.0',
    },
  }
  ,
  collins: {
    url: `https://www.collinsdictionary.com/dictionary/english-chinese/wordHolder`,
    headers: {
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      Cookie: 'XSRF-TOKEN=e4ebefc0-c598-4b53-9b91-daef37d31baf; __cflb=02DiuFwNDm462z9fWfH2ofc6zGZ7XCat8wibKG2gndnKE; _sharedID=0a3b3118-abf0-4127-a733-d4e420e09932; _sharedID_cst=zix7LPQsHA%3D%3D; cf_clearance=bvwyUJWgFlJ7gZ68NxFVAwseJujgD5RejQ9n890l4BM-1716526667-1.0.1.1-X4x25SXhqfzabxF.jQLg.iDARn1nKAdY4WE6NMa.G0XIRPuPIC63biGaHYuqjMUJdxMXnly4kYodqfxuCk6LSQ; _ga=GA1.1.1894682082.1716526672; _lr_env_src_ats=false; dictcode=english-chinese; searchPanelOpen=true; search=word; _sp_ses.a65e=*; __cf_bm=wNFxp2r47inXEXL74c9UjmDl0KDOhnCc9IAqfuUrrVw-1716535205-1.0.1.1-kq1u4AM.XA43frMDp17304UKObB.XFc0jYSDvhBaZFzzTxd51gXzUjivd5OZ05iLqmaHrSTDOCIzTTFyuxRqhA; iawpvccs=1; iawsc1m=2; iawpvc=5; iawpvtc1m=5; OptanonConsent=isGpcEnabled=0&datestamp=Fri+May+24+2024+15%3A21%3A11+GMT%2B0800+(%E4%B8%AD%E5%9B%BD%E6%A0%87%E5%87%86%E6%97%B6%E9%97%B4)&version=202402.1.0&browserGpcFlag=0&isIABGlobal=false&hosts=&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1%2CC0004%3A1&AwaitingReconsent=false&geolocation=CN%3B; OptanonAlertBoxClosed=2024-05-24T07:21:11.655Z; _ga_SS7E5PDDSK=GS1.1.1716535176.2.1.1716535271.60.0.0; FCNEC=%5B%5B%22AKsRol-I7z60J_nuu2we7kVd5uGi7QWI4NQE7DKGe48BnuCZNALyvIAPodUind4QkQXFbT-VRCJ_2f13Br83KiNc6q6itVdC5LrYT6ab0BUpBJWtsTKTvdwJgztChoHgtvZdUCNTs0k9wKWvFNn8bLbM6xVsOc3pEA%3D%3D%22%5D%5D; _lr_retry_request=true; _sp_id.a65e=35542b27-b3eb-4200-aa7f-94b32fe98486.1716526669.2.1716535311.1716531504.484c320c-1dae-4b02-9366-3aa4e08f7565.d90e4f7c-d5d9-4a27-9593-8547cc3b6799.fd282007-14a2-4773-8c36-73aa35e26f1d.1716533364163.9; JSESSIONID=58232D73A3518F075991256A859D6ACB-n1',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 Edg/125.0.0.0'
    },
  },
}

export default request
