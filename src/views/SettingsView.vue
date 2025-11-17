<template>
  <div class="v-container">
    <div class="v-container__header">
      <div class="v-container__header-content">
        <h2>Settings</h2>
        <p>Welcome to the settings!</p>
      </div>
      <div class="v-container__header-actions">
        <el-segmented v-model="options" :options="directionOptions" />
      </div>
    </div>
    <div class="v-container__body"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const options = ref('account__info');
const directionOptions = [
  { label: 'Tài khoản', value: 'account__info' },
  { label: 'Đổi mật khẩu', value: 'account__change__password' },
  { label: 'Quên mật khẩu', value: 'account__reset__password' },
];
</script>
