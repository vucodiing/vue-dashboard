<template>
  <div class="sidebar">
    <div class="sidebar__logo">
      <img :src="LOGO" alt="" height="50" />
      <p>DEMO <span>Admin</span></p>
    </div>
    <router-link v-for="(r, i) in arrayRouter" :key="i" :to="r.path">
      <i v-if="r.meta?.icon" :class="`${r.meta.icon} sidebar__icon`" />
      <span>{{ r.name }}</span>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import router from '@/router/index';
import LOGO from '@/assets/logo.png';
const arrayRouter = computed(() => router.options.routes[0]?.children);

onMounted(() => {
  //
});
</script>

<style scoped lang="scss">
.sidebar {
  width: var(--sidebar-width);
  // background: #1f2a37;
  // height: 100vh;
  color: var(--primary-dark-color);
  padding: var(--spacing-lg);
  box-sizing: border-box;
  &__logo {
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: var(--spacing-lg);
    img {
      margin-right: var(--spacing-sm);
    }
    p {
      font-size: var(--font-size-lg);
      color: var(--primary-dark-color);
    }
    span {
      font-weight: 400;
      font-size: var(--font-size-base);
    }
  }
  &__icon {
    font-size: var(--font-size-lg);
    margin-right: var(--spacing-base);
  }
  a {
    display: block;
    margin-bottom: calc(var(--spacing-sm) * 2);
  }
  a {
    padding: var(--spacing-base);
    border-radius: var(--border-base);
  }
  a.router-link-exact-active {
    background-color: rgba(87, 120, 252, 0.155);
    border: thin solid #d0d9ff;
    color: var(--primary-color);
    font-weight: bold;
  }
}
</style>
