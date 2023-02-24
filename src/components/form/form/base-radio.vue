<template>
  <div>
    <span v-for="(item, index) in config.radioOptions" class="mr-10px">
      <RadioButton
        :inputId="`${config.prop}${index}`"
        :name="item.label"
        :value="item.value"
        :model-value="modelValue"
        @change="handleChange(item.value)"
      />
      <label :for="`${config.prop}${index}`" class="relative -top-2px ml-3px">{{
        item.label
      }}</label>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ISchemaItem } from "@/components/table/types";
import { ref } from "vue";

const props = withDefaults(
  defineProps<{ config: ISchemaItem; modelValue: any }>(),
  {
    modelValue: ""
  }
);

const emits = defineEmits<{ (e: "update:modelValue", data: any): void }>();
function handleChange(val:any) {

  emits("update:modelValue",val);
}

</script>

<style scoped lang="less"></style>
