# Form 表单

表单组件提供了基础表单和搜索表单两种组件，支持配置化的表单生成。

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
import { ref } from 'vue'
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
