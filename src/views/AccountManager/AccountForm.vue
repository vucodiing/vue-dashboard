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
      <el-row :gutter="20">
        <el-col :sm="9">
          <div class="v-form">
            <div class="v-form__header">
              <p><i class="fa-solid fa-circle-user fa-xl"></i> Tài khoản đăng nhập</p>
              <el-segmented v-model="rolesUser" :options="optionsRoles" />
            </div>

            <div class="v-form__body">
              <el-form-item label="Tài khoản" prop="account">
                <el-input
                  v-model.trim="form.account"
                  placeholder="Nhập tài khoản"
                  autocomplete="off"
                >
                  <template #prefix>
                    <i class="fa-light fa-user"></i>
                  </template>
                </el-input>
              </el-form-item>

              <el-form-item label="Mật khẩu" prop="password">
                <el-input
                  v-model.trim="form.password"
                  placeholder="Nhập mật khẩu"
                  type="password"
                  show-password
                  autocomplete="off"
                >
                  <template #prefix>
                    <i class="fa-light fa-lock"></i>
                  </template>
                </el-input>
              </el-form-item>
            </div>
          </div>
        </el-col>

        <el-col :sm="15">
          <div class="v-form">
            <el-row :gutter="10">
              <el-col :span="15">
                <div class="v-form__header">
                  <p><i class="fa-solid fa-circle-info fa-xl"></i> Thông tin người dùng</p>
                </div>
                <div class="v-form__body">
                  <el-form-item label="Họ tên">
                    <el-input v-model.trim="form.fullname" placeholder="Nhập họ tên">
                      <template #prefix>
                        <i class="fa-light fa-text"></i>
                      </template>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="Email">
                    <el-input v-model.trim="form.email" placeholder="Nhập địa chỉ email" clearable>
                      <template #prefix>
                        <i class="fa-light fa-envelope"></i>
                      </template>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="Xã/Phường">
                    <CommuneSelect v-model="form.staff.commune_id" />
                  </el-form-item>
                  <el-form-item v-if="rolesUser === 'CommuneAgent'" label="Quầy">
                    <el-input
                      v-model.trim="form.staff.booth"
                      type="text"
                      placeholder="Nhập thông tin quầy"
                    >
                      <template #prefix>
                        <i class="fa-light fa-person-booth"></i>
                      </template>
                    </el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="9" style="display: flex; justify-content: center; align-items: center">
                <UploadComponent @upload-file="setAvatarId" />
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="24" style="display: flex; justify-content: center; align-items: center">
          <VButton v-if="!idUser" @click="handleCreate">Thêm mới</VButton>
          <VButton v-else @click="handleUpdate">Cập nhật</VButton>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import UploadComponent from '@/component/UploadComponent/UploadComponent.vue';
import CommuneSelect from '@/component/CommuneSelect/CommuneSelect.vue';
import mushroom from '@/service/api/mushroom-api';
import type { Profile, MushroomError } from '@/service/api/mushroom-api';
import method from '@/utils/method';

interface RuleForm {
  account: string;
  password: string;
  fullname: string;
  avatar_id: string;
  email: string;
  staff: { commune_id: string; booth: string };
}
const dialogVisible = ref(false);
const title = ref('');
const idUser = ref('');
const rolesUser = ref('Commune');
const optionsRoles = ['Commune', 'CommuneAgent'];
const formRef = ref<FormInstance>();
const form = reactive<RuleForm>({
  account: '',
  password: '',
  fullname: '',
  avatar_id: '',
  email: '',
  staff: { commune_id: '', booth: '' },
});

const rules = reactive<FormRules<RuleForm>>({
  account: [
    { required: true, message: 'Vui lòng nhập tài khoản', trigger: 'blur' },
    { min: 3, message: 'Tài khoản dài tối thiểu 3 ký tự', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Vui lòng nhập mật khẩu', trigger: 'blur' },
    { min: 6, message: 'Mật khẩu dài tối thiểu 6 ký tự', trigger: 'blur' },
  ],
});

const open = (titleDialog: string, id?: string) => {
  title.value = titleDialog;
  idUser.value = id || '';
  dialogVisible.value = true;
};

defineExpose({
  open,
});

const setAvatarId = (id: string | null) => {
  form.avatar_id = id || '';
};
const updateProfileAsync = async (profile: Profile) => {
  try {
    await mushroom.profile.partialUpdateAsync(profile);
  } catch (error) {
    method.showError(error as MushroomError);
  }
};
const createAccountAsync = async (): Promise<string | null> => {
  try {
    const response = await mushroom.user.createAsync({
      account: form.account,
      password: form.password,
      roles: [rolesUser.value, 'User'],
    });
    if (response?.result) {
      method.showNotification('Tạo tài khoản thành công', 'success');
      return response.result.toString();
    } else {
      method.showNotification('Tạo tài khoản thất bại', 'error');
      return null;
    }
  } catch (error) {
    method.showError(error as MushroomError);
    return null;
  }
};

const handleUpdate = async () => {
  if (!formRef.value) return;

  await formRef.value.validate(async (isValid) => {
    if (!isValid) return;

    const profileData: Profile = {
      id: idUser.value,
      fullname: form.fullname,
      avatar_id: form.avatar_id,
      email: form.email,
      staff: {
        commune_id: form.staff.commune_id,
        ...(rolesUser.value === 'CommuneAgent' ? { booth: form.staff.booth } : {}),
      },
    };

    await updateProfileAsync(profileData);
    dialogVisible.value = false;
  });
};

const handleCreate = async () => {
  if (!formRef.value) return;

  await formRef.value.validate(async (isValid) => {
    if (!isValid) return;

    const newId = await createAccountAsync();
    if (!newId) return;

    const profileData: Profile = {
      id: newId,
      fullname: form.fullname,
      avatar_id: form.avatar_id,
      email: form.email,
      staff: {
        commune_id: form.staff.commune_id,
        ...(rolesUser.value === 'CommuneAgent' ? { booth: form.staff.booth } : {}),
      },
    };

    await updateProfileAsync(profileData);
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
