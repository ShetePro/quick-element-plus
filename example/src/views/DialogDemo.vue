<template>
  <div class="demo-container">
    <h2>Dialog 对话框演示</h2>
    <p class="desc">BasicDialog 对话框组件，支持配置化内容、拖拽、自定义 footer</p>
    <el-divider />

    <el-card>
      <template #header>
        <span>BasicDialog 基础用法</span>
      </template>
      <el-button type="primary" @click="openDialog">
        打开对话框
      </el-button>
      <BasicDialog ref="dialogRef" title="编辑用户" width="500px" :show-footer="true" @submit="handleSubmit">
        <el-form :model="dialogForm" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="dialogForm.username" />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="dialogForm.email" />
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="dialogForm.status">
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-form>
      </BasicDialog>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BasicDialog } from 'quick-element-plus'

const dialogRef = ref()

const dialogForm = ref({
  username: '',
  email: '',
  status: undefined
})

function openDialog() {
  dialogRef.value?.showDialog()
}

function handleSubmit() {
  console.log('提交数据:', dialogForm.value)
  dialogRef.value?.hideDialog()
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
</style>