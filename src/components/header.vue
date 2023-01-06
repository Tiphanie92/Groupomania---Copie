
<template>
    <header class="header">
        <img src="../assets/iconWhite.png" alt="logo" class="logo"/>
        <nav className="nav">
            <font-awesome-icon icon="fa-regular fa-envelope" beatFade class="ico" />
        <router-link to="/Posts" class="post h-font" >
          Tous les posts
        </router-link>
        <span v-show="isLoggedIn">
        <div class="contents">
            <font-awesome-icon icon="fa-solid fa-user-group" class="ico" />
        </div>
        <router-link to="/Compte" class="compte h-font mr-[50px]" >
          Mon compte
        </router-link>
        <font-awesome-icon class="ico" icon="fa-solid fa-power-off" />
        <button class="h-font" @click="handleSignout">Se deconnecter</button>
        
      </span>
      </nav>
    </header>
</template>

<script setup>

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref,onMounted } from "vue";
import { getAuth,onAuthStateChanged,signOut } from "@firebase/auth";
import router from "../router/index"
const isLoggedIn = ref(false)
let auth;
onMounted(()=> {
  auth = getAuth();
  onAuthStateChanged(auth, (user)=> {
    if (user) {
      isLoggedIn.value = true;
    }else {
      isLoggedIn.value = false;
    }
  });
});

const handleSignout = () => {
  signOut(auth).then(()=> {
    router.push({ path: '/' })
  })
}
</script>

<style scoped>
.header {
  display: flex;
  margin: 0% 0% 3% 0%;
  padding: 2%;
  position: absolute;
  width: 100%;
}

.nav {
  justify-content: flex-end;
  display: flex;
  width: 100%;
  align-items: center;
}

.post {
  margin-right: 50px;
  text-decoration: none;
  font-family: 'Lato', sans-serif;
  font-size: large;
  color: #4E5166;
  font-weight: bold;
}

.compte {
  

}

.h-font {
  text-decoration: none;
  font-family: 'Lato', sans-serif;
  font-size: large;
  color: #4E5166;
  font-weight: bold;
}

.logo {
  width: 20%;
  display: flex;
}
.ico {
  color: #DE5F5F;
  margin-right: 10px;
}

</style>