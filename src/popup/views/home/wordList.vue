<template>
  <div class="jq-app-wordList jq-aw">
    <Header title="单词列表">
      <el-button type="primary" @click="saveFile(storageCache)">备份数据</el-button>
      <el-button type="danger" @click="clearCache">清空缓存</el-button>
    </Header>

    <div class="jq-aw-body" ref="jqAwBody">
      <Search />
      <el-table class="jq-aw-table" :data="table" style="width: 100%"  :max-height="tableMaxHeight">
        <el-table-column type="expand" label="">
          <template #default="{ row }">
            <div class="wordlist-item">
              <div class="wordlist-item-title">origin: </div>
              <div class="wordlist-item" v-for="origin in row.origin" :key="origin.id">
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

            <div class="wordlist-item">
              <div class="wordlist-item-title">phonetic: </div>
              <div class="wordlist-item-content" v-for="phonetic in row.phonetic" :key="phonetic">
                {{ phonetic }}
              </div>
            </div>

            <div class="wordlist-item">
              <div class="wordlist-title">trans: </div>
              <div class="wordlist-item-content" v-for="trans in row.trans" :key="trans">
                {{ trans }}
              </div>
            </div>

            <div class="wordlist-item">
              <div class="wordlist-item-title">morph: </div>
              <div class="wordlist-item-content" v-for="morph in row.morph" :key="morph">
                {{ morph }}
              </div>
            </div>

          </template>
        </el-table-column>
        <el-table-column prop="word" label="单词" width="120">
          <template #default="{ row }">
            <div class="wordlist-item-line" :title="row.word">
              {{ row.word }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="wordType" label="类型" width="180">
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
import type {Ref} from 'vue'
import { ElCollapse, ElCollapseItem, ElButton } from 'element-plus';
import Search from './Search.vue'
import Header from './Header.vue'
import Page from './Page.vue'

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

const saveFile = (data: object) => {
  // 创建Blob对象
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });

  // 创建下载链接并模拟点击下载
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `extension-d-${Date.now()}.json`;
  link.click();

  // 释放URL对象
  URL.revokeObjectURL(url);
}

const mockTable = {
  "cambridge:function": {
    "origin": [
      {
        "date": "2024-05-28 16:39:43",
        "example": "Call this function to set up a connection between the extension's background scripts (or other privileged scripts, such as popup scripts or options page scripts) and any content scripts that belong to this extension and are running in the specified tab. This function returns a runtime.Port object.",
        "href": "https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/Tabs/connect"
      }
    ],
    "phonetic": [
      "uk                    \n    \n        \n            Your browser doesn't support HTML5 audio\n        \n        \n        \n    \n    \n/ˈfʌŋk.ʃən/",
      "us                    \n    \n        \n            Your browser doesn't support HTML5 audio\n        \n        \n        \n    \n    \n/ˈfʌŋk.ʃən/",
      "uk                    \n    \n        \n            Your browser doesn't support HTML5 audio\n        \n        \n        \n    \n    \n/ˈfʌŋk.ʃən/",
      "us                    \n    \n        \n            Your browser doesn't support HTML5 audio\n        \n        \n        \n    \n    \n/ˈfʌŋk.ʃən/"
    ],
    "trans": [
      "功能，用途；职责",
      "典礼，仪式;社交聚会",
      "工作；运行",
      "（电脑程序中的）功能",
      "（数学中的）函数，应变量",
      "运转；工作；起作用"
    ],
    "word": "function"
  },
  "wordreference:function": {
    "morph": [],
    "origin": [
      {
        "date": "2024-05-28 16:39:43",
        "example": "Call this function to set up a connection between the extension's background scripts (or other privileged scripts, such as popup scripts or options page scripts) and any content scripts that belong to this extension and are running in the specified tab. This function returns a runtime.Port object.",
        "href": "https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/Tabs/connect"
      }
    ],
    "phonetic": [
      "UK:*UK and possibly other pronunciationsUK and possibly other pronunciations/ˈfʌŋkʃən/US:USA pronunciation: IPA and respellingUSA pronunciation: IPA/ˈfʌŋkʃən/ ,USA pronunciation: respelling(fungk′shən)"
    ],
    "trans": [
      "中文",
      "SCSimplified Chinese 运行 yùn xíng  TCTraditional Chinese 運行",
      "SCSimplified Chinese 运转 yùn xíng ，yùn zhuàn  TCTraditional Chinese 運轉",
      "SCSimplified Chinese 工作 yùn xíng ，gōng zuò  TCTraditional Chinese 工作",
      "SCSimplified Chinese 起作用 qǐ zuò yòng ",
      "SCSimplified Chinese 用作 qǐ zuò yòng，yòng zuò  ",
      "SCSimplified Chinese 功能 gōng néng  TCTraditional Chinese 功能",
      "SCSimplified Chinese 用途 gōng néng ，yòng tú TCTraditional Chinese 用途",
      "SCSimplified Chinese 目的 gōng néng ，mù dì  TCTraditional Chinese 目的",
      "中文",
      "SCSimplified Chinese 官能 guān néng  ",
      "SCSimplified Chinese （大脑等的）活动 guān néng ，dà nǎo děng de huó dòng ",
      "SCSimplified Chinese 仪式 yí shì TCTraditional Chinese 儀式",
      "SCSimplified Chinese 典礼 yí shì，diǎn lǐ TCTraditional Chinese 典禮",
      "SCSimplified Chinese 职能 zhí néng  TCTraditional Chinese 職能",
      "SCSimplified Chinese 职责 zhí néng ，zhí zé  TCTraditional Chinese 職責",
      "SCSimplified Chinese 函数 hán shù TCTraditional Chinese 函數",
      "SCSimplified Chinese 随…而变化的事物 suí ér biàn huà de shì wù ",
      "中文",
      "SCSimplified Chinese β函数 hán shù ",
      "SCSimplified Chinese 身体功能  ",
      "SCSimplified Chinese 身体机能  ",
      "SCSimplified Chinese 起...的作用 qǐ de zuò yòng ",
      "SCSimplified Chinese 功能键 gōng néng jiàn TCTraditional Chinese 功能鍵",
      "SCSimplified Chinese 活动会议室  ",
      "SCSimplified Chinese 宴会厅  "
    ],
    "word": "function"
  },
  "youdao:exchange": {
    "morph": [
      "[\n                    复数\n        exchanges\n                     第三人称单数\n        exchanges\n                     现在分词\n        exchanging\n                     过去式\n        exchanged\n                     过去分词\n        exchanged\n                   ]"
    ],
    "origin": [
      {
        "date": "2024-05-28 16:37:20",
        "example": "When this is called, the runtime.onConnect event will be fired in any content script belonging to this extension that are running in the specified tab. The event listener will be passed another runtime.Port object. The two sides can then use the Port objects to exchange messages.",
        "href": "https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/Tabs/connect"
      }
    ],
    "phonetic": [
      "英\n                                    [ɪksˈtʃeɪndʒ]\n                                                    \n                                ",
      "美\n                                    [ɪksˈtʃeɪndʒ]\n                                                    \n                                "
    ],
    "trans": [
      "n. 交换，互换；短暂的交谈，争吵；交战，交火；兑换，汇兑；交流，互访；交易所；（商品的）调换；电话局，电话交换台；换子，兑子",
      "v. 调换，更换；交流，交谈；交换，互换；兑换，交易"
    ],
    "word": "exchange"
  },
  "youdao:extension": {
    "morph": [
      "[\n                    复数\n        extensions\n                   ]"
    ],
    "origin": [
      {
        "date": "2024-05-28 16:36:29",
        "example": "Call this function to set up a connection between the extension's background scripts (or other privileged scripts, such as popup scripts or options page scripts) and any content scripts that belong to this extension and are running in the specified tab. This function returns a runtime.Port object.",
        "href": "https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/Tabs/connect"
      }
    ],
    "phonetic": [
      "英\n                                    [ɪkˈstenʃ(ə)n]\n                                                    \n                                ",
      "美\n                                    [ɪkˈstenʃ(ə)n]\n                                                    \n                                "
    ],
    "trans": [
      "n. 延伸，扩展；展期，延长期；扩建部分，延伸部分；（电话）分机；扩展名；（为非全日制学生开设的）进修部；牵伸（术）；外延；广延（性）"
    ],
    "word": "extension"
  }
} as any as { [key: string]: WordCache };


let table = ref<(WordCache & { wordType: string })[]>([])

let computedTableMaxHeight = async () => {
  await nextTick()
  console.log(jqAwBody.value, 'jqAwBody')
  tableMaxHeight.value = jqAwBody.value?.clientHeight || 0
  // const tableHeight = document.querySelector(".jq-aw")?.clientHeight
}

onMounted(async () => {
  computedTableMaxHeight()
  Object.keys(mockTable).forEach((key) => {
    table.value.push({
      wordType: key,
      ...mockTable[key]
    })
  })

  console.log(storageCache, "storageCache Value is set");
  try {
    await chrome.storage.local.get().then((items) => {
    Object.keys(items).forEach((key) => {
      delete items[key].HTML
      table.value.push({
        wordType: key,
        ...items[key]
      })
    })

    storageCache.value = items;
    console.log(storageCache, "storageCache Value is set");
  });
  } catch (e) {
    console.log(e, 'e')
  }
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
