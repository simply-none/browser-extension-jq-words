# 浏览器扩展开发

## 功能

- 弹窗

### 参考

- <https://gitee.com/zheng_yongtao/vue-chrome-extension-quickstart>

## 思考

如果某种方式行不通，那就换一种方式，总要达到对应的目的不是吗？比如，嵌入的网页的样式会受到网站的影响，同时也会影响网站，这是一份十分懊恼的结果，是否可以换一种方式呢？比如嵌入iframe？那就从查看iframe的api开始吧，结果大惊，真就行得通。

如果预期结果和实际不符，那就仔细查看代码，看看是否出现了偏差，往往都是这一步出错了的；是否并未了解对应的api功能，也许就是这里在使坏，cheerio的删除，增加，修改功能，是会直接修改元对象的，所以后续若在对其进行操作，指定达不到相应的效果，因为并不是元对象了，解决方法就是克隆一份元对象的副本进行操作。

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
