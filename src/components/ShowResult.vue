<template>
  <el-dialog id="jade-dialog__inner" class="jade-dialog__inner" v-model="visible" modal-class="jade-dialog"
    :append-to-body="false" :modal="false" :close-on-click-modal="false" :draggable="true" :overflow="true"
    :show-close="false">
    <template #header>
      <div class="jade-dialog__header">
        <el-input class="jade-dialog__header-search" size="small" v-model="searchWord">
          <template #append>
            <div @click="getWords"><el-icon>
                <Search />
              </el-icon></div>
          </template>
        </el-input>
        <div class="jade-dialog__header-handle">
          <el-button type="primary" :icon="Star" color="#ffb645" circle @click="closeDialog"></el-button>
          <el-button type="primary" :icon="PieChart" color="#45c1ff" circle @click="topHandle('openTab')"></el-button>
          <el-button type="primary" :icon="Position" color="#1fa1b7" circle @click="topHandle('storage')"></el-button>
          <el-button type="primary" :icon="Close" color="#ffffff" circle @click="closeDialog"></el-button>
        </div>
      </div>

    </template>
    <el-collapse v-model="expandPanel">
      <el-collapse-item v-for="(item, key) in wordList" :key="key" :title="item.name" :name="key">
        <template #title>
          <div class="jade-dialog__title">{{ item.name }}</div>
        </template>
        <div v-if="item.data.length > 0" class="jade-dialog__content">
          <div :style="{ height: computedHeight(key) }" v-html="item.data" class="jade-dialog__content-body"></div>
          <div class="jade-dialog__content-expand" @click="setContentHeight(expandItems[key])">
            <template v-if="expandItems[key].expand">
              <el-icon>
                <ArrowUp />
              </el-icon>
              <span>折叠</span>
            </template>
            <template v-else>
              <el-icon>
                <ArrowDown />
              </el-icon>
              <span>展开</span>
            </template>
          </div>
        </div>
        <div v-else class="jade-dialog__content jade-dialog__content--null">
          <span>数据正在加载中，请稍后......</span>
        </div>
      </el-collapse-item>
    </el-collapse>
  </el-dialog>
</template>

<script lang="ts" setup>
import { onMounted, ref, onBeforeUnmount, computed, watch } from 'vue'
import {
  Star,
  PieChart,
  Position,
  Close,
  ArrowDown,
  ArrowUp,
  Search,
} from '@element-plus/icons-vue'
import {
  ElDialog,
  ElInput,
  ElButton,
  ElCollapse,
  ElCollapseItem,
  ElIcon,
} from 'element-plus'

const props = defineProps<{
  dialogTableVisible: boolean,
  data: object,
  info: { title: string },
  wordList: {
    [key: string]: {
      type: string,
      data: string,
      name: string,
      expand: boolean
    }
  }
}>()

const emit = defineEmits(['closeDialog', 'getWords', 'topHandle'])

let visible = computed(() => {
  return props.dialogTableVisible
})

// 此处不能直接computed(props.info.title), 嵌套对象会导致视图不刷新
let searchWord = ref('')
watch(() => props.info.title, (val) => {
  searchWord.value = val

})

watch(() => props.wordList, (val, old) => {
  console.log(val, old)
}, {
  deep: true
})

const expandPanel = computed({
  get() {
    return Object.keys(props.wordList)
  },
  set() { }
})

const expandItems = computed(() => props.wordList)

let computedHeight = computed(() => (key: string | number) => {
  if (expandItems.value[key].expand) return 'auto'
  if (expandItems.value[key].data === '') return 'auto'
  return '256px'
})

const topHandle = (type: string) => {
  emit('topHandle', type)
}

console.log(props.wordList, 'list show')

const contentHeight = ref('256px')

const setContentHeight = (wordItem: { expand: boolean }) => {
  wordItem.expand = !(wordItem.expand)
  contentHeight.value = wordItem.expand ? 'auto' : '256px'
}

let closeDialog = () => {
  emit('closeDialog')
}

let getWords = () => {
  console.log(searchWord.value, '乘势而上')
  emit('getWords', searchWord.value)
}

onBeforeUnmount(() => {
})

onMounted(() => {
})
</script>

<style lang="scss">
#jade-custom {
  .jade-dialog {
    pointer-events: none;

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      &-search {
        flex: 1;
        max-width: 300px;
        height: 20px;

        .el-input__wrapper {
          padding: 0;
          border-radius: 0;
          box-shadow: none;
          background: #904eef;

          .el-input__inner {
            border: 0;
            border-radius: 0;
            padding-left: 6px;
            color: #ffffff;
          }
        }

        .el-input-group__append {
          padding: 0 6px;
          border-radius: 0;
          pointer-events: all;
          cursor: pointer;
          box-shadow: unset;
          background: #5e00e1;
          color: #ffffff;

          &:hover {
            background-color: #844ad5;
          }
        }


      }

      &-handle {
        display: flex;
        flex-wrap: nowrap;
        width: 160px;
        justify-content: flex-end;

        &::-webkit-scrollbar {
          display: none;
        }

        .el-button {
          width: 20px;
          height: 20px;
        }

        .el-button+.el-button {
          margin-left: 3px;
        }


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
      margin: 3px 6px;
      font-size: 1em;
      color: #5e00e1;
      font-weight: 900;
    }

    &__content {
      padding: 3px 6px;
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
      height: calc(100% - 24px);
    }

    .el-dialog__header {
      padding: 1px 6px 3px 0;
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
