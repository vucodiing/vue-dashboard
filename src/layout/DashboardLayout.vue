<template>
  <div class="dashboard-layout">
    <Sidebar />

    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '@/component/SidebarComponent.vue';
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  height: 100vh;
}

.content {
  flex: 1;
  background: #f5f6fa;
  padding: 20px;
  overflow-y: auto;
}
</style>
