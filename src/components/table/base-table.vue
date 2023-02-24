<template>
  <div>
    <ConfirmPopup></ConfirmPopup>
    <DataTable :value="tableData" bodyClass="leading-none" :loading="loading">
      <Column
        v-for="(col, a) in columns"
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
                @click="handleButtonClick(item, $event)"
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
      :rowsPerPageOptions="[10, 20, 30]"
      currentPageReportTemplate="当前 {first} ～ {last} 共 {totalRecords} 条"
      @page="handlePageChange"
    >
    </Paginator>
  </div>
</template>

<script setup lang="ts">
import { IBaseResponse } from "@/service/request/type";
import { registerLoading } from "echarts/core";
import { computed, reactive, ref } from "vue";
import BaseButton from "../base-button.vue";
import { IColumns } from "./types";
import { useConfirm } from "primevue/useconfirm";
const confirm = useConfirm();

let props = withDefaults(
  defineProps<{
    dataSource?: any[];
    columns: Omit<IColumns, "actions">[];
    requestApi?: (...args: any) => Promise<IBaseResponse>;
    hidePaginator?: boolean;
  }>(),
  {
    hidePaginator: false
  }
);

let index = 0;
let pageInfo = reactive({ index: 1, size: 10, total: 0 });
let searchKey: any = null;
let tableData = ref<any[]>([]);
let loading = ref<boolean>(false);
// 获取操作列按钮列表
const actions = computed(() => props.columns.find(v => v.type === "action"));

async function getTalbeData() {
  if (!props.requestApi) {
    tableData.value = props.dataSource ? props.dataSource : [];
    return;
  }
  loading.value = true;
  try {
    let res = await props.requestApi({ ...pageInfo, ...searchKey });
    if (!res.success) return;
    pageInfo.total = res.data.total;

    tableData.value = res.data.records;
  } catch (error) {
  } finally {
    loading.value = false;
  }
}
getTalbeData();

// 搜索
function search(data: any) {
  searchKey = { ...data };
  pageInfo.index = 1;
  getTalbeData();
}
// 重制
function reload() {
  pageInfo.index = 1;
  searchKey = {};
  getTalbeData();
}

function handleButtonClick(item: any, $event: any) {
  item.isPopup
    ? confirm.require({
        target: $event.currentTarget,
        message: "您确定要删除这条数据吗？",
        icon: "pi pi-info-circle",
        acceptClass: "p-button-danger",
        accept: () => {
          item.onClick(getTalbeData);
        },
        reject: () => {}
      })
    : item.onClick(getTalbeData);
}

function handlePageChange({ page, rows }: any) {
  pageInfo.index = page;
  pageInfo.size = rows;
  getTalbeData();
}

defineExpose({
  search,
  reload,
  tableData
});
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
