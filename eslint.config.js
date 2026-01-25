// eslint.config.js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';

export default tseslint.config(
  // 忽略打包产物和依赖
  {
    ignores: ['dist/**', 'node_modules/**', 'docs/.vitepress/dist/**']
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser, // 在 .vue 文件中使用 TS 解析器
        sourceType: 'module',
        ecmaVersion: 'latest',
        extraFileExtensions: ['.vue'],
      },
    },
  },
  
  {
    // 自定义规则
    rules: {
      'vue/multi-word-component-names': 'off', // 允许单单词组件名
      '@typescript-eslint/no-explicit-any': 'warn', // 允许使用 any 但给予警告
      'no-debugger': 'error', // 禁止出现 debugger
    },
  }
);
