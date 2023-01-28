import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, computed, onMounted, onUnmounted } from "vue";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDjLLJ_D4MCTAXAl9S75-qMSPaUxTS_Kp4",
  authDomain: "fir-b5eb0.firebaseapp.com",
  projectId: "fir-b5eb0",
  storageBucket: "fir-b5eb0.appspot.com",
  messagingSenderId: "620967770644",
  appId: "1:620967770644:web:3caae645a68ef83e6c8501",
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
