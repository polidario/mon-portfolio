import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage,
      meta: {
        title: 'Bernard Polidario — Software Engineer',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/404Page.vue'),
      meta: {
        title: '404 Not Found',
      },
    },
    {
      path: '/work',
      name: 'work',
      component: () => import('../views/WorkPage.vue'),
      meta: {
        title: 'Bernard Polidario — Work',
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutPage.vue'),
      meta: {
        title: 'Bernard Polidario — About',
      },
    }
  ]
})

router.beforeEach((to, from, next) => {
  const title = (to.meta.title as string) || 'Bernard Polidario — Software Engineer';
  document.title = title;
  next();
});

export default router
