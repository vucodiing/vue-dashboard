<template>
  <div class="bar-chart">
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
  title?: string;
  showLabel?: boolean;
  primaryColor?: string;
  secondaryColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  height: '350px',
  title: '',
  showLabel: false,
  primaryColor: '#003168',
  secondaryColor: '#0f7ccf',
});

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
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    top: props.title ? '15%' : '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: props.data.map((item) => item.name),
    axisLine: {
      lineStyle: {
        color: '#999',
      },
    },
  },
  yAxis: {
    type: 'value',
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
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: props.primaryColor,
            },
            {
              offset: 1,
              color: props.secondaryColor,
            },
          ],
        },
        borderRadius: [4, 4, 0, 0],
      },
      emphasis: {
        itemStyle: {
          color: props.secondaryColor,
        },
      },
      label: {
        show: props.showLabel,
        position: 'top',
        formatter: '{c}',
      },
    },
  ],
}));
</script>

<style scoped lang="scss">
.bar-chart {
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
