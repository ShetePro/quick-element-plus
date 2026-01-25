# Table 表格

表格组件，基于 Element Plus Table 封装，支持配置化列定义和数据字典。

## BasicTable 基础表格

### 基础用法

```vue
<template>
  <BasicTable
    :register="register"
    :options="tableOptions"
  />
</template>

<script setup>
import { BasicTable } from '@quick-element-plus/components'
import { useTable } from '@/hook/useTable'

const { register } = useTable({
  api: '/api/users',
  columns: [
    { label: 'ID', prop: 'id' },
    { label: '用户名', prop: 'username' },
    { label: '邮箱', prop: 'email' }
  ]
})

const tableOptions = {
  height: 400,
  columns: [
    { label: 'ID', prop: 'id', width: 80 },
    { label: '用户名', prop: 'username' },
    { label: '邮箱', prop: 'email' }
  ]
}
</script>
```

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| register | 表格注册函数 | `() => UseTableRegisterProps<any>` | - | 是 |
| options | 表格配置 | `BasicTableOptions` | - | 否 |
| data | 静态数据 | `Recordable[]` | - | 否 |
| title | 表格标题 | `string` | - | 否 |
| hidePagination | 隐藏分页 | `boolean` | `false` | 否 |
| pagination | 分页配置 | `PaginationProps & { currentChange?: () => void; sizeChange?: () => void }` | - | 否 |

### TableOptions 配置

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| width | 表格宽度 | `string` | `'100%'` |
| height | 表格高度 | `number \| string` | - |
| columns | 列配置 | `BasicTableColumn[]` | - |
| align | 对齐方式 | `'center' \| 'right' \| 'left'` | - |
| stripe | 斑马纹 | `boolean` | - |
| border | 边框 | `boolean` | - |
| rowKey | 行数据的 Key | `string` | `'id'` |
| full | 是否全屏 | `boolean` | - |

### ColumnProps 配置

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| label | 列标题 | `string` | - |
| prop | 列字段名 | `string` | - |
| type | 列类型 | `'text' \| 'select'` | `'text'` |
| slot | 是否使用插槽 | `boolean` | `false` |
| dictData | 字典数据 | `Recordable[]` | - |
| dictUrl | 字典接口地址 | `string` | - |
| dictMethod | 字典请求方法 | `'get' \| 'post'` | - |
| dictQuery | 字典查询参数 | `{ data: Recordable; params: Recordable }` | - |
| display | 是否显示 | `boolean` | `true` |
| width | 列宽度 | `string \| number` | - |
| align | 对齐方式 | `string` | - |
| children | 多级表头 | `BasicTableColumnProp[]` | - |
| props | 其他属性 | `Recordable` | - |

### Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| title | 自定义表格标题 | - |
| [prop] | 自定义列内容 | `{ row, column, $index }` |

### 示例

#### 使用字典数据

```vue
<template>
  <BasicTable
    :register="register"
    :options="tableOptions"
  />
</template>

<script setup>
const tableOptions = {
  height: 400,
  columns: [
    { label: '用户名', prop: 'username' },
    {
      label: '状态',
      prop: 'status',
      type: 'select',
      dictUrl: '/api/status',
      dictMethod: 'get'
    }
  ]
}
</script>
```

#### 使用插槽自定义列

```vue
<template>
  <BasicTable
    :register="register"
    :options="tableOptions"
  >
    <template #action="{ row }">
      <el-button @click="handleEdit(row)">编辑</el-button>
      <el-button @click="handleDelete(row)">删除</el-button>
    </template>
  </BasicTable>
</template>

<script setup>
const tableOptions = {
  columns: [
    { label: '用户名', prop: 'username' },
    { label: '操作', prop: 'action', slot: true }
  ]
}
</script>
```

#### 多级表头

```vue
<template>
  <BasicTable
    :register="register"
    :options="tableOptions"
  />
</template>

<script setup>
const tableOptions = {
  columns: [
    { label: '用户名', prop: 'username' },
    {
      label: '联系信息',
      children: [
        { label: '邮箱', prop: 'email' },
        { label: '电话', prop: 'phone' }
      ]
    }
  ]
}
</script>
```

#### 静态数据

```vue
<template>
  <BasicTable
    :data="tableData"
    :options="tableOptions"
    :hide-pagination="true"
  />
</template>

<script setup>
import { ref } from 'vue'

const tableData = ref([
  { id: 1, username: 'user1', email: 'user1@example.com' },
  { id: 2, username: 'user2', email: 'user2@example.com' }
])

const tableOptions = {
  columns: [
    { label: 'ID', prop: 'id' },
    { label: '用户名', prop: 'username' },
    { label: '邮箱', prop: 'email' }
  ]
}
</script>
```

### 说明

- 表格需要配合 `useTable` hook 使用，用于管理数据加载和分页
- 支持通过 `dictUrl` 动态加载字典数据
- 支持插槽自定义列内容
- 支持多级表头
- 支持静态数据模式（不依赖 API）
