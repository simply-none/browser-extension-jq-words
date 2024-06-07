<template>
  <div class="jq-app-wordList jq-aw">
    <Header title="历史记录">
    </Header>

    <div class="jq-aw-body" ref="jqAwBody">
      <div v-for="hIndex in historyIndexCache" :key="hIndex">
        hIndex: {{ hIndex }}
      </div>
      <hr />
      <div class="jq-browser-history">
        <div v-for="(hcItem, value, key) in historyCache" :key="key">
          <h2>{{ formatHistoryDate(value + '') }}</h2>
          <template v-if="hcItem && hcItem.length > 0">
            <div v-for="hc in hcItem" :key="hc && hc.id">
              <div class="jq-aw-item__inner" @click="openNewTab(hc.url)">
                <div class="jq-aw-item__inner--left">

                  <el-checkbox v-model="hc.checked" @click.stop="checkedHistory"></el-checkbox>
                  <el-image :src="parseIconUrl(hc.origin, hc.iconUrl)">
                    <template #error>
                      <div class="image-slot">
                        <el-icon><icon-picture /></el-icon>
                      </div>
                    </template>
                  </el-image>
                  <div class="jq-aw-item__item">{{ hc.title }}</div>

                  <div class="jq-aw-item__item">{{ hc.origin }}</div>
                </div>
                <div class="jq-aw-item__inner--right">
                  <div>{{ hc.time }}</div>
                  <div @click.stop="deletedHistory">
                    <el-icon>
                      <Close />
                    </el-icon>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, nextTick, computed, toRaw, toValue } from 'vue'
import { Picture as IconPicture, Close } from '@element-plus/icons-vue'
import type { Ref } from 'vue'
import { ElCheckbox, ElIcon, ElImage } from 'element-plus';
import Header from '@/components/basic/Header.vue'
import MockData from './data.ts'
import { getLocalStorage } from '@/utils/storage.ts';
const historyIndexCache: Ref<string[]> = ref([])
const historyCache: Ref<{ [index: string]: any }> = ref([])

historyCache.value = MockData

let type: StorageType = 'history'

let parseIconUrl = computed(() => (origin: string, iconUrl: string) => {
  if (iconUrl.startsWith('http')) {
    return iconUrl
  } else {
    return origin + iconUrl
  }
})

let checkedHistory = () => {
  console.log('checkedHistory')
}

let deletedHistory = () => {
  console.log('deletedHistory')
}

const getLocalCache = async <T>(key: string | string[]): Promise<T | null> => {
  let cache = null
  let items = await getLocalStorage(key)
  if (typeof key === 'string') {
    cache = items[key] as T
  }
  cache = items as T
  return cache
}

const formatHistoryDate = (index: string) => {
  const date = new Date(index)
  const dayList = ['日', '一', '二', '三', '四', '五', '六']
  const day = dayList[date.getDay()]
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 星期${day}`
}

const openNewTab = (url: string) => {
  window.open(url, '_blank')
}

onMounted(async () => {
  let items: AnyTypeObj = await getLocalCache<string[]>(type + ':index') || {}
  historyIndexCache.value = items[type + ':index']
  console.log(historyIndexCache.value, 'historyIndexCache', toRaw(historyIndexCache.value), toValue(historyIndexCache.value))

  const parsedHistoryIndexCache = historyIndexCache.value.map(index => type + ':' + index)

  historyCache.value = await getLocalCache<string[]>(parsedHistoryIndexCache) || []
  console.log(historyCache.value, 'historyCache')
})
</script>

<style lang="scss" scoped>
.jq-browser-history {
  height: calc(100% - 30px);
  overflow: auto;
}

.jq-aw-item__inner {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: 2em;
  border: 1px solid #e7e7e7;
  margin: 0.5em 0;
  padding: 0 1em;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, .12);

  &:hover {
    background: #5dc2ff;
    color: white;
    box-shadow: 0px 0px 6px rgb(93 194 255);
    cursor: pointer;
  }

  &--left {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    height: 2em;
    width: 80%;
    gap: 1em;

  }

  &--right {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-items: center;
    height: 2em;
    width: 20%;
    gap: 2em;

  }
}

.jq-aw-item__item {
  width: 40%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.el-image {
  display: inline-block;
  overflow: hidden;
  position: relative;
  height: 50%;
}

:deep(.el-table) {
  .el-table__row td.el-table__cell {
    div {
      box-sizing: border-box;
      height: 2em;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}

.jq-aw {
  height: 100%;

  &-body {
    padding: 0 18px 12px;
    height: calc(100% - 70px);
    box-sizing: border-box;
  }

  &-table {
    height: calc(100% - 88px);
  }
}

.wordlist-item {
  padding: 3px;
  border: 1px solid grey;

  &-title {
    font-weight: 600;
    padding: 3px;
    font-size: 1.2em;
  }

  &-content {
    padding: 3px;
  }
}
</style>
