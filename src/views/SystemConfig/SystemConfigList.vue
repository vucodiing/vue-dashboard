<template>
  <LoadingComponent v-if="loading" />
  <div v-else class="v-container">
    <SystemConfigForm ref="systemConfigFormRef" @success="handleFormSuccess" />
    <div class="v-container__header">
      <h2><strong>DANH SÁCH CẤU HÌNH HỆ THỐNG</strong></h2>
      <div class="v-container__button">
        <VButton @click="systemConfigFormRef?.open('Thêm cấu hình')">Thêm cấu hình</VButton>
      </div>
    </div>
    <div class="v-container__body">
      <div class="v-table">
        <el-table
          :data="tableData"
          header-cell-class-name="v-table-header"
          :header-cell-style="{
            padding: '15px 0',
          }"
          height="100%"
          :max-height="'640px'"
          style="width: 100%"
        >
          <el-table-column prop="scope" label="Phạm vi" width="120">
            <template #default="{ row }">
              <span :class="`scope scope__${row.scope}`">
                <i v-if="row.scope === 'private'" class="fa-solid fa-lock"></i>
                <i v-if="row.scope === 'role'" class="fa-solid fa-user"></i>
                <i v-if="row.scope === 'public'" class="fa-solid fa-globe"></i>
                {{ row.scope }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="Quyền" min-width="200">
            <template #default="scope">
              <div class="role-container">
                <span
                  v-for="role in scope.row.roles"
                  :key="role"
                  class="role"
                  :class="{
                    admin: role === 'Admin',
                    commune: role === 'Commune',
                    'commune-agent': role === 'CommuneAgent',
                  }"
                >
                  <i v-if="role === 'Admin'" class="fa-solid fa-clipboard-list"></i>
                  <i v-if="role === 'Commune'" class="fa-solid fa-head-side-headphones"></i>
                  <i v-if="role === 'CommuneAgent'" class="fa-solid fa-nfc"></i>
                  {{ role }}
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="code" label="Mã" min-width="250" />
          <el-table-column prop="value" label="Giá trị" min-width="500" />
          <el-table-column prop="note" label="Ghi chú" min-width="250" />
          <el-table-column label="Thao tác" width="150" align="center">
            <template #default="scope">
              <div class="v-table__action">
                <VButton
                  scope="info"
                  size="small"
                  @click="systemConfigFormRef?.open('Cập nhật cấu hình', scope.row)"
                >
                  Sửa
                </VButton>
                <VButton scope="danger" size="small" @click="handleDelete(scope.row.id)">
                  Xóa
                </VButton>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="v-pagination">
        <el-pagination
          large
          :page-sizes="tableRules.lengthMenu"
          :page-size="tableRules.limit"
          background
          layout="total, sizes, prev, pager, next"
          :total="tableRules.total"
          :current-page="tableRules.page"
          @size-change="tableSizeChange"
          @current-change="tableCurentChange"
          @prev-click="tablePrevClick"
          @next-click="tableNextClick"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import mushroom from '@/service/api/mushroom-api';
import { Filter } from 'mushroomjs';
import type { MushroomError, User } from '@/service/api/mushroom-api';
import dataForm from './dataForm.ts';
import method from '@/utils/method';
import LoadingComponent from '@/component/LoadingComponent/LoadingComponent.vue';
import SystemConfigForm from './SystemConfigForm.vue';
import Swal from 'sweetalert2';

const loading = ref(false);
const systemConfigFormRef = ref<InstanceType<typeof SystemConfigForm> | null>(null);

const tableData = ref<User[]>([]);
const tableRules = dataForm.tableRules;

const tableChangeOffset = async (page: number) => {
  tableRules.page = page;
  tableRules.offset = (tableRules.page - 1) * tableRules.limit;
  await fetchSystemConfig();
};

const tableSizeChange = (limit: number) => {
  tableRules.limit = limit;
  tableChangeOffset(1);
};

const tableCurentChange = (page: number) => tableChangeOffset(page);
const tablePrevClick = (page: number) => tableChangeOffset(page - 1);
const tableNextClick = (page: number) => tableChangeOffset(page + 1);

const fetchSystemConfig = async () => {
  loading.value = true;
  const dataFilter = {
    filters: dataForm.tableRules.filters,
    limit: dataForm.tableRules.limit,
    offset: dataForm.tableRules.offset,
    sort: dataForm.tableRules.sort,
    // showFormSearch: dataForm.tableRules.showFormSearch, // API might not support this directly in listAsync params if it's custom
    fields: dataForm.tableRules.fields,
  };
  try {
    const response = await mushroom.system_config.listAsync(dataFilter);
    tableData.value = response.result;
    tableRules.total = Number(response?.meta?.total);
    tableRules.page = Number(response?.meta?.offset) / Number(response?.meta?.limit) + 1;
  } catch (e) {
    method.showError(e as MushroomError);
  } finally {
    loading.value = false;
  }
};

const handleDelete = async (id: string) => {
  Swal.fire({
    title: 'Xóa cấu hình?',
    text: 'Bạn sẽ xóa cấu hình này',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#ed2438',
    confirmButtonText: 'Xóa',
    cancelButtonText: 'Hủy',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await mushroom.system_config.deleteAsync({ id: id });
        if (res.result === 1) {
          method.showNotification('Xóa cấu hình thành công', 'success');
          await fetchSystemConfig();
        } else method.showNotification('Xóa cấu hình thất bại', 'error');
      } catch (e) {
        method.showError(e as MushroomError);
      }
    }
  });
};

const handleFormSuccess = async () => {
  await fetchSystemConfig();
};

onMounted(async () => {
  await fetchSystemConfig();
});
</script>
