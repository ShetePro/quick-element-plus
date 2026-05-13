<template>
  <div class="demo-container">
    <h2>Pagination 分页演示</h2>
    <p class="desc">BasicPagination 分页组件，支持页码切换、每页条数调整</p>
    <el-divider />

    <el-card>
      <template #header>
        <span>BasicPagination 基础用法</span>
      </template>
      <div class="pagination-info">
        <p>当前页: <el-tag>{{ pagination.currentPage }}</el-tag></p>
        <p>每页条数: <el-tag>{{ pagination.pageSize }}</el-tag></p>
        <p>总条数: <el-tag>{{ pagination.total }}</el-tag></p>
      </div>
      <BasicPagination :pagination="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { BasicPagination } from 'quick-element-plus'

const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 100,
  pageSizes: [10, 20, 30, 50],
  background: true
})

function handleSizeChange() {
  console.log('每页条数变更:', pagination.pageSize)
}

function handleCurrentChange() {
  console.log('页码变更:', pagination.currentPage)
}
</script>

<style scoped>
.demo-container {
  max-width: 800px;
}
h2 {
  margin: 0 0 10px 0;
}
.desc {
  color: #666;
  margin-bottom: 20px;
}
.pagination-info {
  margin-bottom: 20px;
}
.pagination-info p {
  margin: 5px 0;
}
</style>