<template>
  <div class="container  ">

    <div class="absolute grid grid-cols-3 w-[100%] place-items-center mt-[130px] gap-[50px] ">
      <div id="app " :item="item" v-for="item in items" :key="$route.params.id"
        class="shadow w-[400px] m-[0] p-[20px] bg-[#ffd7d7] bg-opacity-50  border-[2px]  rounded-[15px] h-[100%] ">
        <img :src="item.post" class="main-photo w-[400px] h-[250px] rounded-[15px] object-cover" alt="photo">
        <img :src="image"
          class="main-profile float-left mt-[-25px] ml-[20px] relative border-[1px] rounded-[50%] border-[white] h-[100px] w-[100px] object-cover"
          alt="photo de Profil">
        <div class="main-info float-left py-[5px] px-[15px] text-center">
          <span class="name font">{{ Prénoms }} {{ Noms }}</span>
          <h3 class="font">{{ item.Titre }}</h3>
        </div>


        <button @click="isOpenA = !isOpenA" class="px-4 py-2 bg-blue-lighter hover:bg-blue-light font"> <router-link
            :to="{ path: `/Posts/${item.id}` }"> Voir Plus
          </router-link>
        </button>

      </div>
    </div>
  </div>
</template>

<script>
import { getDoc, doc, collection, query, getDocs, setDoc } from "firebase/firestore";
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
      id: "",
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
          this.Id = value.id
          console.log(value.id)
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
  height: 15vh;
  max-width: 80%;
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