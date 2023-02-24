<script lang="ts" setup>
import * as echarts from "echarts/core";
import {
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from "echarts/components";
import { BarChart ,LineChart} from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

import { onMounted, onUnmounted, ref, watch, watchEffect } from "vue";
import { TEChartsOption } from "@/components/chart/types";
import { debounce } from "@/utils";
echarts.use([
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer,
  UniversalTransition,LineChart
]);

const props = defineProps<{ option: any }>();

let myChart: echarts.ECharts;
let echartRef = ref<HTMLDivElement>();
let debounceResize = debounce(() => {
  myChart && myChart.resize();
});
let foo = () => debounceResize();

onMounted(() => {
   
  if (echartRef.value) {

    
    myChart = echarts.init(echartRef.value);

    myChart && myChart.resize();
  }

  props.option && myChart.setOption(props.option);
  addEventListener("resize", foo);
});
onUnmounted(() => {
  removeEventListener("resize", foo);
});
watch(() => props.option, () => {

  props.option && myChart && myChart.setOption(props.option);
});
</script>

<template>
  <div class="w-1/1 h-1/1 {className}" ref="echartRef" />
</template>
