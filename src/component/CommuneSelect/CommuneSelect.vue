<template>
  <el-select
    v-model="selectedValue"
    filterable
    clearable
    remote
    reserve-keyword
    placeholder="Chọn xã/phường"
    :remote-method="remoteMethod"
    :loading="loadingFilterCommune"
    size="large"
    @visible-change="handleDropdownVisible"
    @update:model-value="(val: string) => $emit('update:modelValue', val)"
  >
    <el-option
      v-for="item in filteredCommuneOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
    <template #prefix>
      <i class="fa-light fa-building-memo"></i>
    </template>
    <template #loading>
      <i class="fa-light fa-spinner fa-spin" style="color: #74c0fc"></i>
    </template>
  </el-select>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import mushroom, { type Commune } from '@/service/api/mushroom-api';

import { Filter, MushroomError } from 'mushroomjs';
import method from '@/utils/method';
import debounce from 'lodash/debounce';

interface CommuneOption {
  label: string;
  value: string;
}

interface Props {
  modelValue: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();
const selectedValue = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value),
});
const communeOptions = ref<CommuneOption[]>([]);
const filteredCommuneOptions = ref<CommuneOption[]>([]);
const loadingFilterCommune = ref<boolean>(false);

const mapCommuneToOption = (commune: Partial<Commune>): CommuneOption => ({
  label: commune.type ? `${commune.type} ${commune.name || ''}` : commune.name || '',
  value: commune.id || '',
});

const fetchCommunes = async (keyword: string = '') => {
  loadingFilterCommune.value = true;
  try {
    const response = await mushroom.commune.listAsync({
      filters: keyword ? Filter.regex('name', keyword, 'i').build() : undefined,
      limit: 25,
      offset: 0,
    });
    const result = (response.result || []).map(mapCommuneToOption);
    filteredCommuneOptions.value = result;
    if (!keyword) {
      communeOptions.value = result;
    }
  } catch (error) {
    if (error instanceof MushroomError) {
      method.showError(error);
    }
  } finally {
    loadingFilterCommune.value = false;
  }
};

const handleDropdownVisible = (visible: boolean): void => {
  if (visible) {
    if (communeOptions.value.length > 0) {
      filteredCommuneOptions.value = communeOptions.value;
    } else {
      fetchCommunes();
    }
  }
};

const remoteMethod = debounce(async (query: string): Promise<void> => {
  await fetchCommunes(query);
}, 500);

onMounted(async () => {
  await fetchCommunes();
});
</script>
