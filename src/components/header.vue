
<template>
    <header class="header">
        <img src="../assets/iconWhite.png" alt="logo" class="logo"/>
        <nav className="nav">
            <font-awesome-icon icon="fa-regular fa-envelope" beatFade class="ico" />
        <router-link to="/Posts" class="post k-font" >
          Tous les posts
        </router-link>
        <div>
            <font-awesome-icon icon="fa-solid fa-user-group" class="ico" />
        </div>
        <router-link to="/Compte" class="compte k-font" >
          Mon compte
        </router-link>
      </nav>
    </header>
</template>

<script>

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
    name: 'Header',
    components: {
        FontAwesomeIcon   
  }
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