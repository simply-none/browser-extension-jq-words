<script setup lang="ts">
import TestPopup from '@/components/TestPopup.vue'
</script>

<template>
  <div>
    Vite (French word for "quick", pronounced /vit/, like "veet") is a build tool that aims to provide a faster and leaner development experience for modern web projects. It consists of two major parts:
Vite（法语中的“快速”，发音 /vit/ 为“veet”）是一种构建工具，旨在为现代 Web 项目提供更快、更精简的开发体验。它由两个主要部分组成：

A dev server that provides rich feature enhancements over native ES modules, for example extremely fast Hot Module Replacement (HMR).
一个开发服务器，它提供了比本机 ES 模块更丰富的功能增强，例如极快的热模块更换 （HMR）。

A build command that bundles your code with Rollup, pre-configured to output highly optimized static assets for production.
  </div>
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
