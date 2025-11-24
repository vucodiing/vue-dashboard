<template>
  <div class="v-container">
    <div class="v-container__header">
      <h2><strong>DANH SÁCH TÀI KHOẢN</strong></h2>
      <div class="v-container__button">
        <VButton>Thêm tài khoản</VButton>
      </div>
    </div>
    <div class="v-container__body">
      <div class="v-table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="account" label="Tên tài khoản" width="180" />
          <el-table-column label="Vai trò" width="250">
            <template #default="scope">
              <div class="role-container">
                <template v-for="role in scope.row.roles" :key="role">
                  <el-tag v-if="role !== 'User'" :type="getRoleColor(role)" class="role-tag">
                    {{ getRoleName(role) }}
                  </el-tag>
                </template>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="disabled" label="Trạng thái" />
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
import type { User } from '@/service/api/mushroom-api';
import { onMounted, ref } from 'vue';
import mushroom from '@/service/api/mushroom-api';
import dataForm from './dataForm';

const tableData = ref<User[]>([]);
const tableRules = dataForm.tableRules;

const tableChangeOffset = async (page: number) => {
  tableRules.page = page;
  tableRules.offset = (tableRules.page - 1) * tableRules.limit;
  await fetchUserList();
};

const tableSizeChange = (limit: number) => {
  tableRules.limit = limit;
  tableChangeOffset(1);
};

const tableCurentChange = (page: number) => tableChangeOffset(page);
const tablePrevClick = (page: number) => tableChangeOffset(page - 1);
const tableNextClick = (page: number) => tableChangeOffset(page + 1);

const fetchUserList = async () => {
  const dataFilter = {
    filters: dataForm.tableRules.filters,
    limit: dataForm.tableRules.limit,
    offset: dataForm.tableRules.offset,
    sort: dataForm.tableRules.sort,
    // showFormSearch: dataForm.tableRules.showFormSearch, // API might not support this directly in listAsync params if it's custom
    fields: 'id,account,disabled,roles', // Add fields back
  };
  try {
    const response = await mushroom.user.listAsync(dataFilter);
    tableData.value = response.result;
    tableRules.total = Number(response?.meta?.total);
    tableRules.page = Number(response?.meta?.offset) / Number(response?.meta?.limit) + 1;
  } catch (e) {
    console.error('Có lỗi: %o', e);
  }
};

const getRoleName = (role: string) => {
  switch (role) {
    case 'Admin':
      return 'Quản trị viên';
    case 'Commune':
      return 'Tài khoản cán bộ Phường/Xã';
    case 'CommuneAgent':
      return 'Tài khoản hiển thị ở Phường/Xã';
    default:
      return role;
  }
};

const getRoleColor = (role: string) => {
  switch (role) {
    case 'Admin':
      return 'danger';
    case 'Commune':
      return 'primary';
    case 'CommuneAgent':
      return 'success';
    default:
      return 'info';
  }
};

onMounted(async () => {
  await fetchUserList();
});
</script>
