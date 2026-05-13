<template>
  <div class="demo-container">
    <h2>Button 按钮演示</h2>
    <p class="desc">ExportButton 导出按钮 + ImportButton 导入按钮 + PermissionButton 权限按钮</p>
    <el-divider />

    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <template #header>
            <span>ExportButton 导出按钮</span>
          </template>
          <ExportButton api="/api/export" label="导出数据" />
          <p class="tip">点击按钮将调用导出接口，下载 Excel 文件</p>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <template #header>
            <span>ImportButton 导入按钮</span>
          </template>
          <ImportButton api="/api/import" label="导入数据" @confirm="handleImportConfirm" />
          <p class="tip">点击按钮选择文件上传，支持 .xls/.xlsx 格式</p>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <template #header>
            <span>PermissionButton 权限按钮</span>
          </template>
          <PermissionButton label="新增" permission="create" type="primary" />
          <PermissionButton label="编辑" permission="update" type="warning" />
          <PermissionButton label="删除" permission="delete" type="danger" />
          <p class="tip">根据权限配置显示/隐藏按钮</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ExportButton, ImportButton, PermissionButton } from 'quick-element-plus'

function handleImportConfirm() {
  console.log('导入成功')
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
.tip {
  color: #999;
  font-size: 12px;
  margin-top: 10px;
}
</style>