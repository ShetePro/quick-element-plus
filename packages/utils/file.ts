import { ElMessage } from 'element-plus'

/**
 * 通过 Blob 下载文件
 * @param data 文件数据
 * @param filename 文件名
 * @param mime 文件类型
 */
export function downloadByBlob(data: BlobPart, filename: string, mime?: string) {
  const blob = new Blob([data], { type: mime || 'application/octet-stream' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

/**
 * 打开文件选择器
 * @param accept 接受的文件类型
 * @returns 选中的文件
 */
export function openFileSelect(accept?: string): Promise<File | null> {
  return new Promise((resolve) => {
    const input = document.createElement('input')
    input.type = 'file'
    if (accept) {
      input.accept = accept
    }
    input.onchange = () => {
      const file = input.files?.[0] || null
      resolve(file)
    }
    input.click()
  })
}

/**
 * 读取文件为 DataURL
 * @param file 文件对象
 * @returns DataURL
 */
export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

/**
 * 格式化文件大小
 * @param bytes 字节数
 * @returns 格式化后的字符串
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
