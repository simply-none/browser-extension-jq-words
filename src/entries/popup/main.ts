import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'

import router from './router'

import { ElDialog } from 'element-plus'

// 关闭打开dialog时，element-plus给body加的样式：overflow:hidden;
ElDialog.props.lockScroll.default = false

const app = createApp(App)

app.use(ElementPlus)

app.use(router)

app.mount('#app')
