<template>
  <div id="test-popup">
    <el-button type="primary" @click="dialogTableVisible = true">乘势而上</el-button>
    <h1>{{ msg }}</h1>
    <ShowResult :dialogTableVisible="dialogTableVisible" :data="data" :info="info" @closeDialog="dialogTableVisible = false"/>
  </div>
</template>

<script setup lang="ts">
import ShowResult from '@/components/ShowResult.vue'

import { onMounted, onBeforeUnmount, ref } from 'vue'
// chrome.runtime.getPlatformInfo(function (info) {
//   console.log(info, 'info')
// })

defineProps<{ msg: string }>()

let wordDesc = ref()

let data = ref()
let info = ref({
  title: '',
  style: {}
})

let dialogTableVisible = ref(false)

const getData = (e: MouseEvent) => {
  console.log(e, 'event mouseup')
  let selection = window.getSelection()
  let selectedText = (selection?.toString() || '').trim()
  console.log(selectedText, 'selected text')
  let isWord = /^[a-z]+[\-\']?[a-z]*$/i.test(selectedText)
  if (isWord) {
    info.value = {
        style: {
          maxWidth: '500px',
          position: 'fixed',
          left: '100px',
          top: '100px',
          height: '50%',
          overflow: 'auto',
          background: 'white',
          boxShadow: '0px 0px 6px rgba(0, 0, 0, .12)',
          zIndex: 10000000,
          border: '2px solid #51a4ff',
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

const getResult = (ev: { data: {text: string; result: object}}) => {
    if (ev.data.text === '返回结果') {
      console.log(ev.data)
      wordDesc.value = ev.data.result
      data.value = ev.data.result
      dialogTableVisible.value = true
    }

  }

onBeforeUnmount(() => {
  removeEventListener('mouseup', getData)
  removeEventListener("message", getResult)
})

onMounted(() => {
  addEventListener('mouseup', getData)
  addEventListener("message", getResult)
})



</script>

<style lang="scss" scoped></style>