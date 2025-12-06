<template>
  <div class="card-component">
    <!-- Loading Skeleton -->
    <template v-if="loading">
      <!-- Header Skeleton -->
      <div class="card-component__header">
        <div class="card-component__header-content">
          <div class="skeleton skeleton-title"></div>
          <div class="skeleton skeleton-subtitle"></div>
        </div>
      </div>

      <!-- Body Skeleton -->
      <div class="card-component__body">
        <div class="skeleton skeleton-body"></div>
      </div>
    </template>

    <!-- Actual Content -->
    <template v-else>
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
    </template>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  subtitle?: string;
  loading?: boolean;
  bodyHeight?: string;
}

withDefaults(defineProps<Props>(), {
  loading: false,
  bodyHeight: '400px',
});
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
    font-weight: 600;
    color: var(--color-text-dark);
    margin: 0;
    line-height: 1.5;
  }

  &__subtitle {
    font-size: var(--font-size-sm);
    color: #6b7280;
    margin: 4px 0 0 0;
    line-height: 1.5;
  }

  &__body {
    padding: var(--space-lg);
    // flex: 1; // Removed flex: 1 to respect fixed height
    overflow: hidden;
    height: v-bind(bodyHeight);
  }
}

// Skeleton Styles
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

.skeleton-title {
  height: 30px; // Match title line-height (20px * 1.5)
  width: 60%;
  margin: 0;
}

.skeleton-subtitle {
  height: 21px; // Match subtitle line-height (14px * 1.5)
  width: 80%;
  margin: 4px 0 0 0; // Match subtitle margin
}

.skeleton-body {
  height: 100%;
  width: 100%;
  min-height: 200px;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>
