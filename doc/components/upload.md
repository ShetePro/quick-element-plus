# Upload 上传

文件上传组件，基于 Element Plus Upload 封装，提供文件大小校验、格式限制等业务功能。

## 概述

BasicUpload 组件提供了以下功能：

- **文件上传**：支持单文件和多文件上传
- **大小校验**：上传前自动校验文件大小
- **格式限制**：支持指定允许的文件格式
- **v-model 支持**：双向绑定文件 URL

## 基础用法

```vue
<template>
  <BasicUpload v-model="fileUrl" action="/api/upload" />
</template>

<script setup>
import { ref } from 'vue'
import { BasicUpload } from 'quick-element-plus'

const fileUrl = ref('')
</script>
```

## 多文件上传

```vue
<template>
  <BasicUpload v-model="fileList" action="/api/upload" :multiple="true" :limit="3" />
</template>

<script setup>
import { ref } from 'vue'
import { BasicUpload } from 'quick-element-plus'

const fileList = ref([])
</script>
```

## Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| modelValue | 文件 URL（字符串或数组） | `string \| string[] \| UploadFile[]` | - | 否 |
| action | 上传接口地址 | `string` | `''` | 否 |
| disabled | 是否禁用 | `boolean` | `false` | 否 |
| multiple | 是否支持多选 | `boolean` | `false` | 否 |
| limit | 最大允许上传个数 | `number` | `1` | 否 |
| maxSize | 文件大小限制（MB） | `number` | `10` | 否 |
| accept | 接受的文件类型 | `string` | `'*'` | 否 |
| buttonText | 按钮文本 | `string` | `'点击上传'` | 否 |
| showTip | 是否显示提示 | `boolean` | `true` | 否 |
| tipText | 自定义提示文本 | `string` | - | 否 |
| beforeUpload | 上传前钩子 | `(file: File) => boolean \| Promise<boolean>` | - | 否 |

## Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| update:modelValue | 文件列表变化时触发 | `string \| string[] \| UploadFile[]` |
| success | 文件上传成功时触发 | `(response, file)` |
| error | 文件上传失败时触发 | `(error, file)` |
| remove | 文件移除时触发 | `(file, fileList)` |

## 完整示例

```vue
<template>
  <BasicUpload
    v-model="fileUrl"
    action="/api/upload"
    accept=".jpg,.png,.pdf"
    :max-size="5"
    :limit="1"
    button-text="选择文件"
    tip-text="仅支持 jpg/png/pdf 格式，单文件不超过 5MB"
    @success="handleSuccess"
    @error="handleError"
  />
</template>

<script setup>
import { ref } from 'vue'
import { BasicUpload } from 'quick-element-plus'

const fileUrl = ref('')

function handleSuccess(response, file) {
  console.log('上传成功', response)
}

function handleError(error, file) {
  console.error('上传失败', error)
}
</script>
```