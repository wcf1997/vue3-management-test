import type { IBaseResponse } from "@/service/request/type";
import type { InjectionKey, Ref } from "vue";
import type { IColumns } from "../table/types";


export interface IParamsInject<T = any> {
  /** 加载状态 */
  isLoading: Ref<boolean>;
  /** 静态数据源 */
  tableData?: Ref<T[]>;
  /** 表格列 */
  columns: Omit<IColumns, "actions">[];

  pageInfo: any;
  /** 接口 */
  // requestApi?: (...args: any) => Promise<IBaseResponse>;
  hidePaginator?: boolean;
  handleSizeChange: (...args: any) => any;
  handlePageChange: (...args: any) => any;
  handleActionButtonClick:(...args:any) => any
}
const paramskey = Symbol() as InjectionKey<IParamsInject>;

export { paramskey };
