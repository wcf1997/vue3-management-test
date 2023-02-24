<template>
  <BaseLoading :visible="isLoading" :error="isError">
    <div ref="mapBox" class="w-1/1 h-1/1"></div>
  </BaseLoading>
</template>

<script setup lang="ts">
import { mapConfig } from "@/config";
import { isReferencedIdentifier } from "@vue/compiler-core";
import { onMounted, onUnmounted, ref, watch, watchEffect } from "vue";
import BaseLoading from "../base-loading.vue";
import { ToastService } from "../toast";

const props = defineProps<{
  latlng?: { lng: any; lat: any };
  level?: number;
  checkAble?: boolean;
  list?: any[];
}>();
const emits = defineEmits<{
  (e: "markerClick", data: any): void;
  (e: "onClick", data: any): void;
}>();
const mapBox = ref();
const Map: any = ref();
let isLoading = ref<boolean>(true);

let timer: any = null;
const toast = new ToastService();
let isError = ref<boolean>(false);
let middleware = ref<any[]>([]);
// 矩形画笔
let rectTool = ref();
defineExpose({
  /**设置点位 */
  setMark,
  drawRect,
  clearOverlays,
  registerFunction,
  rectTool
});
onMounted(() => {
  loadTMap();
});

let failCount = 0;
/** 加载地图 */
function loadTMap() {
  if (timer) clearTimeout(timer);
  if (failCount >= 20) {
    isLoading.value = false;
    isError.value = true;
    toast.add({
      severity: "error",
      summary: "天地图加载失败",
      detail: "与天地图的连接有波动请刷新重试"
    });
    failCount = 0;
    return;
  }
  if (!window.T) {
    failCount++;

    timer = setTimeout(loadTMap, 500);
    return;
  }

  isLoading.value = false;
  Map.value = new window.T.Map(mapBox.value, {
    projection: "EPSG:4326"
  });

  Map.value.centerAndZoom(
    new window.T.LngLat(
      props.latlng?.lng || 119.930074,
      props.latlng?.lat || 28.473405
    ),
    mapConfig.zoom
  );
  //允许鼠标滚轮放大地图
  Map.value.enableScrollWheelZoom();

  Map.value.addEventListener("click", onMapClick);
}

/** 清除覆盖物 */
function clearOverlays() {
  Map.value.clearOverLays();
}

/** 设置覆盖物 */
let isSetMark = ref<boolean>(false)
function setMark(data: { lat: any; lng: any } | any) {

  if (Object.prototype.toString.call(data) === "[object Object]") {
   
    //创建标注对象
    var marker = new window.T.Marker(new window.T.LngLat(data.lng, data.lat));
    //向地图上添加标注
    Map.value.addOverLay(marker);

    // 监听标注点击事件
    marker.addEventListener("click", onMarkClick);
  }

  if (Object.prototype.toString.call(data) === "[object Array]") {

    data.forEach((item: any) => {
      var marker = new window.T.Marker(
        new window.T.LngLat(item.longitude, item.latitude),{
       id:item.id
      }
      );
      //向地图上添加标注
      Map.value.addOverLay(marker);
      // 监听标注点击事件
      marker.addEventListener("click", onMarkClick);
    });
  }
  isSetMark.value = true
}

// 监听标注点击事件
function onMapClick(e: any) {
  if (props.checkAble) {
    clearOverlays()
    setMark(e.lnglat);
  }
  emits("onClick", e);

}

/** 画矩形 */

function drawRect(fn?: (data: any[]) => any) {
  rectTool.value = new window.T.RectangleTool(Map.value);
  rectTool.value.open(true);

  rectTool.value.addEventListener(
    "draw",
    function ({
      currentBounds,
    }: {
      type: any;
      target: any;
      currentBounds: any;
      currentRectangle: any;
      allRectangles: any;
    }) {
 
      let leftTopAngle: { lat: any; lng: any } = currentBounds.kq;
      let rightBottomAngle: { lat: any; lng: any } = currentBounds.Lq;
      let selectedMarker = props.list?.filter(v => {
        if (
          v.latitude <= rightBottomAngle.lat &&
          v.latitude >= leftTopAngle.lat &&
          v.longitude <= rightBottomAngle.lng &&
          v.longitude >= leftTopAngle.lng
        ) {
          return v;
        }
      });
      fn && fn(selectedMarker || []);
    
    }
  );
   
}



watchEffect(() => {

  if (Map.value &&  props.list?.length && !isSetMark.value) {
    
    setMark(props.list)
  }
  // if (Map.value && middleware.value.length) {
  //   middleware.value.forEach(v => v(Map.value));
  //   middleware.value = [];
  // }
});
function onMarkClick(e: any) {
  emits("markerClick", e);
}

function registerFunction(fn: (...args: any) => any | any[]) {
  if (typeof fn === "object") {
    middleware.value.push(...(fn as any[]));
  }

  if (typeof fn === "function") {
    middleware.value.push(fn);
  }
}

onUnmounted(() => {
  Map.value.removeEventListener("click", onMapClick);
});
</script>

<style lang="less" scoped></style>
