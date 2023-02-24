<template>
  <div class="p-toast p-component p-toast-top-right">
    <transition-group name="p-toast-message" tag="div">
      <BaseToast
        v-for="msg of messages"
        :key="msg.id"
        :message="msg"
        :closeIcon="closeIcon"
        :infoIcon="infoIcon"
        :warnIcon="warnIcon"
        :errorIcon="errorIcon"
        :successIcon="successIcon"
        @close="remove($event)"
      />
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref, TransitionGroup, unref, watchEffect } from "vue";
import BaseToast from "./base-toast.vue";
import { IToastItem } from "./types";
import emit from "./emit";

const id = ref<number>(0);
const props = withDefaults(
  defineProps<{
    closeIcon?: string;
    infoIcon?: string;
    warnIcon?: string;
    errorIcon?: string;
    successIcon?: string;
  }>(),
  {
    closeIcon: "pi pi-times",
    infoIcon: "pi pi-info-circle",
    warnIcon: "pi pi-exclamation-triangle",
    errorIcon: "pi pi-times",
    successIcon: "pi pi-check"
  }
);

//@ts-ignore
emit.on("addToast", add);

let messages = ref<IToastItem[]>([]);

function add(item: IToastItem) {
  messages.value.push({ ...item, id: ++id.value });
}
function remove(message: IToastItem) {
  let index = -1;
  for (let i = 0; i < messages.value.length; i++) {
    if (messages.value[i].id === message.id) {
      index = i;
      break;
    }
  }

  messages.value.splice(index, 1);
}

onUnmounted(() => {
  emit.off("addToast");
});
</script>

<style scoped lang="less">
.p-toast  {
  z-index: 999999999;
}</style>
