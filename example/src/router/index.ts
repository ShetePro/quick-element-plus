import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/Home.vue') },
  { path: '/table', name: 'Table', component: () => import('@/views/TableDemo.vue') },
  { path: '/form', name: 'Form', component: () => import('@/views/FormDemo.vue') },
  { path: '/dialog', name: 'Dialog', component: () => import('@/views/DialogDemo.vue') },
  { path: '/button', name: 'Button', component: () => import('@/views/ButtonDemo.vue') },
  { path: '/select', name: 'Select', component: () => import('@/views/SelectDemo.vue') },
  { path: '/radio', name: 'Radio', component: () => import('@/views/RadioDemo.vue') },
  { path: '/pagination', name: 'Pagination', component: () => import('@/views/PaginationDemo.vue') },
  { path: '/upload', name: 'Upload', component: () => import('@/views/UploadDemo.vue') },
  { path: '/icon', name: 'Icon', component: () => import('@/views/IconDemo.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router