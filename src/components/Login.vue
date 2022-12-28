<template>
 <div id="app">
	<img src="../assets/Social.jpg" alt="social" class="social"/>
  <article class="w-[100%] justify-center flex absolute">
    <div class="container" :class="{'sign-up-active' : signUp}">
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-left ">
            <h2>Bon retour parmi nous!</h2>
            <p>Veuillez vous connecter avec vos informations personnelles</p>
            <button class="invert" id="signIn" @click="signUp = !signUp">Se connecter</button>
          </div>
          <div class="overlay-right ">
            <h2>Bienvenue!</h2>
            <p>Si vous n'êtes pas encore inscrit, Foncer ! </p>
            <button class="invert " id="signUp" @click="signUp = !signUp">S'enregistrer</button>
			
          </div>
        </div>
      </div>
      <form class="sign-up" action="#">
        <h2>Créer votre compte</h2>
        <div>Utiliser votre adresse email pour vous enregistrer</div>
        <input  type="text" placeholder="Nom" />
        <input  type="email" placeholder="Email" />
        <input  type="password" placeholder="Mot de passe" />
        <button><RouterLink to="/Profil">S'enregistrer</RouterLink></button>
      </form>
      <form class="sign-in" action="#">
        <h2>Connexion</h2>
        <div>Utiliser votre compte</div>
        <input type="email" placeholder="Email" />
        <input  type="password" placeholder="Mot de passe" />
        <a href="#">Vous avez oublié votre mot de passe ?</a>
        <button><RouterLink to="/Compte">Se connecter</RouterLink></button>
      </form>
    </div>
  </article>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      signUp: false
    }
  }
}
</script>

<style scoped>
#app {
	font-family: 'Lato', sans-serif;
  font-size: 1rem;
  color: #4E5166;
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
	 box-shadow: 0 15px 30px #E8BEB7, 0 10px 10px #FFF0F0;
	 background: linear-gradient(to bottom, whitesmoke, #E8BEB7);
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
	 background: linear-gradient(to bottom right, #FFD7D7
, #FF8787);
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
   padding: 10px ;
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
   padding: 10px ;
}
 h2 {
	 margin: 0;
   font-family: 'Lato', sans-serif;
   font-size:xx-large;
}
 p {
	 margin: 20px 0 30px;
   font-family: 'Lato', sans-serif;
   font-size:large;
}

 button {
	 border-radius: 20px;
	 border: 1px solid #FF8787
;
background: linear-gradient(to bottom right, #FF8787
, #DE5F5F);
;
	 color: #fff;
	 font-size: 1rem;
	 font-weight: bold;
	 padding: 10px 40px;
	 letter-spacing: 1px;
	 text-transform: uppercase;
	 cursor: pointer;
	 transition: transform 0.1s ease-in;
   font-family: 'Lato', sans-serif;
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
   background: linear-gradient(to bottom right, transparent
, transparent);
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
	 background: linear-gradient(to bottom, whitesmoke, #FFD7D7);
	 transition: all 0.5s ease-in-out;
}
 form div {
	 font-size: 1rem;
   font-family: 'Lato', sans-serif;
   font-size: large;
}

a {
  text-decoration: none;
  margin: 15px 0;
  font-family: 'Lato', sans-serif;
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
	 box-shadow: inset 0 1px 2px rgba(0, 0, 0, .4), 0 -1px 1px #fff, 0 1px 0 #fff;
	 overflow: hidden;
}
 form input:focus {
	 outline: none;
	 background-color: #fff;
   box-shadow: inset 0 1px 2px #DE5F5F, 0 1px 1px #DE5F5F, 0 1px 0 #DE5F5F ;
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