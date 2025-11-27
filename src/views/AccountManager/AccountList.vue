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
        <el-table
          :data="tableData"
          :table-layout="'auto'"
          header-cell-class-name="v-table-header"
          :header-cell-style="{
            padding: '15px 0',
          }"
          :max-height="'640px'"
        >
          <el-table-column prop="fullname" label="Họ tên">
            <template #default="scope">
              <div style="display: flex; align-items: center; gap: 8px">
                <el-avatar :src="scope.row.avatarUrl || AVATAR_DEFAULT" :size="40" />
                <span>{{ scope.row.fullname }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="account" label="Tài khoản" />

          <el-table-column label="Vai trò">
            <template #default="scope">
              <div class="role-container">
                <span
                  v-for="role in filterRoles(scope.row.roles)"
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
          <el-table-column prop="email" label="Email" />
          <el-table-column prop="active" label="Hoạt động">
            <template #default="scope">
              <el-switch v-model="scope.row.active" class="ml-2" />
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
import dataForm from './dataForm';
import method from '@/utils/method';
import AVATAR_DEFAULT from '@/assets/avatar-default.svg';
interface UserList extends User {
  active: boolean;
  email: string;
  fullname: string;
  avatarUrl: string;
}

const filterRoles = (roles: (string | null | undefined)[] | null | undefined) => {
  if (!roles) return [];
  return roles.filter(
    (role): role is string => role !== 'User' && role !== null && role !== undefined,
  );
};

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

const changeData = async (data: UserList[]) => {
  const ids = data.map((item) => item.id);
  const resProfile = await mushroom.profile.listAsync({
    filters: Filter.in('id', ids).build(),
  });
  resProfile.result.forEach((item) => {
    const user = data.find((user) => user.id === item.id);
    if (user) {
      user.fullname = item.fullname || '';
      user.email = item.email || '';
      try {
        user.avatarUrl =
          mushroom.$file.linkBuilder.thumb
            .id(item.avatar_id as string)
            .square(100)
            .build() || '';
      } catch (e) {
        user.avatarUrl = '';
      }
      console.log('user', user);
    }
  });
  data.forEach((item) => {
    item.active = !item.disabled;
  });

  return data;
};

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
    tableData.value = await changeData(response.result as UserList[]);
    tableRules.total = Number(response?.meta?.total);
    tableRules.page = Number(response?.meta?.offset) / Number(response?.meta?.limit) + 1;
  } catch (e) {
    method.showError(e as MushroomError);
  }
};

onMounted(async () => {
  await fetchUserList();
});
</script>

<style scoped lang="scss">
.role-container {
  display: flex;
  gap: 8px;
}

.role {
  padding: 2px 8px;
  border-radius: var(--border-radius-md);
  font-size: 13px;
  i {
    margin-right: 4px;
  }
}

.admin {
  background-color: rgba(237, 36, 56, 0.2);
  color: #ed2438;
}

.commune {
  background-color: rgba(34, 197, 94, 0.2);
  color: var(--color-success);
}

.commune-agent {
  background-color: rgba(245, 158, 11, 0.2);
  color: #f59e0b;
}
</style>
