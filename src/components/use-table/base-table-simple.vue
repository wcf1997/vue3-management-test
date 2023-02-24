<template>
  <div>
    <ConfirmPopup></ConfirmPopup>
    <DataTable :value="tableData" bodyClass="leading-none" :loading="isLoading">
      <Column
        v-for="(col) in columns"
        :field="col.prop"
        :header="col.label"
        :key="col.prop"
      >
        <template #body="slotProps">
          <!-- 序号列 -->
          <span v-if="col.type === 'index'">{{ ++index }}</span>
          <!-- 普通列 -->
          <slot
            v-if="!col.type"
            :name="col.slot"
            :data="{ text: slotProps.data[col.prop], raw: slotProps.data }"
            ><span class="leading-none">{{
              col.renderText
                ? col.renderText(slotProps.data[col.prop], slotProps.data)
                : slotProps.data[col.prop] || "-"
            }}</span></slot
          >
          <!-- 状态列 -->
          <template v-if="col.type === 'enum'">
            <Tag
              v-if="col.enum[slotProps.data[col.prop]]?.text"
              :value="col.enum[slotProps.data[col.prop]]?.text"
              :icon="`pi ${col.enum[slotProps.data[col.prop]]?.icon}`"
              :severity="col.enum[slotProps.data[col.prop]]?.status"
            ></Tag>

            <span v-else>-</span>
          </template>

          <!-- 操作列 -->
          <div v-if="col.type === 'action'">
            <template
              v-for="(item, index) in actions!.actions(slotProps.data)"
              :key="index"
            >
              <BaseButton
                v-bind="{ ...item, onClick: null }"
                @click="handleActionButtonClick(item, $event)"
              >
                {{ item.label }}
              </BaseButton>
            </template>
          </div>
        </template></Column
      >
      <template #empty> 暂无数据～ </template>
    </DataTable>
    <Paginator
      :template="{
        '640px': 'PrevPageLink CurrentPageReport NextPageLink',
        '960px':
          'CurrentPageReport FirstPageLink PrevPageLink PageLinks  NextPageLink LastPageLink',
        '1300px':
          'CurrentPageReport FirstPageLink PrevPageLink PageLink  PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
        default:
          'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
      }"
      :rows="pageInfo.size"
      :totalRecords="pageInfo.total"
      :rowsPerPageOptions="[2, 10, 20, 30]"
      currentPageReportTemplate="当前 {first} ～ {last} 共 {totalRecords} 条"
      @page="handlePaginationChange"
    >
    </Paginator>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from "vue";
import BaseButton from "../base-button.vue";

import { paramskey,type IParamsInject } from "./provide-key";

let {
  columns,
  isLoading,
  pageInfo,
  tableData,
  handleSizeChange,
  handlePageChange,
  handleActionButtonClick
} = inject(paramskey) as IParamsInject;
let index = 0;

// 获取操作列按钮列表
const actions = computed(() => columns.find((v: any) => v.type === "action"));

function handlePaginationChange({ page, rows }: any) {
  if (page + 1 !== pageInfo.index) {
    handlePageChange(page + 1);
  }
  if (rows !== pageInfo.size) {
    handleSizeChange(rows);
  }
}
</script>

<style lang="less" scoped>
span {
  vertical-align: auto;
}
.p-tag-value {
  padding: 3px 7px;
}
.p-button.p-button-sm {
  padding: 7px 15px;
}
</style>
