<template>
  <div id="app">
    <img src="../assets/Social.jpg" alt="social" class="social" />
    <article class="w-[100%] justify-center flex absolute">
      <div class="container" :class="{ 'sign-up-active': signUp }">
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-left">
              <h2>Bon retour parmi nous!</h2>
              <p>Veuillez vous connecter avec vos informations personnelles</p>
              <button class="invert" id="signIn" @click="signUp = !signUp">
                Se connecter
              </button>
            </div>
            <div class="overlay-right">
              <h2>Bienvenue!</h2>
              <p>Si vous n'êtes pas encore inscrit, Foncer !</p>
              <button class="invert" id="signUp" @click="signUp = !signUp">
                S'enregistrer
              </button>
            </div>
          </div>
        </div>
        <form id="signUp" @submit.prevent="register" class="sign-up" action="#">
          <h2>Créer votre compte</h2>
          <div>Utiliser votre adresse email pour vous enregistrer</div>
          <input id="emailCreate" v-model="emailCreate" type="email" placeholder="Email" />
          <input id="passwordCreate" v-model="passwordCreate" type="password" placeholder="Mot de passe" />
          <p v-show="errMsgRegister">{{ errMsgRegister }}</p>
          <button type="submit" value="login">S'enregistrer</button>
        </form>
        <form class="sign-in" @submit.prevent="login" action="#">
          <h2>Connexion</h2>
          <div>Utiliser votre compte</div>
          <input id="email" v-model="email" type="email" placeholder="Email" />
          <input id="password" v-model="password" type="password" placeholder="Mot de passe" />
          <p v-show="errMsg">{{ errMsg }}</p>
          <a href="#">Vous avez oublié votre mot de passe ?</a>
          <button>Se connecter</button>
          <button @click="googleSignIn">
            Sign In with Google
          </button>
        </form>

      </div>
    </article>
  </div>
</template>

<script>
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider
} from "firebase/auth";
import { ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { db } from "../firebase";
import router from "../router";


const errMsg = ref("");
const errMsgRegister = ref("");
const password = ref("");
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data: () => {
    return {
      signUp: false,
      errMsg: errMsg,
      errMsgRegister: errMsgRegister,
      email: "",
      password: "",
      emailCreate: "",
      passwordCreate: "",
    };
  },
  methods: {
    register() {
      createUserWithEmailAndPassword(
        getAuth(),
        this.emailCreate,
        this.passwordCreate
      )
        .then((data) => {
          console.log("enregistrement reussie");
          this.$router.push({ path: "/Profil" });
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              errMsgRegister.value = "Email invalide";
              break;
            case "auth/user-not-found":
              errMsgRegister.value = "Aucun compte ne correspond à cette adresse mail";
              break;
            case "auth/wrong-password":
              errMsgRegister.value = "Mot de passe incorrect";
              break;
            case "auth/weak-password":
              errMsgRegister.value = "Le mot de passe doit contenir au moins 6 caractéres"
              break;
            default:
              errMsgRegister.value = "L'e-mail ou le mot de passe est incorrect";
              break;
          }
        });
    },
    login() {
      signInWithEmailAndPassword(getAuth(), this.email, this.password)
        .then((data) => {
          console.log("connexion");
          this.$router.push({ path: "/Compte" });
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              errMsg.value = "Emai invalide";
              break;
            case "auth/user-not-found":
              errMsg.value = "Aucun compte ne correspond à cette adresse mail";
              break;
            case "auth/wrong-password":
              errMsg.value = "Mot de passe incorrect";
              break;
            default:
              errMsg.value = "L'e-mail ou le mot de passe est incorrect";
              break;
          }
        });
    },
    googleSignIn() {
      let provider = new GoogleAuthProvider();
      signInWithPopup(getAuth(), provider)
        .then((result) => {
          console.log(result.user);
          router.push("/Compte")
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },

};
</script>

<style scoped>
#app {
  font-family: "Lato", sans-serif;
  font-size: 1rem;
  color: #4e5166;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  position: relative;
  width: 60%;
  height: 480px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 15px 30px #e8beb7, 0 10px 10px #fff0f0;
  background: linear-gradient(to bottom, whitesmoke, #e8beb7);
}

.container .overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.5s ease-in-out;
  z-index: 100;
}

.container .overlay {
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  background: linear-gradient(to bottom right, #ffd7d7, #ff8787);
  color: #fff;
  transform: translateX(0);
  transition: transform 0.5s ease-in-out;
}

.container .overlay-left {
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  width: 50%;
  height: 100%;
  text-align: center;
  transform: translateX(-20%);
  transition: transform 0.5s ease-in-out;
  padding: 10px;
}

.container .overlay-right {
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  width: 50%;
  height: 100%;
  text-align: center;
  transform: translateX(0);
  transition: transform 0.5s ease-in-out;
  right: 0;
  padding: 10px;
}

h2 {
  margin: 0;
  font-family: "Lato", sans-serif;
  font-size: xx-large;
}

p {
  margin: 20px 0 30px;
  font-family: "Lato", sans-serif;
  font-size: large;
}

button {
  border-radius: 20px;
  border: 1px solid #ff8787;
  background: linear-gradient(to bottom right, #ff8787, #de5f5f);
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  padding: 10px 40px;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.1s ease-in;
  font-family: "Lato", sans-serif;
}

button:active {
  transform: scale(0.9);
}

button:focus {
  outline: none;
}

button.invert {
  background-color: transparent;
  border-color: black;
  color: black;
  background: linear-gradient(to bottom right, transparent, transparent);
}

form {
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  padding: 50px 40px;
  width: 50%;
  height: 100%;
  text-align: center;
  background: linear-gradient(to bottom, whitesmoke, #ffd7d7);
  transition: all 0.5s ease-in-out;
}

form div {
  font-size: 1rem;
  font-family: "Lato", sans-serif;
  font-size: large;
}

a {
  text-decoration: none;
  margin: 15px 0;
  font-family: "Lato", sans-serif;
  font-size: medium;
}

form input {
  background-color: whitesmoke;
  border: none;
  padding: 8px 15px;
  margin: 6px 0;
  width: calc(100% - 30px);
  border-radius: 15px;
  border-bottom: 1px solid #ddd;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.4), 0 -1px 1px #fff, 0 1px 0 #fff;
  overflow: hidden;
}

form input:focus {
  outline: none;
  background-color: #fff;
  box-shadow: inset 0 1px 2px #de5f5f, 0 1px 1px #de5f5f, 0 1px 0 #de5f5f;
}

.sign-in {
  left: 0;
  z-index: 2;
}

.sign-up {
  left: 0;
  z-index: 1;
  opacity: 0;
}

.sign-up-active .sign-in {
  transform: translateX(100%);
}

.sign-up-active .sign-up {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.5s;
}

.sign-up-active .overlay-container {
  transform: translateX(-100%);
}

.sign-up-active .overlay {
  transform: translateX(50%);
}

.sign-up-active .overlay-left {
  transform: translateX(0);
}

.sign-up-active .overlay-right {
  transform: translateX(20%);
}
</style>
