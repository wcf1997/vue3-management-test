import type { App } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import PrimeVue from "primevue/config";
import Card from "primevue/card";
import Button from "primevue/button";
import Table from "primevue/datatable";
import Breadcrumb from "primevue/breadcrumb";
import Image from "primevue/image";
import InputText from "primevue/inputtext";
import Column from "primevue/column";
import Dropdown from "primevue/dropdown";
import Tag from "primevue/tag";
import Dialog from "primevue/dialog";
import Calendar from "primevue/calendar";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import Paginator from "primevue/paginator";
import CascadeSelect from "primevue/cascadeselect";
import InputSwitch from "primevue/inputswitch";
import MultiSelect from "primevue/multiselect";
import RadioButton from "primevue/radiobutton";
import FileUpload from "primevue/fileupload";
import Badge from "primevue/badge";
import ProgressBar from "primevue/progressbar";
import InlineMessage from "primevue/inlinemessage";
import Message from "primevue/message";
import ConfirmPopup from "primevue/confirmpopup";
import ConfirmationService from "primevue/confirmationservice";

const components = [
  Button,
  Card,
  Table,
  Breadcrumb,
  Image,
  InputText,
  Column,
  Dropdown,
  Tag,
  Dialog,
  Calendar,
  Toast,
  Paginator,
  CascadeSelect,
  InputSwitch,
  MultiSelect,
  FileUpload,
  RadioButton,
  Badge,
  ProgressBar,
  InlineMessage,
  Message,
  ConfirmPopup
];
const PrimeVueLocale = {
  startsWith: "从",
  contains: "包含",
  notContains: "不包含",
  endsWith: "以",
  equals: "等于",
  notEquals: "不等于",
  noFilter: "无过滤",
  lt: "小于",
  lte: "小于等于",
  gt: "大于",
  gte: "大于等于",
  dateIs: "日期是",
  dateIsNot: "日期不是",
  dateBefore: "在日期之前",
  dateAfter: "在次之后",
  clear: "清楚",
  apply: "应用于",
  matchAll: "全部匹配",
  matchAny: "匹配任何",
  addRule: "增加规则",
  removeRule: "删除规则",
  accept: "是",
  reject: "否",
  choose: "选择",
  upload: "上传",
  cancel: "取消",
  completed: "已完成",
  pending: "等待",
  dayNames: [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六"
  ],
  dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
  dayNamesMin: ["七", "一", "二", "三", "四", "五", "六"],
  monthNames: [
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二与"
  ],
  monthNamesShort: [
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月"
  ],
  chooseYear: "Choose Year",
  chooseMonth: "Choose Month",
  chooseDate: "Choose Date",
  prevDecade: "Previous Decade",
  nextDecade: "Next Decade",
  prevYear: "Previous Year",
  nextYear: "Next Year",
  prevMonth: "Previous Month",
  nextMonth: "Next Month",
  prevHour: "Previous Hour",
  nextHour: "Next Hour",
  prevMinute: "Previous Minute",
  nextMinute: "Next Minute",
  prevSecond: "Previous Second",
  nextSecond: "Next Second",
  am: "am",
  pm: "pm",
  today: "今天",
  weekHeader: "周",
  firstDayOfWeek: 0,
  dateFormat: "yy-mm-dd",
  weak: "周",
  medium: "中等",
  strong: "强",
  passwordPrompt: "输入密码",
  emptyFilterMessage: "未找到结果", // @deprecated Use 'emptySearchMessage' option instead.
  searchMessage: "{0} 结果可用",
  selectionMessage: "{0} 选定的项目",
  emptySelectionMessage: "没有选定的项目",
  emptySearchMessage: "未找到结构",
  emptyMessage: "暂无数据～",
  aria: {
    trueLabel: "True",
    falseLabel: "False",
    nullLabel: "Not Selected",
    star: "1 star",
    stars: "{star} stars",
    selectAll: "All items selected",
    unselectAll: "All items unselected",
    close: "Close",
    previous: "Previous",
    next: "Next",
    navigation: "Navigation",
    scrollTop: "Scroll Top",
    moveTop: "Move Top",
    moveUp: "Move Up",
    moveDown: "Move Down",
    moveBottom: "Move Bottom",
    moveToTarget: "Move to Target",
    moveToSource: "Move to Source",
    moveAllToTarget: "Move All to Target",
    moveAllToSource: "Move All to Source",
    pageLabel: "{page}",
    firstPageLabel: "First Page",
    lastPageLabel: "Last Page",
    nextPageLabel: "Next Page",
    prevPageLabel: "Previous Page",
    rowsPerPageLabel: "Rows per page",
    previousPageLabel: "Previous Page",
    jumpToPageDropdownLabel: "Jump to Page Dropdown",
    jumpToPageInputLabel: "Jump to Page Input",
    selectRow: "Row Selected",
    unselectRow: "Row Unselected",
    expandRow: "Row Expanded",
    collapseRow: "Row Collapsed",
    showFilterMenu: "Show Filter Menu",
    hideFilterMenu: "Hide Filter Menu",
    filterOperator: "Filter Operator",
    filterConstraint: "Filter Constraint",
    editRow: "Row Edit",
    saveEdit: "Save Edit",
    cancelEdit: "Cancel Edit",
    listView: "List View",
    gridView: "Grid View",
    slide: "Slide",
    slideNumber: "{slideNumber}",
    zoomImage: "Zoom Image",
    zoomIn: "Zoom In",
    zoomOut: "Zoom Out",
    rotateRight: "Rotate Right",
    rotateLeft: "Rotate Left"
  }
};

export function registerComponent(app: App) {
  app.use(PrimeVue, {
    locale: PrimeVueLocale
  });
  app.use(ElementPlus);
  app.use(ToastService);
  components.forEach(v => {
    app.component(v.name, v);
  });
  app.use(ConfirmationService);
}
