
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import SelectWordPanel from '../views/SelectWordPanel.vue'

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    label: '首页'
  },
  {
    path: '/SelectWordPanel',
    name: 'SelectWordPanel',
    component: SelectWordPanel,
    label: '词表板'
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
    component: About,
    label: '关于'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
