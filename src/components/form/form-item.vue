<script setup lang="ts">
import { toRef } from "vue";
import { useField } from "vee-validate";

const props = defineProps<{ name: string; label: string ,hideLabel?:boolean,labelClass?:string,inputId?:string}>();
const field = useField(toRef(props, "name"));
</script>

<template>
  <div class="flex relative justify-between items-center">
    <label v-if="!hideLabel" :for="name"  :class="['w-150px','leading-40px', 'text-[#071244]',labelClass]" >{{ label }}：</label>
    <div class="flex-1">
      <slot v-bind="field" ></slot>
    </div>
    <small :id="`${name}-help`" class="p-error">{{
      field.errorMessage.value
    }}</small>
  </div>
</template>

<style scope lang="less">
.p-error {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  transform: translateY(10px);
  z-index: 99;
  font-size: 13px;
}

</style>
