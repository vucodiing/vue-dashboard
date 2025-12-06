<template>
  <div class="line-chart">
    <v-chart class="chart" :option="chartOption" autoresize />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components';

// Register ECharts components
use([CanvasRenderer, LineChart, TitleComponent, TooltipComponent, GridComponent, LegendComponent]);

// Props
interface ChartDataItem {
  name: string;
  value: number;
}

interface Props {
  data: ChartDataItem[];
  height?: string;
  title?: string;
  smooth?: boolean;
  showArea?: boolean;
  primaryColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  height: '350px',
  title: '',
  smooth: true,
  showArea: true,
  primaryColor: '#003168',
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
    boundaryGap: false,
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
      name: 'Giá trị',
      type: 'line',
      data: props.data.map((item) => item.value),
      smooth: props.smooth,
      itemStyle: {
        color: props.primaryColor,
      },
      lineStyle: {
        width: 3,
        color: props.primaryColor,
      },
      areaStyle: props.showArea
        ? {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: `${props.primaryColor}40`,
                },
                {
                  offset: 1,
                  color: `${props.primaryColor}10`,
                },
              ],
            },
          }
        : undefined,
    },
  ],
}));
</script>

<style scoped lang="scss">
.line-chart {
  height: 100%;
  width: 100%;
}

.chart {
  height: v-bind(height);
  width: 100%;
}
</style>
