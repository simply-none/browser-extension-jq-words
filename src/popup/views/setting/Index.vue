<template>
  <div>
    <div>
      <el-checkbox-group v-model="checkedCities" :min="1" :max="3">
        <el-checkbox v-for="city in wordTypes" :key="city" :label="city" :value="city">
          {{ city }}
        </el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

const checkedCities = ref(['Shanghai', 'Beijing'])
const wordTypes: DictType[] = ['bing', 'youdao', 'collins', 'jinshan', 'longman', 'cambridge', 'webster', 'oxford', 'vocabulary', 'wordreference', 'haici']

</script>
