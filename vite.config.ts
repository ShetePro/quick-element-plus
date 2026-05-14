import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ["index.ts", "packages/**/*.ts", "packages/**/*.vue", "types/**/*.ts"],
      exclude: ["node_modules", "example", "doc"],
      insertTypesEntry: true,
      copyDtsFiles: true,
      outDir: "dist",
    }),
  ],
  resolve: {
    alias: {
      "@/components": resolve(__dirname, "packages/components"),
      "@/utils": resolve(__dirname, "packages/utils"),
      "@/hook": resolve(__dirname, "packages/hook"),
      "@utils": resolve(__dirname, "packages/utils"),
      "@hook": resolve(__dirname, "packages/hook"),
    },
  },
  build: {
    // 库模式配置
    lib: {
      entry: resolve(__dirname, "index.ts"), // 打包入口文件
      name: "QuickElementPlus",
      fileName: (format) => `index.${format}.js`, // 输出文件名
    },
    rollupOptions: {
      // 确保外部化那些你不想打包进库的依赖（重要！）
      external: ["vue", "element-plus", "axios", "vue-router"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
          "element-plus": "ElementPlus",
          axios: "axios",
          "vue-router": "VueRouter",
        },
      },
    },
  },
});
