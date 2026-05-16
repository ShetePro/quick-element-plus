<template>
  <div class="color-select w-full">
    <el-color-picker v-model="modelValue" />
  </div>
</template>

<script setup lang="ts">
const modelValue = defineModel()
</script>

<style scoped>
.color-select {
  width: 100%;
}
</style>
