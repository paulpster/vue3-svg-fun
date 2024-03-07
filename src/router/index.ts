import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/circles',
      name: 'Apollonius',
      component: () => import('@/views/CirclesView.vue')
    },
    {
      path: '/drawing',
      name: 'Drawing Machine',
      component: () => import('../views/DrawingView.vue')
    },
    {
      path: '/grids',
      name: 'Grids',
      component: () => import('../views/GridsView.vue')
    },
    {
      path: '/guilloche',
      name: 'Guilloche',
      component: () => import('../views/GuillocheView.vue')
    },
    {
      path: '/penrose',
      name: 'Penrose',
      component: () => import('../views/PenroseView.vue')
    },
    {
      path: '/spiro',
      name: 'Spirograph',
      component: () => import('../views/SpirographView.vue')
    },
    {
      path: '/tessel',
      name: 'Tesslations',
      component: () => import('../views/TesselateView.vue')
    },
    {
      path: '/tiling',
      name: 'Tilings',
      component: () => import('../views/TilingView.vue')
    },
    {
      path: '/testbed',
      name: 'TestBed',
      component: () => import('../views/TestBed.vue')
    }
  ]
});

export default router;
