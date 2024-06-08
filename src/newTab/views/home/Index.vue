<template>
  <div class="jq-nt-home" @keyup.enter="toTarget" @click="inputFocus">
    <el-image class="jq-nt-home-ico" :src="icon" />
    <el-input ref="inputRef" v-model="keyword" placeholder="请输入关键字" class="jq-nt-home-search">
      <template #prepend>
        <el-select v-model="select" placeholder="" style="width: 115px" value-key="icon"
          popper-class="jq-nt-home-select-ops">

          <el-option v-for="item in searchOptions" :key="item.label" :value="item">
            <el-image :src="item.icon" slot="label" />
          </el-option>
          <template #prefix>
            <el-image :src="select.icon" />
          </template>
        </el-select>
      </template>
      <template #append>
        <el-button :icon="Search" @click="toTarget" />
      </template>
    </el-input>
  </div>
</template>

<script setup lang="ts">
import icon from 'public/icon.ico'
import googleSvg from '../../assets/google.svg?url'
import baiduSvg from '../../assets/baidu.svg?url'
import bingSvg from '../../assets/Bing.svg?url'
import sougouSvg from '../../assets/sougou.svg?url'
import zhihuSvg from '../../assets/zhihu.svg?url'
import githubSvg from '../../assets/github.svg?url'
import duckgoSvg from '../../assets/DuckDuckGo.svg?url'
import three60Svg from '../../assets/360so.svg?url'
import yandexSvg from '../../assets/yandex.svg?url'

import { Ref, nextTick, onMounted, ref, watch } from 'vue'
import { ElInput } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { getLocalStorage, setLocalStorage } from '@/utils/storage'

interface SearchOption {
  label: string;
  searchPrefix: string;
  icon: string;
}

const searchOptions: Ref<SearchOption[]> = ref([
  {
    label: '谷歌',
    icon: googleSvg,
    searchPrefix: 'https://www.google.com/search?q=',
  },
  {
    label: '百度',
    icon: baiduSvg,
    searchPrefix: 'https://www.baidu.com/s?wd=',
  },
  {
    label: '必应',
    icon: bingSvg,
    searchPrefix: 'https://cn.bing.com/search?q=',
  },
  {
    label: '搜狗',
    icon: sougouSvg,
    searchPrefix: 'https://www.sogou.com/web?query=',
  },
  {
    label: '360',
    icon: three60Svg,
    searchPrefix: 'https://www.so.com/s?ie=utf-8&q=',
  },
  {
    label: '知乎',
    icon: zhihuSvg,
    searchPrefix: 'https://www.zhihu.com/search?type=content&q=',
  },
  {
    label: 'Github',
    icon: githubSvg,
    searchPrefix: 'https://github.com/search?q=',
  },
  {
    label: 'Duckduckgo',
    icon: duckgoSvg,
    searchPrefix: 'https://duckduckgo.com/?q=',
  },
  {
    label: 'Yandex',
    icon: yandexSvg,
    searchPrefix: 'https://yandex.com/search/?text=',
  }
])

const inputRef: Ref<InstanceType<typeof ElInput> | undefined> = ref()

const keyword = ref('')
const select: Ref<SearchOption> = ref(searchOptions.value[0])

const newTabPrefix = 'newTab:'

const getSelectSearch = async () => {
  let selectSearch = ''
  const items = await getLocalStorage(newTabPrefix + 'selectSeach')
  if (items) {
    selectSearch = items[newTabPrefix + 'selectSeach']
  }
  select.value = searchOptions.value.find(item => item.label === selectSearch) || searchOptions.value[0]
}

const setSelectSearch = () => {
  setLocalStorage({
    [newTabPrefix + 'selectSeach']: select.value.label
  })
}

watch(select, (val) => {
  if (!val) {
    return false
  }
  inputRef.value?.focus()
  setSelectSearch()
})



const inputFocus = async () => {
  await nextTick()
  inputRef.value?.focus()
  console.log(inputRef)
}

onMounted(async () => {
  // await必须在函数内才有效，直接定义在onMounted内无效
  inputFocus()
  getSelectSearch()
})

const toTarget = () => {
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
        display: flex;
        justify-content: center;

        .el-select__selection {
          display: none;
        }

        .el-select__suffix {
          display: none;
        }

        .el-image {
          width: 32px;
        }
      }
    }

    .el-input-group__append {
      width: 2em;

      .el-icon {
        width: 2em;

        svg {
          height: 2em;
          width: 2em;
        }
      }
    }
  }
}

:global(.el-popper.jq-nt-home-select-ops) {
  color: red;
  width: 6em;
  // display: block !important;
}

:global(.el-select-dropdown.jq-nt-home-select-ops) {
  min-width: 6em !important;

}

:global(.el-popper.jq-nt-home-select-ops .el-image) {
  width: 20px;
}

:global(.el-popper.jq-nt-home-select-ops .el-select-dropdown__item) {
  display: flex;
  padding: 0;
  align-content: center;
  justify-content: center;
}
</style>