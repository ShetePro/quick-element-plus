# Quick Element Plus 文档

这是 Quick Element Plus 组件库的文档站点，使用 VitePress 构建。

## 开发

```bash
# 安装依赖（在项目根目录）
pnpm install

# 启动开发服务器
cd doc
pnpm dev
```

## 构建

```bash
cd doc
pnpm build
```

构建产物将输出到 `doc/.vitepress/dist` 目录。

## 预览

```bash
cd doc
pnpm preview
```

## 文档结构

```
doc/
├── .vitepress/
│   └── config.ts      # VitePress 配置
├── index.md           # 首页
├── components/        # 组件文档
│   ├── button.md
│   ├── dialog.md
│   ├── form.md
│   ├── table.md
│   ├── pagination.md
│   ├── radio.md
│   └── select.md
└── package.json
```
