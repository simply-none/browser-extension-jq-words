<template>
  <div class="jq-app-wordList jq-aw">
    <Header title="单词列表">
      <el-button type="primary" @click="delHtml">删除单词的html</el-button>
      <el-button type="primary" @click="saveFile(storageCache)">备份数据</el-button>
      <el-button type="danger" @click="clearCache">清空缓存</el-button>
    </Header>

    <div class="jq-aw-body" ref="jqAwBody">
      <Search :form-options="[['date', 'daterange', '日期'], ['origin', 'select', '词源']]" :options="searchOptions" @getFormData="getFormData" />
      <el-table class="jq-aw-table" :data="table" style="width: 100%" :max-height="tableMaxHeight">
        <el-table-column type="expand" label="">
          <template #default="{ row }">
            <WordItem :word="row"></WordItem>

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
import { h, onMounted, ref, nextTick, toRaw, toValue } from 'vue'
import type { Ref } from 'vue'
import { ElCollapse, ElCollapseItem, ElButton, ElTable, ElTableColumn, ElMessageBox } from 'element-plus';
import 'element-plus/es/components/message-box/style/css'
import Search from '@/components/basic/Search.vue'
import Header from '@/components/basic/Header.vue'
import Page from '@/components/basic/Page.vue'
import WordItem from '@/components/basic/WordItem.vue'
import { getLocalStorage } from '@/utils/storage';
import { getBeforeDaysToCurDay, getDaysBetweenTwoDate, getDictTypes, saveJsonFile as saveFile, tipBeforeImportantHandle } from '@/utils/common';

let storageCache = ref({})

let tableMaxHeight = ref(550)

let jqAwBody: Ref<HTMLElement | null> = ref(null)

let searchOptions = {
  origin: getDictTypes()
}

const delHtml = async () => {
  const items = await getLocalStorage()
  Object.entries(items).forEach(([key, value]) => {
    delete value.HTML
    items[key] = value
    console.log(value, items[key], 'value')
  })
  console.log(items, 'items')
  chrome.storage.local.set(items)
}

const clearCache = () => {
  tipBeforeImportantHandle({
    initTime: 180,
    onSuccess: function () {
      console.log('进入到确认成功的删除环节函数 ')
      // chrome.storage.local.clear().then(res => {
      //   console.log(res, '删除所有后提示的内容')
      // })
    },
    Msg: h('p', null, [
      h('span', null, '你将'),
      h('b', { style: 'color: #f56c6c;' }, '【删除】'),
      h('span', { style: '' }, '所有的个人数据缓存，是否继续？'),
    ])
  })
}

const deleteItem = (key: string) => {
  const [type, word] = key.split(':')
  tipBeforeImportantHandle({
    initTime: 3,
    onSuccess: function () {
      console.log('进入到确认成功的删除环节函数 ')
      chrome.storage.local.remove(key).then(res => {
        console.log(res, '删除后提示的内容')
      })
    },
    Msg: h('p', null, [
      h('span', null, '你将'),
      h('b', { style: 'color: #f56c6c;' }, '【删除】'),
      h('span', { style: '' }, `词源${type}中的单词${word}数据缓存，是否继续？`),
    ])
  })
}

let table = ref<(WordCache & { wordType: string })[]>([])

let computedTableMaxHeight = async () => {
  await nextTick()
  console.log(jqAwBody.value, 'jqAwBody')
  tableMaxHeight.value = jqAwBody.value?.clientHeight || 0
  // const tableHeight = document.querySelector(".jq-aw")?.clientHeight
}

const searchWords = async (date: Date = new Date(), gap: number = 7, selectDictType: DictType[] = getDictTypes()) => {
  // 自动选择七天内查询的单词
  const daysToCurDay = getBeforeDaysToCurDay(date, gap).map(date => `word-date:${date}`)

  let items: { [index: string]: string[] } = await getLocalStorage(daysToCurDay)
  console.log(items, 'items')

  let wordList: string[] = []
  Object.values(items).forEach(item => {
    let newItem = item
    let dictTypes = selectDictType
    console.log(newItem, dictTypes, 'newItem')

    const itemMap = newItem.map(i => {
      let ni: string[] = []
      dictTypes.forEach(type => {
        ni.push(`${type}:${i}`)
      })
      return ni
    })

    newItem = itemMap.flat(1)

    wordList.push(...newItem)
  })
  wordList = Array.from(new Set(wordList))

  let wordDesItems = await getLocalStorage(wordList)


  console.log(daysToCurDay, wordDesItems, 'daysToCurDay', wordList)
  table.value = []

  Object.keys(wordDesItems).forEach((key) => {
    table.value.push({
      wordType: key,
      ...wordDesItems[key]
    })
  })

  storageCache.value = wordDesItems;
  console.log(storageCache, "storageCache Value is set");
}

const getFormData = (formData: AnyTypeObj) => {
  const parsedFormData = toRaw(toValue(formData))
  console.log('searchWords!')
  console.log(parsedFormData, formData.date, formData.word, 'formdata')

  let selDate = !parsedFormData.date || (parsedFormData.date.length === 0) ? [new Date(), new Date()] : parsedFormData.date

  let curDate = new Date()
  let gap = 7
  gap = getDaysBetweenTwoDate(selDate[0], selDate[1])

  curDate = (selDate[0] > selDate[1]) ? new Date(selDate[0]) : new Date(selDate[1])
  console.log(curDate, 'curdate')
  searchWords(curDate, gap, parsedFormData.origin)

}

onMounted(async () => {
  computedTableMaxHeight()
  searchWords()

})
</script>

<style lang="scss" scoped>
:global(.jq-aw--del-all-cache) {
  background: #f56c6c;
  border: #f56c6c;
}

:global(.jq-aw--del-all-cache:hover) {
  background-color: #f89898;
  border-color: #f89898;
  outline: none;
}

:global(.jq-aw--del-all-cache-disabled) {
  background-color: #f89898;
  border-color: #f89898;
  outline: none;
  cursor: not-allowed;
}

:global(.jq-aw--del-all-cache-disabled:hover) {
  background-color: #f89898;
  border-color: #f89898;
  outline: none;
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
</style>
