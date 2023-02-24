import type { App } from "vue";
import { registerComponent } from "./components";
import { createPinia } from 'pinia'
import { registerDirective } from "./directive";

export function registerPlugins(app:App){
  registerComponent(app)
  registerDirective(app);
  app.use(createPinia())
  

}