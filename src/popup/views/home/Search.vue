<template>
  <div class="jq-app-search">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="日期">
        <el-date-picker v-model="formInline.date" type="date" clearable />
      </el-form-item>
      <el-form-item label="单词">
        <el-input v-model="formInline.user" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const formInline = reactive({
  user: '',
  region: '',
  date: '',
})

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
