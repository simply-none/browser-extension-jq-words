<script setup lang="ts">
import  WordList  from './home/wordList.vue'

</script>

<template>
  <WordList/>
  <router-link to="/">home</router-link>
  <router-link to="/about">home</router-link>
  <router-view/>
</template>

<style scoped>

</style>
