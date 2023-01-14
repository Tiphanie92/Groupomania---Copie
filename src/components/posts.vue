<template>
  <div class="container ">
    <div id="app"
      class="shadow w-[400px] m-[80px] p-[20px] bg-gradient-to-b from-[#AB9090] to-[#e8beb7] absolute mt-[120px] border-[2px] border-[#4E5166] rounded-[15px]">
      <img :src="post" class="main-photo w-[400px] border-[4px] border-[white] rounded-[15px]">
      <img :src="image"
        class="main-profile float-left mt-[-25px] ml-[20px] relative border-[3px] rounded-[50%] border-[#4E5166] w-[30%]">
      <div class="main-info float-left py-[5px] px-[15px] text-center">
        <span class="name font">{{ Prénoms }} {{ Noms }}</span>
        <h3 class="font">{{ Titre }}</h3>
      </div>
      <p class="font mt-[100px] text-center">{{ Description }}</p>
    </div>
  </div>
</template>

<script>
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase"
import { getAuth } from "firebase/auth"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
export default {
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      Noms: "",
      image: "",
      post: "",
    }
  },
  created() {
    this.getUsers()
    this.getImage()
    this.getPostImage()
  },
  methods: {
    async getUsers() {
      const auth = getAuth();
      const use = auth.currentUser;
      const uid = use.uid
      const docRef = doc(db, "users", uid);
      const docSn = await getDoc(docRef);
      if (docSn.exists()) {
        this.Noms = docSn.data().Noms
        this.Prénoms = docSn.data().Prénoms
        this.image = docSn.data().image
        console.log(docSn.data())
      } else {
        console.log("ce doc n'existe pas")
      }
    },
    async getImage() {
      const auth = getAuth();
      const use = auth.currentUser;
      const uid = use.uid
      const docRef = doc(db, "image", uid);
      const docSn = await getDoc(docRef);
      if (docSn.exists()) {
        this.image = docSn.data().image
        console.log(docSn.data())
      } else {
        console.log("ce doc n'existe pas")
      }
    },
    async getPostImage() {
      const auth = getAuth();
      const use = auth.currentUser;
      const uid = use.uid
      const docRef = doc(db, "post", uid);
      const docSn = await getDoc(docRef);
      if (docSn.exists()) {
        this.post = docSn.data().post
        this.Description = docSn.data().Description
        this.Titre = docSn.data().Titre
        console.log(docSn.data())
      } else {
        console.log("ce doc n'existe pas")
      }
    },
  }
}
</script>

<style scoped>
.container {
  background: linear-gradient(to right bottom, #ffd7d7 50%, transparent 50%);
  height: 100vh;
  max-width: 100%;
}

.font {
  font-family: 'Lato', sans-serif;
  font-size: 1.2rem;
  color: #4E5166;
  font-weight: bold;
}

.shadow {
  box-shadow: 0 20px 75px #4E5166;
}
</style>