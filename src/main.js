import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyB041vI5564hPRbNgECAMRCZdhYVIisVaM",
  authDomain: "fir-ta-a2d58.firebaseapp.com",
  projectId: "fir-ta-a2d58",
  storageBucket: "fir-ta-a2d58.appspot.com",
  messagingSenderId: "85336241503",
  appId: "1:85336241503:web:12ebc764fec0f770e072ea",
  databaseURL:
    "https://fir-ta-a2d58-default-rtdb.europe-west1.firebasedatabase.app",
};
firebase.initializeApp(firebaseConfig);

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faUserGroup, faAddressCard } from "@fortawesome/free-solid-svg-icons";

library.add(faUserGroup, faEnvelope, faAddressCard);

import router from "./router";

createApp(App).use(router).component("", FontAwesomeIcon).mount("#app");
