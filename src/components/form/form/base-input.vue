<template>
  <div>
    <div class="p-inputgroup h-40px" >
      <span class="p-inputgroup-addon" v-show="config.addon">{{ config.addon }}</span>
      <InputText
        :model-value="modelValue"
        :placeholder="`请输入${config.label}`"
        @change="handleChange"
        :class="[
          !config.addon ? 'rounded-left ' : '',
          !config.suffix ? 'rounded-right' : ''
        ]"
      />
      <span class="p-inputgroup-addon" v-show="config.suffix">{{ config.suffix }}</span>
    </div>
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
function handleChange(val: any) {

  emits("update:modelValue", val.target.value);
}
</script>

<style lang="less" scoped>
.rounded-left {
  border-top-left-radius: 5px ;
  border-bottom-left-radius: 5px ;
}

.rounded-right {
  border-top-right-radius: 5px ;
  border-bottom-right-radius: 5px ;
}
</style>
