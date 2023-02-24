import { createVNode, h, render, resolveComponent } from "vue";
import DialogModelA from "./dialog-model.vue";
import emit from "@/components/toast/emit";
import Dialog from "primevue/dialog";

export class UseModal {
  visible: boolean = false;
  vm: any = null;
  wrap: Element;
  key: any = Symbol();
  constructor() {
    this.vm = createVNode(DialogModelA, {
      modalKey: this.key
    });
    this.wrap = document.createElement("div");
  }
  renderDom() {
    render(this.vm, this.wrap);
    document.body.appendChild(this.wrap.firstElementChild as Element);

  }

  open() {
    this.renderDom();
    setTimeout(() => {
      emit.emit(this.key);
    });
  }
}
