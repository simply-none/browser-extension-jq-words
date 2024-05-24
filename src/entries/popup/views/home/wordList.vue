<template>
  <div class="demo-collapse">
    <!-- <el-collapse>
      <el-collapse-item v-for="(item, word) in storageCache" :key="word" :title="word" :name="word">
        <div v-for="(typeItem, type) in item" :key="type">
            <el-descriptions :title="type + ''" :border="true" :column="1" size="small">
              <el-descriptions-item  v-for="(value, key) in typeItem" :key="key" :label="key + ''">{{ value }}</el-descriptions-item>
            </el-descriptions>
        </div>
        <el-button @click="deleteItem(word)">删除</el-button>
      </el-collapse-item>
    </el-collapse> -->
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

let storageCache = ref({})

// const deleteItem = (key: string) => {
//   chrome.storage.local.remove(key).then(res => {
//     console.log(res, '删除后提示的内容')
//   })
// }

onMounted(async () => {
  await chrome.storage.local.get().then((items) => {
    // console.log(items, "Value is get");
    Object.keys(items).forEach((key) => {
      console.log(key, "key is get")
      // items[key] = JSON.parse(items[key])
    })
    storageCache.value = items;
    console.log(storageCache, "storageCache Value is set");
  });
})
</script>
