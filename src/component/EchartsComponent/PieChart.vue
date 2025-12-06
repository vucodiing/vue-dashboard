<template>
  <div class="pie-chart">
    <v-chart class="chart" :option="chartOption" autoresize />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';

// Register ECharts components
use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent]);

// Props
interface ChartDataItem {
  name: string;
  value: number;
}

interface Props {
  data: ChartDataItem[];
  height?: string;
  title?: string;
  radius?: string[];
  showLabel?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  height: '350px',
  title: '',
  radius: () => ['40%', '70%'],
  showLabel: true,
});

const colors = ['#003168', '#0f7ccf', '#22c55e', '#f59e0b', '#f06548', '#299cdb'];

// Chart configuration
const chartOption = computed(() => ({
  title: {
    text: props.title,
    left: 'center',
    textStyle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    top: props.title ? '15%' : 'center',
  },
  color: colors,
  series: [
    {
      name: 'Thống kê',
      type: 'pie',
      radius: props.radius,
      center: ['60%', '50%'],
      data: props.data,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
      label: {
        show: props.showLabel,
        formatter: '{b}: {d}%',
      },
    },
  ],
}));
</script>

<style scoped lang="scss">
.pie-chart {
  background: white;
  border-radius: var(--border-radius-md);
  padding: var(--space-lg);
  box-shadow: var(--box-shadow);
}

.chart {
  height: v-bind(height);
  width: 100%;
}
</style>
