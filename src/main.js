import { createApp } from 'vue';
import App from './App.vue';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';

const vuetify = createVuetify({
  components,
  directives,
});

// Pinia (State management)
import {createPinia} from "pinia";

const pinia = createPinia();

// Router
import router from "@/router";
import routerFuncs from "@/mixins/routerFuncs";

createApp(App)
  .use(vuetify)
  .use(router)
  .use(pinia)
  .mixin(routerFuncs)
  .mount('#app');