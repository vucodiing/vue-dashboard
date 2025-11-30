<template>
  <div class="layout">
    <SidebarComponent />
    <div class="layout__content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import SidebarComponent from '@/component/SidebarComponent/SidebarComponent.vue';
</script>

<style scoped lang="scss">
.layout {
  height: 100vh;
  display: flex;
  // padding: var(--space-md);
  // background-color: var(--bg-tertiary);
  &__content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }
}
</style>
