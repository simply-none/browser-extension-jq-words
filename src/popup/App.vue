<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { onMounted, computed } from 'vue';
import { ElConfigProvider } from 'element-plus';

import Layout from './layout/Index.vue'

import zhCn from 'element-plus/es/locale/lang/zh-cn.mjs'

const locale = computed(() => zhCn)

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
  <el-config-provider :locale="locale">
    <Layout>
      <template #main>
        <router-view />
      </template>
    </Layout>
  </el-config-provider>

</template>

<style lang="scss" scoped></style>
