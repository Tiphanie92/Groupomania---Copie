<template>
  <div class="container ">

    <div class="absolute grid grid-cols-3 w-[100%] place-items-center mt-[130px] gap-[50px] ">
      <div id="app " :item="item" v-for="item in items"
        class="shadow w-[400px] m-[0] p-[20px] bg-[#ffd7d7] bg-opacity-30  border-[2px]  rounded-[15px]">
        <img :src="item.post" class="main-photo w-[400px]  rounded-[15px]" alt="photo">
        <img :src="image"
          class="main-profile float-left mt-[-25px] ml-[20px] relative border-[1px] rounded-[50%] border-[white] w-[30%]"
          alt="photo de Profil">
        <div class="main-info float-left py-[5px] px-[15px] text-center">
          <span class="name font">{{ Prénoms }} {{ Noms }}</span>
          <h3 class="font">{{ item.Titre }}</h3>
        </div>
        <p class="font mt-[100px] text-center">{{ item.Description }}</p>
        <form class="flex flex-col items-center">
          <div class="mt-[10px]">
            <h3 class="font text-center">Laisser un commentaire</h3>
          </div>
          <div class="flex w-[100%]">
            <textarea name="comments" id="comments" placeholder="Commentaire"
              class="w-[400px] h-[100px] rounded-[10px] input-field max-h-[180px]outline-none focus:border-[#4E5166] focus:border-[1.5px] focus:shadow-[#ffd7d7] shadowLight pl-[10px]"></textarea>
          </div>
          <button type="submit"
            class=" font  p-[5px] rounded-[15px] mt-[15px] bg-gradient-to-b from-[#FFD7D7] to-[#e8beb7]  border-[2px] border-white text-white tracking-[1px] uppercase cursor-pointer w-[100%]  ">Envoyer</button>
        </form>
        <div class="flex justify-center items-center font mt-[5px] flex-col">
          <button @click="isOpenA = !isOpenA" class="px-4 py-2 bg-blue-lighter hover:bg-blue-light">
            Voir les commentaires
          </button>
          <div>
            <ul v-show="isOpenA" class="list-reset p-4 w-48 bg-grey-light">
              <li>Example!</li>
              <li>Example!</li>
              <li>Example!</li>
              <li>Example!</li>
              <li>Example!</li>
              <li>Example!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { getDoc, doc, collection, query, getDocs } from "firebase/firestore";
import { db } from "../firebase"
import { getAuth } from "firebase/auth"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  components: {
    FontAwesomeIcon,
  },
  props: [''],
  data() {
    return {
      Noms: "",
      image: "",
      post: "",
      Titre: "",
      Prénoms: "",
      Description: "",
      item: [],
      items: [],
      commentaire: "",
      isOpenA: false,
      isOpenB: false
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
      const q = query(collection(db, "post"));
      const querySnapshot = await getDocs(q);
      let items = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        let data = (doc.id, " => ", doc.data())
        items.push(data);
        for (let value of items) {
          console.log(value)
          this.post = value.post
          this.Description = value.Description
          this.Titre = value.Titre
          console.log(value.Titre)
          this.items = items
        }


        console.log(items)

      });
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
}

.shadow {
  box-shadow: 0 5px 40px #4E5166;
}

#app {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>