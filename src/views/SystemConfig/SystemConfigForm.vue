<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    width="80%"
    transition="dialog-bounce"
    align-center
    :close-on-click-modal="false"
  >
    <el-form ref="formRef" label-position="left" label-width="100px" :model="form" :rules="rules">
      <el-form-item label="Scope" prop="scope">
        <el-radio-group v-model="form.scope">
          <el-radio value="private">Private</el-radio>
          <el-radio value="role">Role</el-radio>
          <el-radio value="public">Public</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Code" prop="code">
        <el-input v-model="form.code" type="text" clearable placeholder="Nhập mã cấu hình" />
      </el-form-item>
      <el-form-item label="Roles">
        <el-checkbox-group v-model="form.roles">
          <el-checkbox label="Admin" value="Admin" />
          <el-checkbox label="Commune" value="Commune" />
          <el-checkbox label="CommuneAgent" value="CommuneAgent" />
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="Value">
        <el-input v-model="form.value" type="text" clearable placeholder="Nhập giá trị cấu hình" />
      </el-form-item>
      <el-form-item label="Note">
        <el-input
          v-model="form.note"
          type="textarea"
          :rows="5"
          clearable
          placeholder="Nhập ghi chú (nếu có)"
        />
      </el-form-item>
    </el-form>
    <div style="text-align: center">
      <VButton type="button" :loading="loadingButton" @click="handleCreate">Thêm mới</VButton>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import mushroom from '@/service/api/mushroom-api';
import type { MushroomError, System_config } from '@/service/api/mushroom-api';
import method from '@/utils/method';

const dialogVisible = ref(false);
const loadingButton = ref(false);
const title = ref('');
const formRef = ref<FormInstance>();
const form = reactive<System_config>({
  scope: '',
  code: '',
  roles: [],
  value: '',
  note: '',
});

const rules = reactive<FormRules<System_config>>({
  scope: [
    {
      required: true,
      message: 'Vui lòng chọn khả năng truy cập giá trị cấu hình',
      trigger: 'blur',
    },
  ],
  code: [{ required: true, message: 'Vui lòng nhập mã cấu hình', trigger: 'blur' }],
});

const open = (titleDialog: string) => {
  title.value = titleDialog;
  form.scope = '';
  form.code = '';
  form.roles = [];
  form.value = '';
  form.note = '';
  if (formRef.value) {
    formRef.value.resetFields();
  }
  dialogVisible.value = true;
};

defineExpose({
  open,
});

const createSystemConfigAsync = async () => {
  const response = await mushroom.system_config.createAsync({
    scope: form.scope,
    code: form.code,
    roles: form.roles,
    value: form.value,
    note: form.note,
  });
  if (response?.result) {
    method.showNotification('Tạo cấu hình thành công', 'success');
  } else {
    method.showNotification('Tạo cấu hình thất bại', 'error');
  }
};

const handleCreate = () => {
  if (!formRef.value) return;
  formRef.value.validate(async (valid) => {
    if (!valid) return;
    loadingButton.value = true;
    try {
      await createSystemConfigAsync();
    } catch (error) {
      method.showError(error as MushroomError);
    } finally {
      loadingButton.value = false;
      dialogVisible.value = false;
    }
  });
};
</script>

<style>
.dialog-bounce-enter-active,
.dialog-bounce-leave-active,
.dialog-bounce-enter-active .el-dialog,
.dialog-bounce-leave-active .el-dialog {
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.dialog-bounce-enter-from,
.dialog-bounce-leave-to {
  opacity: 0;
}

.dialog-bounce-enter-from .el-dialog,
.dialog-bounce-leave-to .el-dialog {
  transform: scale(0.3) translateY(-50px);
  opacity: 0;
}
</style>
