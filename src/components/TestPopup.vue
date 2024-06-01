<template>
  <div id="test-popup">
    <SearchResult :position="position" :wordList="selectedWordList" :info="info" @getWords="debouncedFunction"
      @topHandle="topHandle" />
    <JadeIconDialog :visible="iconDialogVisible" :position="position">
      <template #content>
        <div @mouseover="mouseOverFn" @mouseleave="mouseLeaveFn" style="width: 100%;height: 100%;">
          <IconDialogSvg />
        </div>
      </template>
    </JadeIconDialog>
  </div>
</template>

<script setup lang="ts">
import SearchResult from "@/components/SearchResult.vue";
import JadeIconDialog from '@/components/JadeIconDialog.vue'
import IconDialogSvg from '@/components/IconDialogSvg.vue'
import { debounce, formatDate } from "@/utils/common";

import {
  toRaw,
  watch,
  onMounted,
  onBeforeUnmount,
  ref,
  reactive,
  computed,
} from "vue";

import type { Ref } from "vue";

import { useContentStore } from '@/stores/content'
import { storeToRefs } from 'pinia';

const contentStore = useContentStore()
const { showSearchDialog, showIconDialog } = contentStore
const { iconDialogVisible, searchDialogVisible } = storeToRefs(contentStore)

let timer: Ref<NodeJS.Timeout | string | number | undefined> = ref(undefined);

const mouseOverFn = (e: MouseEvent) => {
  console.log(e, '鼠标hoverr')
  clearTimeout(timer.value)
  timer.value = setTimeout(() => {
    showSearchDialog(true)
    showIconDialog(false)
    console.log('打开弹窗')
  }, 300)
}

const mouseLeaveFn = (e: MouseEvent) => {
  console.log(e, '鼠标离开')
  clearTimeout(timer.value)
}

defineProps<{ msg: string }>();

let currentUrf = ref('')

let data = ref();
let info = ref({
  title: "",
});

let position = ref({
  top: 0,
  left: 0
})

interface WordItem {
  type: string;
  data: string;
  name: string;
  expand: boolean;
}

const initWordListFn = (): Record<DictType, WordItem> => {
  const wordTypes: [DictType, string][] = [
    ["bing", "必应词典"],
    ["youdao", '有道词典'],
    ["collins", 'collins词典'],
    ["jinshan", '金山词霸'],
    ["longman", '朗文词典'],
    ["cambridge", '剑桥词典'],
    ["webster", '韦伯词典'],
    ["oxford", '牛津词典'],
    ["vocabulary", 'vocabulary词典'],
    ["wordreference", 'wordreference词典'],
    ["haici", '海词词典'],
  ];
  // reduce的类型特别要注意，尤其是注意每个循环的返回值是否正确，然后就是初始值
  return wordTypes.reduce((prev, [type, name]) => {
    prev[type] = {
      name: name,
      type,
      expand: false,
      data: ''
    }
    return prev
  }, {} as Record<DictType, WordItem>);
};

let wordList: Record<DictType, WordItem> = reactive(initWordListFn());

let selectedWordTypes: Ref<DictType[]> = ref([]);

let selectedWordList: Partial<Record<DictType, WordItem>> = reactive({});

watch(
  () => selectedWordTypes.value,
  (selected) => {
    let draftWordList: Partial<Record<DictType, WordItem>> = {};
    selected.forEach((sel) => {
      draftWordList[sel] = wordList[sel];
    });
    selectedWordList = draftWordList;
  },
  {
    deep: true,
  }
);

const topHandle = (type: string) => {
  if (type === "storage") {
    window.postMessage(
      {
        type: "req:storage",
        data: {
          type: "get",
        },
      },
      "*"
    );
  }
  if (type === "openTab") {
    window.postMessage(
      {
        type: "req:openTab",
        data: {
          url: "src/popup/index.html?name=Home",
        },
      },
      "*"
    );
  }
};

const getWords = (word: string, cacheOrigin: CacheOrigin = {
  date: formatDate(new Date()),
  href: '',
  example: ''
}) => {
  console.log(word, "selected text");
  let isWord = /^[a-z]+[\-\']?[a-z]*$/i.test(word);
  if (word.length > 30) {
    // 查词字数不可超过20
    return false;
  }
  if (isWord) {

    info.value = {
      title: word,
    };

    window.postMessage(
      {
        type: "req:word-desc",
        data: {
          word: word,
          cacheOrigin,
        },
      },
      "*"
    );
  }
};

// 使用防抖函数
const debouncedFunction = debounce(getWords, 1000);
let selectionText = ref("");

const getData = (e: MouseEvent) => {
  let selection = window.getSelection();
  let originText = selection?.toString() || "";

  if (originText && selectionText.value === originText) {
    return false;
  }

  selectionText.value = originText || "";

  let word = originText.trim();

  console.log(word, "selected text");
  let isWord = /^[a-z]+[\-\']?[a-z]*$/i.test(word);
  if (word.length > 30) {
    // 查词字数不可超过20
    return false;
  }
  if (isWord) {

    // TODO: 重置数据

    position.value = {
      top: e.clientY,
      left: e.clientX
    }
    // 打开弹窗
    // showSearchDialog(true)

    // 判断是否已经打开了查询单词的窗口，如果打开了，则：
    // icon弹窗不展示，否则先关闭，再展示
    if (!searchDialogVisible.value) {
      showIconDialog(false)
      showIconDialog(true)
    }

    debouncedFunction(word, {
      date: formatDate(new Date()),
      href: location.href,
      example: (e.target as unknown as HTMLElement).innerText,
    });
  }
};



// 使用&：包含各种属性，或者将各种属性都写在一起，防止报各种错
type ReqDataType = {
  text: string;
  type: DictType;
  status: string;
  storage: string;
};

const getWordDesc = (ev: { data: ReqData<ReqDataType> }) => {
  if (!ev.data.type) {
    return false;
  }
  let total = Object.keys(selectedWordList).length;
  console.log(total, ev, "total");
  if (ev.data.type === "info:word-desc") {
    console.log(ev.data);
    total--;
    console.log(total, "total2");
    if (ev.data.data.type) {
      // TODO：加上！表示对象已定义，不然会报未定义的错误
      // TODO:这里第一次初始化时会报错
      if (!selectedWordList[ev.data.data.type]) {
        selectedWordList[ev.data.data.type] = {} as WordItem;
      }
      selectedWordList[ev.data.data.type]!.data = ev.data.data.text;
    }

    if (ev.data.data.status === "close") {
      console.log("连接已关闭");
    }
  }
  if (ev.data.type === "info:storage-get") {
    console.log(ev.data, "缓存数据");
  }

  if (ev.data.type === "info:get-select-dictTypes") {
    console.log(ev.data, "info:get-select-dictTypes");
    let storage = ev.data.data.storage;
    if (!storage) {
      window.postMessage(
        {
          type: "req:storage",
          data: {
            type: "set",
            word: "setting:selectedWordTypes",
            storage: ["youdao", "bing", "longman"],
          },
        },
        "*"
      );
    } else {
      selectedWordTypes.value = JSON.parse(storage);
    }
  }
};

// 当选择的内容没了时，关闭icon弹窗
const listenerMouseClick = () => {
  const selection = window.getSelection();
  const selText = selection?.toString();
  if (!selText) {
    showIconDialog(false)
  }

  // 点击时，监听路由变化
  const isUrlChange = currentUrf.value !== location.href;
  if (isUrlChange) {
    listenerUrlChange()
  }
}

const listenerUrlChange = (e?: HashChangeEvent | PopStateEvent) => {
  currentUrf.value = location.href;
  console.log(e, "listenerUrlChange")
  const iconEle = document.querySelector("link[rel='icon']")
  let iconUrl = ""
  if (iconEle) {
    iconUrl = iconEle.getAttribute('href') || ''
  } else {
    iconUrl = "/favicon.ico"
  }
  const pageInfo = {
    url: location.href,
    title: document.title,
    origin: location.origin,
    iconUrl: iconUrl,
    time: formatDate(new Date(), 'time'),
    date: formatDate(new Date(), 'date'),
  }
  console.log(pageInfo, "pageInfo")
  window.postMessage({
    type: 'req:history',
    data: pageInfo
  })
}

onBeforeUnmount(() => {
  removeEventListener("mouseup", getData);
  removeEventListener("message", getWordDesc);
  removeEventListener('click', listenerMouseClick)
  addEventListener('hashchange', listenerUrlChange)
  addEventListener('popstate', listenerUrlChange)
});

onMounted(() => {
  listenerUrlChange()
  window.postMessage(
    {
      type: "req:storage",
      data: {
        type: "get-single",
        storageKey: "setting:selectedWordTypes",
      },
    },
    "*"
  );
  addEventListener("mouseup", getData);
  addEventListener("message", getWordDesc);
  addEventListener('click', listenerMouseClick)
  addEventListener('hashchange', listenerUrlChange)
  addEventListener('popstate', listenerUrlChange)
});
</script>

<style lang="scss" scoped></style>
