<template>
  <el-upload
    v-model:file-list="fileList"
    :action="action"
    :disabled="disabled"
    :multiple="multiple"
    :limit="limit"
    :before-upload="beforeUpload"
    :on-success="handleSuccess"
    :on-error="handleError"
    :on-remove="handleRemove"
    v-bind="$attrs"
  >
    <el-button type="primary" :disabled="disabled">
      <Icon icon="svg-upload" />
      <span class="ml-1">{{ buttonText }}</span>
    </el-button>
    <template #tip v-if="showTip">
      <div class="el-upload__tip">
        {{ tipText || `支持 ${accept} 格式，单个文件不超过 ${maxSize}MB` }}
      </div>
    </template>
  </el-upload>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import Icon from '@/components/Icon/src/Icon.vue'

type UploadFile = {
  name: string
  url: string
  response?: any
}

interface BasicUploadProps {
  modelValue?: string | string[] | UploadFile[]
  action?: string
  disabled?: boolean
  multiple?: boolean
  limit?: number
  maxSize?: number // MB
  accept?: string
  buttonText?: string
  showTip?: boolean
  tipText?: string
  beforeUpload?: (file: File) => boolean | Promise<boolean>
}

const props = withDefaults(defineProps<BasicUploadProps>(), {
  action: '',
  disabled: false,
  multiple: false,
  limit: 1,
  maxSize: 10,
  accept: '*',
  buttonText: '点击上传',
  showTip: true,
})

const emits = defineEmits<{
  'update:modelValue': [value: string | string[] | UploadFile[]]
  success: [response: any, file: any]
  error: [error: any, file: any]
  remove: [file: any, fileList: any[]]
}>()

const fileList = ref<UploadFile[]>([])

// 监听 modelValue 变化
watch(
  () => props.modelValue,
  (val) => {
    if (typeof val === 'string') {
      fileList.value = val ? [{ name: val.split('/').pop() || val, url: val }] : []
    } else if (Array.isArray(val)) {
      fileList.value = val.map((item) => {
        if (typeof item === 'string') {
          return { name: item.split('/').pop() || item, url: item }
        }
        return item
      })
    }
  },
  { immediate: true }
)

// 默认上传前检查
const defaultBeforeUpload = (file: File): boolean => {
  const isLtMaxSize = file.size / 1024 / 1024 < props.maxSize
  if (!isLtMaxSize) {
    ElMessage.error(`文件大小不能超过 ${props.maxSize}MB!`)
    return false
  }
  return true
}

const handleBeforeUpload = (file: File): boolean | Promise<boolean> => {
  if (props.beforeUpload) {
    return props.beforeUpload(file)
  }
  return defaultBeforeUpload(file)
}

const handleSuccess = (response: any, file: any) => {
  emits('success', response, file)
  // 更新 modelValue
  const urls = fileList.value.map((f) => f.url)
  emits('update:modelValue', props.multiple ? urls : urls[0] || '')
}

const handleError = (error: any, file: any) => {
  ElMessage.error('上传失败')
  emits('error', error, file)
}

const handleRemove = (file: any, fileList: any[]) => {
  emits('remove', file, fileList)
  const urls = fileList.map((f) => f.url)
  emits('update:modelValue', props.multiple ? urls : urls[0] || '')
}
</script>

<style scoped>
.ml-1 {
  margin-left: 4px;
}
</style>
