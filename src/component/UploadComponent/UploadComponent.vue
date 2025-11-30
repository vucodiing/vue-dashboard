<template>
  <el-upload
    class="avatar-uploader"
    :show-file-list="false"
    :http-request="customUpload"
    :before-upload="beforeAvatarUpload"
    accept="image/*"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import type { UploadProps } from 'element-plus';
import { ElMessage } from 'element-plus';
import mushroom, { type MushroomError } from '@/service/api/mushroom-api';
import method from '@/utils/method';

const emit = defineEmits(['uploadFile']);
const imageUrl = ref('');

const customUpload = async (options: any) => {
  const { file } = options;
  try {
    const result = await mushroom.$file.uploadAsync({ file });
    imageUrl.value = URL.createObjectURL(file);
    emit('uploadFile', result.result);
  } catch (error) {
    method.showError(error as MushroomError);
  }
};

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    ElMessage.error('Avatar picture must be JPG format!');
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!');
    return false;
  }
  return true;
};
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
