import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

import DashboardLayout from '@/layout/DashboardLayout.vue';

// Pages
import Home from '@/views/HomeView.vue';
import About from '@/views/AboutView.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: DashboardLayout,
    children: [
      {
        path: '', // trang chủ
        name: 'DashboardHome',
        component: Home,
      },
      {
        path: 'about',
        name: 'About',
        component: About,
      },
    ],
  },

  // 404
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
