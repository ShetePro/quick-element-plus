<template>
  <el-container style="height: 100vh">
    <el-aside width="200px" style="background: #545c64">
      <el-menu
        :default-active="$route.path"
        router
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="/">
          <el-icon><HomeFilled /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/table">
          <el-icon><Grid /></el-icon>
          <span>Table 表格</span>
        </el-menu-item>
        <el-menu-item index="/form">
          <el-icon><Document /></el-icon>
          <span>Form 表单</span>
        </el-menu-item>
        <el-menu-item index="/dialog">
          <el-icon><ChatDotSquare /></el-icon>
          <span>Dialog 对话框</span>
        </el-menu-item>
        <el-menu-item index="/button">
          <el-icon><Mouse /></el-icon>
          <span>Button 按钮</span>
        </el-menu-item>
        <el-menu-item index="/select">
          <el-icon><ArrowDown /></el-icon>
          <span>Select 选择器</span>
        </el-menu-item>
        <el-menu-item index="/radio">
          <el-icon><Check /></el-icon>
          <span>Radio 单选</span>
        </el-menu-item>
        <el-menu-item index="/pagination">
          <el-icon><MoreFilled /></el-icon>
          <span>Pagination 分页</span>
        </el-menu-item>
        <el-menu-item index="/upload">
          <el-icon><Upload /></el-icon>
          <span>Upload 上传</span>
        </el-menu-item>
        <el-menu-item index="/icon">
          <el-icon><Picture /></el-icon>
          <span>Icon 图标</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main style="background: #f5f5f5; padding: 20px">
      <router-view />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import {
  HomeFilled,
  Grid,
  Document,
  ChatDotSquare,
  Mouse,
  ArrowDown,
  Check,
  MoreFilled,
  Upload,
  Picture
} from '@element-plus/icons-vue'
</script>