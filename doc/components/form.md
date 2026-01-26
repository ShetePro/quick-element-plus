# Form 表单

表单组件提供了基础表单和搜索表单两种组件，支持配置化的表单生成。

## 概述

Form 组件库提供了两种表单组件，支持通过配置快速生成表单，减少重复代码：

- **BasicForm（基础表单）**：通用的表单组件，支持多种表单项类型，通过配置即可生成完整表单
- **SearchForm（搜索表单）**：基于 BasicForm 封装的搜索表单，内置搜索和重置按钮

### 主要特性

- **配置化生成**：通过配置对象快速生成表单，无需编写大量模板代码
- **多种表单项类型**：支持文本、数字、选择器、日期、开关、单选、上传等
- **字典数据支持**：支持静态字典数据和动态接口加载
- **表单验证**：集成 Element Plus 的表单验证规则
- **响应式布局**：支持栅格布局，灵活控制表单项排列
- **插槽支持**：支持自定义表单项内容

适用于数据录入、搜索筛选、表单编辑等场景。

## BasicForm 基础表单

基于 Element Plus Form 封装的表单组件，支持通过配置快速生成表单。

### 基础用法

```vue
<template>
  <BasicForm
    ref="formRef"
    v-model="formData"
    :option="formOption"
  />
  <el-button @click="handleSubmit">提交</el-button>
</template>

<script setup>
import { ref } from 'vue'
import { BasicForm } from '@quick-element-plus/components'

const formRef = ref()
const formData = ref({})

const formOption = {
  labelWidth: '100px',
  column: [
    {
      label: '用户名',
      prop: 'username',
      type: 'text',
      rules: [{ required: true, message: '请输入用户名' }]
    },
    {
      label: '年龄',
      prop: 'age',
      type: 'number'
    },
    {
      label: '性别',
      prop: 'gender',
      type: 'select',
      dictData: [
        { label: '男', value: 1 },
        { label: '女', value: 2 }
      ]
    }
  ]
}

async function handleSubmit() {
  await formRef.value?.submitForm()
  console.log(formData.value)
}
</script>
```

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|--------|--------|------|
| modelValue | 表单数据 | `Recordable` | - | 是 |
| option | 表单配置 | `Partial<BasicFormOption>` | - | 是 |

### FormOption 配置

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| labelWidth | 标签宽度 | `string \| number` | - |
| labelPosition | 标签位置 | `'top' \| 'right' \| 'left'` | - |
| labelSuffix | 标签后缀 | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| inline | 是否行内表单 | `boolean` | `false` |
| column | 表单项配置数组 | `BasicFormColumnProps[]` | - |

### ColumnProps 配置

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| label | 标签文本 | `string` | - |
| prop | 字段名 | `string` | - |
| type | 表单项类型 | `'text' \| 'number' \| 'select' \| 'date' \| 'switch' \| 'radio' \| 'upload' \| 'group'` | - |
| placeholder | 占位符 | `string` | - |
| span | 栅格占据的列数 | `number` | - |
| slot | 是否使用插槽 | `boolean` | `false` |
| rules | 验证规则 | `FormItemRule[]` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| display | 是否显示 | `boolean` | `true` |
| dictData | 字典数据 | `Recordable[]` | - |
| dictUrl | 字典接口地址 | `string` | - |
| dictMethod | 字典请求方法 | `'get' \| 'post'` | - |
| dictQuery | 字典查询参数 | `{ data: Recordable; params: Recordable }` | - |
| defaultValue | 默认值 | `string \| number` | - |
| row | 是否换行 | `boolean` | `false` |

### Methods

通过 ref 可以调用以下方法：

| 方法名 | 说明 | 返回值 |
|--------|------|--------|
| submitForm | 提交表单（会进行验证） | `Promise<any>` |
| resetForm | 重置表单 | - |
| getFormData | 获取表单数据 | `Recordable` |
| clearValidate | 清除验证 | - |

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| update:modelValue | 表单数据更新 | `Recordable` |
| validate | 表单验证 | `{ valid: boolean, fields: Recordable }` |

### 示例

#### 使用字典数据

```vue
<template>
  <BasicForm
    v-model="formData"
    :option="formOption"
  />
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({})

const formOption = {
  column: [
    {
      label: '部门',
      prop: 'department',
      type: 'select',
      dictUrl: '/api/departments',
      dictMethod: 'get'
    }
  ]
}
</script>
```

#### 使用插槽

```vue
<template>
  <BasicForm
    v-model="formData"
    :option="formOption"
  >
    <template #customField>
      <el-input v-model="formData.custom" />
    </template>
  </BasicForm>
</template>

<script setup>
const formOption = {
  column: [
    {
      label: '自定义字段',
      prop: 'customField',
      slot: true
    }
  ]
}
</script>
```

## SearchForm 搜索表单

基于 BasicForm 封装的搜索表单组件，内置搜索和重置按钮。

### 基础用法

```vue
<template>
  <SearchForm
    v-model="searchData"
    :option="searchOption"
    @search="handleSearch"
    @reset="handleReset"
  />
</template>

<script setup>
import { SearchForm } from '@quick-element-plus/components'

const searchData = ref({})

const searchOption = {
  column: [
    {
      label: '用户名',
      prop: 'username',
      type: 'text'
    },
    {
      label: '状态',
      prop: 'status',
      type: 'select',
      dictData: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    }
  ]
}

function handleSearch(data) {
  console.log('搜索:', data)
}

function handleReset() {
  console.log('重置')
}
</script>
```

### 配合表格使用

SearchForm 通常与 BasicTable 和 useTable hook 配合使用：

```vue
<template>
  <div>
    <SearchForm
      v-model="searchData"
      :option="searchOption"
      @search="handleSearch"
      @reset="handleReset"
    />
    <BasicTable :register="register" />
  </div>
</template>

<script setup>
import { SearchForm, BasicTable } from '@quick-element-plus/components'
import { useTable } from '@hook/useTable'

const { register, getList, searchData } = useTable({
  api: '/api/users',
  options: {
    height: 400,
    columns: [
      { label: 'ID', prop: 'id' },
      { label: '用户名', prop: 'username' },
      { label: '状态', prop: 'status', type: 'select' }
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
  // 搜索时会自动使用 searchData 中的数据
  getList()
}

function handleReset() {
  // 重置后刷新表格
  getList()
}
</script>
```

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| modelValue | 搜索数据 | `Recordable` | - | 是 |
| option | 表单配置 | `Partial<BasicFormOption>` | - | 是 |
| ignore | 重置时保留的字段 | `string[]` | `[]` | 否 |
| noCard | 是否不使用卡片包裹 | `boolean` | `false` | 否 |

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| update:modelValue | 搜索数据更新 | `Recordable` |
| search | 点击搜索按钮 | `Recordable` |
| reset | 点击重置按钮 | - |

### Slots

| 插槽名 | 说明 |
|--------|------|
| footer | 自定义底部按钮 |
| append | 在搜索按钮后追加内容 |

### 示例

#### 自定义底部按钮

```vue
<template>
  <SearchForm
    v-model="searchData"
    :option="searchOption"
  >
    <template #footer>
      <el-button type="primary" @click="handleSearch">搜索</el-button>
      <el-button @click="handleReset">重置</el-button>
      <el-button @click="handleExport">导出</el-button>
    </template>
  </SearchForm>
</template>
```

### 说明

- SearchForm 基于 BasicForm，支持所有 BasicForm 的功能
- 默认使用 ElCard 包裹，可通过 `noCard` 禁用
- 重置时会清空所有字段，可通过 `ignore` 保留指定字段
- 通常与 `useTable` hook 配合使用，搜索数据绑定到 `useTable` 返回的 `searchData`
- 搜索时调用 `getList()` 方法刷新表格数据
