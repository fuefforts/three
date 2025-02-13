/* eslint-disable */

import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '@/views/gIndex.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: Index
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.PUBLIC_PATH || '/'),
  routes
})

export default router
