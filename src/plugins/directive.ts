import type { App } from "vue";
import Tooltip from "primevue/tooltip";
export function registerDirective(app:App) {
  app.directive("tooltip", Tooltip);
}