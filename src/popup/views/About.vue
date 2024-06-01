<template>
  <div>
    这是about
    <el-button @click="setHeight">设置高度</el-button>
    <div id="jous">
      <iframe ref="iref" :srcdoc="srcdoc" width="100%" :height="height"></iframe>

    </div>
    <OpenNewWindow />
  </div>
</template>

<script lang="ts" setup>
import OpenNewWindow from './about/openNewWindow.vue';
// import htmlstr from './cheerio-test.html?raw'
import { onMounted, ref, nextTick } from 'vue';
import { ElButton } from 'element-plus';

const height = ref('0')
const iheight = ref('auto')
const iref = ref()

onMounted(async () => {
  await nextTick()
    iref.value.onload = (e: Event) => {
      console.log(e)
      if (e.type === 'load') {
        var htmlHeight = iref.value.contentDocument.querySelector('html')
        iheight.value = htmlHeight?.scrollHeight + 'px'

        console.log(iref.value.contentDocument.querySelector('html'), htmlHeight?.scrollHeight, 'iref')


      }
    }
    
})


const setHeight = () => {
  height.value = height.value === 'auto' ? iheight.value : 'auto'
  console.log(height.value)
}

const srcdoc = ref('htmlstr')

</script>

<style lang="scss">
.onetrust-banner-sdk {
  display: none;
}
</style>