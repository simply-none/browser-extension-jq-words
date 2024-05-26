<script setup lang="ts">
import { ref } from 'vue';

const toggleUrl = ref('')

const navToSetting = async () => {
  const url = chrome.runtime.getURL(toggleUrl.value || 'src/popup/index.html?name=Home')
  const tab = await chrome.tabs.create({ url: url })
  console.log(tab, 'tab')
}

</script>

<template>
  <div>
    <h1>options</h1>
    <ElInput v-model="toggleUrl"/>
    <el-button @click="navToSetting">跳转到设置页面</el-button>
  </div>
  <HelloWorld msg="Vite + Vue" />
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
