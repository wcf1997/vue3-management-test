<template>
  <div>
    <el-table :data="tableData" bodyClass="leading-none" :loading="isLoading">
      <el-table-column
        v-for="(col) in columns"
        :prop="col.prop"
        :label="col.label"
        :key="col.prop"
        :type="col.type"


      >
        <template #default="scope">

          <!-- 普通列 -->
          <slot
            v-if="!col.type"
            :name="col.slot"
            :data="{ text: scope.row[col.prop], raw: scope.row }"
            ><span class="leading-none">{{
              col.renderText
                ? col.renderText(scope.row[col.prop], scope.row)
                : scope.row[col.prop] || "-"
            }}</span></slot
          >
          <!-- 状态列 -->
          <template v-if="col.type === 'enum'">
            <Tag
              v-if="col.enum[scope.row[col.prop]]?.text"
              :value="col.enum[scope.row[col.prop]]?.text"
              :icon="`pi ${col.enum[scope.row[col.prop]]?.icon}`"
              :severity="col.enum[scope.row[col.prop]]?.status"
            ></Tag>

            <span v-else>-</span>
          </template>

          <!-- 操作列 -->
          <div v-if="col.type === 'action'">
            <template
              v-for="(item, index) in actions!.actions(scope.row)"
              :key="index"
            >
              <el-button
                v-bind="{ ...item, onClick: null }"
                @click="handleActionButtonClick(item, $event)"
              >
                {{ item.label }}
              </el-button>
            </template>
          </div>
        </template>
      </el-table-column>
      <template #empty> 暂无数据～ </template>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from "vue";


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
