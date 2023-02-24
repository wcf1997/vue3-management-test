export interface IToastItem {
  severity?: "success" | "info" | "warn" | "error";
  summary?: string;
  detail?: string
  id?:number
}
