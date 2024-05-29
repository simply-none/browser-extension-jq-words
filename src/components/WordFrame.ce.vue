<template>
  <iframe  ref="iref" :srcdoc="data" width="100%" :height="height"></iframe>
</template>

<script lang="ts" setup>
import { onMounted, ref, nextTick } from 'vue';

const height = ref('0')
const iheight = ref('auto')
const iref = ref()

defineProps(['data'])

onMounted(async () => {
  await nextTick()
    iref.value.onload = (e: Event) => {
      console.log(e)
      if (e.type === 'load') {
        var htmlHeight = iref.value.contentDocument.querySelector('html')
        height.value = (htmlHeight?.scrollHeight || 0) + 'px'

      }
    }
    
})


const setHeight = () => {
  height.value = iheight.value
  console.log(height.value)
}

</script>

<style lang="scss">
.onetrust-banner-sdk {
  display: none;
}
iframe {
  border: 0;
}
</style>