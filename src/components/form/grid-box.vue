<template>
  <div
    :class="[col === 1 ? 'grid-cols-1' : str ,'grid-cols-3']"
  >
    <slot></slot>
  </div>
  <!-- <grid-box></grid-box> -->
</template>

<script setup lang="ts">
import {
  computed,
  defineProps,
  h,
  useSlots,
  withDefaults
} from "vue";
const props = withDefaults(
  defineProps<{ col?: number | string; gap?: string | number }>(),
  {
    col: 4,
    gap: 15
  }
);
const slots = useSlots();
const colMap:any = {
  1: "grid-cols-1  xl:grid-cols-1 lg:grid-cols-1 ",
  2: "grid-cols-2  xl:grid-cols-2 lg:grid-cols-2 ",
  3: "grid-cols-3  xl:grid-cols-3 lg:grid-cols-3 ",
  4: "grid-cols-4  xl:grid-cols-4 lg:grid-cols-4 ",
  5: "grid-cols-5  xl:grid-cols-5 lg:grid-cols-5 ",
  6: "grid-cols-6  xl:grid-cols-6 lg:grid-cols-6 ",
  7: "grid-cols-7  xl:grid-cols-7 lg:grid-cols-7 ",
  8: "grid-cols-8  xl:grid-cols-8 lg:grid-cols-8 ",
  9: "grid-cols-9  xl:grid-cols-9 lg:grid-cols-9 "
};

let str = computed(
  () => `grid gap-15px  md:grid-cols-2 xs:grid-cols-1 sm:grid-cols-1 ${colMap[props.col]}`
);
// let GridBox: any = h(
//   "div",
//   {
//     class: props.col === 1 ? "grid-cols-1" : str.value
//   },
//   slots
// );

</script>

<style scoped></style>
