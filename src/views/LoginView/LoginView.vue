<template>
  <div class="login">
    <div class="login__circles">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      <div class="circle circle-3"></div>
    </div>
    <div class="login__container">
      <div class="login__form">
        <div class="login__form--header">
          <img src="@/assets/logo.png" alt="logo" height="100" width="100" />
          <div class="login__form--header--text">
            <p>KIOSK Admin</p>
            <p>Quản trị KIOSK dịch vụ công</p>
          </div>
        </div>
        <el-form
          ref="ruleFormRef"
          :model="form"
          :rules="rules"
          class="login-form"
          @submit.prevent="submitForm(ruleFormRef)"
        >
          <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="Tên đăng nhập" size="large">
              <template #prefix>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="Mật khẩu"
              show-password
              size="large"
            >
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <VButton :loading="loading" @click="submitForm(ruleFormRef)"> Đăng nhập </VButton>
          </el-form-item>
        </el-form>
      </div>
      <div class="login__image"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { User, Lock } from '@element-plus/icons-vue';
import mushroom from '@/service/api/mushroom-api';
import router from '@/router';

const ruleFormRef = ref<FormInstance>();
const loading = ref(false);

const form = reactive({
  username: '',
  password: '',
});

const rules = reactive<FormRules>({
  username: [
    {
      required: true,
      message: 'Vui lòng nhập tên đăng nhập',
      trigger: 'blur',
    },
    {
      min: 3,
      message: 'Tên đăng nhập phải có ít nhất 3 ký tự',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: 'Vui lòng nhập mật khẩu',
      trigger: 'blur',
    },
    {
      min: 6,
      message: 'Mật khẩu phải có ít nhất 6 ký tự',
      trigger: 'blur',
    },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (!valid) {
      return;
    }
    loading.value = true;
    try {
      const response = await mushroom.$auth.loginAsync(form.username, form.password);
      if (response.result.token) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  });
};
</script>

<style scoped lang="scss">
.login {
  height: 100vh;
  align-content: center;
  background: var(--bg-gadient-secondary);
  position: relative;
  overflow: hidden;

  &__circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
  }

  .circle {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(4px);
    animation: float 6s ease-in-out infinite;

    &-1 {
      width: 200px;
      height: 200px;
      top: 10%;
      left: 20%;
      animation-delay: 0s;
    }

    &-2 {
      width: 370px;
      height: 370px;
      bottom: 10%;
      right: 20%;
      animation-delay: -2s;
      background: rgba(255, 255, 255, 0.15);
    }

    &-3 {
      width: 120px;
      height: 120px;
      bottom: 15%;
      left: 30%;
      animation-delay: -4s;
      background: rgba(255, 255, 255, 0.1);
    }
  }

  &__container {
    padding: 4rem;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: var(--border-radius);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 90%;
    max-width: 1000px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    position: relative;
    z-index: 1;
    animation: fadeOn 0.5s ease-in-out;
  }
  &__form {
    padding: 0 2rem;
    background-color: #fff;
    border-radius: var(--border-radius);
    &--header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin: 2rem 0;
    }
    &--header--text {
      p:first-child {
        font-size: var(--font-size-xl);
        font-weight: 600;
      }
    }
  }
  &__image {
    background: url('@/assets/login.png') no-repeat center center/cover;
    width: 100%;
    height: 100%;
  }
  button {
    width: 100%;
  }
}

@keyframes float {
  0% {
    transform: translateY(0px) scale(1);
  }
  50% {
    transform: translateY(-20px) scale(1.1);
  }
  100% {
    transform: translateY(0px) scale(1);
  }
}

@keyframes fadeOn {
  0% {
    transform: translateY(20px);
    opacity: 0.7;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
