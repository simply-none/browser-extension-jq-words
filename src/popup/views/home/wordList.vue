<template>
  <div class="demo-collapse">
    <div>
      <el-button type="primary" @click="saveFile(storageCache)">备份数据</el-button>
      <el-button type="danger" @click="clearCache">清空所有缓存</el-button>
    </div>
    <el-table :data="table" style="width: 100%" height="550">
      <el-table-column type="expand" label="origin">
        <template #default="{ row }">
          <div class="wordlist-item">
            <div class="wordlist-item-title">origin: </div>
            <div class="wordlist-item" v-for="origin in row.origin" :key="origin.id">
              <div class="wordlist-item-content">
                href: {{ origin.href }}
              </div>
              <div class="wordlist-item-content">
                date: {{ origin.date }}
              </div>
              <div class="wordlist-item-content">
                example: {{ origin.example }}
              </div>
            </div>
          </div>

          <div class="wordlist-item">
            <div class="wordlist-item-title">phonetic: </div>
            <div class="wordlist-item-content" v-for="phonetic in row.phonetic" :key="phonetic">
              {{ phonetic }}
            </div>
          </div>

          <div class="wordlist-item">
            <div class="wordlist-title">trans: </div>
            <div class="wordlist-item-content" v-for="trans in row.trans" :key="trans">
              {{ trans }}
            </div>
          </div>

          <div class="wordlist-item">
            <div class="wordlist-item-title">morph: </div>
            <div class="wordlist-item-content" v-for="morph in row.morph" :key="morph">
              {{ morph }}
            </div>
          </div>

        </template>
      </el-table-column>
      <el-table-column prop="word" label="word" width="180" />
      <el-table-column prop="wordType" label="wordType" width="180" />
      <el-table-column prop="phonetic" label="phonetic" />

      <el-table-column prop="trans" label="trans" />
      <el-table-column prop="morph" label="morph" />
      <el-table-column fixed="right" label="Operations">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="deleteItem(scope.row.wordType)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { ElCollapse, ElCollapseItem, ElButton } from 'element-plus';

let storageCache = ref({})

const clearCache = () => {
  chrome.storage.local.clear().then(res => {
    console.log(res, '删除所有后提示的内容')
  })
}

const deleteItem = (key: string) => {
  chrome.storage.local.remove(key).then(res => {
    console.log(res, '删除后提示的内容')
  })
}

const saveFile = (data: object) => {
  // 创建Blob对象
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });

  // 创建下载链接并模拟点击下载
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `extension-d-${Date.now()}.json`;
  link.click();

  // 释放URL对象
  URL.revokeObjectURL(url);
}

let table = ref<WordCache[]>([])

onMounted(async () => {
  await chrome.storage.local.get().then((items) => {
    Object.keys(items).forEach((key) => {
      table.value.push({
        wordType: key,
        ...items[key]
      })
    })

    storageCache.value = items;
    console.log(storageCache, "storageCache Value is set");
  });
})
</script>

<style lang="scss" scoped>
.wordlist-item {
  padding: 3px;
  border: 1px solid grey;

  &-title {
    font-weight: 600;
    padding: 3px;
    font-size: 1.2em;
  }

  &-content {
    padding: 3px;
  }
}
</style>
