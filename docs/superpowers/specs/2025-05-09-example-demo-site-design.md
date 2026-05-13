# Example Demo Site Design

## 目标

在根目录创建 `example/` 子包，作为 quick-element-plus 组件库的完整演示站点。

## 技术栈

- Vue 3.5 + Composition API + `<script setup>`
- Vite 8 (latest)
- pnpm workspace
- Vue Router 4 (路由导航)
- Element Plus 2.13+ (UI 基础)
- quick-element-plus (workspace 依赖)

## 目录结构

```
example/
├── package.json           # 独立子包配置
├── vite.config.ts         # Vite 8 配置
├── tsconfig.json          # TypeScript 配置
├── index.html             # HTML 入口
└── src/
    ├── main.ts            # Vue 应用入口
    ├── App.vue            # 布局：侧边栏导航 + 内容区
    ├── router/
    │   └── index.ts       # 路由配置
    └── views/
        ├── TableDemo.vue      # BasicTable + useTable 演示
        ├── FormDemo.vue       # BasicForm + SearchForm 演示
        ├── DialogDemo.vue     # BasicDialog + useDialog 演示
        ├── ButtonDemo.vue     # ExportButton/ImportButton/PermissionButton 演示
        ├── SelectDemo.vue     # BasicSelect + ColorSelect 演示
        ├── RadioDemo.vue      # BasicRadio 演示
        ├── PaginationDemo.vue # BasicPagination 演示
        ├── UploadDemo.vue     # BasicUpload 演示
        └── IconDemo.vue       # Icon 演示
```

## Workspace 配置

更新 `pnpm-workspace.yaml`：
```yaml
packages:
  - 'packages/*'
  - 'doc'
  - 'example'  # 新增
```

## package.json 配置

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

## 路由配置

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | 首页 | 组件库介绍 |
| `/table` | TableDemo | 表格演示 |
| `/form` | FormDemo | 表单演示 |
| `/dialog` | DialogDemo | 对话框演示 |
| `/button` | ButtonDemo | 按钮演示 |
| `/select` | SelectDemo | 选择器演示 |
| `/radio` | RadioDemo | 单选演示 |
| `/pagination` | PaginationDemo | 分页演示 |
| `/upload` | UploadDemo | 上传演示 |
| `/icon` | IconDemo | 图标演示 |

## 布局设计

App.vue 采用 Element Plus 布局组件：
- 左侧：`el-menu` 侧边栏导航
- 右侧：`router-view` 内容区

## 演示页面内容

每个演示页面包含：
1. 组件介绍
2. 基础用法示例
3. 配置选项示例（如 applicable）
4. 与 Hook 配合使用示例（如 applicable）

## 运行命令

```bash
# 在项目根目录
pnpm install          # 安装所有依赖
pnpm --filter example dev  # 启动 example 开发服务器

# 或进入 example 目录
cd example && pnpm dev
```

## 成功标准

1. `example/` 作为独立子包可运行
2. 所有 9 个组件有对应演示页面
3. 路由导航正常工作
4. 使用 workspace 依赖引用 quick-element-plus
5. Vite 8 正常构建