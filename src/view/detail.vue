<template>
    <div class="container ">

        <div class="absolute grid grid-cols-1 w-[100%] place-items-center mt-[130px] gap-[50px] ">
            <div id="app "
                class="shadow w-[400px] m-[0] p-[20px] bg-[#ffd7d7] bg-opacity-50  border-[2px]  rounded-[15px]">
                <div :item="item" v-for="item in items" :key="$route.params.id">
                    <img :src="item.post" class="main-photo w-[400px]  rounded-[15px]" alt="photo">
                    <img :src="image"
                        class="main-profile float-left mt-[-25px] ml-[20px] relative border-[1px] rounded-[50%] border-[white] h-[100px] w-[100px] object-cover"
                        alt="photo de Profil">
                    <div class="main-info float-left py-[5px] px-[15px] text-center">
                        <span class="name font">{{ Prénoms }} {{ Noms }}</span>
                        <h3 class="font">{{ item.Titre }}</h3>
                    </div>
                    <p class="font mt-[100px] text-center">{{ item.Description }}</p>
                </div>
                <form class="flex flex-col items-center" @submit.prevent="getComments">
                    <div class="mt-[10px]">
                        <h3 class="font text-center">Laisser un commentaire</h3>
                    </div>
                    <div class="flex w-[100%]">
                        <textarea name="comments" id="comments" placeholder="Commentaire" type="textarea"
                            v-model="comments" required
                            class="w-[400px] h-[100px] rounded-[10px] input-field max-h-[180px]outline-none focus:border-[#4E5166] focus:border-[1.5px] focus:shadow-[#ffd7d7] shadowLight pl-[10px]"></textarea>
                    </div>
                    <button type="submit"
                        class=" font  p-[5px] rounded-[15px] mt-[15px] bg-gradient-to-b from-[#FFD7D7] to-[#e8beb7]  border-[2px] border-white text-white tracking-[1px] uppercase cursor-pointer w-[100%] ">Envoyer</button>
                </form>
                <div class="flex justify-center items-center font mt-[5px] flex-col">
                    <button @click="isOpenA = !isOpenA" class="px-4 py-2 bg-blue-lighter hover:bg-blue-light">
                        Voir les commentaires
                    </button>

                    <div v-show="isOpenA" class="list-reset w-48 p-4 bg-grey-light" v-for="item in comment">
                        <p> {{ item.comments }}</p>

                    </div>

                </div>

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
    props: ['comment,id'],
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
            com: "",
            comment: [],
            detail: [],
            idPost: "",
            commentaire: "",
            isOpenA: false,
            isOpenB: false,
            comments: "",
            index: 0,
            newc: [],
        }
    },
    created() {
        this.getUsers()
        this.getImage()
        this.getPostImage()
        this.getPostComments()
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
                this.idPost = this.$route.params.id;
                if (this.idPost === doc.id) {
                    let data = (doc.id, " => ", doc.data())
                    items.push(data);
                    for (let value of items) {
                        this.post = value.post
                        this.Description = value.Description
                        this.Titre = value.Titre
                        this.Id = value.id
                        this.items = items
                    }
                }
            });
        },
        getComments() {
            const auth = getAuth();
            const use = auth.currentUser;
            const uid = use.uid
            //let users = collection(db,"/users")
            //addDoc(users, userDetails)
            const usersRef = collection(db, 'comments') // collectionRef
            const userRef = doc(usersRef) // docRef
            const id = userRef.id // a docRef has an id property
            const idPost = this.$route.params.id;
            const userData = {
                id, comments: this.comments, uid: uid, Post: idPost,
            } // insert the id among the data
            setDoc(userRef, userData)
        },

        async getPostComments() {
            const q = query(collection(db, "comments"));
            const querySnapshot = await getDocs(q);

            let comment = [];
            let newc = []
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                this.idPost = this.$route.params.id;

                console.log(doc.id, " => ", doc.data());
                let data = (doc.id, " => ", doc.data())
                comment.push(data);
                this.comment = comment
                console.log(comment)

            });

            comment.filter(item => {
                (item.Post) === (this.idPost)

            })


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