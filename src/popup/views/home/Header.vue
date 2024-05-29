<template>
  <div class="jq-app-header">
    <div class="jq-ah">
      <div class="jq-ah-title">
        {{ title }}
      </div>
      <div class="jq-ah-handle">
        <slot>
          <el-button type="primary">Primary</el-button>
          <el-button type="danger">Danger</el-button>
        </slot>
      </div>
    </div>
    <el-divider />
  </div>
</template>

<script setup lang="ts">

interface Props {
  title: string;
}

import { withDefaults } from 'vue';

withDefaults(defineProps<Props>(), {
  title: '默认标题'
})

</script>

<style lang="scss" scoped>
.jq-ah {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 12px 18px 0;
}

.el-divider.el-divider--horizontal {
    margin: 0;
    display: block;
    padding: 0 0 12px;
    margin-top: 12px;
}
</style>