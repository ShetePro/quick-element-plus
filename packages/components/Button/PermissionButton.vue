<template>
  <el-button v-bind="attrs" v-if="show">
    <slot>
      <span>
        {{ label || '权限按钮' }}
      </span>
    </slot>
  </el-button>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { PermissionsType, usePermissions } from '@/hook/usePermissions'

// 默认权限配置
const defaultPermissionProps = {
  create: 'create',
  update: 'update',
  delete: 'delete',
  view: 'view',
  audit: 'audit',
}

type PermissionButtonProps = {
  label?: string
  permission: PermissionsType
}

const props = defineProps<PermissionButtonProps>()
const attrs = useAttrs()
const permissionsMap = defaultPermissionProps
const permission = computed(() => {
  return permissionsMap[props.permission]
})
const [permissionStatus] = usePermissions()
const show = computed(() => {
  return permissionStatus[permission.value] !== false
})
</script>

<style scoped></style>
