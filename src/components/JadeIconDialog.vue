<template>
  <div class="jade-icon-dialog-container">
    <el-dialog id="jade-icon-dialog" class="jade-icon-dialog" :style='{
      top: selfPosition.top + "px",
      left: selfPosition.left + "px",
    }' v-model="selfVisible" :append-to-body="false" :modal="false" :close-on-click-modal="false" :draggable="true"
      :overflow="true" :show-close="false">
      <!-- <template #header>
        <div class="jade-dialog__header">
          <slot name="header"></slot>
        </div>

      </template> -->
      <slot name="content"></slot>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, onBeforeUnmount, computed, watch, reactive, ComputedRef } from 'vue'
import { computedDialogPosition } from '@/utils/common';
import { ElDialog } from 'element-plus'

const props = defineProps<{
  visible: boolean,
  position: {
    top: number,
    left: number
  }
}>()

let selfVisible = ref(false)

watch(() => props.visible, (val) => {
  selfVisible.value = val
  if (!val) {
    return true
  }
  selfPosition.value = computedDialogPosition(props.position, {
    height: 50,
    width: 50,
    offset: 16
  })
})

let selfPosition = ref({
  top: 0,
  left: 0
})

</script>

<style lang="scss" scoped>
.jade-icon-dialog-container {
  // 穿透弹窗，鼠标可操作弹窗底下的元素（比如点击，选择等）
  pointer-events: none;
  z-index: 222222;
  position: relative;
}

:deep(.jade-icon-dialog) {
  position: fixed;
  margin: 0;
  pointer-events: none;
  padding: 0;
  pointer-events: auto;
  overflow: auto;
  width: 40px;
  height: 40px;
  background: white;
  z-index: 10000000;

  .jade-icon-dialog {
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
  }

  .el-dialog__body {
    overflow: auto;
    width: 100%;
    height: 100%;
    padding: 0;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-dialog__header {
    width: 0;
    height: 0;
    padding: 0;
  }
}
</style>
