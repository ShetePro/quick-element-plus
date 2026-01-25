<template>
  <div class="flex flex-col w-full box-border" :style="column.style || {}">
    <div class="mb-2 font-bold">{{ column.label }}</div>
    <el-row class="flex flex-row flex-wrap" :gutter="20">
      <el-col
        v-for="col in getColumns"
        :key="getFormItemKey(col)"
        :span="col.span"
        :style="getFormItemStyle(col)"
      >
        <BasicFormItem
          v-model="formData[col.prop]"
          :col="col"
          :options="options"
          :disabled="disabled || col.disabled"
        >
        </BasicFormItem>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { BasicFormColumnProps, BasicFormOption } from '@/components/Form/src/types'
import BasicSelect from '@/components/Select/BasicSelect.vue'
import { useVModel } from '@vueuse/core'
import BasicRadio from '@/components/Radio/BasicRadio.vue'
import BasicUpload from '@/components/FileUpload/BasicUpload.vue'
import BasicFormItem from '@/components/Form/src/BasicFormItem.vue'
import { getFormItemKey, getFormItemStyle } from '@/components/Form/src/util'
import { computed } from 'vue'

const formData = defineModel<Recordable>({
  default: () => {}
})
const props = defineProps<{
  column: BasicFormColumnProps
  options: BasicFormOption
  disabled?: boolean
}>()
const getColumns = computed(() => {
  return props.column?.children?.filter((item) => item.display) || []
})
</script>

<style scoped></style>
