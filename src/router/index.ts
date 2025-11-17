import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

import DashboardLayout from '@/layout/DashboardLayout.vue';

// Pages
import Home from '@/views/HomeView.vue';
import About from '@/views/AboutView.vue';
import Settings from '@/views/SettingsView.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: DashboardLayout,
    children: [
      {
        path: '/', // trang chủ
        name: 'Trang chủ',
        component: Home,
        meta: {
          icon: 'fa-light fa-house',
          accessRoles: ['Admin'],
        },
      },
      {
        path: 'about',
        name: 'About',
        component: About,
        meta: {
          icon: 'fa-light fa-pen',
          accessRoles: ['*'],
        },
      },
      {
        path: 'settings',
        name: 'Cài đặt chung',
        component: Settings,
        meta: {
          icon: 'fa-light fa-gear',
          accessRoles: ['Admin'],
        },
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
