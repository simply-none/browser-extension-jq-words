// 注册自定义元素 --- start
import { defineCustomElement } from 'vue'
import Example from '@/components/WordFrame.ce.vue'

console.log(Example, Example.styles) // ["/* 内联 css */"]

// 转换为自定义元素构造器
const JadeCustomWordFrame = defineCustomElement(Example)

// 注册
customElements.define('jade-custom-word-frame', JadeCustomWordFrame)
// 注册自定义元素 --- end

export default JadeCustomWordFrame