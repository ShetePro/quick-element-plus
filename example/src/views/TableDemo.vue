<template>
  <div class="demo-container">
    <h2>BasicTable 表格演示</h2>
    <p class="desc">配置化表格，支持分页、加载状态、字典数据渲染</p>
    <el-divider />

    <el-card>
      <template #header>
        <span>基础用法 + useTable Hook</span>
      </template>
      <BasicTable :register="register" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { BasicTable } from 'quick-element-plus'
import { useTable } from 'quick-element-plus'

const mockData = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', status: 1 },
  { id: 2, name: '李四', email: 'lisi@example.com', status: 0 },
  { id: 3, name: '王五', email: 'wangwu@example.com', status: 1 },
  { id: 4, name: '赵六', email: 'zhaoliu@example.com', status: 0 },
  { id: 5, name: '钱七', email: 'qianqi@example.com', status: 1 }
]

const { register } = useTable({
  api: async () => {
    return {
      data: mockData,
      total: mockData.length
    }
  },
  options: {
    columns: [
      { label: 'ID', prop: 'id', width: 80 },
      { label: '姓名', prop: 'name' },
      { label: '邮箱', prop: 'email' },
      { label: '状态', prop: 'status', dict: { 0: '禁用', 1: '启用' } }
    ],
    pagination: true
  }
})
</script>

<style scoped>
.demo-container { max-width: 1000px; }
h2 { margin: 0 0 10px 0; }
.desc { color: #666; margin-bottom: 20px; }
</style>