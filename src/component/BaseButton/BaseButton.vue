<template>
  <button :disabled="loading || disabled" :class="['base-btn', `scope-${scope}`]">
    <span :style="{ visibility: loading ? 'hidden' : 'visible' }">
      <i v-if="icon" :class="icon"></i>
      <slot></slot>
    </span>
    <span v-if="loading" class="loader">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </span>
  </button>
</template>

<script setup lang="ts">
type ButtonScope = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

interface Props {
  loading?: boolean;
  disabled?: boolean;
  icon?: string;
  scope?: ButtonScope;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  disabled: false,
  icon: undefined,
  scope: 'primary',
});
</script>

<style scoped>
.base-btn {
  --color-primary: #ed2438;
  --color-secondary: #0f7ccf;
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-danger: #f06548;
  --color-info: #299cdb;

  padding: 10px 16px;
  height: 40px;
  min-width: 100px;
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  border-bottom: 3px solid;
  transition:
    opacity 0.2s ease,
    transform 0.1s ease;
}

.base-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.base-btn:not(:disabled):hover {
  opacity: 0.9;
}

.base-btn:not(:disabled):active {
  transform: translateY(2px);
  border-bottom-width: 1px;
  padding-bottom: calc(10px + 2px);
}

/* Scope colors */
.scope-primary {
  --btn-color: var(--color-primary);
}

.scope-secondary {
  --btn-color: var(--color-secondary);
}

.scope-success {
  --btn-color: var(--color-success);
}

.scope-warning {
  --btn-color: var(--color-warning);
}

.scope-danger {
  --btn-color: var(--color-danger);
}

.scope-info {
  --btn-color: var(--color-info);
}

.base-btn {
  background: var(--btn-color);
  border-bottom-color: color-mix(in srgb, var(--btn-color), black 30%);
}

/* Loader styles */
.loader {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  box-sizing: border-box;
  animation: rotation 2s linear infinite;
}

.loader span {
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: white;
  box-sizing: border-box;
  animation: fadeInOut 2s linear infinite;
}

.loader span:nth-child(1) {
  left: 0;
  top: 0;
  transform: translate(-50%, -50%);
  animation-delay: 0s;
}

.loader span:nth-child(2) {
  right: 0;
  top: 0;
  transform: translate(50%, -50%);
  animation-delay: 0.5s;
}

.loader span:nth-child(3) {
  right: 0;
  bottom: 0;
  transform: translate(50%, 50%);
  animation-delay: 1s;
}

.loader span:nth-child(4) {
  left: 0;
  bottom: 0;
  transform: translate(-50%, 50%);
  animation-delay: 1.5s;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes fadeInOut {
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.3;
  }
}
</style>
