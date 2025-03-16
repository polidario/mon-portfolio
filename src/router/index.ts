import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '../views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Homepage,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/404Page.vue'),
    },
    {
      path: '/work',
      name: 'work',
      component: () => import('../views/WorkPage.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutPage.vue'),
    }
  ]
})

export default router
