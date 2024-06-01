<template>
  <el-row class="layout-container">
    <el-col :span="6">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item :index="route.path" v-for="route in routes" :key="route.path" @click="getMenuItem">
          <el-icon><icon-menu /></el-icon>
          <span>{{  route.label }}</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="18">
      <slot name="main">
        主体
      </slot>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ElMenu, ElMenuItem, ElCol, ElRow, ElIcon } from 'element-plus';
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import type { MenuItemRegistered } from 'element-plus'

import { routes } from '../router';

const router = useRouter()

const owerRoutes = ref(routes)

const getMenuItem = (e: MenuItemRegistered) => {
  console.log(e, 'e')
  router.push({
    path: e.index as string
  })
}

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
}
.layout-container {
  height: 100%;
  width: 100%;
}
.el-row {
    box-sizing: border-box;
    display: flex;
    flex-wrap: nowrap;
    position: relative;
}
.el-col-6 {
    width: 160px;
    min-width: 160px;
    flex: 0;
}
.el-col-18 {
    flex: 1;
    max-width: calc(100% - 160px);
}
</style>
