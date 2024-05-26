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
      <el-button v-if="showChangeTypesBtn" @click="changeWordTypes" type="primary">修改</el-button>
      <el-button v-if="showChangeTypesBtn" @click="changeCancel">取消</el-button>
    </div>
    <el-divider />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch, unref, toRaw, toValue } from 'vue'

const selectWordTypes = ref(['bing', 'youdao', 'longman'])
const wordTypes: DictType[] = ['bing', 'youdao', 'collins', 'jinshan', 'longman', 'cambridge', 'webster', 'oxford', 'vocabulary', 'wordreference', 'haici']

const showChangeTypesBtn = ref(false)

watch(() => selectWordTypes.value, () => {
  showChangeTypesBtn.value = true
})

const changeCancel = () => {
  showChangeTypesBtn.value = false
}

const changeWordTypes = () => {
  const data = {
    type: 'req:storage',
    data: {
      type: 'set',
      word: 'setting:selectedWordTypes',
      storage: toRaw(selectWordTypes.value)
    }
  }
  console.log(data, 'data')
  window.postMessage(data, "*")
}

type ReqDataType = {
  text: string;
  type: DictType;
  status: string;
  storage: string;
}

const getMessage = (ev: { data: ReqData<ReqDataType> }) => {
  if (!ev.data.type) {
    return false
  }

  if (ev.data.type === 'info:get-select-dictTypes') {
    console.log(ev.data, 'info:get-select-dictTypes')
    let storage = ev.data.data.storage
    if (!storage) {
      changeWordTypes()
    } else {
      selectWordTypes.value = JSON.parse(storage)
    }
  }

}

onMounted(() => {
  window.postMessage({
    type: 'req:storage',
    data: {
      type: 'get-single',
      storageKey: 'setting:selectedWordTypes',
    }
  }, "*")
  addEventListener("message", getMessage)
})


</script>
