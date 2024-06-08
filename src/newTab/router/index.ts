
import { createRouter, createWebHistory } from 'vue-router'

export const menuRoutes = [
  {
    path: '/wordList',
    name: 'wordList',
    component: () => import('../views/wordList/Index.vue'),
    label: '单词列表'
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
    component: () => import('../views/about/Index.vue'),
    label: '关于'
  }
]

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/Index.vue'),
    label: '首页'
  },
  {
    component: () => import('../layout/Index.vue'),
    path: '/a',
    children: menuRoutes
  },

  {
    path: '/noLayout',
    name: 'noLayout-setting',
    component: () => import('../views/setting/Index.vue'),
    meta: {
      noLayout: true
    },
    label: '关于-无layout'
  },
  {
    path: '/learn',
    name: 'learn',
    component: () => import('../views/learn/Index.vue'),
    meta: {
      noLayout: true
    },
    label: '背单词'
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
