<template>
  <div id="test-popup">
    <ShowResult :dialogTableVisible="dialogTableVisible" :wordList="selectedWordList" :data="data" :info="info"
      @closeDialog="dialogTableVisible = false" @getWords="debouncedFunction" @topHandle="topHandle" />
  </div>
</template>

<script setup lang="ts">
import ShowResult from '@/components/ShowResult.vue'

import { toRaw, watch, onMounted, onBeforeUnmount, ref, reactive, computed } from 'vue'

import type { Ref } from 'vue'
defineProps<{ msg: string }>()

let data = ref()
let info = ref({
  title: '',
})

interface WordItem {
  type: string,
  data: string,
  name: string,
  expand: boolean
}

let wordList: Record<DictType, WordItem> = reactive({
  collins: {
    type: 'collins',
    name: 'collins词典',
    data: '',
    phonetic: '',
    translate: '',
    expand: false,
  },
  youdao: {
    type: 'youdao',
    name: '有道词典',
    data: '',
    phonetic: '',
    translate: '',
    expand: false,
  },
  bing: {
    type: 'bing',
    name: '必应词典',
    phonetic: '',
    translate: '',
    data: '',
    expand: false,
  },
  jinshan: {
    type: 'jinshan',
    name: '金山词霸',
    data: '',
    phonetic: '',
    translate: '',
    expand: false,
  },
  longman: {
    type: 'longman',
    name: '朗文词典',
    data: '',
    phonetic: '',
    translate: '',
    expand: false,
  },
  cambridge: {
    type: 'cambridge',
    name: '剑桥词典',
    data: '',
    phonetic: '',
    translate: '',
    expand: false,
  },
  webster: {
    type: 'webster',
    name: '韦伯词典',
    data: '',
    phonetic: '',
    translate: '',
    expand: false,
  },
  haici: {
    type: 'haici',
    name: '海词词典',
    data: '',
    phonetic: '',
    translate: '',
    expand: false,
  },
  wordreference: {
    type: 'wordreference',
    name: 'wordreference词典',
    data: '',
    phonetic: '',
    translate: '',
    expand: false,
  },
  vocabulary: {
    type: 'vocabulary',
    name: 'vocabulary词典',
    data: '',
    phonetic: '',
    translate: '',
    expand: false,
  },
  oxford: {
    type: 'oxford',
    name: '牛津词典',
    data: '',
    phonetic: '',
    translate: '',
    expand: false,
  },
})

let selectedWordTypes: Ref<DictType[]> = ref([])

let selectedWordList: Partial<Record<DictType, WordItem>> = reactive({})


watch(() => selectedWordTypes.value, (selected) => {
  let draftWordList: Partial<Record<DictType, WordItem>> = {}
  selected.forEach(sel => {
    draftWordList[sel] = wordList[sel]
  })
  selectedWordList = draftWordList
}, {
  deep: true
})

let dialogTableVisible = ref(false)

const topHandle = (type: string) => {
  if (type === 'storage') {
    window.postMessage({
      type: 'req:storage',
      data: {
        type: 'get'
      }
    }, "*")
  }
  if (type === 'openTab') {
    window.postMessage({
      type: 'req:openTab',
      data: {
        url: 'src/popup/index.html?name=Home'
      }
    }, "*")
  }
}

const getWords = (word: string, cacheOrigin?: CacheOrigin) => {
  console.log(word, 'selected text')
  let isWord = /^[a-z]+[\-\']?[a-z]*$/i.test(word)
  if (word.length > 30) {
    // 查词字数不可超过20
    return false
  }
  if (isWord) {
    dialogTableVisible.value = true

    info.value = {
      title: word
    }

    window.postMessage({
      type: 'req:word-desc',
      data: {
        word: word,
        cacheOrigin
      }
    }, "*")

  }
}

// 防抖函数
const debounce = (func: Function, delay: number) => {
  let timer: string | number | NodeJS.Timeout | undefined = undefined;
  console.log('start')

  return function (this: any, word: string, cacheOrigin?: CacheOrigin) {
    console.log('clear start')
    clearTimeout(timer); // 清除上一次的定时器
    timer = setTimeout(() => {
      console.log('开始执行')
      // 设置新的定时器，延迟执行函数
      func.apply(this, [word, cacheOrigin]);
    }, delay);
  };
}

// 使用防抖函数
const debouncedFunction = debounce(getWords, 1000);


let selectionText = ref('')

const getData = (e: MouseEvent) => {
  console.log(e, 'event mouseup')
  let selection = window.getSelection()
  let originText = selection?.toString() || ''

  if (originText && selectionText.value === originText) {
    return false
  }

  selectionText.value = originText || ''

  debouncedFunction(originText.trim(), {
    date: formatDate(new Date()),
    href: location.href,
    example: (e.target as unknown as HTMLElement).innerText
  })
}

const formatDate = (dat: Date) => {
  //获取年月日，时间
  let year = dat.getFullYear();
  let mon = (dat.getMonth() + 1) < 10 ? "0" + (dat.getMonth() + 1) : dat.getMonth() + 1;
  let data = dat.getDate() < 10 ? "0" + (dat.getDate()) : dat.getDate();
  let hour = dat.getHours() < 10 ? "0" + (dat.getHours()) : dat.getHours();
  let min = dat.getMinutes() < 10 ? "0" + (dat.getMinutes()) : dat.getMinutes();
  let seon = dat.getSeconds() < 10 ? "0" + (dat.getSeconds()) : dat.getSeconds();

  let newDate = year + "-" + mon + "-" + data + " " + hour + ":" + min + ":" + seon;
  return newDate;
}

// 使用&：包含各种属性，或者将各种属性都写在一起，防止报各种错
type ReqDataType = {
  text: string;
  type: DictType;
  status: string;
  storage: string;
}

const getWordDesc = (ev: { data: ReqData<ReqDataType> }) => {
  if (!ev.data.type) {
    return false
  }
  let total = Object.keys(selectedWordList).length
  console.log(total, ev, 'total')
  if (ev.data.type === 'info:word-desc') {
    console.log(ev.data)
    total--
    console.log(total, 'total2')
    if (ev.data.data.type) {
      // TODO：加上！表示对象已定义，不然会报未定义的错误
      // TODO:这里第一次初始化时会报错
      selectedWordList[ev.data.data.type]!.data = ev.data.data.text
    }

    if (ev.data.data.status === 'close') {
      console.log('连接已关闭')
    }
  }
  if (ev.data.type === 'info:storage-get') {
    console.log(ev.data, '缓存数据')
  }

  if (ev.data.type === 'info:get-select-dictTypes') {
    console.log(ev.data, 'info:get-select-dictTypes')
    let storage = ev.data.data.storage
    if (!storage) {
      window.postMessage({
        type: 'req:storage',
        data: {
          type: 'set',
          word: 'setting:selectedWordTypes',
          storage: ['youdao', 'bing', 'longman']
        }
      }, "*")
    } else {
      selectedWordTypes.value = JSON.parse(storage)
    }
  }

}

onBeforeUnmount(() => {
  removeEventListener('mouseup', getData)
  removeEventListener("message", getWordDesc)
})

onMounted(() => {
  window.postMessage({
    type: 'req:storage',
    data: {
      type: 'get-single',
      storageKey: 'setting:selectedWordTypes',
    }
  }, "*")
  addEventListener('mouseup', getData)
  addEventListener("message", getWordDesc)
})



</script>

<style lang="scss" scoped></style>