<template>
  <div class="demo-container">
    <h2>Form 表单演示</h2>
    <p class="desc">BasicForm 基础表单 + SearchForm 搜索表单，支持配置化表单项</p>
    <el-divider />

    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <template #header>
            <span>BasicForm 基础表单</span>
          </template>
          <BasicForm v-model="formData" :option="formOption" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>
            <span>SearchForm 搜索表单</span>
          </template>
          <SearchForm v-model="searchData" :option="searchOption" @search="handleSearch" @reset="handleReset" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BasicForm, SearchForm } from 'quick-element-plus'

const formData = ref({
  username: '',
  email: '',
  status: undefined
})

const formOption = {
  labelWidth: '100px',
  column: [
    { label: '用户名', prop: 'username', type: 'input', span: 24, rules: [{ required: true, message: '请输入用户名' }] },
    { label: '邮箱', prop: 'email', type: 'input', span: 24 },
    { label: '状态', prop: 'status', type: 'select', span: 24, dictData: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }] }
  ]
}

const searchData = ref({
  keyword: '',
  status: undefined
})

const searchOption = {
  labelWidth: '80px',
  column: [
    { label: '关键词', prop: 'keyword', type: 'input', span: 8 },
    { label: '状态', prop: 'status', type: 'select', span: 8, dictData: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }] }
  ]
}

function handleSearch(data: Record<string, any>) {
  console.log('搜索条件:', data)
}

function handleReset() {
  console.log('重置搜索')
}
</script>

<style scoped>
.demo-container {
  max-width: 1200px;
}
h2 {
  margin: 0 0 10px 0;
}
.desc {
  color: #666;
  margin-bottom: 20px;
}
</style>