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

<style scoped lang="scss" src="./Sidebar.scss"></style>
