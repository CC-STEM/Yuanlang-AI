<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import * as echarts from "echarts";

const chartRef = ref<HTMLElement>();
let chart: echarts.ECharts | null = null;

const props = defineProps<{
  data?: {
    dates: string[];
    sales: number[];
    amounts: number[];
    rewards: number[];
  };
}>();

const initChart = () => {
  if (!chartRef.value) return;

  chart = echarts.init(chartRef.value);

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {
      data: ["销量", "销售额", "设计奖励"],
      textStyle: {
        color: "#fff",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: props.data?.dates || [
        "07-08",
        "07-09",
        "07-10",
        "07-11",
        "07-12",
        "07-13",
      ],
      axisLine: {
        lineStyle: {
          color: "#fff",
        },
      },
      axisLabel: {
        color: "#fff",
      },
    },
    yAxis: [
      {
        type: "value",
        name: "数量",
        position: "left",
        axisLine: {
          lineStyle: {
            color: "#fff",
          },
        },
        axisLabel: {
          color: "#fff",
        },
        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,0.1)",
          },
        },
      },
      {
        type: "value",
        name: "金额",
        position: "right",
        axisLine: {
          lineStyle: {
            color: "#fff",
          },
        },
        axisLabel: {
          color: "#fff",
          formatter: "¥{value}",
        },
        splitLine: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: "销量",
        type: "bar",
        data: props.data?.sales || [100, 200, 150, 180, 150, 180],
        itemStyle: {
          color: "#409EFF",
        },
      },
      {
        name: "销售额",
        type: "bar",
        data: props.data?.amounts || [200, 300, 250, 280, 250, 280],
        itemStyle: {
          color: "#E6A23C",
        },
      },
      {
        name: "设计奖励",
        type: "line",
        yAxisIndex: 1,
        data: props.data?.rewards || [500, 800, 1200, 1000, 1100, 1300],
        itemStyle: {
          color: "#67C23A",
        },
        lineStyle: {
          width: 2,
        },
        symbol: "circle",
        symbolSize: 8,
      },
    ],
  };

  chart.setOption(option);
};

const handleResize = () => {
  chart?.resize();
};

onMounted(() => {
  initChart();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  chart?.dispose();
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <div ref="chartRef" class="trend-chart"></div>
</template>

<style scoped>
.trend-chart {
  width: 100%;
  height: 100%;
}
</style>
