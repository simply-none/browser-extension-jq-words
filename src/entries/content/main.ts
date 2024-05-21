import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)

let div = document.createElement('div')
div.setAttribute('id', 'jade-custom')
let firstChild = document.body.firstChild
document.body.insertBefore(div, firstChild)

app.mount('#jade-custom')
