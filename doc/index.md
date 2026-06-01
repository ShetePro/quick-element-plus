# Quick Element Plus

基于 Element Plus 的快速组件库，提供常用的业务组件，帮助开发者快速构建企业级应用。

## 特性

- 🚀 基于 Element Plus，开箱即用
- 📦 提供常用业务组件
- 🎨 统一的组件 API 设计
- 📝 完整的 TypeScript 支持
- 🔧 支持 Monorepo 架构

## 快速开始

### 安装

```bash
pnpm add quick-element-plus
```

### 使用

```vue
<script setup>
import { BasicTable, useTable } from 'quick-element-plus'

const { register, getList } = useTable({
  api: '/api/users',
  options: {
    columns: [
      { label: '用户名', prop: 'username' },
      { label: '邮箱', prop: 'email' }
    ]
  }
})
</script>

<template>
  <BasicTable :register="register" />
</template>
```

## 组件列表

- [**Button 按钮**](/components/button) - 按钮组件（导出、导入、权限按钮）
- [**Dialog 对话框**](/components/dialog) - 对话框组件
- [**Form 表单**](/components/form) - 表单组件（基础表单、搜索表单）
- [**Table 表格**](/components/table) - 表格组件
- [**Pagination 分页**](/components/pagination) - 分页组件
- [**Radio 单选**](/components/radio) - 单选组件
- [**Select 选择器**](/components/select) - 选择器组件（基础选择器、颜色选择器）
- [**Upload 上传**](/components/upload) - 文件上传组件

## 项目结构

```
packages/
  ├── components/    # 组件源码
  ├── hook/          # 组合式函数
  ├── utils/          # 工具函数
  └── enum/          # 枚举定义
example/              # 演示站点
doc/                  # 文档站点
```

## 开发

本项目使用 Monorepo 架构，使用 pnpm workspace 管理。
