export const parsedSoundType: Record<DictType, Function> = {
  collins($: any, sel: string) {
    const audioList: string[] = []
    $(sel).each(function(this: any) {
      const src = $(this).data('src-mp3')
      audioList.push(src)
    })
    return audioList
  },
  youdao($: any, sel: string, word: string) {
    let audioList: string[] = []
    const src = `http://dict.youdao.com/dictvoice?audio=${word}&type=`
    $(sel).each(function(this: any) {
      audioList.push('')
    })
    audioList = audioList.map((_item, index) => src + index)
    return audioList
  },
  bing($: any, sel: string) {
    const audioList: string[] = []
    $(sel).each(function(this: any) {
      const src = $(this).data('mp3link')
      audioList.push(src)
    })
    return audioList
  },
  jinshan($: any, sel: string) {
    const audioList: string[] = []
    $(sel).each(function(this: any) {
      let jsonstr: string = $(this).text()
      let json: any = JSON.parse(jsonstr)
      const mp3 = json.props.pageProps.initialReduxState.word.wordInfo.baesInfo.symbols[0]?.ph_en_mp3 || ''
      const mp32 = json.props.pageProps.initialReduxState.word.wordInfo.baesInfo.symbols[0]?.ph_am_mp3 || ''
      audioList.push(mp3)
      audioList.push(mp32)
    })
    return audioList
  },
  longman($: any, sel: string) {
    const audioList: string[] = []
    $(sel).each(function(this: any) {
      const src = $(this).data('src-mp3')
      audioList.push(src)
    })
    return audioList
  },
  cambridge($: any, sel: string) {
    const audioList: string[] = []
    const prefix = 'https://dictionary.cambridge.org'
    console.log($(sel).length, '长度')
    $(sel).each(function(this: any) {
      const src = $(this).attr('src')
      console.log($(this).html(), 'parent父组件的html')
      audioList.push(prefix + src)
    })
    return audioList
  },
  oxford($: any, sel: string) {
    const audioList: string[] = []
    $(sel).each(function(this: any) {
      const src = $(this).data('src-mp3')
      audioList.push(src)
    })
    return audioList
  },
  webster($: any, sel: string) {
    const audioList: string[] = []
    $(sel).each(function(this: any) {
      const src = $(this).data('url')
      audioList.push(src)
    })
    return audioList
  },
  wordreference($: any, sel: string) {
    const audioList: string[] = []
    $(sel).each(function(this: any) {
      let src: string = $(this).text()
      let srcarr: string[] = src.split('\'')
      srcarr = srcarr.filter((item) => item.includes('.mp3'))
      srcarr = srcarr.map((item) => 'https://www.wordreference.com' + item)
      audioList.push(...srcarr)
    })
    return audioList
  },
  vocabulary($: any, sel: string) {
    const audioList: string[] = []
    $(sel).each(function(this: any) {
      if (sel.includes('data-audio')) {
        const src = $(this).data('audio')
        audioList.push('https://audio.vocab.com/1.0/us/' + src)
      } else {
        const src = $(this).attr('src')
        audioList.push(src)
      }
    })
    return audioList
  },
  haici($: any, sel: string) {
    const audioList: string[] = []
    $(sel).each(function(this: any) {
      const src = $(this).attr('naudio')
      audioList.push('https://audio.dict.cn/' + src)
    })
    return audioList
  },
}