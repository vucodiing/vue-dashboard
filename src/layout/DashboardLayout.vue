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
    margin: var(--spacing-base);
    // margin-left: 0;
    border: thin solid #e5e7eb;
    box-shadow: var(--box-shadow);
    border-radius: var(--border-base);
    flex: 1;
    background: #fff;
    overflow-y: auto;
  }
}
</style>
