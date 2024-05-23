<script setup lang="ts">
import { onMounted, ref } from 'vue'

let storageCache = ref({})

const deleteItem = (key: string) => {
  chrome.storage.local.remove(key).then(res => {
    console.log(res, '删除后提示的内容')
  })
}

onMounted(async () => {
  await chrome.storage.local.get().then((items) => {
    console.log(items, "Value is get");
    // Object.keys(items).forEach((key) => {
    //   items[key] = JSON.parse(items[key])
    // })
    storageCache.value = items;
    console.log(storageCache, "storageCache Value is set");
  });
})
</script>

<template>
  <div>
    <div v-for="(, key) in storageCache" :key="key">
      <div>{{ key }}</div>
      <el-button @click="deleteItem(key)">删除</el-button>
    </div>
  </div>
</template>

<style scoped>
@import url('element-plus/dist/index.css');

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
