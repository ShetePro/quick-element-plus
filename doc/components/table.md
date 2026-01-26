# Table 表格

表格组件，基于 Element Plus Table 封装，支持配置化列定义和数据字典。

## 概述

Table 组件提供了强大的数据表格功能，基于 Element Plus Table 封装，增强了以下特性：

- **配置化列定义**：通过配置对象定义表格列，减少模板代码
- **字典数据支持**：支持静态字典数据和动态接口加载，自动转换显示值
- **分页集成**：内置分页组件，支持与数据加载联动
- **插槽支持**：支持自定义列内容，灵活处理复杂展示需求
- **多级表头**：支持多级表头配置
- **数据加载**：配合 `useTable` hook 使用，自动管理数据加载和分页

### 主要特性

- **配置化**：通过配置快速生成表格，无需编写大量列定义代码
- **字典转换**：自动将字典值转换为显示文本
- **类型安全**：完整的 TypeScript 类型支持
- **灵活扩展**：支持插槽自定义列内容，满足复杂业务需求

适用于数据列表展示、数据管理、报表展示等场景。

## BasicTable 基础表格

### 基础用法

```vue
<template>
  <BasicTable
    :register="register"
  />
</template>

<script setup>
import { BasicTable } from '@quick-element-plus/components'
import { useTable } from '@hook/useTable'

const { register } = useTable({
  api: '/api/users',
  apiMethod: 'POST',
  options: {
    height: 400,
    align: 'center',
    columns: [
      { label: 'ID', prop: 'id', width: 80 },
      { label: '用户名', prop: 'username' },
      { label: '邮箱', prop: 'email' }
    ]
  },
  page: {
    currentPage: 1,
    pageSize: 10,
    pageSizes: [10, 20, 30, 40]
  }
})
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

### useTable Hook 配置

`useTable` hook 的配置参数：

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| api | 接口地址 | `string \| Ref<string>` | - |
| apiMethod | 请求方法 | `'POST' \| 'GET' \| string` | `'POST'` |
| options | 表格配置 | `BasicTableOptions \| Ref<BasicTableOptions>` | - |
| page | 分页配置 | `Partial<PaginationProps>` | - |
| apiConfig | 请求配置 | `AxiosRequestConfig \| (() => AxiosRequestConfig)` | - |
| apiOptions | 请求选项 | `RequestOptions` | - |
| apiHandler | 数据处理函数 | `(data: Recordable) => { rows: T[], total: number }` | - |
| searchTransform | 搜索数据转换 | `(data: TableSearch) => TableSearch` | - |

**API 响应格式要求：**

默认情况下，接口应返回以下格式的数据：

```typescript
{
  rows: T[],      // 表格数据数组
  total: number    // 总记录数
}
```

如果接口返回格式不同，可以使用 `apiHandler` 进行转换：

```typescript
apiHandler: (data) => {
  return {
    rows: data.list || [],
    total: data.count || 0
  }
}
```

**请求参数格式：**

- POST 请求：搜索数据放在 `data` 字段，分页参数放在 `params` 字段
- GET 请求：所有参数放在 `params` 字段

`useTable` 返回值：

| 方法/属性 | 说明 | 类型 |
|----------|------|------|
| register | 注册函数，传给 BasicTable | `() => UseTableRegisterProps<T>` |
| getList | 刷新表格数据 | `(data?: Recordable, query?: Recordable) => void` |
| getData | 获取表格数据 | `() => T[]` |
| setData | 设置表格数据 | `(data: T[]) => void` |
| setLoading | 设置加载状态 | `(data: boolean) => void` |
| searchData | 搜索数据（响应式） | `Ref<Recordable>` |
| searchQuery | 搜索查询参数（响应式） | `Ref<Recordable>` |
| resetPagination | 重置分页 | `() => void` |

### 示例

#### 配合搜索表单使用

```vue
<template>
  <div>
    <SearchForm
      v-model="searchData"
      :option="searchOption"
      @search="handleSearch"
    />
    <BasicTable :register="register" />
  </div>
</template>

<script setup>
import { BasicTable } from '@quick-element-plus/components'
import { SearchForm } from '@quick-element-plus/components'
import { useTable } from '@hook/useTable'

const { register, getList, searchData } = useTable({
  api: '/api/users',
  apiMethod: 'POST',
  options: {
    height: 400,
    align: 'center',
    columns: [
      { label: 'ID', prop: 'id', width: 80 },
      { label: '用户名', prop: 'username' },
      { label: '邮箱', prop: 'email' },
      {
        label: '状态',
        prop: 'status',
        type: 'select',
        dictUrl: '/api/status',
        dictMethod: 'get'
      }
    ]
  }
})

const searchOption = {
  column: [
    { label: '用户名', prop: 'username', type: 'text' },
    { label: '状态', prop: 'status', type: 'select', dictUrl: '/api/status' }
  ]
}

function handleSearch() {
  getList()
}
</script>
```

#### 使用字典数据

```vue
<template>
  <BasicTable :register="register" />
</template>

<script setup>
import { useTable } from '@hook/useTable'

const { register } = useTable({
  api: '/api/users',
  options: {
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
})
</script>
```

#### 使用插槽自定义列

```vue
<template>
  <BasicTable :register="register">
    <template #action="{ row }">
      <el-button @click="handleEdit(row)">编辑</el-button>
      <el-button @click="handleDelete(row)">删除</el-button>
    </template>
  </BasicTable>
</template>

<script setup>
import { useTable } from '@hook/useTable'

const { register } = useTable({
  api: '/api/users',
  options: {
    columns: [
      { label: '用户名', prop: 'username' },
      { label: '操作', prop: 'action', slot: true }
    ]
  }
})
</script>
```

#### 多级表头

```vue
<template>
  <BasicTable :register="register" />
</template>

<script setup>
import { useTable } from '@hook/useTable'

const { register } = useTable({
  api: '/api/users',
  options: {
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
})
</script>
```

#### 自定义数据处理

当接口返回格式与默认格式不同时，使用 `apiHandler` 进行转换：

```vue
<template>
  <BasicTable :register="register" />
</template>

<script setup>
import { useTable } from '@hook/useTable'

const { register } = useTable({
  api: '/api/users',
  apiMethod: 'GET',
  apiHandler: (data) => {
    // 自定义处理接口返回的数据
    // 接口返回格式: { list: [], count: 0 }
    // 转换为: { rows: [], total: 0 }
    return {
      rows: data.list || [],
      total: data.count || 0
    }
  },
  options: {
    columns: [
      { label: 'ID', prop: 'id' },
      { label: '用户名', prop: 'username' }
    ]
  }
})
</script>
```

#### 自定义搜索数据转换

使用 `searchTransform` 自定义搜索参数的转换：

```vue
<template>
  <BasicTable :register="register" />
</template>

<script setup>
import { useTable } from '@hook/useTable'

const { register } = useTable({
  api: '/api/users',
  apiMethod: 'POST',
  searchTransform: (searchBody) => {
    // 自定义搜索数据转换
    return {
      data: {
        ...searchBody.data,
        keyword: searchBody.data.username // 将 username 转换为 keyword
      },
      params: searchBody.params
    }
  },
  options: {
    columns: [
      { label: '用户名', prop: 'username' }
    ]
  }
})
</script>
```

#### 静态数据模式

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
- `useTable` 会自动处理分页、加载状态和数据请求
- 支持通过 `dictUrl` 动态加载字典数据
- 支持插槽自定义列内容
- 支持多级表头
- 支持静态数据模式（不依赖 API，不使用 `register`）
- 搜索数据通过 `searchData` 和 `searchQuery` 管理，调用 `getList()` 刷新表格
