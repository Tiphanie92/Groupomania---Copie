<template>
  <div class=" w-[100%] h-[1024px] flex justify-center items-center">
    <img src="../assets/1609.m00.i125.n002.P.c25.345947435 Vector wireframe connecting earth sphere. Globe connection concept.jpg" alt="" />
    <div class="bg-gradient-to-b from-[#FFD7D7] to-[#FF8787] w-[50%] text-center flex items-center justify-center rounded-[20px] absolute shadow-[#E8BEB7] shadow-xl">
	<div id="form-outer" class="font py-[50px] w-[50%]" >
    <div class="bg-white border-[2px] border-[#4E5166] mb-[30px] p-[5px] rounded-[10px] flex justify-center">
    <h1 id="title" class="text-3xl">Profil</h1>
    <font-awesome-icon icon="fa-solid fa-address-card" size="xl" class="ml-[10px] mt-[6px]" />
  </div>
		<p id="description" class="mb-[20px]">Veuillez compléter les informations ci-dessous.</p>
		<form id="survey-form" class="flex flex-col gap-[20px]">
      <div class="bg-white border-[2px] border-[#4E5166] p-[20px] rounded-[10px]">
			<div class="rowTab"> 
				<div class="labels"><!-- demande de nom -->
					<label id="name-label" for="name">Nom :</label>
				</div>
				<div class="rightTab">
					<input autofocus type="text" name="name" id="name" class="input-field w-[100%] py-[8px] rounded-[15px] border-[1px] border-[#4E5166] shadow-md focus:shadow-[#DE5F5F] outline-none shadow-[1px] focus:border-[#DE5F5F] focus:border-[1px] px-[10px] font-normal bg-[#FFF0F0]" placeholder="Nom et prénom" required>
				</div>
			</div>
			<div class="rowTab">
				<div class="labels"><!-- demande de Mail-->
					<label id="email-label" for="email">Email :</label>
				</div>
				<div class="rightTab">
					<input type="email" name="email" id="email" class="input-field w-[100%] py-[8px] rounded-[15px] border-[1px] border-[#4E5166] shadow-md focus:shadow-[#DE5F5F] outline-none shadow-[1px] focus:border-[#DE5F5F] focus:border-[1px] px-[10px] font-normal bg-[#FFF0F0]" required placeholder="Ton Email">
				</div>
			</div>
      <div class="rowTab"> 
				<div class="labels"><!-- demande de nom -->
					<label id="name-label" for="job">Profession :</label>
				</div>
				<div class="rightTab">
					<input autofocus type="text" name="job" id="job" class="input-field w-[100%] py-[8px] rounded-[15px] border-[1px] border-[#4E5166] shadow-md focus:shadow-[#DE5F5F] outline-none shadow-[1px] focus:border-[#DE5F5F] focus:border-[1px] px-[10px] font-normal bg-[#FFF0F0] " placeholder="Ta profession" required>
				</div>
			</div>
			<div class="rowTab">
				<div class="labels"><!--demande d'age ma gueule-->
					<label id="number-label" for="age">Age :</label>
				</div>
				<div class="rightTab">
					<input type="number" name="age" id="number" min="18" max="80" class="input-field w-[100%] py-[8px] rounded-[15px] border-[1px] border-[#4E5166] shadow-md focus:shadow-[#DE5F5F] outline-none shadow-[1px] focus:border-[#DE5F5F] focus:border-[1px] px-[10px] font-normal bg-[#FFF0F0]"  required placeholder="Ton âge">
				</div>
			</div>
			<div class="rowTab">
					<label for="comments">Description :</label>
				<div class="rigtTab">
					<textarea id="comments" class="input-field w-[100%] py-[8px] rounded-[15px] border-[1px] border-[#4E5166] shadow-md focus:shadow-[#DE5F5F] outline-none shadow-[1px] focus:border-[#DE5F5F] focus:border-[1px] max-h-[200px] px-[10px] font-normal bg-[#FFF0F0]" style="height:50px; resize:vertical;" placeholder="Ecrivez quelques mots sur vous-même..."></textarea>
				</div>
			</div>
    </div>
      <div>
			<button id="submit" type="submit" class="bg-gradient-to-b from-[#FFD7D7] to-[#FF8787] py-[10px] px-[40px] rounded-[20px] border-[2px] border-white text-white tracking-[1px] uppercase cursor-pointer transition transform duration-[0.1s] ease-in active:transform active:scale-[0.9]"><RouterLink to="/Compte">Envoi !</RouterLink></button>
      </div>
		</form>
	</div>
  </div>
  </div>
</template>

<script>
  import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
    name: 'profil',
    components: {
        FontAwesomeIcon   
  }
}
</script>

<style scoped>
.font {
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  color: #4E5166;
  font-weight: bold;
}
</style>