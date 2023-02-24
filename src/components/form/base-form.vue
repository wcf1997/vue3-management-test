<template>
  <GridBox :col="col" :gap="gap">
    <template v-for="(value, name, index) in formColumns">
      <!-- 输入框 -->
      <FormItem
        :name="name.toString()"
        :label="value.label"
        :hide-label="hideLabel"
        v-slot="filed"
        :class="[
          value.colSpan && colSpanCss[value.colSpan],
          'form-item',
          col === 1 ? 'my-15px' : ''
        ]"
        :label-class="labelClass"
      >
        <component
          :is="componentMap[value.type || 'input']"
          class="w-1/1"
          :placeholder="'请输入' + value.label"
          :config="value"
          v-model="values[name]"
        ></component>
      </FormItem>
    </template>

    <div v-if="!hideButton && !schema" class="flex items-center">
      <slot name="beforeButton"></slot>
      <BaseButton
        icon="search"
        style="margin-right: 10px"
        @click="handleSubmit"
        >提交</BaseButton
      >
      <BaseButton icon="replay" color="warning" @click="handleCancel"
        >重置</BaseButton
      >
      <slot name="afterButton"></slot>
    </div>
  </GridBox>
</template>

<script setup lang="ts">
import { computed, defineProps, ref } from "vue";
import { Form, useForm } from "vee-validate";
import FormItem from "./form-item.vue";
import GridBox from "./grid-box.vue";
import { IColumns, ISchema } from "../table/types";
import * as yup from "yup";
import dayjs from "dayjs";
import BaseButton from "../base-button.vue";
import BaseCascader from "./form/base-cascader.vue";
import BaseSelect from "./form/base-select.vue";
import BaseRadio from "./form/base-radio.vue";
import BaseInput from "./form/base-input.vue";
import BaseTable from "../table/base-table.vue";

const props = defineProps<{
  validate?: any;
  hideLabel?: boolean;
  columns?: IColumns[];
  hideButton?: boolean;
  col?: number;
  gap?: string;
  schema?: ISchema;
  labelClass?: string;
  tableRef?:InstanceType<typeof BaseTable>
}>();



const emits = defineEmits<{
  (e: "onSubmit", data: any): void;
  (e: "onCancel"): void;
}>();
let form = ref();
// 过滤出需要展示的form项
let formColumns = computed(() =>
  props.schema ? props.schema : columnsToSchema(props.columns || [])
);

// 搜集yup验证规则
const validateFomatter = computed(() => {
  const validateObj: any = {};
  for (let val in formColumns.value) {
    if (formColumns.value[val].yup) {
      validateObj[val] = formColumns.value[val].yup;
    }
  }

  return yup.object().shape(validateObj);
});
let { values, validate, submitForm, setValues,setFieldValue,resetForm } = useForm({
  validationSchema: validateFomatter.value
});

// 提交事件
function handleSubmit() {

  submitForm().then(value => {
    if (props.tableRef) {
        props.tableRef.search(values)
      return 
    }
    emits("onSubmit", value);
  });
}
// 取消事件
function handleCancel() {
   if (props.tableRef) {
        props.tableRef.reload()
         resetForm();
      return 
    }
  emits("onCancel");
}

async function getFormData() {
  let { valid } = await validate();
  if (!valid) return false;
  return values;
}

function setFormData(data: any) {
  setValues(data);
}
function handleSelectChange(val: any) {
  return val.value;
}
// columns转schema
function columnsToSchema(columns: IColumns[]): ISchema {
  if (!columns.length) return {};
  let schema: ISchema = {};
  columns.forEach(v => {
    if (v.search) {
      schema[v.prop] = { ...v.search, label: v.label };
    }
  });
  return schema;
}

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

let componentMap: any = {
  select: BaseSelect,
  radio: BaseRadio,
  cascader: BaseCascader,
  input: BaseInput,
  date: "Calendar",
  switch: "InputSwitch"
};

if (!props.columns && !props.schema) {
  throw "必须传一个columns或者schema属性";
}
defineExpose({
  getFormValue: getFormData,
  resetForm: resetForm,
  setFormValue: setFormData,
  setFieldValue:setFieldValue,
  values
});
</script>

<style lang="less" scoped>
.p-button {
  // font-size: 15px;
  padding: 9px 15px;
}
.p-inputtext {
  padding: 0.65rem 0.75rem;
}
.p-dropdown {
}
</style>
