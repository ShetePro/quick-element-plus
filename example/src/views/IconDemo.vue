<template>
  <div class="demo-container">
    <h2>Icon 图标演示</h2>
    <p class="desc">Icon 图标组件，支持 SVG 内置图标和外部图标库</p>
    <el-divider />

    <el-card>
      <template #header>
        <span>内置 SVG 图标</span>
      </template>
      <el-row :gutter="20">
        <el-col :span="6" v-for="icon in svgIcons" :key="icon.name">
          <div class="icon-item">
            <Icon :icon="icon.name" :size="32" />
            <span class="icon-label">{{ icon.label }}</span>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <el-card style="margin-top: 20px">
      <template #header>
        <span>图标样式配置</span>
      </template>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="icon-item">
            <Icon icon="svg-download" :size="24" color="#409EFF" />
            <span class="icon-label">小尺寸 + 蓝色</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="icon-item">
            <Icon icon="svg-upload" :size="48" color="#E6A23C" />
            <span class="icon-label">大尺寸 + 橙色</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="icon-item">
            <Icon icon="svg-export" :size="32" color="#67C23A" />
            <span class="icon-label">中尺寸 + 绿色</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="icon-item">
            <Icon icon="svg-import" :size="32" color="#F56C6C" />
            <span class="icon-label">中尺寸 + 红色</span>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { Icon } from 'quick-element-plus'

const svgIcons = [
  { name: 'svg-download', label: '下载' },
  { name: 'svg-upload', label: '上传' },
  { name: 'svg-export', label: '导出' },
  { name: 'svg-import', label: '导入' }
]
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
.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 4px;
}
.icon-label {
  margin-top: 10px;
  color: #666;
  font-size: 12px;
}
</style>