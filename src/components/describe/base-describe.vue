<template>
  <div>
    <FormTitle class="mb-10px">{{ title }}</FormTitle>
    <GridBox :col="col">
      <template v-for="item in column">
        <div
          :class="[item.colSpan && colSpanCss[item.colSpan], 'describe-item','text-left','w-1/1','leading-6']"
        >
          <span>{{ item.label }}：</span>
          <span v-if="item.slot">
            <slot
              :name="item.slot"
              :data="{ text: data[item.prop], record: data }"
            ></slot>
          </span>
                <template v-else-if="item.type === 'enum' && item.enum">
            <Tag
              v-if="item.enum[data[item.prop]]?.text"
              :value="item.enum[data[item.prop]]?.text"
              :severity="item.enum[data[item?.prop]]?.status"
            ></Tag>

            <span v-else>-</span>
          </template>
          <span v-else>{{
            item.renderText
              ? item.renderText(data[item.prop], data)
              : data[item.prop] || "-"
          }}</span>
        </div>
      </template>
    </GridBox>
  </div>
</template>

<script setup lang="ts">
import FormTitle from "../form/form-title.vue";
import GridBox from "../form/grid-box.vue";
import { IDescribe } from "./types";

const props = defineProps<{
  column: IDescribe[];
  data: any;
  title?: string;
  col?: number | string;
}>();
const colSpanCss: any = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
  8: "col-span-8",
  9: "col-span-9"
};
</script>

<style lang="less" scoped>
.describe-item {
  margin: 6px auto;
}
</style>
