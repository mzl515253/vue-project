import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/layout',
      name: 'layout',
      component: () => import('@/pages/layout.vue'),
      children: [
        {
          path: 'Vue2',
          name: 'Vue2',
          component: () => import('@/pages/menus/Vue2.vue'),
        },
        {
          path: 'Vue3',
          name: 'Vue3',
          component: () => import('@/pages/menus/Vue3.vue'),
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('@/pages/menus/dashboard.vue'),
        },
        {
          path: 'products',
          name: 'products',
          component: () => import('@/pages/menus/products.vue'),
        },
        {
          path: 'text8',
          name: 'text8',
          component: () => import('@/pages/menus/text8.vue'),
        },
        {
          path: 'ts',
          name: 'ts',
          component: () => import('@/pages/menus/tsNote.vue'),
        },
      ]
    },
    {
      path: '/',
      redirect: '/layout'
    }
  ],
})

export default router
