import { createApp } from "vue";
import "./style.css";
import './assets/scss/_global.scss'
import App from "./App.vue";

import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles"; // Import Vuetify styles
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Vuetify instance
const vuetify = createVuetify({
 
  components,
  directives,
});

createApp(App).use(vuetify).mount("#app");
