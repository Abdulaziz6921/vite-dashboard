<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from "vue";
import * as echarts from "echarts";

const props = defineProps({
  title: { type: String, required: true },
  data: { type: Array, default: () => [] },
  type: {
    type: String,
    default: "pie",
    validator: (v) => ["pie", "bar", "line", "doughnut"].includes(v),
  },
  loading: { type: Boolean, default: false },
  height: { type: String, default: "400px" },
});

const chartContainer = ref(null);
let chartInstance = null;

const initChart = async () => {
  await nextTick();
  if (
    !chartContainer.value ||
    props.loading ||
    chartContainer.value.offsetHeight === 0
  )
    return;

  if (chartInstance) chartInstance.dispose();

  chartInstance = echarts.init(chartContainer.value);
  updateChart();
};

const updateChart = () => {
  if (!chartInstance || props.loading) return;
  chartInstance.setOption(getChartOption(), true);
};

const getChartOption = () => {
  const labels = props.data.map((item) => item.name || item.label || "Unknown");
  const values = props.data.map((item) => item.value || item.amount || 0);

  switch (props.type) {
    case "bar":
      return {
        title: { text: props.title, left: "center" },
        tooltip: { trigger: "axis" },
        xAxis: { type: "category", data: labels },
        yAxis: { type: "value" },
        series: [
          {
            type: "bar",
            data: values,
            itemStyle: { color: "#4CAF50" },
          },
        ],
      };

    case "line":
      return {
        title: { text: props.title, left: "center" },
        tooltip: { trigger: "axis" },
        xAxis: { type: "category", data: labels },
        yAxis: { type: "value" },
        series: [
          {
            type: "line",
            data: values,
            smooth: true,
            lineStyle: { color: "#2196F3" },
          },
        ],
      };

    case "doughnut":
    case "pie":
      return {
        title: { text: props.title, left: "center" },
        tooltip: { trigger: "item" },
        series: [
          {
            name: props.title,
            type: "pie",
            radius: props.type === "doughnut" ? ["40%", "70%"] : "60%",
            data: props.data.map((item) => ({
              name: item.name || item.label || "Unknown",
              value: item.value || item.amount || 0,
            })),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

    default:
      return {};
  }
};

const handleResize = () => {
  chartInstance?.resize();
};

onMounted(() => {
  initChart();
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  chartInstance?.dispose();
  window.removeEventListener("resize", handleResize);
});

watch(
  () => props.data,
  () => updateChart(),
  { deep: true }
);
watch(
  () => props.loading,
  (newLoading) => {
    if (!newLoading) {
      initChart();
    }
  }
);
</script>

<template>
  <div>
    <div
      ref="chartContainer"
      :style="{ width: '100%', height: props.height }"
    ></div>
  </div>
</template>
