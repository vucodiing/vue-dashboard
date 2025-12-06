<template>
  <div class="card-component">
    <!-- Header Section -->
    <div class="card-component__header">
      <div class="card-component__header-content">
        <h3 class="card-component__title">{{ title }}</h3>
        <p v-if="subtitle" class="card-component__subtitle">{{ subtitle }}</p>
      </div>
      <div class="card-component__header-actions">
        <slot name="actions"></slot>
      </div>
    </div>

    <!-- Body Section -->
    <div class="card-component__body">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  subtitle?: string;
}

defineProps<Props>();
</script>

<style scoped lang="scss">
.card-component {
  background: white;
  border-radius: var(--border-radius-md);
  box-shadow: var(--box-shadow);
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;

  &__header {
    padding: var(--space-lg);
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-shrink: 0;
  }

  &__header-content {
    flex: 1;
  }

  &__header-actions {
    margin-left: var(--space-md);
  }

  &__title {
    font-size: var(--font-size-lg);
    font-weight: 600;
    color: var(--color-text-dark);
    margin: 0;
  }

  &__subtitle {
    font-size: var(--font-size-sm);
    color: #6b7280;
    margin: 4px 0 0 0;
  }

  &__body {
    padding: var(--space-lg);
    flex: 1;
    overflow: hidden;
  }
}
</style>
