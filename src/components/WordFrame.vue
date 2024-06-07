<template>
  <shadow-root>
    <div ref="iref" v-html="data" style="width: 100%; height: fit-content;"></div>
  </shadow-root>
</template>

<script lang="ts" setup>
import { onMounted, ref, nextTick } from 'vue';
import shadow from 'vue-shadow-dom'

const height = ref('0')
const iheight = ref('auto')
const iref = ref()

defineProps(['data'])

onMounted(async () => {
})


const setHeight = () => {
  height.value = iheight.value
  console.log(height.value)
}

</script>

<style lang="scss">

</style>