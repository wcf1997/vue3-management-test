import { createVNode, render, RendererElement, RendererNode, VNode } from "vue";
import emit from "./emit";
import Toast from "./toast-model.vue";
import { IToastItem } from "./types";

export class ToastService {
  instance = null;
  vm: VNode | undefined = undefined;
  message: IToastItem[] = [];
  constructor() {}
  createVm() {
    if (!this.vm) {
      this.vm = createVNode(Toast, {
        messages: this.message
      });

      let wrap = document.createElement("div");
      render(this.vm, wrap);
      document.body.appendChild(wrap.firstElementChild as Element);
    }
  }
  add(data?: IToastItem) {
    if (this.vm) {
      console.log(this.vm);
    } else {
      this.createVm();
    }
    emit.emit("addToast", data);
  }
}
