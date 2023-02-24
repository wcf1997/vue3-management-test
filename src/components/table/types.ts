import type { ButtonProps } from "primevue/button";
import * as yup from "yup";
interface ISelectOptions {
  label: string;
  value: any;
  [propName: string | number]: any;
}

interface IFormItem {
  type?:
    | "input"
    | "select"
    | "multi-select"
    | "date"
    | "cascader"
    | "switch"
    | "radio";
  /** yup验证规则 */
  yup?: any;
  /** 下拉搜索数据源 */
  options?: ISelectOptions[];
  /** 远程接口请求options数据 */
  requestApi?: (params?: any) => any;
  /** 请求参数 */
  requestParams?: any;
  /** 选项文本对应的prop */
  optionLabel?: string;
  /** 选项值对应的prop */
  optionValue?: string;
  /** onChange事件 */
  onChange?: (data: ISelectOptions) => void;
  /** 多选 */
  multiple?: boolean;
  /** radioButton 列 */
  radioOptions?: ISelectOptions[];
  /**  */
  addon?: any;
  suffix?: any;
  inputType?: string
}
export interface IActionButton extends ButtonProps {
  onClick?: (...ars:any) => any;
  isPopup?:boolean

}
export interface IColumns<T = any> {
  type?: "index" | "checkbox" | "action" | "enum";
  /** 字段名称 */
  label: string;
  /** 字段对应的key */
  prop: string;
  props?: string[];
  /** 自定义渲染文本内容 */
  renderText?: (text: any, record: T) => any;
  /** 插槽名称 */
  slot?: string;
  /** 不显示在表格中 */
  hideInTable?: boolean;
  /** 不显示在form表单中 */
  hideInForm?: boolean;
  /** 搜索配置，配置这个属性会显示搜索表单 */
  search?: IFormItem;
  /** 操作按钮 */
  actions?: (record: T,reload?:() => any) => Partial<IActionButton>[];
  [propName: string]: any;
  /** 跨列 */
  colSpan?: number | string;
  /** 状态 */
  enum?: {
    [value: string | number]: {
      text: string;
      status: "success" | "info" | "primary" | "danger" | "warning";
    };
  };
}

export interface ISchemaItem extends IFormItem {
  label: string;
  prop?:string
  colSpan?: string;
}

export interface ISchema<T = any> {
  [prop: string]: ISchemaItem;
}
