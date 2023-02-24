<template>
  <div>
    <BaseForm :hide-label="true" :columns="columns" class="mb-20px" :tableRef="tableRef">
      <template #afterButton>
          <slot name="afterButton"></slot>
      </template>
       <template #beforeButton>
          <slot name="beforeButton"></slot>
      </template>
    </BaseForm>
    <slot name="tableControl"></slot>
    <BaseTable ref="tableRef" :columns="columns" :request-api="requestApi"></BaseTable>
  </div>
</template>

<script setup lang="ts">
import { IBaseResponse } from "@/service/request/type";
import { ref } from "vue";
import BaseForm from "../form/base-form.vue";
import BaseTable from "./base-table.vue";
import { IColumns } from "./types";
const props = defineProps<{ columns: IColumns[];  requestApi?: (...args: any) => Promise<IBaseResponse>; }>();
const tableRef = ref()
</script>

<style scoped></style>
