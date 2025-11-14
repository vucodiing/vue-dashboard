<template>
  <div class="layout">
    <Sidebar />

    <div class="layout__content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '@/component/SidebarComponent.vue';
</script>

<style scoped lang="scss">
.layout {
  display: flex;
  height: 100vh;
  &__content {
    flex: 1;
    background: var(--background-color);
    overflow-y: auto;
    padding: var(--spacing-base);
  }
}
</style>
