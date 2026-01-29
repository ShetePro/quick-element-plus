<template>
  <i :class="iconClass" :style="iconStyle">
    <svg v-if="isSvgIcon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
      <path :d="svgPath" fill="currentColor" />
    </svg>
  </i>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface IconProps {
  icon: string
  size?: number | string
  color?: string
}

const props = withDefaults(defineProps<IconProps>(), {
  size: 16,
})

const isSvgIcon = computed(() => props.icon?.startsWith('svg-'))

const svgPath = computed(() => {
  // 简单的 SVG 路径映射，实际项目中可能需要更完善的方案
  const pathMap: Record<string, string> = {
    'svg-download': 'M512 768L256 512h192V256h128v256h192L512 768z',
    'svg-upload': 'M512 256L256 512h192v256h128V512h192L512 256z',
    'svg-export': 'M896 128H128v768h384v-64H192V192h640v576h-128v64h192V128z M512 640L320 448h128V256h128v192h128L512 640z',
    'svg-import': 'M896 128H128v768h384v-64H192V192h640v576h-128v64h192V128z M512 448L320 640h128v192h128V640h128L512 448z',
  }
  return pathMap[props.icon] || ''
})

const iconClass = computed(() => {
  if (isSvgIcon.value) {
    return 'icon-svg'
  }
  return [props.icon].filter(Boolean)
})

const iconStyle = computed(() => {
  const size = typeof props.size === 'number' ? `${props.size}px` : props.size
  return {
    fontSize: size,
    color: props.color,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: isSvgIcon.value ? size : undefined,
    height: isSvgIcon.value ? size : undefined,
  }
})
</script>

<style scoped>
.icon-svg {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.icon-svg svg {
  width: 100%;
  height: 100%;
}
</style>
