<template>
  <div class="jq-nt-home" @keyup.enter="toTarget">
    <el-image class="jq-nt-home-ico" src="../../assets/icon.ico" />
    <el-input ref="inputRef" v-model="keyword" placeholder="请输入关键字" class="jq-nt-home-search">
      <template #prepend>
        <el-select v-model="select" placeholder="" style="width: 115px" value-key="label">
          <template slot="prefix">
            <el-image :src="select.icon"/>
          </template>
          <el-option v-for="item in searchOptions" :key="item.label" :label="item.label" :value="item">
            <el-image :src="item.icon" slot="label"/>
          </el-option>
        </el-select>
      </template>
      <template #append>
        <el-button :icon="Search" @click="toTarget" />
      </template>
    </el-input>
  </div>
</template>

<script setup lang="ts">
import { Ref, nextTick, onMounted, ref, watch } from 'vue'
import { ElInput } from 'element-plus'
import { Search } from '@element-plus/icons-vue'

interface SearchOption {
  label: string;
  searchPrefix: string;
  icon: string;
}

const searchOptions: Ref<SearchOption[]> = ref([
  {
    label: '谷歌',
    icon: '../../assets/google.svg',
    searchPrefix: 'https://www.google.com/search?q=',
  },
  {
    label: '百度',
    icon: '../../assets/baidu.svg',
    searchPrefix: 'https://www.baidu.com/s?wd=',
  },
  {
    label: '必应',
    icon: '../../assets/Bing.svg',
    searchPrefix: 'https://cn.bing.com/search?q=',
  },
  {
    label: '搜狗',
      icon: '../../assets/sougou.svg',
    searchPrefix: 'https://www.sogou.com/web?query=',
  },
  {
    label: '知乎',
    icon: '../../assets/zhihu.svg',
    searchPrefix: 'https://www.zhihu.com/search?type=content&q=',
  },
  {
    label: 'Github',
    icon: '../../assets/github.svg',
    searchPrefix: 'https://github.com/search?q=',
  },
  {
    label: 'Duckduckgo',
    icon: '../../assets/DuckDuckGo.svg',
    searchPrefix: 'https://duckduckgo.com/?q=',
  }
])

const inputRef: Ref<InstanceType<typeof ElInput> | undefined> = ref()

const input1 = ref('')
const input2 = ref('')
const keyword = ref('')
const select: Ref<SearchOption> = ref(searchOptions.value[0])

watch(select, (val) => {
  console.log(val, 'keyword')
  console.log(inputRef.value)

})

const inputFocus = async () => {
  await nextTick()
  inputRef.value?.focus()
  console.log(inputRef)
}

onMounted(async () => {
  inputFocus()
})

const toTarget = () => {
  console.log('hhhh')
  window.open(select.value.searchPrefix + keyword.value)
}

</script>

<style lang="scss" scoped>
.jq-nt-home {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 3em;

  &-ico {
    width: 81px;
  }

  :deep(.jq-nt-home-search) {
    width: 80%;
    max-width: 600px;
    padding-bottom: 20%;

    .el-input__wrapper {
      height: 3.5em;
    }

    .el-select {
      height: 100%;
      width: 6em !important;

      &__wrapper {
        height: 100%;
      }
    }

    .el-input-group__append {
      width: 2em;
    }
  }
}
</style>