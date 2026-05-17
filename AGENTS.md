# AGENTS.md - quick-element-plus

Quick Element Plus 是基于 Element Plus 的企业级业务组件库。采用 pnpm monorepo + Vite library mode 构建。

## 架构

```
quick-element-plus/
├── index.ts                 # 根入口，re-export 所有 packages
├── packages/
│   ├── components/          # 13 个 Vue 组件
│   ├── hook/                # useTable, useDict, useMessage, usePermissions, useSetting
│   ├── utils/               # http (axios 封装), dict, file, is, permission, transform
│   └── enum/                # httpEnum, settingsEnum
├── doc/                     # VitePress 文档站点（独立子包）
├── example/                 # 演示站点（Vue 3 + Vite + Vue Router）
├── types/                   # global.d.ts (Recordable, MainDialogStatus 等全局类型)
└── dist/                    # 构建产物：index.umd.js, index.es.js, *.d.ts
```

**无 `src/` 目录**，所有源码在 `packages/` 下。

## 开发命令

```bash
pnpm dev          # Vite 开发服务器
pnpm build        # vite build + vue-tsc 类型生成 → dist/
pnpm lint         # ESLint 检查 .vue/.ts/.tsx
pnpm docs:dev     # 启动 VitePress 文档（cd doc && pnpm dev）
pnpm docs:build   # 构建文档
pnpm --filter example dev  # 启动演示站点（cd example && pnpm dev）
```

**pnpm workspace 子包**：
- `packages/*` - 组件源码
- `doc` - VitePress 文档站点
- `example` - 演示站点

**无测试命令** - 项目未配置 vitest/jest。

**无 CI/CD** - 无 GitHub workflows、husky、lint-staged。发布需手动执行 `pnpm build && npm publish`。

## 构建产物

- **UMD**: `dist/index.umd.js`（全局变量 `QuickElementPlus`）
- **ESM**: `dist/index.es.js`
- **Types**: `dist/index.d.ts` + `dist/**/*.d.ts`

**外部化依赖**（不打包进库）: `vue`, `element-plus`, `axios`, `vue-router`

## 路径别名

| 别名 | 映射 |
|------|------|
| `@/components/*` | `./packages/components/*` |
| `@/utils/*` | `./packages/utils/*` |
| `@/hook/*` | `./packages/hook/*` |
| `@utils/*` | `./packages/utils/*` |
| `@hook/*` | `./packages/hook/*` |

## 组件组织模式

两种模式并存：

1. **扁平结构** - 单文件组件直接放组件目录下：
   ```
   Button/
     ExportButton.vue
     ImportButton.vue
     PermissionButton.vue
   ```

2. **嵌套结构** - 复杂组件用 `index.ts` + `src/` 子目录：
   ```
   Table/
     index.ts          # re-export BasicTable
     src/
       BasicTable.vue
       TableColumn.vue
       types.ts
   ```

新建组件时：简单组件用扁平结构，涉及多个文件或类型定义的用嵌套结构。

## 技术规范

- **Vue 3 Composition API** + `<script setup lang="ts">`
- **Element Plus 2.13+** 作为 peerDependency
- **ESLint flat config** (`eslint.config.js`)：typescript-eslint + eslint-plugin-vue
- **Prettier 3.8** 无配置文件（使用默认）

## 核心 Hooks

| Hook | 用途 |
|------|------|
| `useTable` | 表格数据管理：自动处理分页、加载状态、搜索 |
| `useDict` | 字典数据管理 |
| `useMessage` | Element Plus 消息提示封装 |
| `usePermissions` | 权限检查 |

## HTTP 封装

`packages/utils/http/index.ts` 提供 `HttpRequest` 类：
- 基于 axios
- 统一请求/响应拦截器
- 统一错误处理

## 类型系统

`types/global.d.ts` 定义常用泛型类型：
- `Recordable<T>` = `Record<string, T>`
- `KeyRecordable` = `Record<string, any>`
- `MainDialogStatus` - 对话框状态枚举

## 注意事项

- **严格模式未开启** (`strict: false` in tsconfig.json)
- `@typescript-eslint/no-explicit-any` 只 warn，不 error
- 构建 **必须先 vite build 再 vue-tsc** - `pnpm build` 已正确串联
- 发布到 npm 时 `files` 字段包含 `dist` 和 `packages`