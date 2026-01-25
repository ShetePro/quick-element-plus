import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@/components': resolve(__dirname, 'packages/components')
    },
  },
  build: {
    // 库模式配置
    lib: {
      entry: resolve(__dirname, 'index.ts'), // 打包入口文件
      name: "QuickElementPlus",
      fileName: (format) => `index.${format}.js`, // 输出文件名
    },
    rollupOptions: {
      // 确保外部化那些你不想打包进库的依赖（重要！）
      external: ['vue', 'element-plus'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus',
        },
      },
    },
  },
});
