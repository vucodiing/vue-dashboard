<template>
  <div class="v-container">
    <div class="v-container__header">
      <div class="v-container__header-content">
        <h1>Dashboard</h1>
        <p>Tổng quan thống kê và phân tích dữ liệu</p>
      </div>
      <div class="v-container__header-actions">
        <!-- Buttons, icons, etc -->
      </div>
    </div>
    <div class="v-container__body">
      <div class="dashboard-grid">
        <!-- Row 1: Line Chart and Pie Chart -->
        <div class="chart-item chart-item--large">
          <LineChart :data="lineChartData" title="Xu hướng theo thời gian" />
        </div>
        <div class="chart-item">
          <PieChart :data="pieChartData" title="Phân bổ dịch vụ" />
        </div>

        <!-- Row 2: Bar Chart and Horizontal Bar Chart -->
        <div class="chart-item">
          <BarChart :data="barChartData" title="Thống kê theo tháng" />
        </div>
        <div class="chart-item chart-item--large">
          <HorizontalBarChart :data="horizontalBarData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LineChart from '@/component/EchartsComponent/LineChart.vue';
import PieChart from '@/component/EchartsComponent/PieChart.vue';
import BarChart from '@/component/EchartsComponent/BarChart.vue';
import HorizontalBarChart from '@/component/EchartsComponent/HorizontalBarChart.vue';

// Line Chart Data - Trend over time
const lineChartData = ref([
  { name: 'T1', value: 120 },
  { name: 'T2', value: 200 },
  { name: 'T3', value: 150 },
  { name: 'T4', value: 280 },
  { name: 'T5', value: 250 },
  { name: 'T6', value: 320 },
  { name: 'T7', value: 380 },
  { name: 'T8', value: 350 },
  { name: 'T9', value: 420 },
  { name: 'T10', value: 400 },
  { name: 'T11', value: 480 },
  { name: 'T12', value: 520 },
]);

// Pie Chart Data - Service distribution
const pieChartData = ref([
  { name: 'Dịch vụ A', value: 320 },
  { name: 'Dịch vụ B', value: 240 },
  { name: 'Dịch vụ C', value: 180 },
  { name: 'Dịch vụ D', value: 150 },
  { name: 'Dịch vụ E', value: 110 },
]);

// Bar Chart Data - Monthly statistics
const barChartData = ref([
  { name: 'Q1', value: 470 },
  { name: 'Q2', value: 650 },
  { name: 'Q3', value: 820 },
  { name: 'Q4', value: 950 },
]);

// Horizontal Bar Chart Data - Service ranking
const horizontalBarData = ref([
  { name: 'Dịch vụ A', value: 320 },
  { name: 'Dịch vụ B', value: 240 },
  { name: 'Dịch vụ C', value: 180 },
  { name: 'Dịch vụ D', value: 150 },
  { name: 'Dịch vụ E', value: 120 },
  { name: 'Dịch vụ F', value: 90 },
]);
</script>

<style scoped lang="scss">
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-lg);

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
}

.chart-item {
  min-height: 350px;
}
</style>
