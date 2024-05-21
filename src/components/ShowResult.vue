<template>
  <el-dialog @close="closeDialog" v-model="visible" :append-to-body="false" :title="info.title" :style="info.style">
    <div v-html="data"></div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
const props = defineProps<{ dialogTableVisible: boolean, data: object, info: { title: string, style: object} }>()

const emit = defineEmits(['closeDialog'])

let visible = computed(() => {
  return props.dialogTableVisible
})

let closeDialog = () => {
  emit('closeDialog')
}
</script>
