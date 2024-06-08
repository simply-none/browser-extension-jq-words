<script setup lang="ts">
import { useRoute, useRouter, RouterView } from 'vue-router';
import { onMounted, computed, watch, ref } from 'vue';
import { ElConfigProvider } from 'element-plus';

import zhCn from 'element-plus/es/locale/lang/zh-cn.mjs'

const locale = computed(() => zhCn)

const route = useRoute()
const router = useRouter()

onMounted(() => {
  console.log(route, route.query, 'route')
  console.log(import.meta.env, 'import.meta')
  const name = route.query.name as string || (import.meta.env.DEV ? 'Home' : 'Home')
  console.log('跳转啊')
  name && router.push({
    name: name
  })
})

</script>

<template>
  <el-config-provider :locale="locale">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </el-config-provider>
</template>

<style lang="scss" scoped></style>
