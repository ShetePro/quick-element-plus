# Select 选择器

选择器组件，提供了基础选择器和颜色选择器两种组件。

## 概述

Select 组件库提供了两种选择器组件：

- **BasicSelect（基础选择器）**：基于 Element Plus Select 封装，支持字典数据和详情模式
- **ColorSelect（颜色选择器）**：基于 Element Plus ColorPicker 封装的简单颜色选择器

### 主要特性

- **字典数据支持**：支持静态字典数据和动态接口加载
- **详情模式**：支持只读显示模式，以标签形式展示选中值
- **字段映射**：支持自定义字段映射，适配不同的数据结构
- **响应处理**：支持自定义接口响应处理函数
- **完全兼容**：支持所有 Element Plus Select 的原生属性

适用于下拉选择、多选、颜色选择等场景。

## BasicSelect 基础选择器

基于 Element Plus Select 封装，支持字典数据和详情模式。

### 基础用法

```vue
<template>
  <BasicSelect
    v-model="value"
    :dict-data="options"
  />
</template>

<script setup>
import { ref } from 'vue'
import { BasicSelect } from '@quick-element-plus/components'

const value = ref(1)

const options = [
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 },
  { label: '选项3', value: 3 }
]
</script>
```

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| modelValue | 绑定值 | `number \| string \| undefined` | - | 是 |
| dictData | 字典数据 | `Recordable` | - | 否 |
| dictUrl | 字典接口地址 | `string` | - | 否 |
| dictQuery | 字典查询参数 | `{ data?: Recordable; params?: Recordable }` | - | 否 |
| dictMethod | 字典请求方法 | `string` | - | 否 |
| dictResponseHandle | 字典响应处理函数 | `(res: Recordable) => Recordable[]` | - | 否 |
| detail | 详情模式（只读显示为标签） | `boolean` | `false` | 否 |
| propsOption | 字段映射配置 | `{ value: string; label: string }` | `{ value: 'value', label: 'label' }` | 否 |

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| update:modelValue | 值更新 | `number \| string` |
| optionClick | 选项点击 | `DictItem` |

### 示例

#### 使用字典接口

```vue
<template>
  <BasicSelect
    v-model="value"
    dict-url="/api/options"
    dict-method="get"
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref()
</script>
```

#### 详情模式

```vue
<template>
  <BasicSelect
    v-model="value"
    :dict-data="options"
    detail
  />
</template>

<script setup>
const value = ref(1)
const options = [
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 }
]
</script>
```

详情模式下，选中的值会以标签形式显示，不可编辑。

#### 自定义响应处理

```vue
<template>
  <BasicSelect
    v-model="value"
    dict-url="/api/options"
    :dict-response-handle="handleResponse"
  />
</template>

<script setup>
function handleResponse(res) {
  // 处理接口返回的数据结构
  return res.data.list
}
</script>
```

#### 多选模式

```vue
<template>
  <BasicSelect
    v-model="value"
    :dict-data="options"
    multiple
  />
</template>

<script setup>
const value = ref([1, 2])
</script>
```

#### 自定义字段映射

```vue
<template>
  <BasicSelect
    v-model="value"
    :dict-data="options"
    :props-option="{ value: 'id', label: 'name' }"
  />
</template>

<script setup>
const options = [
  { id: 1, name: '选项1' },
  { id: 2, name: '选项2' }
]
</script>
```

### 说明

- 支持通过 `dictData` 传入静态数据，或通过 `dictUrl` 动态加载
- 支持 `dictResponseHandle` 自定义处理接口返回的数据结构
- 支持详情模式，以标签形式只读显示
- 支持多选模式（通过 Element Plus Select 的 `multiple` 属性）
- 支持所有 Element Plus Select 的原生属性

## ColorSelect 颜色选择器

基于 Element Plus ColorPicker 封装的简单颜色选择器。

### 基础用法

```vue
<template>
  <ColorSelect v-model="color" />
</template>

<script setup>
import { ref } from 'vue'
import { ColorSelect } from '@quick-element-plus/components'

const color = ref('#409EFF')
</script>
```

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| modelValue | 颜色值 | `string` | - | 是 |

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| update:modelValue | 颜色值更新 | `string` |

### 示例

```vue
<template>
  <div>
    <ColorSelect v-model="color" />
    <p>当前颜色: {{ color }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const color = ref('#409EFF')
</script>
```

### 说明

- 基于 Element Plus ColorPicker 组件
- 使用 `v-model` 进行双向绑定
- 返回的颜色值为十六进制格式（如 `#409EFF`）
