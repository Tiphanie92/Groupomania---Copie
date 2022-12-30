import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyByJDcR0urksz_rY4qaWOiyBH1pjtG4PJI",
  authDomain: "groupomania-14abf.firebaseapp.com",
  projectId: "groupomania-14abf",
  storageBucket: "groupomania-14abf.appspot.com",
  messagingSenderId: "341042381483",
  appId: "1:341042381483:web:db0e1df11ce5a4f9c06dee",
};

const app = initializeApp(firebaseConfig);

const projectFirestore = getFirestore(app);

export { projectFirestore };
