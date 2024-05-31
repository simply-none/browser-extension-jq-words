
import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/Index.vue'),
    label: '首页'
  },
  {
    path: '/SelectWordPanel',
    name: 'SelectWordPanel',
    component: () => import('../views/SelectWordPanel.vue'),
    label: '词表板'
  },
  {
    path: '/history',
    name: 'history',
    component: () => import('../views/history/Index.vue'),
    label: '历史记录'
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('../views/setting/Index.vue'),
    label: '设置'
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    label: '关于'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
