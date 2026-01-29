import { requestDictByUrl } from '@/utils/dict'
import { Ref, ref, watch } from 'vue'

type DictQuery = {
  data?: Recordable
  params?: Recordable
}

type UseDictColumn = {
  dictUrl?: string
  dictMethod?: 'get' | 'post'
  dictQuery?: DictQuery
  dictResponseHandle?: (res: Recordable) => Recordable[]
}

type UseDictProps = {
  columns: Ref<UseDictColumn[]>
}

export function useDict(props: UseDictProps) {
  function setDictDataByColumns(columns: Recordable[]) {
    columns.forEach((col: UseDictColumn) => {
      if (!col.dictUrl) return
      requestDictByUrl({
        url: col.dictUrl,
        method: col.dictMethod || 'get',
        data: col.dictQuery?.data || {},
        params: col.dictQuery?.params || {}
      }).then(({ data }) => {
        col.dictResponseHandle && (data = col.dictResponseHandle(data))
        // 设置字典数据逻辑
      })
    })
  }

  watch(
    () => props.columns,
    (columns) => {
      setDictDataByColumns(columns.value)
    },
    { deep: true, immediate: true }
  )

  return {}
}
