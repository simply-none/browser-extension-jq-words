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
import cheerio from 'cheerio'
import { onMounted, ref } from 'vue'
chrome.runtime.getPlatformInfo(function (info) {
  console.log(info, 'info')
})

defineProps<{ msg: string }>()

let wordDesc = ref()
let wordDesc2 = ref()

const getData = (e: Event) => {
  console.log(e, 'event mouseup')
  let selection = window.getSelection()
  let selectedText = selection?.toString()
  console.log(selectedText, 'selected text')
  if (selectedText) {
    
    chrome.runtime.sendMessage({text: e, selectedText})

    fetch('https://www.bing.com/dict/search?q=a').then(async res => {
      selection!.empty()
      const resText = await res.text()
      const $ = cheerio.load(resText)
      const parsedWordDesc = $('body > div.contentPadding > div > div > div.lf_area > div.qdef').html()
      console.log(parsedWordDesc, 1)

      const style = $('style').map(function() {
        // this === el
        return $(this).html();
      })
      insertStyle(style)
      console.log(style, 'style')

      wordDesc.value = parsedWordDesc
      console.log(resText, 'res')
    })
  }
}

function insertStyle (style: any) {
  let doc = document.body
  Object.values(style).forEach((item: any) => {
    const style = document.createElement('style')
    style.innerHTML = item
    doc.appendChild(style)
  })

}

onMounted(() => {
  addEventListener('mouseup', getData)
})

</script>

<style lang="scss" scoped>

</style>