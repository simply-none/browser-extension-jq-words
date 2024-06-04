<template>
  <div class="jq-learn">
    <div class="jq-learn-header">
      <div class="jq-learn-header-handle">
        <div class="jq-learn-header-handle-item">
          <div>选择月份：</div>
          <el-date-picker v-model="selectMonth" type="month" value-format="YYYY-MM" placeholder="Pick a month" />
        </div>
        <!-- 右侧操作栏 -->
      </div>
      <div class="jq-learn-date">
        <div class="jq-learn-date-label">
          日期：
        </div>
        <div class="jq-learn-date-wrapper" @wheel="e => { xScroll(e, scrollDateEle) }" ref="scrollDateEle">
          <div :class="['jq-learn-date-item', dateItem === selectDate ? 'jq-learn-date-item-select' : '']"
            v-for="dateItem in dateList" :key="dateItem" @click="toggleDate(dateItem)">
            <span class="jq-learn-date-item-inner">{{ dateItem }}</span>
          </div>
        </div>
      </div>

    </div>

    <div class="jq-learn-body">
      <div class="jq-learn-wordList">
        <el-menu default-active="2" class="jq-learn-menu">
          <el-menu-item v-for="wordItem in wordList" :key="wordItem" :index="wordItem" @click="toggleWord(wordItem)">
            <div :class="['jq-learn-wordList-item', wordItem === selectWord ? 'jq-learn-wordList-item-select' : '']">{{
              wordItem }}</div>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="jq-learn-word">
        <div class="jq-learn-wordType">
          <div class="jq-learn-wordType-label">
            词源：
          </div>
          <div class="jq-learn-wordType-wrapper" @wheel="e => { xScroll(e, scrollTypeEle) }" ref="scrollTypeEle">
            <div
              :class="['jq-learn-wordType-item', originItem === selectWordType ? 'jq-learn-wordType-item-select' : '', originItem === autoSelectWordType ? 'jq-learn-wordType-item-autoSelect' : '', originWordType.includes(originItem) ? '' : 'jq-learn-wordType-item-inactive']"
              v-for="originItem in fullyOriginWordType" :key="originItem" :index="originItem"
              @click="toggleOrigin(originItem)">
              <span>{{ originItem?.split(':')[0] }}</span>
            </div>
          </div>

        </div>
        <word-item class="jq-learn-word-item" :word="currentWord" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import type { Ref } from 'vue'
import { ElIcon } from 'element-plus';
import { Menu } from '@element-plus/icons-vue';
import { formatDate, getBeforeDaysToCurDay, getDatesByMonth, getDictTypes } from '@/utils/common';
import { getLocalStorage } from '@/utils/storage';
import WordItem from '@/components/basic/WordItem.vue';

interface WordOriginItem {
  href: string;
  date: string;
  example: string;
}

interface WordProps {
  origin: WordOriginItem[] | null;
  phonetic: string[] | null;
  sound: string[] | null;
  trans: string[] | null;
  morph: string[] | null;
  word: string;
  wordType: string;
}

const initDate = formatDate(new Date(), 'date')
const [year, month] = initDate.split('-')
const selectMonth = ref(year + '-' + month)
const selectDate = ref('')
const selectWord = ref('')
const selectWordType = ref('')
const autoSelectWordType = ref('')

let scrollDateEle: Ref<Element | null> = ref(null)
let scrollTypeEle: Ref<Element | null> = ref(null)

let dateList: Ref<string[]> = ref([])
let wordList: Ref<string[]> = ref([])
let originWordList: Ref<AnyTypeObj[]> = ref([])
let originWordType: Ref<string[]> = ref([])
let fullyOriginWordType: Ref<string[]> = ref([])
let currentWord: Ref<WordProps> = ref({}) as Ref<WordProps>

watch(selectMonth, (v) => {
  console.log(v, 'new')
  toggleMonth()
})

const xScroll = (e: WheelEvent, scrollRef: Element | null) => {
  if (scrollRef) {
    scrollRef.scrollLeft += e.deltaY
  }
}

const getSearchWordDate = async () => {
  console.log(selectMonth, 'selectMonth')
  const [year, month] = selectMonth.value.split('-')
  let daysToCurDay = getDatesByMonth(Number(year), Number(month))

  // 获取当前月份有词组的天数
  let items = await getLocalStorage(`word-date:index`)
  let days = items[`word-date:index`]
  daysToCurDay = daysToCurDay.filter(item => days.includes(item))
  return daysToCurDay
}

const getWordByDate = async (curDate: string) => {
  const items = await getLocalStorage('word-date:' + curDate)
  let words = items['word-date:' + curDate]
  return words
}

const getOriginWordByWord = async (word: string) => {
  let dictTypes = getDictTypes()

  let originWord = dictTypes.map(item => `${item}:${word}`)

  // 各种类型的值
  let items = await getLocalStorage(originWord)

  let parseOriginWordList: AnyTypeObj[] = []

  Object.keys(items).forEach((key) => {
    parseOriginWordList.push({
      wordType: key,
      ...items[key]
    })
  })

  return parseOriginWordList
}

const toggleOrigin = (originItem: string, auto: boolean = false) => {
  console.log(selectWordType.value, autoSelectWordType.value, 'selectWordType自动选择开始')
  if (!auto) {
    selectWordType.value = originItem
    autoSelectWordType.value = ''
  } else {
    autoSelectWordType.value = originItem
  }
  console.log(selectWordType.value, autoSelectWordType.value, 'selectWordType自动选择')
  currentWord.value = originWordList.value.find(item => item.wordType === originItem) as WordProps
}

const toggleWord = async (word: string) => {
  selectWord.value = word
  originWordList.value = await getOriginWordByWord(word)
  console.log(originWordList.value, 'originWordList')

  originWordType.value = originWordList.value.map(item => {
    if (!selectWordType.value) {
      selectWordType.value = item.wordType
    } else {
      const lateSelType = selectWordType.value.split(':')[0]
      const iWord = item.wordType.split(':')[1]
      selectWordType.value = lateSelType + ':' + iWord
    }

    return item.wordType
  })
  fullyOriginWordType.value = getDictTypes().map(item => item + ':' + word)

  if (originWordType.value.length === 0) {
    return true
  }

  const isSelectType = originWordType.value.find(type => type === selectWordType.value)
  toggleOrigin(isSelectType ? selectWordType.value : originWordType.value[0], isSelectType ? false : true)
}

const toggleDate = async (date: string) => {
  selectDate.value = date
  wordList.value = await getWordByDate(date)
  console.log(wordList.value, 'wordList')
  if (wordList.value.length === 0) {
    return true
  }
  toggleWord(wordList.value[0])
}

const toggleMonth = async () => {
  // 一来就搜
  dateList.value = await getSearchWordDate()
  console.log(dateList.value, 'dateList')
  if (dateList.value.length === 0) {
    return true
  }
  toggleDate(dateList.value[0])
}

onMounted(async () => {
  toggleMonth()
})

</script>

<style lang="scss" scoped>
.jq-learn {
  width: 100%;
  height: 100%;

  &-header {
    &-handle {
      display: flex;
      align-items: center;
    }

    &-handle-item {
      display: flex;
      align-items: center;
    }
  }

  &-menu {
    height: calc(100% - 32px);
  }

  &-date,
  &-wordType {
    display: flex;
    align-items: center;
    margin: 6px 0;

    &-label {
      width: 56px;
    }

    &-wrapper {
      width: calc(100% - 56px);
      overflow: auto;
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 3px;

      &::-webkit-scrollbar {
        height: 3px;
      }

      /*鼠标悬浮在该类指向的控件上时滑块的样式*/
      &::-webkit-scrollbar-thumb {
        background-color: #dedede;
      }
    }

    &-item {
      cursor: pointer;
      border: 1px solid #a3a9ff;
      background: #a3a9ff;
      padding: 3px;
      border-radius: 3px;

      &-inner {
        display: inline-block;
        width: 96px;
      }

      &-select {
        font-weight: 900;
      }

      &-autoSelect {
        background: #5c63d0;
        color: #fff;
        border: #5c63d0;
      }

      &-inactive {
        color: #a5a5a5;
        background: #e4e4e4;
        border-color: #e4e4e4;
      }
    }
  }


  &-body {
    display: flex;
    height: calc(100% - 200px);
  }

  &-wordList {
    overflow: auto;
    width: 124px;

    &-item {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      width: 100%;
      padding: 0 6px;
      margin-right: 6px;

      &-select {
        background: #5c63d0;
        color: #fff;
        border: red;

      }
    }
  }

  &-word {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-flow: column;
    padding: 0 2em;

    &-item {
      padding-right: 1em;
      /* flex: 1; */
      height: calc(100% - 55px);
      overflow: auto;
    }
  }

}

:deep(.el-menu) {
  .el-menu-item {
    height: 2em;
    padding: 0 0 !important;
    white-space: nowrap;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>