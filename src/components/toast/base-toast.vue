<template>
  <div
    :class="containerClass"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div class="p-toast-message-content" :class="message.contentStyleClass">
      <span :class="iconClass"></span>
      <div class="p-toast-message-text">
        <span class="p-toast-summary">{{ message.summary }}</span>
        <div class="p-toast-detail">{{ message.detail }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { IToastItem } from "./types";
const props = defineProps<{
  message: any;
  infoIcon: string;
  warnIcon: string;
  errorIcon: string;
  successIcon: string;
}>();
const emits = defineEmits<{ (e: "close",message:IToastItem): void }>();
let timer: any = setTimeout(() => {
  close();
  clearTimeout(timer);
}, 3000);

function close() {

  emits("close",props.message);
}
const containerClass = computed(() => [
  "p-toast-message",
  props.message.styleClass,
  {
    "p-toast-message-info": props.message.severity === "info",
    "p-toast-message-warn": props.message.severity === "warn",
    "p-toast-message-error": props.message.severity === "error",
    "p-toast-message-success": props.message.severity === "success"
  }
]);
const iconClass = computed(() => [
  "p-toast-message-icon",
  {
    [props.infoIcon]: props.message.severity === "info",
    [props.warnIcon]: props.message.severity === "warn",
    [props.errorIcon]: props.message.severity === "error",
    [props.successIcon]: props.message.severity === "success"
  }
]);
</script>
