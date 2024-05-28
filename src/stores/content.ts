import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useContentStore = defineStore('content', () => {

  const searchDialogVisible = ref(false)
  const showSearchDialog = (visible: boolean) => {
    searchDialogVisible.value = visible
  }

  const iconDialogVisible = ref(false)
  const showIconDialog = (visible: boolean) => {
    iconDialogVisible.value = visible
  }

  return {
    searchDialogVisible,
    showSearchDialog,
    iconDialogVisible,
    showIconDialog,
  }
})