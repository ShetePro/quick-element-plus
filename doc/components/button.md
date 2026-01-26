# Button 按钮

按钮组件提供了三种常用的业务按钮：导出按钮、导入按钮和权限按钮。

## 概述

Button 组件库包含三个业务场景常用的按钮组件：

- **ExportButton（导出按钮）**：用于导出 Excel 文件，支持自定义导出接口、文件名和请求参数
- **ImportButton（导入按钮）**：用于导入 Excel 文件，支持文件选择和导入后的回调处理
- **PermissionButton（权限按钮）**：根据权限控制按钮的显示/隐藏，适用于权限管理系统

这些组件基于 Element Plus 的 Button 组件封装，保留了所有原生功能，同时提供了业务场景的便捷功能。

## ExportButton 导出按钮

用于导出 Excel 文件的按钮组件。

### 基础用法

```vue
<template>
  <ExportButton 
    api="/api/export" 
    label="导出数据"
    export-name="数据报表"
  />
</template>

<script setup>
import { ExportButton } from '@quick-element-plus/components'
</script>
```

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| api | 导出接口地址 | `string` | - | 是 |
| label | 按钮文本 | `string` | `'导出'` | 否 |
| icon | 图标名称 | `string` | - | 否 |
| exportName | 导出文件名 | `string` | 路由名称或 `'导出文件'` | 否 |
| requestData | 请求体数据 | `Recordable` | - | 否 |
| requestQuery | 请求查询参数 | `Recordable` | - | 否 |

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| confirm | 导出成功后的回调 | - |

### 示例

```vue
<template>
  <ExportButton 
    api="/api/users/export"
    label="导出用户"
    icon="material-symbols:download"
    export-name="用户列表"
    :request-query="{ status: 'active' }"
    @confirm="handleExportSuccess"
  />
</template>
```

## ImportButton 导入按钮

用于导入 Excel 文件的按钮组件。

### 基础用法

```vue
<template>
  <ImportButton 
    api="/api/import" 
    label="导入数据"
  />
</template>

<script setup>
import { ImportButton } from '@quick-element-plus/components'
</script>
```

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| api | 导入接口地址 | `string` | - | 是 |
| label | 按钮文本 | `string` | `'导入'` | 否 |
| icon | 图标名称 | `string` | - | 否 |
| requestData | 请求体数据 | `Recordable` | - | 否 |
| requestQuery | 请求查询参数 | `Recordable` | - | 否 |
| isDownload | 是否导入后下载文件 | `boolean` | `false` | 否 |

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| confirm | 导入成功后的回调 | - |

### 示例

```vue
<template>
  <ImportButton 
    api="/api/users/import"
    label="导入用户"
    icon="material-symbols:upload"
    :is-download="true"
    @confirm="handleImportSuccess"
  />
</template>
```

## PermissionButton 权限按钮

根据权限控制显示/隐藏的按钮组件。

### 基础用法

```vue
<template>
  <PermissionButton 
    permission="user:create"
    label="创建用户"
  />
</template>

<script setup>
import { PermissionButton } from '@quick-element-plus/components'
</script>
```

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| permission | 权限标识 | `PermissionsType` | - | 是 |
| label | 按钮文本 | `string` | `'权限按钮'` | 否 |

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| confirm | 点击确认后的回调 | - |

### 示例

```vue
<template>
  <PermissionButton 
    permission="user:delete"
    label="删除"
    type="danger"
    @confirm="handleDelete"
  />
</template>
```

### 说明

- 组件会根据 `permission` 属性从系统配置中获取对应的权限标识
- 只有拥有对应权限时，按钮才会显示
- 支持所有 Element Plus Button 的原生属性
