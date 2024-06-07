<template>
  <div>
    <ElButton type="primary" @click="openNewTab">打开新窗口</ElButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElButton } from 'element-plus';

const id = ref(1)

const openNewTab = (e: MouseEvent) => {
  console.log(id.value, e, '获取鼠标当前坐标')
  chrome.tabs.create(
    {
      url: 'src/popup/index.html?name=Home',
    },
    (tab) => {
      console.log(tab, 'tab')
      chrome.windows.create(
        {
          tabId: tab.id,
          type: 'popup',
          width: 360,
          height: 556,
          top: e.screenY,
          left: e.screenX,
          // setSelfAsOpener: true,
          focused: true,
        },
        (window) => {
          console.log(window, 'window')
          window && (window.alwaysOnTop = true)
          chrome.windows.onFocusChanged.addListener(wId => {
          if (wId === window?.id)
            chrome.windows.update(wId, { focused: true })
          })
        },
      )

      
    },
  )
}

</script>

<style scoped></style>