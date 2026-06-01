import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Quick Element Plus',
  description: '基于 Element Plus 的快速组件库文档',
  lang: 'zh-CN',
  base: '/quick-element-plus/',

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '组件', link: '/components/' }
    ],

    // 右侧目录配置
    outline: {
      level: [2, 4], // 显示 h2 到 h4 标题
      label: '本页目录'
    },

    sidebar: {
      '/components/': [
        {
          text: '组件',
          items: [
            { text: 'Button 按钮', link: '/components/button' },
            { text: 'Dialog 对话框', link: '/components/dialog' },
            { text: 'Form 表单', link: '/components/form' },
            { text: 'Table 表格', link: '/components/table' },
            { text: 'Pagination 分页', link: '/components/pagination' },
            { text: 'Radio 单选', link: '/components/radio' },
            { text: 'Select 选择器', link: '/components/select' },
            { text: 'Upload 上传', link: '/components/upload' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ShetePro/quick-element-plus' }
    ],

    footer: {
      message: 'Released under the ISC License.',
      copyright: 'Copyright © 2024'
    }
  }
})
