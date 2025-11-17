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

    <div class="sidebar__footer">
      <el-button type="danger" @click="handleLogout">
        <i class="fa-regular fa-power-off sidebar__icon" />
        <span>Đăng xuất</span>
      </el-button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import router from '@/router/index';
import LOGO from '@/assets/logo.png';
import Swal from 'sweetalert2';
const menuRoutes = computed(() => router.options.routes[0]?.children ?? []);

const handleLogout = (): void => {
  Swal.fire({
    title: 'Đăng xuất?',
    text: 'Bạn sẽ đăng xuất khỏi hệ thống',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#a6a6a6',
    confirmButtonText: 'Đăng xuất',
    cancelButtonText: 'Hủy',
  }).then((result) => {
    if (result.isConfirmed) {
      console.log('Đăng xuất');
    }
  });
};
</script>

<style scoped lang="scss">
.sidebar {
  position: relative;
  display: flex;
  flex-direction: column;
  width: var(--sidebar-width);
  height: 100vh;
  padding: var(--spacing-lg);
  background-color: #1f2a37;
  color: var(--text-light-color);
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;

  &__logo {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: var(--spacing-lg);
    font-weight: 700;

    img {
      margin-right: var(--spacing-sm);
    }

    p {
      font-size: var(--font-size-lg);
      margin: 0;
    }

    span {
      font-weight: 400;
      font-size: var(--font-size-base);
    }
  }

  &__menu {
    flex: 1;
    overflow-y: auto;
  }

  &__link {
    display: flex;
    align-items: center;
    padding: var(--spacing-base);
    margin-bottom: calc(var(--spacing-sm) * 2);
    border-radius: var(--border-base);

    &:hover {
      background-color: rgba(87, 120, 252, 0.1);
    }

    &.router-link-exact-active {
      background-color: rgba(87, 120, 252, 0.155);
      border: 1px solid #d0d9ff;
      font-weight: bold;
    }
  }

  &__icon {
    flex-shrink: 0;
    margin-right: var(--spacing-base);
    font-size: var(--font-size-lg);
  }

  &__footer {
    padding-top: var(--spacing-lg);
    border-top: 1px solid rgba(255, 255, 255, 0.1);

    button {
      width: 100%;
    }
  }
}
</style>
