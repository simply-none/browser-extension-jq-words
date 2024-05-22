<template>
  <div id="test-popup">
    <ShowResult :dialogTableVisible="dialogTableVisible" :wordList="wordList" :data="data" :info="info" @closeDialog="dialogTableVisible = false"/>
  </div>
</template>

<script setup lang="ts">
import ShowResult from '@/components/ShowResult.vue'

import { onMounted, onBeforeUnmount, ref, reactive } from 'vue'

defineProps<{ msg: string }>()

let data = ref()
let info = ref({
  title: '',
  style: {}
})

type WordType = 'youdao' | 'bing'


let wordList = reactive({
  youdao: {
    type: 'youdao',
    data: ''
  },
  bing: {
    type: 'bing',
    data: ''
  },
})

let dialogTableVisible = ref(false)

const getData = (e: MouseEvent) => {
  console.log(e, 'event mouseup')
  let selection = window.getSelection()
  let selectedText = (selection?.toString() || '').trim()
  console.log(selectedText, 'selected text')
  let isWord = /^[a-z]+[\-\']?[a-z]*$/i.test(selectedText)
  if (isWord) {
    dialogTableVisible.value = true

    info.value = {
        style: {
          // maxWidth: '500px',
          // position: 'fixed',
          // left: '100px',
          // top: '100px',
          maxHeight: '80%',
          margin: '15% auto 0',
          overflow: 'auto',
          background: 'white',
          boxShadow: 'rgb(129 45 247) 0px 0px 6px',
          zIndex: 10000000,
          border: '2px solid rgb(106 0 255)',
        },
        title: selectedText
      }
    selection!.empty()
    chrome.runtime.sendMessage({ text: e, selectedText })

    window.postMessage({
      text: '测试',
      word: selectedText
    }, "*")


  }
}

const getWordDesc = (ev: { data: ReqData<{text: string; type: WordType}>}) => {
    if (ev.data.type === 'info:word-desc') {
      console.log(ev.data)
      ev.data.data.type && (wordList[ev.data.data.type].data = ev.data.data.text)
      
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