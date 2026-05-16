<template>
  <div class="basic-select w-full">
    <el-select
      v-model="data"
      v-bind="attrs"
      v-if="!detail"
      :value-key="getPropsOption.value"
      :clearable="isUnDef(attrs.clearable) ? true : attrs.clearable"
    >
      <el-option
        v-for="item in getOptionList"
        :key="item[getPropsOption.value]"
        :value="item[getPropsOption.value]"
        :label="item[getPropsOption.label]"
        @click="optionClick(item)"
      >
      </el-option>
      <slot></slot>
    </el-select>
    <div v-else>
      <div class="flex flex-row flex-wrap gap-1 justify-center">
        <el-tag effect="dark" v-for="item in getDetailText" :key="item">
          {{ item }}
        </el-tag>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, useAttrs, watch } from 'vue'
import { DictItem } from '@/types/dict'
import { useVModel } from '@vueuse/core'
import { isArray, isUnDef } from '@/utils/is'
import { requestDictByUrl } from '@/utils/dict'

const props = defineProps<{
  modelValue: number | string | undefined
  dictData?: Record<string, any>[]
  dictUrl?: string
  dictQuery?: { data?: Record<string, any>; params?: Record<string, any> }
  dictMethod?: 'get' | 'post'
  dictResponseHandle?: (res: Record<string, any>) => Record<string, any>[]
  detail?: boolean
  propsOption?: { value: string; label: string }
}>()
const emits = defineEmits(['optionClick', 'update:modelValue'])

const attrs = useAttrs()
const data = useVModel(props, 'modelValue', emits)
const optionList = ref<Record<string, any>[]>([])

const getOptionList = computed((): Record<string, any>[] => {
  return props.dictData || optionList.value
})

const getPropsOption = computed(() => {
  return Object.assign({ label: 'label', value: 'value' }, props.propsOption)
})

const getDetailText = computed(() => {
  const { dictData } = props
  const { value, label } = getPropsOption.value
  let textList: string[] = []
  const currentValue = data.value
  
  if (isArray(currentValue)) {
    (currentValue as any[]).forEach((dataValue) => {
      const dictItem = dictData?.find((item) => item[value] === dataValue)
      textList.push(dictItem ? dictItem[label] : String(dataValue))
    })
  } else {
    const dictItem = dictData?.find((item) => item[value] === currentValue)
    textList.push(dictItem ? dictItem[label] : String(currentValue))
  }
  return textList
})

// 请求字典数据
async function fetchDictData() {
  if (!props.dictUrl) return
  
  try {
    const { data: resData } = await requestDictByUrl({
      url: props.dictUrl,
      method: props.dictMethod || 'get',
      data: props.dictQuery?.data || {},
      params: props.dictQuery?.params || {}
    })
    
    optionList.value = props.dictResponseHandle ? props.dictResponseHandle(resData) : resData
  } catch (error) {
    console.error('Failed to fetch dict data:', error)
  }
}

watch(
  () => props.dictQuery,
  () => {
    if (props.dictUrl) {
      fetchDictData()
    }
  }
)

onMounted(() => {
  if (!props.dictData && props.dictUrl) {
    fetchDictData()
  }
})

function optionClick(item: Record<string, any>) {
  emits('optionClick', item as DictItem)
}
</script>

<style scoped>
.basic-select {
  width: 100%;
}
</style>
