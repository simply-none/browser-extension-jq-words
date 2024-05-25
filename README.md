# 浏览器扩展开发

## 功能

- 弹窗

### 参考

- <https://gitee.com/zheng_yongtao/vue-chrome-extension-quickstart>

## 开发指导

## 开发指南

**flex和inline-flex的区别**：

在使用inline-flex的时候，导致高度发生变化（估计和image的某种模式一致），难以调整，所以尽可能使用flex

**computed类型及其读取**：

```typescript
type Props = {
  wordList: {
    type: string;
  }
}
const expandItems = computed(() => props.wordList)
// 元素隐式具有 "any" 类型，因为类型为 "string" 的表达式不能用于索引类型 "ComputedRef<{ [key: string]: { type: string; data: string; name: string; expand: boolean; }; }>"。
// 在类型 "ComputedRef<{ [key: string]: { type: string; data: string; name: string; expand: boolean; }; }>" 上找不到具有类型为 "string" 的参数的索引签名。ts-plugin(7053)
// 当使用下面这行时，报上面的错
expandItems[type]

// 正确用法，因为computed在script中读取，应该使用.value
expandItems.value[type]
```

### 性能优化

**打包体积优化**：

- rollup-plugin-visualizer可视化查看打包后的项目体积大小
- 安装unplugin-vue-components、unplugin-auto-import、unplugin-element-plus/vite对element-plus打包体积优化，按需导入的模式
- vite-plugin-compression开启文件压缩
