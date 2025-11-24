import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import DashboardLayout from '@/layout/DashboardLayout.vue';
import Home from '@/views/HomeView.vue';
import Settings from '@/views/SettingsView.vue';
import mushroom from '@/service/api/mushroom-api';

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
        path: 'account-manager',
        name: 'Tài khoản',
        component: () => import('@/views/AccountManager/AccountList.vue'),
        meta: {
          icon: 'fa-light fa-users',
          accessRoles: ['Admin'],
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

  // LOGIN
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView/LoginView.vue'),
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

router.beforeEach((to, from, next) => {
  const tokenKey = 'mushroom.tokens[' + mushroom.$using() + ']';
  const isAuthenticated = localStorage.getItem(tokenKey);
  if (to.name !== 'Login' && !isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
