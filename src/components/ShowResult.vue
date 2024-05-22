<template>
  <el-dialog @close="closeDialog" v-model="visible" :append-to-body="false" :title="info.title" :style="info.style">
    <div v-for="(item, key) in wordList" :key="key">
      <h2>{{ key }}</h2>
      <div v-html="item.data"></div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue'
const props = defineProps<{
  dialogTableVisible: boolean,
  data: object,
  info: { title: string, style: object },
  wordList: {
    [key: string]: {
      type: string,
      data: string
    }
  }
}>()

const emit = defineEmits(['closeDialog'])

let visible = computed(() => {
  return props.dialogTableVisible
})

watch(() => props.wordList, (val, old) => {
  console.log(val, old)
}, {
  deep: true
})

console.log(props.wordList, 'list show')

let closeDialog = () => {
  emit('closeDialog')
}
</script>
