<template>
  <Dialog
    v-model:visible="visible"
    class="w-35vw"
    v-bind="args"
    :modal="true"
    :style="{ width: args.width || '33vw' }"
    @hide="hide"
  >
    <component :is="args.content"></component>
  </Dialog>
</template>

<script setup lang="ts">
import { useModalRef } from "vue-modal-provider";

const {
  // show variables
  visible,
  args,
  resolve
} = useModalRef();
function hide(){
  resolve()
}
</script>

<style scoped></style>
