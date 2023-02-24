<template>

  <component
    :is="component"
    class="w-1/1"
    :model-value="modelValue"
    :options="options"
    :optionLabel="config?.optionLabel || 'label'"
    :optionValue="config?.optionValue || 'value'"
    @change="handleChange"
    :placeholder="'请选择' + config.label"
  ></component>
</template>

<script setup lang="ts">
import { ISchemaItem } from "@/components/table/types";
import { computed, ref, watchEffect } from "vue";

const props = withDefaults(
  defineProps<{ config: ISchemaItem; modelValue: any }>(),
  {
    modelValue: ""
  }
);
const emits = defineEmits<{ (e: "update:modelValue", data: any): void }>();
let options = ref<any[]>([]);
let component = computed(() =>
  props.config.multiple ? "MultiSelect" : "Dropdown"
);
if (props.config?.options) {
  options.value = props.config?.options;
}


// watchEffect(() => {
//   // console.log(props.modelValue);
//   if (props.modelValue) {
//     emits("update:modelValue", props.modelValue);
//   }
// })

function handleChange({
  originalEvent,
  value
}: {
  originalEvent: any;
  value: any;
}) {
  props.config.onChange &&
    props.config.onChange({
      label: options.value.find(
        v => v[props.config?.optionValue || "value"] === value
      )[props.config?.optionLabel || "label"],
      value
    });
  emits("update:modelValue", value);
}

// 初次加载下拉数据
async function getOptionsData() {
  if (!props.config?.requestApi) return;
  try {
    let res = await props.config.requestApi(props.config.requestParams || {});
    if (!res.success) return;
    options.value = res.data;
  } catch (error) {}
}
getOptionsData();

// 用于编辑时获取远程数据然后回县
</script>

<style scoped></style>
