// sort by price btn function 
const sortDisplay = async()=>{
  const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`);
  const data = await res.json();
  const sortedPrice = sort(data.pets);

  const  cardcontainer= document.getElementById('card-container')
  const timer = 3000;
  const intervaltimer = 1000;

  let slice = timer / intervaltimer;
   
  const intvId = setInterval(()=> {
    
      cardcontainer.innerHTML= ` 
      <div class="col-span-3 text-center" id="loader">
       <span  class="loading loading-dots loading-lg"></span>
      </div>
      `
      
    slice = slice - 1;
  }, intervaltimer);

setTimeout(() => {
  displayAllPets(sortedPrice);
  clearInterval(intvId);
},timer);
};
// sorting mathod function 
const sort = (petPrice) => {
  return petPrice.sort((a, b) => {
      const priceA = a.price ? a.price : 0;
      const priceB = b.price ? b.price : 0;
      return priceB - priceA;
  });
};

// category btn load to api function
const categoriesBtnLoad = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await res.json();
  displayCategoryBtn(data.categories);
};
// category btn load to api function call
categoriesBtnLoad();

// category btn display funtion 
const displayCategoryBtn = (categoryBtn) => {
  const btnContainer = document.getElementById("btn-container");
  categoryBtn.forEach((element) => {
    const btn = document.createElement("button");
    btn.innerHTML = `
    <button id="btn-${element.id}" onclick="loadCategoryCard('${element.category}',${element.id})" class="category-btn w-full py-4 rounded-lg border border-[#0E7A81] border-opacity-40 bg-white hover:bg-white flex items-center justify-center gap-2 ">
              <img class="w-10" src="${element.category_icon}" alt="">
              <p class="font-extrabold text-lg text-black">${element.category}</p>
            </button>
    `;
    btnContainer.append(btn);
  });
};
// all pet card load to api funtion
 const allCardLoad = async () => {
  const loader = document.getElementById("loader");
  loader.classList.remove("hidden");
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pets`
  );
  const data = await res.json();

  setTimeout(() => {
    displayAllPets(data.pets);
   loader.classList.add('hidden');
  }, 2000);
};

// all pet card load to api funtion
allCardLoad();

// active btn disable active
const ditactiveBtn=()=>{
 const buttons = document.getElementsByClassName('category-btn');
 for(let btn of buttons){
  btn.classList.remove("rounded-full");
  btn.classList.add('rounded-lg')
 }
};

// load daynamically data to categoryli
const loadCategoryCard = async (category, id) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${category}`
  );
  const data = await response.json();
  // category btn ditactive function call
  ditactiveBtn();
  // category btn active class
  const clickBtn = document.getElementById(`btn-${id}`)
  clickBtn.classList.add("rounded-full");
  clickBtn.classList.remove('rounded-lg');

  
  const  cardcontainer= document.getElementById('card-container')
    const timer = 3000;
    const intervaltimer = 1000;
  
    let divid = timer / intervaltimer;
     
    const intervalId = setInterval(()=> {
      
        cardcontainer.innerHTML= ` 
        <div class="col-span-3 text-center" id="loader">
         <span  class="loading loading-dots loading-lg"></span>
        </div>
        `
        
      divid -= 1;
    }, intervaltimer);

  setTimeout(() => {
    displayAllPets(data.data);
    clearInterval(intervalId);
  },timer);

};
// display all pet card function
const displayAllPets = (petsArr) => {

  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  if (petsArr.length === 0) {
    cardContainer.classList.remove("grid");
    cardContainer.innerHTML = `
              <div class="flex flex-col bg-purple-200 py-16 rounded-lg items-center justify-center text-center">
            <img class="" src="images/error.webp" alt="">
            <h2 class=" font-extrabold text-2xl text-black ">No Information Available</h2>
            <p class=" font-bold text-sm">We're sorry, but the item you're trying to purchase is <br> currently out of stock or unavailable.</p>
          </div>
    `;
  } else {
    cardContainer.classList.add("grid");
  }

  petsArr.forEach((pet) => {
    const card = document.createElement("div");
    card.innerHTML = `
      <!-- temp card -->
                    <!-- daynamic card append to api -->
                    <div class="pet-card card border border-gray-300 rounded-lg p-4">
                      <figure class="">
                        <img
                          src="${pet.image}"
                          alt="Shoes"
                          class="rounded-xl" />
                      </figure>
                      <div class=" mt-4">
                        <h2 class="font-extrabold text-xl text-black mb-2">${
                          pet.pet_name
                        }</h2>
                        <p class="ftext-base text-gray-400"><i class="fa-solid fa-grip-vertical"></i>&nbsp; Breed: ${
                          pet.breed ? `${pet.breed}` : "Unknown"
                        }</p>
                        <p class="text-base text-gray-400"><i class="fa-regular fa-calendar"></i>&nbsp; Birth: ${
                          pet.date_of_birth ? `${pet.date_of_birth}` : "Unknown"
                        }</p>
                        <p class="text-base text-gray-400"><i class="fa-solid fa-mercury"></i>&nbsp; Gender: ${
                          pet.gender ? `${pet.gender}` : "Unknown"
                        }</p>
                        <p class="text-base text-gray-400"><i class="fa-solid fa-dollar-sign"></i>&nbsp; Price:&nbsp;<span>${
                          pet.price ? `${pet.price}$` : "Not available"
                        }</p>
                        <hr class="border bottom-1 mt-3 border-gray-400 border-opacity-20">
                        <div class="flex justify-between items-center mt-3">
                          <button onclick="sideDivImgShow('${pet.image}')" class="btn bg-white hover:border-[#0E7A81] hover:bg-white border border-1 border-[#0E7A81] border-opacity-20"><i class="fa-regular fa-thumbs-up"></i>
                          </button>

                          <button onclick="openModal()" id="adopt" class="adoption-btn btn bg-white text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white border border-1 font-bold text-base border-[#0E7A81] border-opacity-20">Adopt</button>

                          <button onclick="modalOpener('${pet.petId}')" class="btn bg-white text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white border border-1 
                          border-[#0E7A81] border-opacity-20 font-bold text-base">Details</i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <!-- temp card end -->
    `;
    cardContainer.append(card);
  });
};

// side bar photo shower fucntion 
const sideDivImgShow= (image)=>{
  const sideDiv = document.getElementById('photo-show');
  const photo = document.createElement('div');
  photo.innerHTML = `
  <div>
  <img class="rounded-xl w-full" src ="${image}" alt="">
  </div>
  `
  sideDiv.appendChild(photo);
};

// pet ditails modal function
const modalOpener = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${id}`
  );
  const data = await res.json();
  const petsArray = data.petData;
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
  <dialog id="my_modal_1" class="modal">
          <div class="modal-box p-5 flex flex-col">
            <!-- pet img div -->
            <div class="w-full h-[250px]">
              <img class="w-full h-full rounded-xl" src="${petsArray.image}" alt="">
            </div>
            <!-- pet information div -->
            <div class="mt-4">
                <h2 class="font-extrabold text-xl text-black mb-2">${
                  petsArray.pet_name
                }</h2>
                <div class="flex gap-5">
                  <div>
                    <p class="ftext-base text-gray-400"><i class="fa-solid fa-grip-vertical"></i>&nbsp; Breed: ${
                      petsArray.breed ? `${petsArray.breed}` : "Uknown"
                    }</p>
                  <p class="text-base text-gray-400"><i class="fa-solid fa-mercury"></i>&nbsp; Gender: ${
                    petsArray.gender ? `${petsArray.gender}` : "Uknown"
                  }</p>
                  <p class="text-base text-gray-400"><i class="fa-solid fa-mercury"></i>&nbsp; Vaccinated status: ${
                    petsArray.vaccinated_status
                      ? `${petsArray.vaccinated_status}`
                      : "Uknown"
                  }</p>
                  </div>
                  <div>
                    <p class="text-base text-gray-400"><i class="fa-regular fa-calendar"></i>&nbsp; Birth: ${
                      petsArray.date_of_birth
                        ? `${petsArray.date_of_birth}`
                        : "Uknown"
                    }</p>
                  <p class="text-base text-gray-400"><i class="fa-solid fa-dollar-sign"></i>&nbsp; Price:&nbsp;<span>${
                    petsArray.price ? `${petsArray.price}` : "0"
                  }</span>&nbsp;<i class="fa-solid fa-dollar-sign text-sm"></i></p>
                  </div>
                </div>
            </div>
            <hr class="border mt-3 bottom-1 border-gray-400 border-opacity-20">
            <!-- pet desciption div -->
             <div class="mt-4">
              <h2 class="font-extrabold text-lg text-black">Details information</h2>
              <div class="text-base">
                <p>${
                  petsArray.pet_details
                    ? `${petsArray.pet_details}`
                    : "NO details Availabel"
                }</p>
              </div>
             </div>
            <div class="modal-action">

              <form method="dialog" class="w-full items-center flex justify-center">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn w-full font-bold text-lg bg-[#0E7A81] bg-opacity-15 hover:bg-[#0E7A81] hover:bg-opacity-10 text-[#0E7A81] border border-[#0E7A81] border-opacity-20">Close</button>
              </form>
            </div>
          </div>
        </dialog>
  `
  my_modal_1.showModal()
};


// adoption btn modal js

const openModal = ()=> {
  const modal = document.getElementById('my_modal_5');
  modal.showModal();

  document.getElementById('modal-content').innerHTML = `
  <div class="flex flex-col items-center justify-center">
    <div class="w-12 h-12 animate-bounce"><img class="w-full h-full" src="images/handshake.png" alt=""></div>
    <h3 class="text-3xl font-extrabold">Congrats</h3>
  </div>  
  `;
  // document.getElementById('close-btn').classList.remove('hidden');
  document.getElementById('countdown').classList.add('hidden');
  document.getElementById('countdown').textContent = '';

  const modalContent = document.getElementById('modal-content');
  const adoption = document.createElement('p')
  adoption.innerHTML=`
  <p class="text-base font-bold mt-3">Adoption start! Please wait few second.</p>
  `
  modalContent.appendChild(adoption);
  let countdownElement = document.getElementById('countdown');
  countdownElement.classList.remove('hidden');
  let countdown = 3;

  countdownElement.textContent = `${countdown}`;

  const interval = setInterval(function () {
      countdown--;
      if (countdown > 0) {
          countdownElement.textContent = `${countdown}`;
      } else {
          clearInterval(interval);
          document.getElementById('my_modal_5').close();
          
      }
  }, 1000);
};

