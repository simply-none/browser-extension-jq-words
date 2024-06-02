<template>
  <div class="jq-app-search">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <template v-for="([key, type, label]) in formOptions" :key="key">
        <el-form-item :label="label">
          <template v-if="type === 'daterange'">
            <el-date-picker v-model="formInline[key]" type="daterange" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
              unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="截止日期"
              :shortcuts="shortcuts" />
          </template>

          <template v-if="type === 'input'">
            <el-input v-model="formInline[key]" clearable />
          </template>
          <template v-if="type === 'select'">
            <el-select v-model="formInline[key]" multiple collapse-tags collapse-tags-tooltip placeholder="Select"
              style="width: 240px">
              <el-option v-for="item in options[key]" :key="item" :label="item" :value="item" />
            </el-select>
          </template>
        </el-form-item>



      </template>
      <el-form-item>
        <el-button type="primary" @click="searchWords">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { getBeforeDaysToCurDay, getDaysBetweenTwoDate } from '@/utils/common';
import { ref, reactive, withDefaults, computed, watch, toValue, toRaw } from 'vue'
import { ElForm, ElFormItem, ElDatePicker, ElInput, ElButton } from 'element-plus';

interface FormType {
  formOptions: [string, string, string][];
  options?: AnyTypeObj;
}

const props = withDefaults(defineProps<FormType>(), {
  // 非原始类型，需要使用get函数
  formOptions: () => [['word', 'input', '单词'], ['date', 'daterange', '日期']],
  options: () => ({})
})

const emit = defineEmits(['getFormData'])

const formInline1 = computed({
  get() {
    return props.formOptions.reduce((acc, [key, type]) => {
      type === 'input' && (acc[key] = '111')

      const listTypes = ['daterange', 'selct']
      listTypes.includes(type) && (acc[key] = [])
      return acc
    }, {} as { [index: string]: any })
  },
  set() { }
})

const formInline = ref(formInline1.value)

console.log(formInline, 'formInline')

watch(formInline, (val) => {
  console.log(val, 'val')
}, { deep: true, immediate: true })

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

const searchWords = () => {

  emit('getFormData', formInline)

}
</script>

<style>
.el-date-editor.el-input,
.el-date-editor.el-input__wrapper {
  width: 226px;
}

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
