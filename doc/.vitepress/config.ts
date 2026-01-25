import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Quick Element Plus',
  description: '基于 Element Plus 的快速组件库文档',
  lang: 'zh-CN',
  base: '/',
  
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '组件', link: '/components/' }
    ],
    
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
            { text: 'Select 选择器', link: '/components/select' }
          ]
        }
      ]
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ],
    
    footer: {
      message: 'Released under the ISC License.',
      copyright: 'Copyright © 2024'
    }
  }
})
