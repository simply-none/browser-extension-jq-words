<template>
  <div id="test-popup">
    <ShowResult :dialogTableVisible="dialogTableVisible" :wordList="wordList" :data="data" :info="info"
      @closeDialog="dialogTableVisible = false" @getWords="getWords" @topHandle="topHandle" />
  </div>
</template>

<script setup lang="ts">
import ShowResult from '@/components/ShowResult.vue'

import { toRaw, onMounted, onBeforeUnmount, ref, reactive } from 'vue'

defineProps<{ msg: string }>()

let data = ref()
let info = ref({
  title: '',
})

type WordType = 'youdao' | 'bing'


let wordList = reactive({
  youdao: {
    type: 'youdao',
    name: '有道词典',
    data: '',
    expand: false,
  },
  bing: {
    type: 'bing',
    name: '必应词典',
    data: '',
    expand: false,
  },
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
        url: 'src/entries/popup/index.html'
      }
    }, "*")
  }
}

const getWords = (word: string) => {
  console.log(word, 'selected text')
  let isWord = /^[a-z]+[\-\']?[a-z]*$/i.test(word)
  if (isWord) {
    dialogTableVisible.value = true

    info.value = {
      title: word
    }

    window.postMessage({
      type: 'req:word-desc',
      data: {
        word: word
      }
    }, "*")

  }
}

let selectionText = ref('')

const getData = (e: MouseEvent) => {
  console.log(e, 'event mouseup')
  let selection = window.getSelection()
  let originText = selection?.toString() || ''

  if (originText && selectionText.value === originText) {
    return false
  }

  selectionText.value = originText || ''

  getWords(originText.trim())
}

const getWordDesc = (ev: { data: ReqData<any> }) => {
  if (!ev.data.type) {
    return false
  }
  let total = Object.keys(wordList).length
  console.log(total, ev, 'total')
  if (ev.data.type === 'info:word-desc') {
    console.log(ev.data)
    total--
    console.log(total, 'total2')
    ev.data.data.type && (wordList[ev.data.data.type as WordType].data = ev.data.data.text)

    if (ev.data.data.status === 'close') {
      window.postMessage({
        type: 'req:storage',
        data: {
          type: 'set',
          word: info.value.title,
          storage: toRaw(wordList)
        }
      }, "*")
    }



  }
  if (ev.data.type === 'info:storage-get') {
    console.log(ev.data, '缓存数据')
  }

}

onBeforeUnmount(() => {
  removeEventListener('mouseup', getData)
  removeEventListener("message", getWordDesc)
})

onMounted(() => {
  addEventListener('mouseup', getData)
  addEventListener("message", getWordDesc)
})



</script>

<style lang="scss" scoped></style>