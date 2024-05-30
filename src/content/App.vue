<script setup lang="ts">
import TestPopup from '@/components/TestPopup.vue'
import MySvg from '@/content/assets/360wallpaper.jpg'
import { ref } from 'vue'

const sbg = ref(MySvg)
</script>

<template>
  <el-image :src="sbg"/>
  <TestPopup msg="test-popup"/>
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
