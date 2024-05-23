<script setup lang="ts">
import TestPopup from '@/components/TestPopup.vue'
import { onMounted, ref } from 'vue'

let storageCache = ref({})

onMounted(async () => {
  await chrome.storage.local.get().then((items) => {
    console.log(items, "Value is get");
    Object.keys(items).forEach((key) => {
      items[key] = JSON.parse(items[key])
    })
    storageCache.value = items;
    console.log(storageCache, "storageCache Value is set");
  });
})
</script>

<template>
  <div>
    <!-- <el-button @click="navToWordlist">跳转</el-button> -->
    <div v-for="(item, key) in storageCache" :key="key">
      <h1>{{ key }}</h1>
      <div v-text="JSON.stringify(item, null, 2)">
      </div>
    </div>
    <TestPopup msg="test-popup" />
  </div>
</template>

<style scoped>
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
