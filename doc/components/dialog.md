# Dialog 对话框

对话框组件，用于显示模态对话框。

## 概述

Dialog 组件提供了基础对话框功能，基于 Element Plus Dialog 封装，增强了以下特性：

- **拖拽功能**：支持拖拽移动对话框位置
- **简化的 API**：提供 `showDialog` 和 `hideDialog` 方法，使用更便捷
- **灵活的插槽**：支持自定义标题、内容和底部操作
- **加载状态**：内置确定按钮的加载状态管理
- **类型安全**：完整的 TypeScript 类型支持

适用于表单弹窗、确认对话框、详情展示等场景。

## BasicDialog 基础对话框

基于 Element Plus Dialog 封装的对话框组件，支持拖拽、自定义标题和底部操作。

### 基础用法

```vue
<template>
  <BasicDialog
    ref="dialogRef"
    title="提示"
    :show-footer="true"
  >
    <p>这是对话框内容</p>
  </BasicDialog>
  
  <el-button @click="openDialog">打开对话框</el-button>
</template>

<script setup>
import { ref } from 'vue'
import { BasicDialog } from '@quick-element-plus/components'

const dialogRef = ref()

function openDialog() {
  dialogRef.value?.showDialog()
}
</script>
```

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| title | 对话框标题 | `string` | - | 是 |
| width | 对话框宽度 | `string` | `'300px'` | 否 |
| minWidth | 对话框最小宽度 | `string` | `'300px'` | 否 |
| loading | 确定按钮加载状态 | `boolean` | `false` | 否 |
| showFooter | 是否显示底部 | `boolean` | `false` | 否 |

**其他属性：** 支持所有 Element Plus Dialog 的原生属性（如 `close-on-click-modal`、`close-on-press-escape` 等）

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| submit | 点击确定按钮时触发 | - |

### Methods

通过 ref 可以调用以下方法：

| 方法名 | 说明 | 参数 |
|--------|------|------|
| showDialog | 显示对话框 | - |
| hideDialog | 隐藏对话框 | - |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 对话框内容 |
| title | 自定义标题内容 |
| footer | 自定义底部内容 |

### 示例

#### 带表单的对话框

```vue
<template>
  <BasicDialog
    ref="dialogRef"
    title="编辑用户"
    :show-footer="true"
    :loading="loading"
    @submit="handleSubmit"
  >
    <el-form :model="form">
      <el-form-item label="用户名">
        <el-input v-model="form.name" />
      </el-form-item>
    </el-form>
  </BasicDialog>
</template>

<script setup>
import { ref } from 'vue'
import { BasicDialog } from '@quick-element-plus/components'

const dialogRef = ref()
const loading = ref(false)
const form = ref({ name: '' })

function handleSubmit() {
  loading.value = true
  // 提交逻辑
  setTimeout(() => {
    loading.value = false
    dialogRef.value?.hideDialog()
  }, 1000)
}
</script>
```

#### 自定义底部

```vue
<template>
  <BasicDialog
    ref="dialogRef"
    title="确认删除"
  >
    <p>确定要删除这条记录吗？</p>
    <template #footer>
      <el-button @click="dialogRef?.hideDialog()">取消</el-button>
      <el-button type="danger" @click="handleDelete">确定删除</el-button>
    </template>
  </BasicDialog>
</template>
```

### 说明

- 对话框默认支持拖拽功能
- 可以通过 `showFooter` 控制是否显示默认的底部按钮
- 支持所有 Element Plus Dialog 的原生属性和事件
