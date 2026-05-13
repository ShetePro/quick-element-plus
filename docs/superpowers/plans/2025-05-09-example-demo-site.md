# Example Demo Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 创建 example 子包作为 quick-element-plus 组件库的完整演示站点，展示所有 9 个组件。

**Architecture:** 采用 Vue 3 + Vite 8 + Vue Router 构建 SPA，使用 Element Plus 布局组件（侧边栏 + 内容区），通过 pnpm workspace 依赖引用 quick-element-plus。

**Tech Stack:** Vue 3.5, Vite 8, Vue Router 4, Element Plus 2.13+, TypeScript 5.0+, pnpm workspace

---

## File Structure

```
example/
├── package.json           # 子包配置，依赖 quick-element-plus
├── vite.config.ts         # Vite 8 配置
├── tsconfig.json          # TypeScript 配置
├── index.html             # HTML 入口
└── src/
    ├── main.ts            # Vue 应用入口，挂载 Element Plus
    ├── App.vue            # 布局：el-container + el-menu + router-view
    ├── router/
    │   └── index.ts       # 9 个路由配置
    └── views/
        ├── TableDemo.vue      # BasicTable + useTable 演示
        ├── FormDemo.vue       # BasicForm + SearchForm 演示
        ├── DialogDemo.vue     # BasicDialog + useDialog 演示
        ├── ButtonDemo.vue     # 三个按钮组件演示
        ├── SelectDemo.vue     # BasicSelect + ColorSelect 演示
        ├── RadioDemo.vue      # BasicRadio 演示
        ├── PaginationDemo.vue # BasicPagination 演示
        ├── UploadDemo.vue     # BasicUpload 演示
        └── IconDemo.vue       # Icon 演示
```

**Modified:**
- `pnpm-workspace.yaml` - 添加 `example` 到 packages 列表

---

### Task 1: 创建 example 目录结构和基础配置

**Files:**
- Create: `example/package.json`
- Create: `example/vite.config.ts`
- Create: `example/tsconfig.json`
- Create: `example/index.html`
- Modify: `pnpm-workspace.yaml`

- [ ] **Step 1: 更新 pnpm-workspace.yaml**

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'  # 存放组件源码
  - 'doc'         # 存放 VitePress 文档
  - 'example'     # 存放演示站点
```

- [ ] **Step 2: 创建 example/package.json**

```json
{
  "name": "example",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.5.0",
    "vue-router": "^4.0.0",
    "element-plus": "^2.13.0",
    "quick-element-plus": "workspace:*"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^6.0.0",
    "vite": "^8.0.0",
    "typescript": "^5.0.0",
    "vue-tsc": "^2.0.0"
  }
}
```

- [ ] **Step 3: 创建 example/vite.config.ts**

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000
  }
})
```

- [ ] **Step 4: 创建 example/tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "baseUrl": ".",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "strict": true,
    "skipLibCheck": true,
    "paths": {
      "@/*": ["./src/*"]
    },
    "types": ["node"]
  },
  "include": ["src/**/*.ts", "src/**/*.vue", "vite.config.ts"]
}
```

- [ ] **Step 5: 创建 example/index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quick Element Plus Demo</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

- [ ] **Step 6: 提交基础配置**

```bash
git add pnpm-workspace.yaml example/package.json example/vite.config.ts example/tsconfig.json example/index.html
git commit -m "feat(example): 初始化演示站点基础配置"
```

---

### Task 2: 创建 Vue 应用入口和路由配置

**Files:**
- Create: `example/src/main.ts`
- Create: `example/src/router/index.ts`

- [ ] **Step 1: 创建 example/src/main.ts**

```typescript
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
```

- [ ] **Step 2: 创建 example/src/router/index.ts**

```typescript
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/Home.vue') },
  { path: '/table', name: 'Table', component: () => import('@/views/TableDemo.vue') },
  { path: '/form', name: 'Form', component: () => import('@/views/FormDemo.vue') },
  { path: '/dialog', name: 'Dialog', component: () => import('@/views/DialogDemo.vue') },
  { path: '/button', name: 'Button', component: () => import('@/views/ButtonDemo.vue') },
  { path: '/select', name: 'Select', component: () => import('@/views/SelectDemo.vue') },
  { path: '/radio', name: 'Radio', component: () => import('@/views/RadioDemo.vue') },
  { path: '/pagination', name: 'Pagination', component: () => import('@/views/PaginationDemo.vue') },
  { path: '/upload', name: 'Upload', component: () => import('@/views/UploadDemo.vue') },
  { path: '/icon', name: 'Icon', component: () => import('@/views/IconDemo.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

- [ ] **Step 3: 提交入口和路由**

```bash
git add example/src/main.ts example/src/router/index.ts
git commit -m "feat(example): 创建 Vue 应用入口和路由配置"
```

---

### Task 3: 创建布局组件 App.vue

**Files:**
- Create: `example/src/App.vue`

- [ ] **Step 1: 创建 example/src/App.vue**

```vue
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
```

- [ ] **Step 2: 提交布局组件**

```bash
git add example/src/App.vue
git commit -m "feat(example): 创建布局组件，侧边栏导航 + 内容区"
```

---

### Task 4: 创建首页 Home.vue

**Files:**
- Create: `example/src/views/Home.vue`

- [ ] **Step 1: 创建 example/src/views/Home.vue**

```vue
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
```

- [ ] **Step 2: 提交首页**

```bash
git add example/src/views/Home.vue
git commit -m "feat(example): 创建首页，展示组件列表"
```

---

### Task 5: 创建 TableDemo.vue

**Files:**
- Create: `example/src/views/TableDemo.vue`

- [ ] **Step 1: 创建 example/src/views/TableDemo.vue**

```vue
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

// 模拟 API 数据
const mockData = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', status: 1 },
  { id: 2, name: '李四', email: 'lisi@example.com', status: 0 },
  { id: 3, name: '王五', email: 'wangwu@example.com', status: 1 },
  { id: 4, name: '赵六', email: 'zhaoliu@example.com', status: 0 },
  { id: 5, name: '钱七', email: 'qianqi@example.com', status: 1 }
]

const { register } = useTable({
  api: async () => {
    // 模拟 API 响应
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
.demo-container {
  max-width: 1000px;
}
h2 {
  margin: 0 0 10px 0;
}
.desc {
  color: #666;
  margin-bottom: 20px;
}
</style>
```

- [ ] **Step 2: 提交 TableDemo**

```bash
git add example/src/views/TableDemo.vue
git commit -m "feat(example): 创建 TableDemo 演示页面"
```

---

### Task 6: 创建 FormDemo.vue

**Files:**
- Create: `example/src/views/FormDemo.vue`

- [ ] **Step 1: 创建 example/src/views/FormDemo.vue**

```vue
<template>
  <div class="demo-container">
    <h2>Form 表单演示</h2>
    <p class="desc">BasicForm 基础表单 + SearchForm 搜索表单</p>
    <el-divider />
    
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <template #header>
            <span>BasicForm 基础表单</span>
          </template>
          <BasicForm v-model="formData" :options="formOptions" />
          <el-button type="primary" @click="handleSubmit">提交</el-button>
          <pre style="margin-top: 20px; background: #f5f5f5; padding: 10px">{{ JSON.stringify(formData, null, 2) }}</pre>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>
            <span>SearchForm 搜索表单</span>
          </template>
          <SearchForm v-model="searchData" :option="searchOption" @search="handleSearch" />
          <pre style="margin-top: 20px; background: #f5f5f5; padding: 10px">{{ JSON.stringify(searchData, null, 2) }}</pre>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { BasicForm, SearchForm } from 'quick-element-plus'
import { ref } from 'vue'

const formData = ref({
  username: '',
  email: '',
  role: ''
})

const formOptions = {
  columns: [
    { label: '用户名', prop: 'username', type: 'input', required: true },
    { label: '邮箱', prop: 'email', type: 'input' },
    { label: '角色', prop: 'role', type: 'select', options: [{ label: '管理员', value: 'admin' }, { label: '用户', value: 'user' }] }
  ]
}

const searchData = ref({
  keyword: '',
  status: ''
})

const searchOption = {
  column: [
    { label: '关键词', prop: 'keyword', type: 'text' },
    { label: '状态', prop: 'status', type: 'select', options: [{ label: '全部', value: '' }, { label: '启用', value: '1' }, { label: '禁用', value: '0' }] }
  ]
}

function handleSubmit() {
  console.log('表单数据:', formData.value)
}

function handleSearch() {
  console.log('搜索条件:', searchData.value)
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
</style>
```

- [ ] **Step 2: 提交 FormDemo**

```bash
git add example/src/views/FormDemo.vue
git commit -m "feat(example): 创建 FormDemo 演示页面"
```

---

### Task 7: 创建 DialogDemo.vue

**Files:**
- Create: `example/src/views/DialogDemo.vue`

- [ ] **Step 1: 创建 example/src/views/DialogDemo.vue**

```vue
<template>
  <div class="demo-container">
    <h2>Dialog 对话框演示</h2>
    <p class="desc">BasicDialog 对话框组件，支持配置化内容</p>
    <el-divider />
    
    <el-card>
      <template #header>
        <span>基础用法</span>
      </template>
      <el-button type="primary" @click="visible = true">打开对话框</el-button>
      
      <BasicDialog
        v-model="visible"
        title="编辑用户"
        width="500px"
      >
        <el-form :model="dialogForm" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="dialogForm.username" />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="dialogForm.email" />
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="visible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm">确认</el-button>
        </template>
      </BasicDialog>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { BasicDialog } from 'quick-element-plus'
import { ref } from 'vue'

const visible = ref(false)
const dialogForm = ref({
  username: '',
  email: ''
})

function handleConfirm() {
  console.log('确认:', dialogForm.value)
  visible.value = false
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
```

- [ ] **Step 2: 提交 DialogDemo**

```bash
git add example/src/views/DialogDemo.vue
git commit -m "feat(example): 创建 DialogDemo 演示页面"
```

---

### Task 8: 创建 ButtonDemo.vue

**Files:**
- Create: `example/src/views/ButtonDemo.vue`

- [ ] **Step 1: 创建 example/src/views/ButtonDemo.vue**

```vue
<template>
  <div class="demo-container">
    <h2>Button 按钮演示</h2>
    <p class="desc">ExportButton 导出按钮 / ImportButton 导入按钮 / PermissionButton 权限按钮</p>
    <el-divider />
    
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <template #header>
            <span>ExportButton 导出按钮</span>
          </template>
          <ExportButton @click="handleExport">导出数据</ExportButton>
          <p style="margin-top: 10px; color: #666">点击触发导出事件</p>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <template #header>
            <span>ImportButton 导入按钮</span>
          </template>
          <ImportButton @click="handleImport">导入数据</ImportButton>
          <p style="margin-top: 10px; color: #666">点击触发导入事件</p>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <template #header>
            <span>PermissionButton 权限按钮</span>
          </template>
          <PermissionButton permission="user:edit">编辑用户</PermissionButton>
          <p style="margin-top: 10px; color: #666">需权限 user:edit</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ExportButton, ImportButton, PermissionButton } from 'quick-element-plus'

function handleExport() {
  console.log('触发导出')
}

function handleImport() {
  console.log('触发导入')
}
</script>

<style scoped>
.demo-container {
  max-width: 1000px;
}
h2 {
  margin: 0 0 10px 0;
}
.desc {
  color: #666;
  margin-bottom: 20px;
}
</style>
```

- [ ] **Step 2: 提交 ButtonDemo**

```bash
git add example/src/views/ButtonDemo.vue
git commit -m "feat(example): 创建 ButtonDemo 演示页面"
```

---

### Task 9: 创建 SelectDemo.vue

**Files:**
- Create: `example/src/views/SelectDemo.vue`

- [ ] **Step 1: 创建 example/src/views/SelectDemo.vue**

```vue
<template>
  <div class="demo-container">
    <h2>Select 选择器演示</h2>
    <p class="desc">BasicSelect 基础选择器 + ColorSelect 颜色选择器</p>
    <el-divider />
    
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <template #header>
            <span>BasicSelect 基础选择器</span>
          </template>
          <BasicSelect
            v-model="selectedValue"
            :options="selectOptions"
            placeholder="请选择"
          />
          <p style="margin-top: 10px">当前值: {{ selectedValue }}</p>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>
            <span>ColorSelect 颜色选择器</span>
          </template>
          <ColorSelect v-model="colorValue" />
          <p style="margin-top: 10px">当前颜色: {{ colorValue }}</p>
          <div style="width: 50px; height: 20px; background: {{ colorValue }}; border: 1px solid #ddd"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { BasicSelect, ColorSelect } from 'quick-element-plus'
import { ref } from 'vue'

const selectedValue = ref('')
const selectOptions = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' }
]

const colorValue = ref('#409EFF')
</script>

<style scoped>
.demo-container {
  max-width: 1000px;
}
h2 {
  margin: 0 0 10px 0;
}
.desc {
  color: #666;
  margin-bottom: 20px;
}
</style>
```

- [ ] **Step 2: 提交 SelectDemo**

```bash
git add example/src/views/SelectDemo.vue
git commit -m "feat(example): 创建 SelectDemo 演示页面"
```

---

### Task 10: 创建 RadioDemo.vue

**Files:**
- Create: `example/src/views/RadioDemo.vue`

- [ ] **Step 1: 创建 example/src/views/RadioDemo.vue**

```vue
<template>
  <div class="demo-container">
    <h2>Radio 单选演示</h2>
    <p class="desc">BasicRadio 单选组件</p>
    <el-divider />
    
    <el-card>
      <template #header>
        <span>基础用法</span>
      </template>
      <BasicRadio
        v-model="radioValue"
        :options="radioOptions"
      />
      <p style="margin-top: 10px">当前值: {{ radioValue }}</p>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { BasicRadio } from 'quick-element-plus'
import { ref } from 'vue'

const radioValue = ref('1')
const radioOptions = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' }
]
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
</style>
```

- [ ] **Step 2: 提交 RadioDemo**

```bash
git add example/src/views/RadioDemo.vue
git commit -m "feat(example): 创建 RadioDemo 演示页面"
```

---

### Task 11: 创建 PaginationDemo.vue

**Files:**
- Create: `example/src/views/PaginationDemo.vue`

- [ ] **Step 1: 创建 example/src/views/PaginationDemo.vue**

```vue
<template>
  <div class="demo-container">
    <h2>Pagination 分页演示</h2>
    <p class="desc">BasicPagination 分页组件</p>
    <el-divider />
    
    <el-card>
      <template #header>
        <span>基础用法</span>
      </template>
      <BasicPagination
        :total="100"
        :page-size="10"
        :current-page="currentPage"
        @change="handlePageChange"
      />
      <p style="margin-top: 10px">当前页: {{ currentPage }}</p>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { BasicPagination } from 'quick-element-plus'
import { ref } from 'vue'

const currentPage = ref(1)

function handlePageChange(page: number) {
  currentPage.value = page
  console.log('切换到第', page, '页')
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
</style>
```

- [ ] **Step 2: 提交 PaginationDemo**

```bash
git add example/src/views/PaginationDemo.vue
git commit -m "feat(example): 创建 PaginationDemo 演示页面"
```

---

### Task 12: 创建 UploadDemo.vue

**Files:**
- Create: `example/src/views/UploadDemo.vue`

- [ ] **Step 1: 创建 example/src/views/UploadDemo.vue**

```vue
<template>
  <div class="demo-container">
    <h2>Upload 上传演示</h2>
    <p class="desc">BasicUpload 文件上传组件</p>
    <el-divider />
    
    <el-card>
      <template #header>
        <span>基础用法</span>
      </template>
      <BasicUpload
        v-model="fileList"
        action="/api/upload"
        :limit="3"
      />
      <p style="margin-top: 10px">已上传文件: {{ fileList.length }} 个</p>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { BasicUpload } from 'quick-element-plus'
import { ref } from 'vue'

const fileList = ref([])
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
</style>
```

- [ ] **Step 2: 提交 UploadDemo**

```bash
git add example/src/views/UploadDemo.vue
git commit -m "feat(example): 创建 UploadDemo 演示页面"
```

---

### Task 13: 创建 IconDemo.vue

**Files:**
- Create: `example/src/views/IconDemo.vue`

- [ ] **Step 1: 创建 example/src/views/IconDemo.vue**

```vue
<template>
  <div class="demo-container">
    <h2>Icon 图标演示</h2>
    <p class="desc">Icon 图标组件</p>
    <el-divider />
    
    <el-card>
      <template #header>
        <span>基础用法</span>
      </template>
      <el-row :gutter="20">
        <el-col :span="4" v-for="icon in icons" :key="icon">
          <div style="text-align: center; padding: 20px; border: 1px solid #eee; margin-bottom: 10px">
            <Icon :icon="icon" size="32" />
            <p style="margin-top: 10px; font-size: 12px">{{ icon }}</p>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { Icon } from 'quick-element-plus'

const icons = [
  'ep:user',
  'ep:setting',
  'ep:document',
  'ep:edit',
  'ep:delete',
  'ep:search',
  'ep:upload',
  'ep:download'
]
</script>

<style scoped>
.demo-container {
  max-width: 1000px;
}
h2 {
  margin: 0 0 10px 0;
}
.desc {
  color: #666;
  margin-bottom: 20px;
}
</style>
```

- [ ] **Step 2: 提交 IconDemo**

```bash
git add example/src/views/IconDemo.vue
git commit -m "feat(example): 创建 IconDemo 演示页面"
```

---

### Task 14: 安装依赖并验证

- [ ] **Step 1: 安装依赖**

```bash
pnpm install
```

预期：example 子包依赖安装成功，workspace 依赖 quick-element-plus 解析正常。

- [ ] **Step 2: 启动开发服务器**

```bash
cd example && pnpm dev
```

预期：Vite 服务器启动，访问 http://localhost:3000 显示演示站点。

- [ ] **Step 3: 验证功能**

检查以下内容：
1. 首页组件列表卡片可点击跳转
2. 侧边栏导航切换正常
3. 各组件演示页面正常渲染
4. quick-element-plus 组件正常工作

---

## Self-Review

**1. Spec coverage:** 
- ✓ 创建 example 子包 - Task 1
- ✓ Vue 3 + Vite 8 + Vue Router - Task 1, 2, 3
- ✓ 侧边栏导航布局 - Task 3
- ✓ 首页 - Task 4
- ✓ TableDemo - Task 5
- ✓ FormDemo - Task 6
- ✓ DialogDemo - Task 7
- ✓ ButtonDemo - Task 8
- ✓ SelectDemo - Task 9
- ✓ RadioDemo - Task 10
- ✓ PaginationDemo - Task 11
- ✓ UploadDemo - Task 12
- ✓ IconDemo - Task 13
- ✓ 安装验证 - Task 14

**2. Placeholder scan:** 无 TBD/TODO，所有步骤包含完整代码。

**3. Type consistency:** 路由路径、组件引用保持一致。