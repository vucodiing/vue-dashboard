<template>
  <div class="horizontal-bar-chart">
    <v-chart class="chart" :option="chartOption" autoresize />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components';

// Register ECharts components
use([CanvasRenderer, BarChart, TitleComponent, TooltipComponent, GridComponent, LegendComponent]);

// Props
interface ChartDataItem {
  name: string;
  value: number;
}

interface Props {
  data: ChartDataItem[];
  height?: string;
  showLabel?: boolean;
  primaryColor?: string;
  secondaryColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  height: '400px',
  showLabel: true,
  primaryColor: '#003168',
  secondaryColor: '#0f7ccf',
});

// Chart configuration
const chartOption = computed(() => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    top: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.01],
    axisLine: {
      lineStyle: {
        color: '#999',
      },
    },
  },
  yAxis: {
    type: 'category',
    data: props.data.map((item) => item.name),
    axisLine: {
      lineStyle: {
        color: '#999',
      },
    },
  },
  series: [
    {
      name: 'Số lượng',
      type: 'bar',
      data: props.data.map((item) => item.value),
      itemStyle: {
        color: props.primaryColor,
        borderRadius: [0, 4, 4, 0],
      },
      emphasis: {
        itemStyle: {
          color: props.secondaryColor,
        },
      },
      label: {
        show: props.showLabel,
        position: 'right',
        formatter: '{c}',
      },
    },
  ],
}));
</script>

<style scoped lang="scss">
.horizontal-bar-chart {
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
