# 浏览器扩展开发

## 待办、灵感、想法

- 单独封装一个js，用于各个模块之间的事件传递，便于查找和开发，现在的事件传递太乱了，得捋一捋
- 跳转到插件内部不同的页面，其实都可以通过popup 模块做不同的路由界面罢了

## 功能

- 弹窗

### 参考

- <https://gitee.com/zheng_yongtao/vue-chrome-extension-quickstart>

## 思考

如果某种方式行不通，那就换一种方式，总要达到对应的目的不是吗？比如，嵌入的网页的样式会受到网站的影响，同时也会影响网站，这是一份十分懊恼的结果，是否可以换一种方式呢？比如嵌入iframe？那就从查看iframe的api开始吧，结果大惊，真就行得通。

如果预期结果和实际不符，那就仔细查看代码，看看是否出现了偏差，往往都是这一步出错了的；是否并未了解对应的api功能，也许就是这里在使坏，cheerio的删除，增加，修改功能，是会直接修改元对象的，所以后续若在对其进行操作，指定达不到相应的效果，因为并不是元对象了，解决方法就是克隆一份元对象的副本进行操作。

## 开发指导

## API说明

### 存储

```typescript
  // 对象形式的语法，只有存储有key，才会获取，其中这里的deploy指的是默认值，没有则返回这个值。。。
  chrome.storage.local.get({
    'youdao:nested': 'deploy'
  }).then(res => {
    console.log(res, 'get origin')
  }).catch(e => {
    console.log(e, '发生错误')
  })
```

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

**Error: [vite]: Rollup failed to resolve import "src/utils/common" from "C:/Users/admin/Documents/GitHub/xy-dict/src/components/TestPopup.vue?vue&type=script&setup=true&lang.ts".      This is most likely unintended because it can break your application at runtime.**

问题排查：代码使用自动生成工具生成了错误的导入路径，在后续操作时，应该时刻排查由于代码改动造成的莫名的错误，毕竟之前就能够运行不报错的，不是吗？哈哈哈

**vscode编辑器报错：Cannot find module '@/utils/common' or its corresponding type declarations.ts-plugin(2307)，但是代码运行不报错**：

1: 这个可能是vscode插件导致的，卸载掉相关的插件即可，或者卸载重装
2： 可能是配置出错，拿这个来说：

```json
{
  baseUrl: './',
  paths: {
    // 这个仅仅代表./src，若想包含后续子路径，必须加*
    '@/': ['./src'],
    // 包含所有子路径的导入
    '@/*': ['./src/*'],
    // 或者是，因为是相对于baseUrl的
    '@/*': ['src/*']
  }
}
```

**明明在项目根目录配置了tsconfig、jsconfig，点击导入代码时就是不进行相关的跳转**：

1：vscode中ts/js插件未初始化完毕
2：配置出错，同上

### 性能优化

**打包体积优化**：

- rollup-plugin-visualizer可视化查看打包后的项目体积大小
- 安装unplugin-vue-components、unplugin-auto-import、unplugin-element-plus/vite对element-plus打包体积优化，按需导入的模式
- vite-plugin-compression开启文件压缩
