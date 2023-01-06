<template>
<div class="container">
  <div id="profile" class="profile">
    <div class="user-info">
      <div class="user-info_avatar"> 
        <img src="../assets/1609.m00.i125.n002.P.c25.345947435 Vector wireframe connecting earth sphere. Globe connection concept.jpg" alt="" />
      </div>
      <h2>{{name}}</h2>
      <div class="profile_nav">
        <ul>
          <li @click="view = 'profile-about'; active = 'about'" 
              v-bind:class="{active: active === 'about' }"><router-link to="/Compte/About">A-PROPOS</router-link></li>
          <li @click="view = 'profile-posts'; active='posts'"
              v-bind:class="{active: active === 'posts' }"
              ><router-link to="/Compte/Comments">POSTS</router-link></li>
          <li @click="view = 'profile-contact'; active='contact'"
              v-bind:class="{active: active === 'contact' }"><router-link to="/Compte/Contact">CONTACT</router-link></li>
        </ul>
      </div> 
    </div>
    <div class="content"> 
      <transition name="slide-fade" mode="out-in"> 
           <router-view></router-view>
      </transition>
    </div>
  </div>
</div>
</template>

<script>

export default{ 
  props: {
    view:'profile-about', 
    active:'about',
  },
  data(){
    return{
  name : "Tiphanie",

    }
  },
  components :{

  }
}

</script>


<style scoped>
  p{ 

  }

  h1, h2, h3{ 
    text-transform: uppercase;
    letter-spacing: 2px
  }
img { 
  max-width: 100%
}
.container{ 
  background: linear-gradient(to right bottom, transparent 50%, #FF8787 50%);
  height: 100vh;
  max-width: 100%;
}
.profile {
	 background-color: #fff;
	 box-shadow: 0 20px 75px #001a00;
	 position: absolute;
	 top: 50%;
	 left: 50%;
	 transform: translate(-50%, -50%);
	 padding: 3em;
	 width: 90%;
	 max-width: 800px;
	 min-width: 600px;
	 margin: 0 auto;
	 height: 550px;
   border-radius: 10px;
}
 .profile .user-info {
	 width: calc(40% - 15px);
	 margin-right: 30px;
	 float: left;
}
 .profile h2 {
	 font-size: 2em;
	 font-weight: 100;
}
 .profile .user-info_avatar {
	 border: 5px solid #DE5F5F;
   border-radius: 50%;
   max-width: 80%;
}
 .profile img {
  border-radius: 50%;
 }
 .profile h3 {
	 position: relative;
}
    .profile_nav {
	 margin-top: 1em;
}
 .profile_nav ul {
	 list-style: none;
	 padding-left: 1em;
	 border-left: 3px solid #eaeaea;
}
 .profile_nav li {
	 margin-top: 0.5em;
	 font-size: 1.2em;
	 font-weight: bold;
	 letter-spacing: 2px;
	 transition: 0.2s all;
}
 .profile_nav.active {
	 color: #FF8787;
}
 .profile_nav:hover {
	 cursor: pointer;
	 color: #FF8787;
}
      .content {
	 width: calc(60% - 15px);
	 max-height: 100%;
	 float: left;
}
 .content h3 {
	 margin-top: 0;
	 font-size: 1.8em;
}
 .content .bg-float {
	 text-transform: capitalize;
	 color: rgba(230, 230, 230, 0.2);
	 font-weight: bold;
	 position: absolute;
	 right: 10px;
	 bottom: 0;
	 font-size: 12em;
	 z-index: -1;
}

    .posts {
	 list-style: none;
}
 .posts li {
	 border-bottom: 1px solid #eaeaea;
	 margin-bottom: 1em;
	 padding: 0.25em;
}
 .posts:after {
	 display: table;
	 content: '';
	 clear: both;
}
 .posts img, .posts h4 {
	 display: inline-block;
	 margin-right: 1em;
	 float: left;
}
.slide-fade-enter-active, .slide-fade-leave-active { 
  transition: opacity .1s, transform .2s
}
.slide-fade-enter, .slide-fade-leave-active { 
  opacity: 0;
  transform: translateX(20px)
}
</style>
