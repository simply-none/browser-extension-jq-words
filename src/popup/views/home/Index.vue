<template>
  <div class="jq-app-wordList jq-aw">
    <Header title="单词列表">
      <el-button type="primary" @click="saveFile(storageCache)">备份数据</el-button>
      <el-button type="danger" @click="clearCache">清空缓存</el-button>
    </Header>

    <div class="jq-aw-body" ref="jqAwBody">
      <Search />
      <el-table class="jq-aw-table" :data="table" style="width: 100%" :max-height="tableMaxHeight">
        <el-table-column type="expand" label="">
          <template #default="{ row }">
            <div class="wordlist-item">
              <div class="wordlist-item-title">origin: </div>
              <div class="wordlist-item" v-for="origin in row.origin" :key="origin">
                <div v-if="origin">
                  <div class="wordlist-item-content">
                    href: {{ origin.href }}
                  </div>
                  <div class="wordlist-item-content">
                    date: {{ origin.date }}
                  </div>
                  <div class="wordlist-item-content">
                    example: {{ origin.example }}
                  </div>
                </div>
              </div>
            </div>

            <div class="wordlist-item">
              <div class="wordlist-item-title">phonetic: </div>
              <div class="wordlist-item-content" v-for="phonetic in row.phonetic" :key="phonetic">
                <div v-if="phonetic">
                  {{ phonetic }}</div>
              </div>
            </div>

            <div class="wordlist-item">
              <div class="wordlist-title">trans: </div>
              <div class="wordlist-item-content" v-for="trans in row.trans" :key="trans">
                <div v-if="trans">
                  {{ trans }}</div>
              </div>
            </div>

            <div class="wordlist-item">
              <div class="wordlist-item-title">morph: </div>
              <div class="wordlist-item-content" v-for="morph in row.morph" :key="morph">
                <div v-if="morph">
                  {{ morph }}</div>
              </div>
            </div>

          </template>
        </el-table-column>
        <el-table-column prop="word" label="单词" sortable width="120">
          <template #default="{ row }">
            <div class="wordlist-item-line" :title="row.word">
              {{ row.word }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="wordType" label="类型" sortable width="180">
          <template #default="{ row }">
            <div class="wordlist-item-line" :title="row.wordType">
              {{ row.wordType?.split(':')[0] }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="phonetic" label="音标">
          <template #default="{ row }">
            <div class="wordlist-item-line" :title="row.phonetic">
              {{ row.phonetic }}
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="trans" label="翻译">
          <template #default="{ row }">
            <div class="wordlist-item-line" :title="row.trans">
              {{ row.trans }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="morph" label="形近词">
          <template #default="{ row }">
            <div class="wordlist-item-line" :title="row.morph">
              {{ row.morph }}
            </div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="60">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="deleteItem(scope.row.wordType)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <Page />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, nextTick } from 'vue'
import type { Ref } from 'vue'
import { ElCollapse, ElCollapseItem, ElButton } from 'element-plus';
import Search from '@/components/basic/Search.vue'
import Header from '@/components/basic/Header.vue'
import Page from '@/components/basic/Page.vue'
import { getLocalStorage } from '@/utils/storage';
import { getBeforeDaysToCurDay, getDictTypes, saveJsonFile as saveFile } from '@/utils/common';

let storageCache = ref({})

let tableMaxHeight = ref(550)

let jqAwBody: Ref<HTMLElement | null> = ref(null)

const clearCache = () => {
  chrome.storage.local.clear().then(res => {
    console.log(res, '删除所有后提示的内容')
  })
}

const deleteItem = (key: string) => {
  chrome.storage.local.remove(key).then(res => {
    console.log(res, '删除后提示的内容')
  })
}

let table = ref<(WordCache & { wordType: string })[]>([])

let computedTableMaxHeight = async () => {
  await nextTick()
  console.log(jqAwBody.value, 'jqAwBody')
  tableMaxHeight.value = jqAwBody.value?.clientHeight || 0
  // const tableHeight = document.querySelector(".jq-aw")?.clientHeight
}

onMounted(async () => {
  computedTableMaxHeight()

  // 自动选择七天内查询的单词
  const daysToCurDay = getBeforeDaysToCurDay(7).map(date => `word-date:${date}`)

  let items: { [index: string]: string[] } = await getLocalStorage(daysToCurDay)
  console.log(items, 'items')

  let wordList: string[] = []
  Object.values(items).forEach(item => {
    let newItem = item
    let dictTypes = getDictTypes()
    dictTypes.forEach(type => {
      item.forEach(word => {
        newItem.push(`${type}:${word}`)
      })
    })
    wordList.push(...newItem)
  })
  wordList = Array.from(new Set(wordList))

  let wordDesItems = await getLocalStorage(wordList)


  console.log(daysToCurDay, wordDesItems, 'daysToCurDay', wordList)

  Object.keys(wordDesItems).forEach((key) => {
    delete wordDesItems[key].HTML
    table.value.push({
      wordType: key,
      ...wordDesItems[key]
    })
  })

  storageCache.value = wordDesItems;
  console.log(storageCache, "storageCache Value is set");
})
</script>

<style lang="scss" scoped>
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
