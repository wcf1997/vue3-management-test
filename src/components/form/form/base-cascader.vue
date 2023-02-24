<template>
  <CascadeSelect
    :model-value="modelValue"
    :options="options"
    :optionLabel="config?.optionLabel || 'label'"
    :optionGroupLabel="config?.optionLabel || 'label'"
    :optionValue="config?.optionValue || 'id'"
    :optionGroupChildren="['childList']"
    :placeholder="'请选择' + config.label"
    style="width: 100%"
    @change="handleChange"
  />
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

let options = ref<any[]>([]);

if (props.config?.options) {
  options.value = props.config?.options;
}

function handleChange({
  originalEvent,
  value
}: {
  originalEvent: any;
  value: any;
}) {
  props.config.onChange &&
    props.config.onChange({ label: originalEvent.target.innerText, value });
  emits("update:modelValue", value);
}

async function getOptionsData() {
  if (!props.config?.requestApi) return;
  try {
    let res = await props.config.requestApi();
    if (!res.success) return;
    options.value = res.data;
  } catch (error) {}
}

getOptionsData();
</script>

<style scoped></style>
