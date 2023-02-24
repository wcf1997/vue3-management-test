<template>
  <div>
    <UseTable></UseTable>
    <UseElTable></UseElTable>
  </div>
</template>

<script setup lang="ts">
import type { IColumns } from "@/components/table/types";
import ElTableSimple from "@/components/use-table/el-table-simple.vue";
import { useTable } from "@/components/use-table/useTable";
let columns: IColumns[] = [
  { type: "index", prop: "index", label: "序号" },
  { prop: "name", label: "姓名" },
  { prop: "mobile", label: "联系方式" }
];
const { UseTable } = useTable({
  columns,
  dataSource: [
    { name: "张三", mobile: "18888888888" },
    { name: "张三", mobile: "18888888888" },
    { name: "张三", mobile: "18888888888" },
    { name: "张三", mobile: "18888888888" },
    { name: "张三", mobile: "18888888888" },
    { name: "张三", mobile: "18888888888" }
  ]
});
const { UseTable:UseElTable } = useTable({
  columns,
  dataSource: [
    { name: "张三", mobile: "18888888888" },
    { name: "张三", mobile: "18888888888" },
    { name: "张三", mobile: "18888888888" },
    { name: "张三", mobile: "18888888888" },
    { name: "张三", mobile: "18888888888" },
    { name: "张三", mobile: "18888888888" }
  ]
},null,{component:ElTableSimple});
</script>

<style scoped lang="less">
.main {
  max-width: 1200px;
  margin: auto;
  padding-bottom: 50px;
}
</style>
