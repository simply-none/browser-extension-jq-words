<template>
  <el-dialog class="jade-dialog__inner" @close="closeDialog" v-model="visible" modal-class="jade-dialog" :append-to-body="false" :title="info.title" :style="info.style">
    <div v-for="(item, key) in wordList" :key="key">
      <h2 class="jade-dialog__title">{{ key }}</h2>
      <div v-if="item.data.length > 0" class="jade-dialog__content" v-html="item.data"></div>
      <div v-else class="jade-dialog__content jade-dialog__content--null">
        <span>数据正在加载中，请稍后......</span>
      </div>
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

<style lang="scss">

.jade-dialog {
  &__inner {
    padding: 0;
  }
  &__title {
    padding: 3px 16px;
    font-size: 1.2em;
    color: white;
    background: #812df7;
  }
  &__content {
    padding: 3px 16px;
    transition: all 0.5s;
  }

  .el-dialog__body {
    overflow: auto;
  }
}


</style>
