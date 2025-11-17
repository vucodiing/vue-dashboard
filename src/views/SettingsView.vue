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
        <el-form
          ref="formRef"
          style="max-width: 600px"
          :model="passwordForm"
          label-width="auto"
          class="demo-ruleForm"
        >
          <el-form-item
            label="Mật khẩu cũ"
            prop="passwordOld"
            placeholder="Nhập mật khẩu cũ"
            show-password
            :rules="[{ required: true, message: 'Vui lòng nhập mật khẩu cũ' }]"
          >
            <el-input v-model="passwordForm.passwordOld" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item
            label="Mật khẩu mới"
            prop="passwordNew"
            placeholder="Nhập mật khẩu cũ"
            show-password
            :rules="[{ required: true, message: 'Vui lòng nhập mật khẩu mới' }]"
          >
            <el-input v-model="passwordForm.passwordNew" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item
            label="Nhập lại mật khẩu"
            prop="passwordRe"
            placeholder="Nhập lại mật khẩu mới"
            show-password
            :rules="[{ required: true, message: 'Vui lòng nhập lại mật khẩu mới' }]"
          >
            <el-input v-model="passwordForm.passwordRe" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit(formRef)">{{
              options === 'account__change__password' ? 'Đổi mật khẩu' : 'Khôi phục mật khẩu'
            }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { FormInstance } from 'element-plus';
const formRef = ref<FormInstance>();
const options = ref('account__info');
const directionOptions = [
  { label: 'Tài khoản', value: 'account__info' },
  { label: 'Đổi mật khẩu', value: 'account__change__password' },
  { label: 'Quên mật khẩu', value: 'account__reset__password' },
];

const passwordForm = reactive({
  account: '',
  passwordOld: '',
  passwordNew: '',
  passwordRe: '',
});

const handleSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!');
    }
  });
};
</script>

<style lang="scss" scoped>
.password-form {
  width: 80%;
  max-width: 500px;
  margin: auto;
}
</style>
