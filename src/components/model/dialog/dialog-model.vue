<template>
  <!-- <Dialog header="Header" :visible="visible"> Content </Dialog> -->
  <div>
    <!-- <Dialog header="Header" v-model:visible="visible"> Content </Dialog> -->
    <component :is='Dialog' :visible="visible"></component>
  </div>
</template>

<script setup lang="ts">
import BaseButton from "@/components/base-button.vue";
import emit from "@/components/toast/emit";
import Dialog from "primevue/dialog";
import { ref, watchEffect } from "vue";
const props = defineProps<{ modalKey?: Symbol,modal?:any }>()
let visible = ref<boolean>(true);

console.log(Dialog);

function show() {
  visible.value = true
  
}
emit.on(props.modalKey as any, show);
</script>

<style lang="less" scoped></style>
