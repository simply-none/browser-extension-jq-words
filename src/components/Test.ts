// 注册自定义元素 --- start
import { defineCustomElement } from 'vue'

// 转换为自定义元素构造器
const JadeCustomWordFrame = defineCustomElement({
  // 这里是同平常一样的 Vue 组件选项
  props: {},
  emits: {},
  template: `<div>111</div>`,

  // defineCustomElement 特有的：注入进 shadow root 的 CSS
  styles: [`div { color: red; }`]
})

// 注册
customElements.define('jade-custom-test', JadeCustomWordFrame)
// 注册自定义元素 --- end

export default JadeCustomWordFrame