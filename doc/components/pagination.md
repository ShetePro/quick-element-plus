# Pagination 分页

分页组件，基于 Element Plus Pagination 封装。

## BasicPagination 基础分页

### 基础用法

```vue
<template>
  <BasicPagination
    :pagination="pagination"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script setup>
import { ref } from 'vue'
import { BasicPagination } from '@quick-element-plus/components'

const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 100,
  pageSizes: [10, 20, 30, 40]
})

function handleSizeChange() {
  console.log('每页条数改变:', pagination.value.pageSize)
}

function handleCurrentChange() {
  console.log('当前页改变:', pagination.value.currentPage)
}
</script>
```

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| pagination | 分页配置 | `PaginationProps` | - | 是 |

### PaginationProps 配置

支持所有 Element Plus Pagination 的属性，常用属性如下：

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| currentPage | 当前页数 | `number` | `1` |
| pageSize | 每页显示条目个数 | `number` | `10` |
| total | 总条目数 | `number` | - |
| pageSizes | 每页显示个数选择器的选项设置 | `number[]` | `[10, 20, 30, 40]` |
| small | 是否使用小型分页样式 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| background | 是否为分页按钮添加背景色 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| size-change | 每页条数改变时触发 | - |
| current-change | 当前页改变时触发 | - |

### 示例

#### 配合表格使用

```vue
<template>
  <div>
    <el-table :data="tableData" />
    <BasicPagination
      :pagination="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTable } from '@/hook/useTable'

const { register, pagination } = useTable({
  api: '/api/users'
})

const tableData = computed(() => register.data.value)

function handleSizeChange() {
  // 重新加载数据
}

function handleCurrentChange() {
  // 重新加载数据
}
</script>
```

#### 自定义分页配置

```vue
<template>
  <BasicPagination
    :pagination="pagination"
  />
</template>

<script setup>
import { ref } from 'vue'

const pagination = ref({
  currentPage: 1,
  pageSize: 20,
  total: 500,
  pageSizes: [10, 20, 50, 100],
  small: false,
  background: true
})
</script>
```

### 说明

- 组件完全兼容 Element Plus Pagination 的所有属性和事件
- 默认布局为：`total, sizes, prev, pager, next, jumper`
- 支持通过 `v-bind` 传递其他 Element Plus Pagination 属性
