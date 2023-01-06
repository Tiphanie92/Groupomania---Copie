import { createApp } from "vue";

import "./style.css";
import App from "./App.vue";

import "./firebase";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faUserGroup,
  faAddressCard,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";

library.add(faUserGroup, faEnvelope, faAddressCard, faPowerOff);

import router from "./router";

createApp(App).use(router).component("", FontAwesomeIcon).mount("#app");
