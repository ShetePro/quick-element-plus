# @quick-element-plus/components

基于 Element Plus 的业务组件集合，提供表格、表单、对话框等常用企业级组件。

## 安装

```bash
npm install @quick-element-plus/components
# 或
pnpm add @quick-element-plus/components
# 或
yarn add @quick-element-plus/components
```

## 依赖

- `vue >= 3.5`
- `element-plus >= 2.13`

## 组件列表

### 数据展示

| 组件 | 说明 |
|------|------|
| `BasicTable` | 配置化表格，支持分页、字典数据、自定义列渲染 |
| `TableColumn` | 表格列组件 |
| `Column` | 列配置组件 |
| `BasicPagination` | 分页组件 |

### 表单组件

| 组件 | 说明 |
|------|------|
| `BasicForm` | 基础表单组件，支持配置化表单项 |
| `SearchForm` | 搜索表单组件 |
| `FormGroup` | 表单分组组件 |
| `BasicFormItem` | 表单项组件 |
| `BasicSelect` | 选择器组件，支持字典数据 |
| `ColorSelect` | 颜色选择器 |
| `BasicRadio` | 单选组件 |
| `BasicUpload` | 文件上传组件 |

### 按钮组件

| 组件 | 说明 |
|------|------|
| `ExportButton` | 数据导出按钮 |
| `ImportButton` | 数据导入按钮 |
| `PermissionButton` | 权限控制按钮 |

### 反馈组件

| 组件 | 说明 |
|------|------|
| `BasicDialog` | 对话框组件，支持配置化内容 |

### 其他

| 组件 | 说明 |
|------|------|
| `Icon` | 图标组件 |

## 使用示例

### BasicTable + useTable

```vue
<template>
  <BasicTable :register="register" />
</template>

<script setup lang="ts">
import { BasicTable } from '@quick-element-plus/components'
import { useTable } from '@quick-element-plus/hook'

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
```

### SearchForm

```vue
<template>
  <SearchForm v-model="searchData" :option="searchOption" @search="handleSearch" />
</template>

<script setup lang="ts">
import { SearchForm } from '@quick-element-plus/components'
import { ref } from 'vue'

const searchData = ref({})
const searchOption = {
  column: [
    { label: '用户名', prop: 'username', type: 'text' },
    { label: '状态', prop: 'status', type: 'select', dict: 'status_dict' }
  ]
}

function handleSearch() {
  console.log('搜索条件:', searchData.value)
}
</script>
```

### BasicDialog

```vue
<template>
  <BasicDialog v-model="visible" title="编辑用户" :options="dialogOptions">
    <!-- 自定义内容 -->
  </BasicDialog>
</template>

<script setup lang="ts">
import { BasicDialog } from '@quick-element-plus/components'
import { ref } from 'vue'

const visible = ref(false)
const dialogOptions = {
  width: '500px',
  confirmText: '保存',
  cancelText: '取消'
}
</script>
```

## 类型导出

```typescript
import type { 
  FormProps, 
  FormItemOption,
  DialogProps,
  TableProps,
  TableColumnOption
} from '@quick-element-plus/components'
```

## License

ISC