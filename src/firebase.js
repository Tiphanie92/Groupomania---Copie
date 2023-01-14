import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, computed, onMounted, onUnmounted } from "vue";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyByJDcR0urksz_rY4qaWOiyBH1pjtG4PJI",
  authDomain: "groupomania-14abf.firebaseapp.com",
  projectId: "groupomania-14abf",
  storageBucket: "groupomania-14abf.appspot.com",
  messagingSenderId: "341042381483",
  appId: "1:341042381483:web:db0e1df11ce5a4f9c06dee",
};

export const getUserState = () =>
  new Promise((resolve, reject) =>
    onAuthStateChanged(getAuth(), resolve, reject)
  );

export const useAuthState = () => {
  const user = ref(null);
  const error = ref(null);

  const auth = getAuth();
  let unsubscribe;
  onMounted(() => {
    unsubscribe = onAuthStateChanged(
      auth,
      (u) => (user.value = u),
      (e) => (error.value = e)
    );
  });
  onUnmounted(() => unsubscribe());

  const isAuthenticated = computed(() => user.value != null);

  return { user, error, isAuthenticated };
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export { db, storage };
