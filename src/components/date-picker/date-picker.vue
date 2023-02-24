<template>
  <div>
    <div class="date-picker" @click="onChange">
      <span class="desc">
        <span>{{
          modelValue ? dayjs(modelValue).format("YYYY-MM-DD") : "请选择日期"
        }}</span></span
      >
    </div>

    <Popup
      v-model:show="isActive"
      round
      position="bottom"
      :style="{ height: '33%' }"
      @cancel="isActive = false"
    >
      <DatetimePicker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        @cancel="isActive = false"
        @confirm="onConfirm"
      />
    </Popup>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Popup, DatetimePicker } from "vant";
import dayjs from "dayjs";
let props = defineProps<{ modelValue: any }>();
let emits = defineEmits(["update:model-value"]);
let currentDate = ref<any>(new Date());
let isActive = ref<boolean>(false);
const onConfirm = (val: any) => {
  isActive.value = false;

  emits("update:model-value", dayjs(val).format("YYYY-MM-DD HH:mm:ss"));
};

const onChange = () => {
  isActive.value = true;
};
</script>

<style scoped lang="less">
.date-picker {
  @apply relative w-255px h-77px leading-77px pr-50px pl-13px bg-hex-f5f5f5 text-hex-666 rounded-10px;
  &.active {
    &::after {
      transform: rotate(135deg);
    }
  }
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 20px;
    margin-top: -5px;
    border: 5px solid;
    border-color: transparent transparent #666 #666;
    transform: rotate(-45deg);
    opacity: 0.8;
    color: #666;
  }
}
</style>
