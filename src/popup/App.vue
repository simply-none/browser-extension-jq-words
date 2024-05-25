<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';
const route = useRoute()
const router = useRouter()

onMounted(() => {
  console.log(route, route.query, 'route')

  if (route.query.name) {
    console.log('跳转啊')
    router.push({
      name: route.query.name as string
    })
  }
})

</script>

<template>
  <router-link to="/">home</router-link>
  <router-link to="/SelectWordPanel">SelectWordPanel</router-link>
  <router-link to="/about">about</router-link>
  <router-view />
</template>

<style scoped></style>
