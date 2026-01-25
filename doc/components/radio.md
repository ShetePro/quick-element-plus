# Radio 单选

单选组件，基于 Element Plus Radio 封装，支持字典数据。

## BasicRadio 基础单选

### 基础用法

```vue
<template>
  <BasicRadio
    v-model="value"
    :dict-data="options"
  />
</template>

<script setup>
import { ref } from 'vue'
import { BasicRadio } from '@quick-element-plus/components'

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
| detail | 详情模式（只读显示） | `boolean` | `false` | 否 |
| propsOption | 字段映射配置 | `{ value: string; label: string }` | `{ value: 'value', label: 'label' }` | 否 |

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| update:modelValue | 值更新 | `number \| string` |
| optionClick | 选项点击 | `Recordable` |

### 示例

#### 使用字典接口

```vue
<template>
  <BasicRadio
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

#### 自定义字段映射

```vue
<template>
  <BasicRadio
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

#### 选项点击事件

```vue
<template>
  <BasicRadio
    v-model="value"
    :dict-data="options"
    @option-click="handleOptionClick"
  />
</template>

<script setup>
function handleOptionClick(item) {
  console.log('选中的选项:', item)
}
</script>
```

### 说明

- 支持通过 `dictData` 传入静态数据，或通过 `dictUrl` 动态加载
- 支持自定义字段映射，适配不同的数据结构
- 支持所有 Element Plus Radio 的原生属性（通过 `v-bind` 传递）
- 默认 `clearable` 为 `true`，可通过属性覆盖
