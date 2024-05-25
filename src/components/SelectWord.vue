<template>
  <el-dialog id="jade-dialog__inner" class="jade-dialog__inner" v-model="visible" modal-class="jade-dialog"
    :append-to-body="false" :modal="false" :close-on-click-modal="false" :draggable="true" :overflow="true"
    :show-close="false">
    <template #header>
      <div>选词</div>

    </template>
  </el-dialog>
</template>

<script lang='ts' setup>
import { ref } from 'vue'
import { ElDialog } from 'element-plus';

const visible = ref(false)
</script>

<style lang="scss">
#jade-custom {
  .jade-dialog {
    pointer-events: none;

    &__header {
      display: inline-flex;
      justify-content: space-between;
      width: 100%;

      &-search {
        flex: 1;
        max-width: 300px;
      }

      &-handle {
        display: inline-flex;
        flex-wrap: nowrap;
        width: 160px;
        justify-content: flex-end;

        &::-webkit-scrollbar {
          display: none;
        }


      }

      .el-button+.el-button {
        margin-left: 3px;
      }

      .el-input__wrapper {
        padding: 0;
        border-radius: 0;
        .el-input__inner {
          border: 0;
          border-radius: 0;
        }
      }

      .el-input-group__append {
        padding: 0 12px;
        border-radius: 0;
        pointer-events: all;
        cursor: pointer;
      }
      .el-input-group__append {
        box-shadow: unset;
        background: #999999;
        color: #000000;
      }
    }

    &__inner {
      padding: 0;
      pointer-events: auto;
      width: 315px;
      height: 80%;
      max-height: 500px;
      margin: 15% auto 0;
      overflow: auto;
      background: white;
      box-shadow: rgb(129 45 247) 0px 0px 6px;
      z-index: 10000000;
      border: 2px solid rgb(106 0 255);
    }

    &__title {
      margin: 3px 16px;
      font-size: 1.2em;
      color: #5e00e1;
      font-weight: 900;
    }

    &__content {
      padding: 3px 16px;
      transition: all 0.5s;

      &-body {
        overflow: auto;
        &::-webkit-scrollbar {
          display: none;
        }
      }

      &-expand {
        background-color: #f5f5f5;
        padding: 3px;
        text-align: center;
        margin: 0 auto;
        cursor: pointer;
      }
    }

    .el-dialog__body {
      overflow: auto;
      height: calc(100% - 48px);
    }

    .el-dialog__header {
      padding: 6px 6px 6px 0;
      background: #5e00e1;
      width: 100%;
      box-sizing: border-box;
    }
    .el-collapse-item__header {
      height: 36px;
      line-height: 36px;
    }
  }
}
</style>
