<template>
  <div class="demo-container">
    <h2>Radio 单选演示</h2>
    <p class="desc">BasicRadio 单选组件，支持字典数据配置</p>
    <el-divider />

    <el-card>
      <template #header>
        <span>BasicRadio 基础用法</span>
      </template>
      <el-form label-width="80px">
        <el-form-item label="状态">
          <BasicRadio v-model="radioValue" :dict-data="statusOptions" />
        </el-form-item>
        <el-form-item label="当前值">
          <el-tag>{{ radioValue }}</el-tag>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BasicRadio } from 'quick-element-plus'

const radioValue = ref(undefined)
const statusOptions = [
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 },
  { label: '待审核', value: 2 }
]
</script>

<style scoped>
.demo-container {
  max-width: 600px;
}
h2 {
  margin: 0 0 10px 0;
}
.desc {
  color: #666;
  margin-bottom: 20px;
}
</style>