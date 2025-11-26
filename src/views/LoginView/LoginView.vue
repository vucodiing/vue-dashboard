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
            <el-input
              v-model="form.username"
              autofocus="true"
              clearable
              placeholder="Tên đăng nhập"
              size="large"
            >
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
              clearable
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
import mushroom, { type MushroomError } from '@/service/api/mushroom-api';
import { LogoutMode } from 'mushroomjs-auth';
import router from '@/router';
import Swal from 'sweetalert2';
import method from '@/utils/method';
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
      await mushroom.$auth.loginAsync(form.username, form.password, true);
      const { result } = await mushroom.$auth.meAsync();
      if (!result.roles.includes('Admin')) {
        localStorage.clear();
        await mushroom.$auth.logoutAsync({ mode: LogoutMode.InvalidClientSession });
        await Swal.fire({
          title: 'Thông báo',
          text: 'Bạn không có quyền truy cập',
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Đồng ý',
          allowOutsideClick: false,
        });
        return;
      }
      router.push('/');
    } catch (error) {
      method.showError(error as MushroomError);
    } finally {
      loading.value = false;
    }
  });
};
</script>

<style scoped lang="scss" src="./LoginView.scss"></style>
