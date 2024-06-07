<template>
  <div class="jade-dialog-container">
    <el-dialog :id="`jade-dialog-${id}`" class="jade-dialog" ref="jadeDialogRef" v-model="selfVisible"
      :append-to-body="false" :modal="false" :close-on-click-modal="false" :draggable="true" :overflow="true"
      :show-close="false" :style="{
        top: selfPosition.top + 'px',
        left: selfPosition.left + 'px',
      }">
      <template #header>
        <div class="jade-dialog__header">
          <slot name="header"></slot>
        </div>

      </template>
      <slot name="content"></slot>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, onBeforeUnmount, computed, watch, reactive, nextTick } from 'vue'
import { computedDialogPosition } from '@/utils/common';
import { ElDialog } from 'element-plus'

const props = defineProps<{
  id: number,
  visible: boolean,
  position: {
    top: number,
    left: number
  }
}>()

let jadeDialogRef = ref(null)

let selfVisible = ref(false)

let selfPosition = ref({
  top: 0,
  left: 0
})

watch(() => props.visible, async (val) => {
  selfVisible.value = val
  if (val) {
    const dialog = await getDialogEle()
    selfPosition.value = computedDialogPosition(props.position, getDialogOptions(dialog))
  }
})

let getDialogEle = async () => {
  // 等待组件渲染完成，才能获取到dom
  await nextTick()
  const dialog = document.querySelector('#jade-dialog-' + props.id) as HTMLElement
  const dialog2 = document.querySelector('div') as HTMLElement
  return dialog
}

const getDialogOptions = (dialog: HTMLElement) => {
  return {
    height: dialog.clientHeight || 0,
    width: dialog.clientWidth || 0,
    offset: 16
  }
}

</script>

<style lang="scss" scoped>
.jade-dialog-container {
  // 穿透弹窗，鼠标可操作弹窗底下的元素（比如点击，选择等）
  pointer-events: none;
}

:deep(.el-overlay-dialog) {
  overflow: hidden;
}

:deep(.jade-dialog) {
  pointer-events: none;
  padding: 0;
  margin: 0;
  pointer-events: auto;
  width: 315px;
  height: 80%;
  max-height: 500px;
  overflow: auto;
  background: white;
  box-shadow: rgb(229 229 229) 0px 0px 6px;
  z-index: 10000000;
  border: 2px solid rgb(224 224 224);
  overflow: hidden;
  // &::-webkit-scrollbar {
  //   display: none;
  // }

  .jade-dialog {
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
  }

  .el-dialog__body {
    overflow: auto;
    height: calc(100% - 24px);
    padding: 0;
  }

  .el-dialog__header {
    padding: 2px 6px 2px 0;
    width: 100%;
    box-sizing: border-box;
    background: #939393;
    height: 24px;
    margin: 0;
  }
}
</style>
