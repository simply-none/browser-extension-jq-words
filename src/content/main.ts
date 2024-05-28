import { createApp } from 'vue'
// import ElementPlus from 'element-plus'
import './style.css'
import App from './App.vue'

import router from './router'

import { createPinia } from 'pinia'

import { ElDialog } from 'element-plus'

// 关闭打开dialog时，element-plus给body加的样式：overflow:hidden;
ElDialog.props.lockScroll.default = false

let div = document.createElement('div')
div.setAttribute('id', 'jade-custom')
let firstChild = document.body.firstChild
document.body.insertBefore(div, firstChild)

const pinia = createPinia()
const app = createApp(App)

// app.use(ElementPlus)

app.use(router)
app.use(pinia)

router.isReady().then(() => {
  app.mount('#jade-custom')
})
