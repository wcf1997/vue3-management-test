export interface IDescribe<T = any> {
  /** 字段名称 */
  label: string;
  /** 字段对应的key */
  prop: string;
  /** 自定义渲染文本内容 */
  renderText?: (text: any, record: T) => any;
  /** 插槽名称 */
  slot?: string;
  /** 操作按钮 */
  [propName: string]: any;
  /** 跨列 */
  colSpan?: number | string;
  type?: "enum";
  /** 状态 */
  enum?: {
    [value: string | number]: {
      text: string;
      status: "success" | "info" | "danger" | "warning";
    };
  };
}