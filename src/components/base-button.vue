<template>
  <Button

    :class="[
      type && `p-button-${type}`,
      size && `p-button-${size}`,
      shape && `p-button-${shape}`,
      isPlain && `p-button-outlined`,
      icon && `pi pi-${icon}`,
      color && `p-button-${color}`,
      attrs.class
    ]"
   
  >
    <slot></slot>
  </Button>
</template>

<script setup lang="ts">
import { computed, useAttrs } from "vue";

const attrs = useAttrs();

let isPlain = computed(() => {
  return Reflect.ownKeys(attrs).findIndex(v => v === "plain") > -1;
});

const props = defineProps<{
  icon?: string;
  color?:string
  type?: 'outlined' | 'text';
  size?: string;
  shape?: string;
  plain?: any;
}>();
</script>

<style scoped lang="less">
.p-button {
  margin-right: 0.5rem;
  padding: 7px 15px;
  font-size: 15px;
  &.pi::before {
      font-size: 13px ;
      margin-right: 3px;
    }
}

</style>
