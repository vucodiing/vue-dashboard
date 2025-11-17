<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-illustration">
        <div class="illustration-content">
          <h2>Quản lý công việc hiệu quả</h2>
          <p>Nền tảng giúp bạn tổ chức và hoàn thành mọi công việc một cách dễ dàng</p>
          <div class="features">
            <div class="feature-item">
              <el-icon :size="24"><Select /></el-icon>
              <span>Bảo mật cao</span>
            </div>
            <div class="feature-item">
              <el-icon :size="24"><Select /></el-icon>
              <span>Dễ sử dụng</span>
            </div>
            <div class="feature-item">
              <el-icon :size="24"><Select /></el-icon>
              <span>Hỗ trợ 24/7</span>
            </div>
          </div>
        </div>
        <div class="illustration-bg">
          <div class="circle circle-1"></div>
          <div class="circle circle-2"></div>
          <div class="circle circle-3"></div>
        </div>
      </div>

      <div class="login-form-section">
        <div class="form-wrapper">
          <div class="logo-section">
            <div class="logo-icon">
              <img :src="LOGO" alt="Logo" />
            </div>
            <h1 class="logo-text">KIOSK Admin</h1>
          </div>

          <div class="welcome-text">
            <h2>Chào mừng trở lại</h2>
            <p>Đăng nhập để tiếp tục sử dụng dịch vụ</p>
          </div>

          <el-form
            ref="loginFormRef"
            :model="formData"
            :rules="rules"
            class="login-form"
            label-position="top"
            size="large"
            @submit.prevent="handleSubmit"
          >
            <el-form-item label="Email" prop="email">
              <el-input
                v-model="formData.email"
                type="email"
                placeholder="your@email.com"
                :prefix-icon="Message"
                clearable
              />
            </el-form-item>

            <el-form-item label="Mật khẩu" prop="password">
              <el-input
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                :prefix-icon="Lock"
                show-password
              />
            </el-form-item>

            <div class="form-options">
              <el-checkbox v-model="rememberMe" label="Ghi nhớ đăng nhập" />
            </div>

            <el-form-item>
              <el-button type="primary" native-type="submit" :loading="loading" class="btn-login">
                Đăng nhập
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import { Message, Lock, Select } from '@element-plus/icons-vue';
import LOGO from '@/assets/logo.png';

interface FormData {
  email: string;
  password: string;
}

const router = useRouter();
const loginFormRef = ref<FormInstance>();

const formData = reactive<FormData>({
  email: '',
  password: '',
});

const showPassword = ref(false);
const rememberMe = ref(false);
const loading = ref(false);

// Validation rules cho Element Plus
const rules = reactive<FormRules<FormData>>({
  email: [
    { required: true, message: 'Vui lòng nhập email', trigger: 'blur' },
    {
      type: 'email',
      message: 'Email không hợp lệ',
      trigger: ['blur', 'change'],
    },
  ],
  password: [
    { required: true, message: 'Vui lòng nhập mật khẩu', trigger: 'blur' },
    {
      min: 6,
      message: 'Mật khẩu phải có ít nhất 6 ký tự',
      trigger: 'blur',
    },
  ],
});

const handleSubmit = async (): Promise<void> => {
  if (!loginFormRef.value) return;

  await loginFormRef.value.validate(async (valid) => {
    if (!valid) return;

    loading.value = true;

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // TODO: Replace with actual API call
      console.log('Login data:', formData);
      console.log('Remember me:', rememberMe.value);

      ElMessage.success('Đăng nhập thành công!');

      // Navigate to dashboard or home page
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      ElMessage.error('Email hoặc mật khẩu không chính xác');
    } finally {
      loading.value = false;
    }
  });
};
</script>

<style scoped lang="scss" src="./LoginView.scss"></style>
