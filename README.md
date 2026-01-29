# Quick Element Plus

<p align="center">
  <img src="https://img.shields.io/badge/Vue-3.5+-brightgreen.svg" alt="Vue">
  <img src="https://img.shields.io/badge/Element--Plus-2.13+-blue.svg" alt="Element Plus">
  <img src="https://img.shields.io/badge/TypeScript-5.0+-orange.svg" alt="TypeScript">
  <img src="https://img.shields.io/badge/License-ISC-green.svg" alt="License">
</p>

<p align="center">
  基于 Element Plus 的快速业务组件库，提供常用的企业级组件，帮助开发者快速构建中后台应用。
</p>

<p align="center">
  <a href="https://github.com/ShetePro/quick-element-plus">📚 文档</a> | 
  <a href="https://github.com/ShetePro/quick-element-plus">🔧 组件</a> | 
  <a href="https://github.com/ShetePro/quick-element-plus">📦 下载</a>
</p>

---

## ✨ 特性

- 🚀 **基于 Element Plus** - 开箱即用，与 Element Plus 完美兼容
- 📦 **业务组件丰富** - 提供表格、表单、对话框等常用业务组件
- 🎨 **统一 API 设计** - 一致的组件使用体验
- 📝 **TypeScript 支持** - 完整的类型定义
- 🔧 **Monorepo 架构** - 使用 pnpm workspace 管理，便于扩展
- ⚡ **按需引入** - 支持 tree-shaking，减少打包体积

## 📦 安装

```bash
# npm
npm install quick-element-plus

# yarn
yarn add quick-element-plus

# pnpm
pnpm add quick-element-plus
```

## 🚀 快速开始

### 完整引入

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import QuickElementPlus from 'quick-element-plus'
import 'quick-element-plus/dist/quick-element-plus.css'

const app = createApp(App)
app.use(QuickElementPlus)
app.mount('#app')
```

### 按需引入

```vue
<template>
  <div>
    <BasicTable :register="register" />
    <SearchForm v-model="searchData" :option="searchOption" @search="handleSearch" />
  </div>
</template>

<script setup>
import { BasicTable, SearchForm } from 'quick-element-plus'
import { useTable } from 'quick-element-plus'

const { register, getList } = useTable({
  api: '/api/users',
  options: {
    columns: [
      { label: '用户名', prop: 'username' },
      { label: '邮箱', prop: 'email' }
    ]
  }
})

const searchData = ref({})
const searchOption = {
  column: [
    { label: '用户名', prop: 'username', type: 'text' }
  ]
}

function handleSearch() {
  getList()
}
</script>
```

## 📚 组件列表

### 数据展示

| 组件 | 说明 | 文档 |
|------|------|------|
| BasicTable | 表格组件，支持配置化列定义、分页、字典数据 | [查看](./doc/components/table.md) |
| BasicPagination | 分页组件 | [查看](./doc/components/pagination.md) |

### 表单组件

| 组件 | 说明 | 文档 |
|------|------|------|
| BasicForm | 基础表单组件 | [查看](./doc/components/form.md) |
| SearchForm | 搜索表单组件 | [查看](./doc/components/form.md) |
| BasicSelect | 选择器组件，支持字典数据 | [查看](./doc/components/select.md) |
| BasicRadio | 单选组件 | [查看](./doc/components/radio.md) |
| BasicUpload | 文件上传组件 | - |

### 按钮组件

| 组件 | 说明 | 文档 |
|------|------|------|
| ExportButton | 导出按钮 | [查看](./doc/components/button.md) |
| ImportButton | 导入按钮 | [查看](./doc/components/button.md) |
| PermissionButton | 权限按钮 | [查看](./doc/components/button.md) |

### 反馈组件

| 组件 | 说明 | 文档 |
|------|------|------|
| BasicDialog | 对话框组件 | [查看](./doc/components/dialog.md) |

## 🔧 Hooks

| Hook | 说明 |
|------|------|
| useTable | 表格数据管理，自动处理分页、加载状态 |
| useMessage | 消息提示封装 |
| useDict | 字典数据管理 |
| usePermissions | 权限检查 |

## 📁 项目结构

```
quick-element-plus/
├── packages/
│   ├── components/     # 组件源码
│   │   ├── Button/     # 按钮组件
│   │   ├── Dialog/     # 对话框组件
│   │   ├── Form/       # 表单组件
│   │   ├── Table/      # 表格组件
│   │   ├── Select/     # 选择器组件
│   │   └── ...
│   ├── hook/           # 自定义 Hooks
│   ├── utils/          # 工具函数
│   └── enum/           # 枚举定义
├── doc/                # 文档站点 (VitePress)
├── types/              # 类型定义
├── dist/               # 构建产物
├── index.ts            # 入口文件
└── package.json
```

## 🛠️ 开发

```bash
# 克隆项目
git clone https://github.com/ShetePro/quick-element-plus.git
cd quick-element-plus

# 安装依赖
pnpm install

# 启动文档开发服务器
pnpm docs:dev

# 构建组件库
pnpm build

# 构建文档
pnpm docs:build
```

## 📖 文档

在线文档：[https://github.com/ShetePro/quick-element-plus](https://github.com/ShetePro/quick-element-plus)

本地启动文档：

```bash
cd doc
pnpm dev
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 License

[ISC](./LICENSE)

---

<p align="center">
  Made with ❤️ by Quick Element Plus Team
</p>
