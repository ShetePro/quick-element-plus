<template>
  <div class="demo-container">
    <h2>Upload 上传演示</h2>
    <p class="desc">BasicUpload 文件上传组件，支持单文件/多文件上传、大小限制</p>
    <el-divider />

    <el-card>
      <template #header>
        <span>BasicUpload 基础用法</span>
      </template>
      <BasicUpload
        v-model="fileUrl"
        action="/api/upload"
        accept=".jpg,.png,.pdf"
        :max-size="5"
        button-text="选择文件"
        @success="handleSuccess"
        @error="handleError"
      />
      <div class="upload-info" v-if="fileUrl">
        <p>已上传文件: <el-tag>{{ fileUrl }}</el-tag></p>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BasicUpload } from 'quick-element-plus'

const fileUrl = ref('')

function handleSuccess(response: any, file: any) {
  console.log('上传成功:', response, file)
}

function handleError(error: any, file: any) {
  console.log('上传失败:', error, file)
}
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
.upload-info {
  margin-top: 20px;
}
</style>