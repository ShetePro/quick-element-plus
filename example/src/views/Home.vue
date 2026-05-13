<template>
  <div class="home">
    <el-card>
      <template #header>
        <h1>Quick Element Plus Demo</h1>
      </template>
      <p>基于 Element Plus 的企业级业务组件库演示站点</p>
      <el-divider />
      <h3>组件列表</h3>
      <el-row :gutter="20">
        <el-col :span="8" v-for="item in components" :key="item.path">
          <el-card shadow="hover" style="margin-bottom: 20px; cursor: pointer" @click="$router.push(item.path)">
            <h4>{{ item.name }}</h4>
            <p style="color: #999">{{ item.desc }}</p>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
const components = [
  { path: '/table', name: 'BasicTable', desc: '配置化表格 + 分页 + useTable' },
  { path: '/form', name: 'BasicForm / SearchForm', desc: '基础表单 + 搜索表单' },
  { path: '/dialog', name: 'BasicDialog', desc: '对话框组件 + useDialog' },
  { path: '/button', name: 'Button 系列', desc: '导出/导入/权限按钮' },
  { path: '/select', name: 'BasicSelect', desc: '选择器 + 字典支持' },
  { path: '/radio', name: 'BasicRadio', desc: '单选组件' },
  { path: '/pagination', name: 'BasicPagination', desc: '分页组件' },
  { path: '/upload', name: 'BasicUpload', desc: '文件上传组件' },
  { path: '/icon', name: 'Icon', desc: '图标组件' }
]
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
}
h1 {
  margin: 0;
}
</style>