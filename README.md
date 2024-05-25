# 浏览器扩展开发

## 功能

- 弹窗

### 参考

- <https://gitee.com/zheng_yongtao/vue-chrome-extension-quickstart>

## 开发指导

## 开发指南

**flex和inline-flex的区别**：

在使用inline-flex的时候，导致高度发生变化（估计和image的某种模式一致），难以调整，所以尽可能使用flex

### 性能优化

**打包体积优化**：

- rollup-plugin-visualizer可视化查看打包后的项目体积大小
- 安装unplugin-vue-components、unplugin-auto-import、unplugin-element-plus/vite对element-plus打包体积优化，按需导入的模式
- vite-plugin-compression开启文件压缩
