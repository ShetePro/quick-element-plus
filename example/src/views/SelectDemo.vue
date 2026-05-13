<template>
  <div class="demo-container">
    <h2>Select 选择器演示</h2>
    <p class="desc">BasicSelect 选择器 + ColorSelect 颜色选择器，支持字典数据</p>
    <el-divider />

    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <template #header>
            <span>BasicSelect 基础选择器</span>
          </template>
          <el-form label-width="80px">
            <el-form-item label="状态">
              <BasicSelect v-model="selectValue" :dict-data="statusOptions" />
            </el-form-item>
            <el-form-item label="当前值">
              <el-tag>{{ selectValue }}</el-tag>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>
            <span>ColorSelect 颜色选择器</span>
          </template>
          <el-form label-width="80px">
            <el-form-item label="颜色">
              <ColorSelect v-model="colorValue" />
            </el-form-item>
            <el-form-item label="当前值">
              <el-tag :color="colorValue">{{ colorValue || '未选择' }}</el-tag>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BasicSelect, ColorSelect } from 'quick-element-plus'

const selectValue = ref(undefined)
const colorValue = ref('')

const statusOptions = [
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 },
  { label: '待审核', value: 2 }
]
</script>

<style scoped>
.demo-container {
  max-width: 1000px;
}
h2 {
  margin: 0 0 10px 0;
}
.desc {
  color: #666;
  margin-bottom: 20px;
}
</style>