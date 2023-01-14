<template>
	<div class="container">
		<div id="profile" class="profile">
			<div class="user-info">
				<div class="user-info_avatar flex flex-col-reverse items-end">
					<label class="flex items-end mr-[90px]">
						<input type="file" @change="uploadImage" accept="image/" id="files" name="files[]"
							class="hidden">
						<font-awesome-icon icon="fa-solid fa-file-pen" size="lg"
							class="absolute cursor-pointer text-[#ffd7d7]" />
					</label>
					<img class="w-[100%]" :src="image" />
				</div>
				<div class="flex justify-center max-w-[70%] mt-[1em]">
					<h2 class="mr-[10px] font-bold text-[2em]">{{ Prénoms }}</h2>
					<h2 class="font-bold text-[2em]">{{ Noms }}</h2>
				</div>
				<div class="profile_nav">
					<ul>
						<li @click="view = 'profile-about'; active = 'about'"
							v-bind:class="{ active: active === 'about' }"><router-link
								to="/Compte/About">A-PROPOS</router-link></li>
						<li @click="view = 'profile-posts'; active = 'posts'"
							v-bind:class="{ active: active === 'posts' }"><router-link
								to="/Compte/Comments">POSTS</router-link></li>
						<li @click="view = 'profile-contact'; active = 'contact'"
							v-bind:class="{ active: active === 'contact' }"><router-link
								to="/Compte/Contact">CONTACT</router-link></li>
					</ul>
				</div>
			</div>
			<div class="content">
				<div class="flex flex-row">
					<div class="about">
						<h4 @click="view = 'profile-about'; active = 'about'"
							v-bind:class="{ active: active === 'about' }"
							class="text-center text-[1.7em] text-[#4E5166] font-bold bg-[whitesmoke]  flex justify-center rounded-t-[20px] pr-[20px] pl-[20px] border-b-[whitesmoke] border-[2px] border-[white] ">
							<router-link to="/Compte/About">
								A-Propos</router-link>
						</h4>
					</div>
					<div class="post">
						<h4 @click="view = 'profile-posts'; active = 'posts'"
							v-bind:class="{ active: active === 'posts' }"
							class="text-center text-[1.7em] text-[#4E5166] font-bold bg-[whitesmoke]   flex justify-center rounded-t-[20px] pr-[20px] pl-[20px] focus:border-[black] focus:border-[2px] border-b-[whitesmoke] border-[2px] border-[white]">
							<router-link to="/Compte/Comments">
								Posts</router-link>
						</h4>
					</div>
					<div class="contact">
						<h4 @click="view = 'profile-contact'; active = 'contact'"
							v-bind:class="{ active: active === 'contact' }"
							class="text-center text-[1.7em] text-[#4E5166] font-bold bg-[whitesmoke]   flex justify-center rounded-t-[20px] pl-[20px] pr-[20px] border-b-[whitesmoke] border-[2px] border-[white]">
							<router-link to="/Compte/Contact">
								Contact</router-link>
						</h4>

					</div>
				</div>
				<transition name="slide-fade" mode="out-in">
					<router-view></router-view>
				</transition>
			</div>
		</div>
	</div>
</template>

<script>
import { getDoc, doc, setDoc, addDoc } from "firebase/firestore";
import { db } from "../firebase"
import { getAuth } from "firebase/auth"
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
export default {

	props: {
		view: 'profile-about',
		active: 'about',
	},
	components: {
		FontAwesomeIcon
	},
	data() {
		return {
			Noms: "",
			image: "",
		}
	},
	created() {
		this.getUsers()
		this.getImage()
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

		uploadImage(event) {
			const storage = getStorage();
			let imageRef = ref(storage, 'images');

			const file = event.target.files[0]
			if (!file) {
				return false
			}
			if (!file.type.match('image.*')) {
				return false
			}
			const reader = new FileReader()
			const that = this
			reader.onload = function (e) {
				that.image = e.target.result
			}
			reader.readAsDataURL(file)
			//put request upload file to firebase storage
			uploadBytes(imageRef, file).then((snapshot) => {
				console.log('Uploaded a blob or file!');
			});

			//get request to get URL for uploaded file
			getDownloadURL(ref(storage, 'images')).then((url) => {
				console.log(url);
				const auth = getAuth();
				const use = auth.currentUser;
				const uid = use.uid
				let image = {
					image: url
				}
				//let users = collection(db,"/users")
				//addDoc(users, userDetails)
				setDoc(doc(db, "image", uid), image);
			})
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
	}
} 
</script>


<style scoped>
h1,
h2,
h3 {
	text-transform: uppercase;
	letter-spacing: 2px;
	color: #4E5166;
}

img {
	max-width: 100%
}

.container {
	background: linear-gradient(to right bottom, #ffd7d7 50%, transparent 50%);
	height: 100vh;
	max-width: 100%;
}

.profile {
	background-color: #fff;
	box-shadow: 0 20px 75px #4E5166;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	padding: 2em 3em 2em 3em;
	width: 80%;
	margin: 0 auto;
	height: 700px;
	border-radius: 10px;
}

.profile .user-info {
	width: calc(40% - 15px);
	float: left;
}

.profile h2 {
	font-size: 2em;
	font-weight: 100;
}

.profile .user-info_avatar {
	border: 5px solid #e8beb7;
	border-radius: 50%;
	max-width: 70%;
}

.profile img {
	border-radius: 50%;
}

.profile h3 {
	position: relative;
	color: #4E5166;
}

.profile_nav {
	margin-top: 4em;
}

.profile_nav ul {
	list-style: none;
	padding-left: 1em;
	border-left: 5px solid #4E5166;
}

.profile_nav li {
	margin-top: 0.5em;
	font-size: 1.7em;
	font-weight: bold;
	letter-spacing: 2px;
	transition: 0.2s all;
	color: #4E5166;
}

.profile_nav li.active {
	color: #e8beb7;
}

.profile_nav li:hover {
	cursor: pointer;
	color: #e8beb7;
}

.content {}

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

.posts img,
.posts h4 {
	display: inline-block;
	margin-right: 1em;
	float: left;
}

.about h4.active {
	border-top: #DEBABA solid;
	border-left: #DEBABA solid;
	border-right: #DEBABA solid;
	border: 2px 2px 0 0
}

.post h4.active {
	border-top: #DECDC5 solid;
	border-left: #DECDC5 solid;
	border-right: #DECDC5 solid;
	border: 2px 2px 0 0
}

.contact h4.active {
	border-top: #AB9090 solid;
	border-left: #AB9090 solid;
	border-right: #AB9090 solid;
	border: 2px 2px 0 0
}
</style>
