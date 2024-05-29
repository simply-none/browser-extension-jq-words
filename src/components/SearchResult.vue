<template>
  <JadeDialog :id="Date.now()" :visible="searchDialogVisible" :position="position">
    <template #header>
      <el-input class="jade-dialog__header-search" size="small" v-model="searchWord">
        <template #append>
          <div @click="getWords"><el-icon>
              <Search />
            </el-icon></div>
        </template>
      </el-input>
      <div class="jade-dialog__header-handle">
        <el-button type="primary" :icon="Star" color="#ffb645" circle @click="showSearchDialog(false)"></el-button>
        <el-button type="primary" :icon="PieChart" color="#45c1ff" circle @click="topHandle('openTab')"></el-button>
        <el-button type="primary" :icon="Position" color="#1fa1b7" circle @click="topHandle('storage')"></el-button>
        <el-button type="primary" :icon="Close" color="#ffffff" circle @click="showSearchDialog(false)"></el-button>
      </div>

    </template>
    <template #content>
      <el-collapse v-model="expandPanel">
        <el-collapse-item v-for="(item, key) in computedWordList" :key="key" :title="item.name" :name="key">
          <template #title>
            <div class="jade-dialog__title">{{ item.name }}</div>
          </template>
          <div v-if="item.data.length > 0" class="jade-dialog__content">
            <div :style="{ height: computedHeight(key) }" class="jade-dialog__content-body">
              <WordFrame :data="item.data" />
            </div>
            <!-- <div :style="{ height: computedHeight(key) }" v-html="item.data" class="jade-dialog__content-body"></div> -->
            <div class="jade-dialog__content-expand" @click="setContentHeight(expandItems[key]!)">
              <template v-if="expandItems[key]!.expand">
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
    </template>

  </JadeDialog>
</template>

<script lang="ts" setup>
import { onMounted, ref, onBeforeUnmount, computed, watch, reactive } from 'vue'
import WordFrame from './WordFrame.ce.vue';
import JadeDialog from '@/components/JadeDialog.vue';
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

import { useContentStore } from '@/stores/content'
import { storeToRefs } from 'pinia';

// 注册自定义元素 --- start


// 注册自定义元素 --- end

const contentStore = useContentStore()
const { searchDialogVisible } = storeToRefs(contentStore)
const { showSearchDialog } = contentStore

const props = defineProps<{
  info: { title: string },
  wordList: Partial<Record<DictType, {
    type: string,
    data: string,
    name: string,
    expand: boolean
  }>>,
  position: {
    top: number,
    left: number
  }
}>()

const computedWordList: Record<DictType, {
  type: string,
  data: string,
  name: string,
  expand: boolean
}> = computed(() => {
  const wl = JSON.parse(JSON.stringify(props.wordList))
  // Object.keys(wl).forEach((key) => {
  //   if(!wl[key].data) {
  //     delete wl[key]
  //   }
  // })
  return wl
}) as unknown as Record<DictType, {
  type: string,
  data: string,
  name: string,
  expand: boolean
}>

let selectedWordList: Record<DictType, {
  type: string,
  data: string,
  name: string,
  expand: boolean
}> = reactive({}) as Record<DictType, {
  type: string,
  data: string,
  name: string,
  expand: boolean
}>

const emit = defineEmits(['getWords', 'topHandle'])


// 此处不能直接computed(props.info.title), 嵌套对象会导致视图不刷新
let searchWord = ref('')
watch(() => props.info.title, (val) => {
  searchWord.value = val

})

// watch(() => props.wordList, (val, old) => {
//   console.log(val, old)
//   selectedWordList = val
//   Object.keys(selectedWordList).forEach((key) => {
//     if(!selectedWordList[key as DictType].data) {
//       delete selectedWordList[key as DictType]
//     }
//   })
// }, {
//   deep: true
// })

const expandPanel = computed({
  get() {
    return Object.keys(props.wordList)
  },
  set() { }
})

const expandItems = computed(() => props.wordList)

let computedHeight = computed(() => (key: DictType) => {
  if (expandItems.value[key]!.expand) return 'auto'
  if (expandItems.value[key]!.data === '') return 'auto'
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

let getWords = () => {
  console.log(searchWord.value, '乘势而上')
  emit('getWords', searchWord.value)
}

onBeforeUnmount(() => {
})

onMounted(() => {
  console.log(window, 'window')
})
</script>

<style lang="scss" scoped>
.jade-dialog {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    &-search {
      flex: 1;
      max-width: 300px;
      height: 20px;

      :deep(.el-input__wrapper) {
        padding: 0;
        border-radius: 0;
        box-shadow: none;
        background: rgb(247 247 247);

        .el-input__inner {
          border: 0;
          border-radius: 0;
          padding-left: 6px;
          color: #000000;
        }
      }

      :deep(.el-input-group__append) {
        padding: 0 6px;
        border-radius: 0;
        pointer-events: all;
        cursor: pointer;
        box-shadow: unset;
        background: rgb(229 229 229);
        color: #000000;

        &:hover {
          background-color: #cacaca;
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
      scrollbar-width: none;

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
}

:deep(.el-collapse-item__header) {
  height: 24px;
  line-height: 24px;
}
</style>
