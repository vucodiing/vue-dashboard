<template>
  <aside class="sidebar">
    <div class="sidebar__logo">
      <img :src="LOGO" alt="Logo" width="50" height="50" />
      <p>DEMO <span>Admin</span></p>
    </div>

    <nav class="sidebar__menu">
      <router-link
        v-for="route in menuRoutes"
        :key="route.path"
        :to="route.path"
        class="sidebar__link"
      >
        <i v-if="route.meta?.icon" :class="[route.meta.icon, 'sidebar__icon']" />
        <span>{{ route.name }}</span>
      </router-link>
    </nav>

    <div class="sidebar__footer" @click="handleLogout">
      <i class="fa-regular fa-power-off sidebar__icon" />
      <span>Đăng xuất</span>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import mushroom from '@/service/api/mushroom-api';
import router from '@/router/index';
import LOGO from '@/assets/logo.png';
import Swal from 'sweetalert2';
import { LogoutMode } from 'mushroomjs-auth';
const menuRoutes = computed(() => router.options.routes[0]?.children ?? []);
const handleLogout = (): void => {
  Swal.fire({
    title: 'Đăng xuất?',
    text: 'Bạn sẽ đăng xuất khỏi hệ thống',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#0f7ccf',
    cancelButtonColor: '#a6a6a6',
    confirmButtonText: 'Đăng xuất',
    cancelButtonText: 'Hủy',
  }).then(async (result) => {
    if (result.isConfirmed) {
      localStorage.clear();
      await mushroom.$auth.logoutAsync({ mode: LogoutMode.InvalidClientSession });
      router.push('/login');
    }
  });
};
</script>

<style scoped lang="scss">
.sidebar {
  width: 250px;
  height: 100vh;
  background-color: #000;
  display: flex;
  flex-direction: column;
  color: var(--color-text-light);
  .router-link-exact-active {
    background: var(--bg-gradient-primary);
  }

  &__logo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-sm);
    margin: var(--space-lg);
  }

  &__menu {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }

  &__link {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    padding: var(--space-md);
    color: var(--text-primary);
    text-decoration: none;
    transition: all 0.3s ease;
    &:hover:not(.router-link-exact-active) {
      background-color: rgb(from var(--color-primary) r g b / 0.2);
    }
  }
  &__footer {
    background: var(--bg-gadient-secondary);
    background-size: 200% 200%;
    background-position: left;
    transition: background-position 0.3s ease;
    padding: var(--space-sm);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-md);
    &:hover {
      background-position: right;
    }
  }

  &__icon {
    font-size: var(--font-size-xl);
  }
}
</style>
