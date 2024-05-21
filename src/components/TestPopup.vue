<template>
  <div id="test-popup">
    <h1>{{ msg }}</h1>
    <div id="bing-dict">
      <div v-html="wordDesc"></div>
    </div>
    <div v-html="wordDesc2"></div>
  </div>
</template>

<script setup lang="ts">

import { onMounted, ref } from 'vue'
// chrome.runtime.getPlatformInfo(function (info) {
//   console.log(info, 'info')
// })

defineProps<{ msg: string }>()

let wordDesc = ref()
let wordDesc2 = ref()

const getData = (e: Event) => {
  console.log(e, 'event mouseup')
  let selection = window.getSelection()
  let selectedText = selection?.toString()
  console.log(selectedText, 'selected text')
  if (selectedText) {
    selection!.empty()
    chrome.runtime.sendMessage({text: e, selectedText})

    window.postMessage({
      text: '测试'
    },"*")

    
  }
}



onMounted(() => {
  addEventListener('mouseup', getData)
})

</script>

<style lang="scss" scoped>

</style>