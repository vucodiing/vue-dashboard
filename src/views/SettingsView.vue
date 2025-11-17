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
    <div class="v-container__body">
      <div class="password-form">
        <div class="password-form__image">
          <img :src="PASSWORD" alt="password" height="300" />
        </div>
        <div class="password-form__form">
          <!-- Account Info -->
          <div v-if="options === 'account__info'" class="account-info">
            <el-form style="max-width: 600px" label-width="auto">
              <el-form-item label="Tên tài khoản">
                <el-input v-model="accountInfo.username" disabled />
              </el-form-item>
              <el-form-item label="Email">
                <el-input v-model="accountInfo.email" disabled />
              </el-form-item>
            </el-form>
          </div>

          <!-- Change Password -->
          <div v-if="options === 'account__change__password'">
            <el-form
              ref="changePasswordFormRef"
              style="max-width: 600px"
              :model="changePasswordForm"
              :rules="rulesChangePassword"
              label-width="auto"
              label-position="top"
            >
              <el-form-item label="Mật khẩu cũ" prop="passwordOld">
                <el-input
                  v-model="changePasswordForm.passwordOld"
                  size="large"
                  type="password"
                  placeholder="Nhập mật khẩu cũ"
                  show-password
                  autocomplete="current-password"
                >
                  <template #prepend><i class="fa-light fa-lock"></i></template>
                </el-input>
              </el-form-item>
              <el-form-item label="Mật khẩu mới" prop="passwordNew">
                <el-input
                  v-model="changePasswordForm.passwordNew"
                  size="large"
                  type="password"
                  placeholder="Nhập mật khẩu mới"
                  show-password
                  autocomplete="new-password"
                >
                  <template #prepend><i class="fa-light fa-lock-keyhole"></i></template>
                </el-input>
              </el-form-item>
              <el-form-item label="Nhập lại mật khẩu" prop="passwordRe">
                <el-input
                  v-model="changePasswordForm.passwordRe"
                  size="large"
                  type="password"
                  placeholder="Nhập lại mật khẩu mới"
                  show-password
                  autocomplete="new-password"
                >
                  <template #prepend><i class="fa-light fa-lock-keyhole"></i></template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="large" @click="handleChangePassword"
                  >Đổi mật khẩu</el-button
                >
              </el-form-item>
            </el-form>
          </div>

          <!-- Reset Password -->
          <div v-if="options === 'account__reset__password'" class="password-form">
            <el-form
              ref="resetPasswordFormRef"
              style="max-width: 600px"
              :model="resetPasswordForm"
              :rules="rulesResetPassword"
              label-width="auto"
            >
              <el-form-item label="Email" prop="email">
                <el-input
                  v-model="resetPasswordForm.email"
                  type="email"
                  placeholder="Nhập email để khôi phục mật khẩu"
                  autocomplete="email"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleResetPassword"
                  >Khôi phục mật khẩu</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus';
import PASSWORD from '@/assets/password.png';

const changePasswordFormRef = ref<FormInstance>();
const resetPasswordFormRef = ref<FormInstance>();

const options = ref('account__info');
const directionOptions = [
  { label: 'Tài khoản', value: 'account__info' },
  { label: 'Đổi mật khẩu', value: 'account__change__password' },
  { label: 'Quên mật khẩu', value: 'account__reset__password' },
];

// Account info (dummy data)
const accountInfo = reactive({
  username: 'user@example.com',
  email: 'user@example.com',
});

// Change password form
const changePasswordForm = reactive({
  passwordOld: '',
  passwordNew: '',
  passwordRe: '',
});

// Reset password form
const resetPasswordForm = reactive({
  email: '',
});

// Validator for password confirmation
const validatePasswordMatch = (_rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('Vui lòng nhập lại mật khẩu mới'));
  } else if (value !== changePasswordForm.passwordNew) {
    callback(new Error('Mật khẩu mới không khớp!'));
  } else {
    callback();
  }
};

// Rules for change password
const rulesChangePassword = reactive<FormRules>({
  passwordOld: [{ required: true, message: 'Vui lòng nhập mật khẩu cũ', trigger: 'blur' }],
  passwordNew: [
    { required: true, message: 'Vui lòng nhập mật khẩu mới', trigger: 'blur' },
    { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự', trigger: 'blur' },
  ],
  passwordRe: [{ required: true, validator: validatePasswordMatch, trigger: 'blur' }],
});

// Rules for reset password
const rulesResetPassword = reactive<FormRules>({
  email: [
    { required: true, message: 'Vui lòng nhập email', trigger: 'blur' },
    { type: 'email', message: 'Email không hợp lệ', trigger: 'blur' },
  ],
});

// Handle change password
const handleChangePassword = async () => {
  if (!changePasswordFormRef.value) return;

  await changePasswordFormRef.value.validate((valid) => {
    if (valid) {
      // TODO: Call API to change password
      console.log('Change password:', changePasswordForm);
      ElMessage.success('Đổi mật khẩu thành công!');
      resetForm(changePasswordFormRef.value);
    } else {
      ElMessage.error('Vui lòng kiểm tra lại thông tin!');
    }
  });
};

// Handle reset password
const handleResetPassword = async () => {
  if (!resetPasswordFormRef.value) return;

  await resetPasswordFormRef.value.validate((valid) => {
    if (valid) {
      // TODO: Call API to reset password
      console.log('Reset password for:', resetPasswordForm.email);
      ElMessage.success('Đã gửi email khôi phục mật khẩu!');
      resetForm(resetPasswordFormRef.value);
    } else {
      ElMessage.error('Vui lòng kiểm tra lại thông tin!');
    }
  });
};

// Reset form
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style lang="scss" scoped>
.v-container__body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 96px); // Điều chỉnh theo chiều cao header
}

.password-form {
  display: flex;
  width: 80%;
  max-width: 1000px;
  margin: auto;
  &__image {
    width: 40%;
    display: flex;
    justify-content: center;
  }
  &__form {
    flex: 1;
  }
}
</style>
