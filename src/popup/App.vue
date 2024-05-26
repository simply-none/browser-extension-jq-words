<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';

import Layout from './layout/Index.vue'

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
  <Layout>
    <template #main>
      <header>标题</header>
      <router-view />
    </template>
  </Layout>

</template>

<style lang="scss" scoped></style>
