<template>
  <div class="jq-app-search">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <template v-for="([key, type, label]) in formOptions" :key="key">
        <template v-if="type === 'daterange'">
          <el-form-item :label="label">
            <el-date-picker v-model="formInline[key]" type="daterange" unlink-panels range-separator="至"
              start-placeholder="Start date" end-placeholder="End date" :shortcuts="shortcuts" />
          </el-form-item>
        </template>
        <template v-if="type === 'input'">
          <el-form-item :label="label">
            <el-input v-model="formInline[key]" clearable />
          </el-form-item>
        </template>
      </template>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, withDefaults, computed } from 'vue'

interface FormType {
  formOptions: [string, string, string][]
}

const props = withDefaults(defineProps<FormType>(), {
  // 非原始类型，需要使用get函数
  formOptions: () => [['word', 'input', '单词'], ['date', 'daterange', '日期']]
})

const formInline = computed(() => {
  return props.formOptions.reduce((acc, [key, type]) => {
    type === 'input' && (acc[key] = '')
    type === 'daterange' && (acc[key] = [])
    return acc
  }, {} as { [index: string]: any })
})

const shortcuts = [
  {
    text: '最近七天',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: '最近半月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 15)
      return [start, end]
    },
  },
  {
    text: '最近一月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
]

const onSubmit = () => {
  console.log('submit!')
}
</script>

<style>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}

.el-form--inline .el-form-item {
  margin-bottom: 12px;
  margin-right: 12px;
}
</style>
