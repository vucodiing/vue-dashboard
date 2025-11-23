<template>
  <div class="v-container">
    <div class="v-container__header">
      <div class="v-container__header-content">
        <h2>Cài đặt chung</h2>
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
            <VButton :loading="isLoading" @click="submitForm"> Submit </VButton>
            <VButton :loading="isLoading" scope="secondary" @click="submitForm"> Submit </VButton>
            <VButton
              :loading="isLoading"
              scope="success"
              icon="fa-solid fa-magnifying-glass"
              @click="submitForm"
            >
              Tìm kiếm nâng cao
            </VButton>
            <VButton :loading="isLoading" scope="warning" @click="submitForm"> Submit </VButton>
            <VButton :loading="isLoading" scope="info" @click="submitForm"> Submit </VButton>
            <VButton :loading="isLoading" scope="danger" @click="submitForm"> Submit </VButton>
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
              <div style="text-align: end">
                <button scope="primary">Đổi mật khẩu</button>
                <button scope="secondary">Đổi mật khẩu2</button>
                <el-button type="primary" size="large" @click="handleChangePassword"
                  >Đổi mật khẩu</el-button
                >
              </div>
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
import { ElMessage, ElNotification } from 'element-plus';
import PASSWORD from '@/assets/password.png';

const changePasswordFormRef = ref<FormInstance>();
const options = ref('account__info');
const directionOptions = [
  { label: 'Tài khoản', value: 'account__info' },
  { label: 'Đổi mật khẩu', value: 'account__change__password' },
];

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

const resetPasswordForm = reactive({
  email: '',
});

const isLoading = ref(false);
const submitForm = () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    ElMessage({
      message: 'Form submitted successfully!',
      type: 'success',
    });
  }, 2000);
};

const validatePasswordMatch = (_rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('Vui lòng nhập lại mật khẩu mới'));
  } else if (value !== changePasswordForm.passwordNew) {
    callback(new Error('Mật khẩu mới không khớp!'));
  } else {
    callback();
  }
};

const rulesChangePassword = reactive<FormRules>({
  passwordOld: [{ required: true, message: 'Vui lòng nhập mật khẩu cũ', trigger: 'blur' }],
  passwordNew: [
    { required: true, message: 'Vui lòng nhập mật khẩu mới', trigger: 'blur' },
    { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự', trigger: 'blur' },
  ],
  passwordRe: [{ required: true, validator: validatePasswordMatch, trigger: 'blur' }],
});

const rulesResetPassword = reactive<FormRules>({
  email: [
    { required: true, message: 'Vui lòng nhập email', trigger: 'blur' },
    { type: 'email', message: 'Email không hợp lệ', trigger: 'blur' },
  ],
});

const handleChangePassword = async () => {
  if (!changePasswordFormRef.value) return;

  await changePasswordFormRef.value.validate((valid) => {
    if (!valid) return;
    console.log('Change password:', changePasswordForm);
    ElNotification({
      title: 'Success',
      message: 'Đổi mật khẩu thành công!',
      type: 'success',
    });
    resetForm(changePasswordFormRef.value);
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style lang="scss" scoped>
.v-container__body {
  align-content: center;
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
