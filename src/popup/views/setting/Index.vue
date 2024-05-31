<template>
  <div>
    <h1>设置</h1>
    <div>
      <div>词典类型</div>
      <el-checkbox-group v-model="selectWordTypes" :min="1" :max="3">
        <el-checkbox v-for="city in wordTypes" :key="city" :label="city" :value="city">
          {{ city }}
        </el-checkbox>
      </el-checkbox-group>
      <div>选择的词典类型顺序：{{ selectWordTypes }}</div>
      <el-button v-if="showChangeTypesBtn" @click="changeWordTypes" type="primary">修改</el-button>
      <el-button v-if="showChangeTypesBtn" @click="changeCancel">取消</el-button>
    </div>
    <el-divider />
  </div>
</template>

<script lang="ts" setup>
import { getDictTypes } from '@/utils/common';
import { onMounted, ref, watch, unref, toRaw, toValue, onUnmounted } from 'vue'

const selectWordTypes = ref(['bing'])
const wordTypes: DictType[] = getDictTypes()

const showChangeTypesBtn = ref(false)

watch(() => selectWordTypes.value, () => {
  showChangeTypesBtn.value = true
})

const changeCancel = () => {
  showChangeTypesBtn.value = false
}

const changeWordTypes = (): void => {
  const data = {
    type: 'req:popup2main-storage',
    data: {
      type: 'set',
      word: 'setting:selectedWordTypes',
      storage: toRaw(selectWordTypes.value)
    }
  }
  console.log(data, 'data')
  popupConnectToBackgroundScript(data)
  // popupConnectToContentScript(data)
}

const getMessage = (ev: { data: ReqData<ReqDataType>, type: string }) => {
  console.log(ev, 'getmessage')
  if (!ev.type) {
    return false
  }
  console.log(ev, 'settting index getmessage')

  if (ev.type === 'info:get-select-dictTypes') {
    console.log(ev.data, 'info:get-select-dictTypes', '获取获取')
    let storage = ev.data.data.storage
    if (!storage) {
      changeWordTypes()
    } else {
      console.log(storage, 'storage', JSON.parse(storage))
      selectWordTypes.value = JSON.parse(storage)
    }
  }

}

// 直接向background发送消息
const popupConnectToBackgroundScript = (data: any) => {
  const port = chrome.runtime.connect({ name: 'req:word-desc--' + data.data.word });

  port.postMessage(data);

  port.onMessage.addListener(getMessage);
}

// 该方法仅在点击扩展程序图标时，才会向content-script发送消息
// 单独打开的chrome-extends：页面上，不会触发该方法，显示：runtime.lastError: Could not establish connection. Receiving end does not exist.
// TODO: 所以在任何时候，有一种方法，能行得通，就可以先用着，后续可以再次优化
// 不然在这里一直浪费时间，肯定是不行的，毕竟这是chrome-extends的特性，不因使用者而改变
const popupConnectToContentScript = async (data: any) => {

  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);

  const port = chrome.tabs.connect(tab.id!)
  console.log(port, 'prot')

  port.postMessage(data);

  port.onMessage.addListener(function (msg) {
    console.log(msg, '监听数据在settings insex---tabs')
  });
}

type ReqDataType = {
  text: string;
  type: DictType;
  status: string;
  storage: string;
}

popupConnectToBackgroundScript({
  type: 'req:popup2main-get-storage',
  data: {
    type: 'get-single',
    word: 'setting:selectedWordTypes',
    storage: 'setting:selectedWordTypes',
  }
})



onMounted(() => {

  addEventListener("message", getMessage)
})

onUnmounted(() => {
  removeEventListener("message", getMessage)
})


</script>
