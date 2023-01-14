<template>

	<form @submit.prevent="handleSubmit"
		class="bg-gradient-to-b from-[whitesmoke] to-[#e8beb7] flex h-[590px] flex-col rounded-b-[10px] rounded-r-[10px]">
		<div class="">
			<div class="flex justify-center mt-[20px] h-[250px]">
				<label class="max-w-[40%] m-[10px]">
					<input type="file" @change="uploadImage" accept="image/" id="files" name="files[]" multiple
						class="hidden">
					<div
						class="max-w-[100%] rounded-[20px] border-[2px] border-white cursor-pointer h-[200px] w-[500px]">
						<img id="imageUrl"
							class="max-w-[100%] rounded-[20px]  cursor-pointer h-[200px] border-[2px] border-white bg-gradient-to-b from-[whitesmoke] to-[#4E5166] shadow "
							:src="post">
						<font-awesome-icon icon="fa-solid fa-file-pen" size="lg"
							class="absolute cursor-pointer text-[white] mt-[-20px]" />
						<img />
					</div>
				</label>
			</div>
		</div>
		<div class="flex h-[30%] flex-col items-center">
			<div class="form flex flex-col items-center ">
				<div>
					<label class="font" id="name-label" for="name">Titre :</label>
				</div>
				<div class="">
					<input type="text" name="title" id="title" v-model="title"
						class="w-[300px] rounded-[10px] outline-none focus:border-[#4E5166] focus:border-[1.5px] focus:shadow-[#ffd7d7] shadowLight"
						required>
				</div>
				<div class="mt-[10px]">
					<label id="name-label" for="name" class="font">Description :</label>
				</div>
				<div class="">
					<textarea name="description" id="description" v-model="description"
						class="w-[400px] h-[100px] rounded-[10px] input-field max-h-[180px] outline-none focus:border-[#4E5166] focus:border-[1.5px] focus:shadow-[#ffd7d7] shadowLight"></textarea>
				</div>
				<button type="submit"
					class=" font w-[30%] p-[5px] rounded-[15px] mt-[15px] bg-gradient-to-b from-[#FFD7D7] to-[#e8beb7]  border-[2px] border-white text-white tracking-[1px] uppercase cursor-pointer transition transform duration-[0.1s] ease-in active:transform active:scale-[0.9] ">Publier</button>
			</div>
		</div>
	</form>
</template>

<script>
import { getDoc, doc, setDoc, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase"
import { getAuth } from "firebase/auth"
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
export default {
	data() {
		return {
			Noms: "",
			post: "",
			profilImage: "",
		}
	},
	components: {
		FontAwesomeIcon
	},
	created() {
		this.getUsers()
		this.getImageProfil()
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
		async getImageProfil() {
			const auth = getAuth();
			const use = auth.currentUser;
			const uid = use.uid
			const docRef = doc(db, "image", uid);
			const docSn = await getDoc(docRef);
			if (docSn.exists()) {
				this.profilImage = docSn.data().image
				console.log(docSn.data())
			} else {
				console.log("ce doc n'existe pas")
			}
		},
		uploadImage(event) {
			const storage = getStorage();
			let imageRef = ref(storage, 'post');

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
				that.post = e.target.result
			}
			reader.readAsDataURL(file)
			//put request upload file to firebase storage
			uploadBytes(imageRef, file).then((snapshot) => {
				console.log('Uploaded a blob or file!');
			});

			//get request to get URL for uploaded file
			getDownloadURL(ref(storage, 'post')).then((url) => {
				console.log(url);
				const auth = getAuth();
				const use = auth.currentUser;
				const uid = use.uid
				let post = {
					post: url
				}
				//let users = collection(db,"/users")
				//addDoc(users, userDetails)
				setDoc(doc(db, "post", uid), post);
			})
		},

		handleSubmit(event) {
			const auth = getAuth();
			const use = auth.currentUser;
			const uid = use.uid
			const docRef = doc(db, "post", uid);
			updateDoc(docRef, {
				Titre: this.title,
				Description: this.description,
				uid: uid
			})
			event.target.reset();
			let inputFile = document.getElementById("files");
			let img = document.getElementById("image");
			img.src = "post";
			inputFile.value = "";
		}
	}
}
</script>
<style scoped>
.font {
	font-family: 'Lato', sans-serif;
	font-size: 1.2rem;
	color: #4E5166;
	font-weight: bold;
}

.shadow {
	box-shadow: 0 5px 25px #4E5166;
}

.shadowLight {
	box-shadow: 0 3px 8px #4E5166;
}
</style>