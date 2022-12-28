import {
  getAuth,
  createUserWithEmailAndPassword,
  EmailAuthCredential,
} from "firebase/auth";
import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
import { useCurrentUser } from "vuefire";

// initialize firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
createUserWithEmailAndPassword(auth, EmailAuthCredential)
  .then((userCredential) => {
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
