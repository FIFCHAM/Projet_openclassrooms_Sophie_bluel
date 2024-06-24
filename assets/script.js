

// ------------------- Les variables
const gallery = document.querySelector('.gallery ');
// console.log(gallery);
const filternav = document.querySelector('#filterproject');
const projetitle = document.querySelector('#project-title')


// console.log(containeraddphoto);
const closemodalbtn = document.querySelector('.fa-xmark');
// console.log(closemodalbtn);
const headerbanner = document.querySelector('#banner-editmode');
const login = document.querySelectorAll('li');
const btnnavlogin = login[2];
// console.log(token);
const token = localStorage.getItem('token');



async function init(){
    
    
    const connected = token ? true : false;
    
    if(connected){
        // console.log('connecté');
        const works= await getWorks()
       loopGalleryworks(works)
        galleryWorksmodal(works)
        bannerEdit()
        openModal()
        closeModal()
        logOut()
        
    }
    else{
        
        const works= await getWorks()
        loopGalleryworks(works)
    

        const categories=await getCategory()
        galleryCategory(categories)
        filterProjects(works)
        logIn()
        
        // console.log('disconected');
    }
    
}
init()

//------------------- Se diriger vers page deconnexion ----------------------
function logIn(){
    btnnavlogin.addEventListener('click',function(e){
        e.preventDefault()
        // console.log(e);
        window.location.href= "../login.html"
    });
};
function logOut(){
    btnnavlogin.textContent='logout'
    btnnavlogin.addEventListener('click',function(e){
        e.preventDefault()
        // console.log(e);
        window.localStorage.removeItem('token');
        window.location.href= "../index.html"
        
        
    });
};    

//-------------------- recupérations des travaux dans l'API 
async function getWorks() {
    const reponse = await fetch("http://localhost:5678/api/works");
    return  reponse.json()
    
}

//---------------------- récupérations des categories dans l'API
async function getCategory() {
    
    const reponse = await fetch('http://localhost:5678/api/categories');
    
    return reponse.json();
}


//------------- creation des projets dans le DOM 
 async function loopGalleryworks(works){
    
     works.forEach(work => {
        
        galleryWorks(work)
    
    });
    
 }
async function galleryWorks(work) {
        const figure =
        ` <figure class="figure-work" id="${work.id}">
        <img src=${work.imageUrl} alt="Abajour Tahina">
        <figcaption>${work.title}</figcaption>
        </figure>                                             `
        gallery.insertAdjacentHTML("beforeend", figure);
    
}


//--------------- creation des categories dans le DOM

 async function galleryCategory(categories) {
    
    const itemall = `<li class="filter-item" id="0" name="Tous">Tous</li>`
    filternav.insertAdjacentHTML("beforeend",itemall);
    categories.forEach(category => {
        const filteritem =
        `   
        <li class="filter-item" id="${category.id}">
        
        ${category.name}
        </li>
        `;
        

        filternav.insertAdjacentHTML("beforeend", filteritem);
        // console.log(category);

    });

}

// ------------------- creation du filtre des projets
async function filterProjects(works) {
    //const allWorks = await getWorks();
    const btnfilter = document.querySelectorAll('.filter-item');
    // console.log(btnfilter);
    btnfilter[0].classList.add('filter-itemactive')
    btnfilter.forEach(e => {
        e.addEventListener('click', function () {
// ------------------- changer la class des buttons ------------
            btnfilter.forEach(btn => btn.classList.remove('filter-itemactive'));
            e.classList.add('filter-itemactive');

            
// --------------------- afficher les projets par categories
            gallery.innerHTML = "";
            if (e.id !== "0") {
                const filtercategoryworks = works.filter((work) => work.category.id == e.id);
                filtercategoryworks.forEach((work) => {

                    
                    galleryWorks(work)
                })
            }
            else {
                // loopGalleryworks(works)
                loopGalleryworks(works)
            }
        });
    });
}

//------------------------- edit mod----------------------------------

//-------------------------- modale-------------------------
const modalgallery = document.querySelector('.modal-gallery');
const containermodal = document.querySelector('#container-modal');
const modal = document.querySelector('.modal');

async function galleryWorksmodal(works) {
     //modalgallery.innerHTML="";
    
    works.forEach(work => {
        
        const figuremodal =
        ` <figure class="figure-modal" id="${work.id}">
        <img src=${work.imageUrl} alt="Abajour Tahina">
        <i class="fa-solid fa-trash-can" id=${work.id}></i>
        </figure>                                             `
        modalgallery.insertAdjacentHTML("beforeend", figuremodal);
        // console.log(work.id);
    });
    deleTeproject()   
    
}
//------------------  delete project ----------------------------

 async function deleTeproject(){
    const works = await getWorks()
    
    const trashbtn =document.querySelectorAll('.fa-trash-can');
    // console.log(trashbtn);
    trashbtn.forEach(e => {
        e.addEventListener('click',async(e)=>{
            e.preventDefault();
            const trash = e.target.id;
            
            
            const parentremove =e.target.offsetParent;
            console.log(trash);
            const response = await fetch('http://localhost:5678/api/works/'+ trash ,{
                method:'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization':`Bearer ${token}` 
                },
            })
            //   }).then(response=>{
                if(!response.ok){
                    
                    throw new Error('Erreur de la requête : '+ response.statusText);
                }
                else{
                    console.log(response);
                    
                    parentremove.remove()
                }
                
                //removeworkgallery.remove()
            
                //gallery.innerHTML=""
            
            
            
            //return response.json()
        })
        /*.then(data=>{
            console.log('Réponse du serveur :', data);
            
            })*/
           
           
        })
        
    ;
 
}
 console.log();


//------------------ creation de la banniere edit-mode-------
function bannerEdit() {
    headerbanner.classList.add('banner-editmode')
    const modeedit=`<i class="fa-regular fa-pen-to-square">
                        <p>Mode édition</p>
                        </i>`;
headerbanner.insertAdjacentHTML("beforeend",modeedit)                        


}

//----------- creation du btn ouverture de la modale-------------

function openModal(){
    const editbtn= `<a class="edit-btn" >
                    <i class="fa-regular fa-pen-to-square">
                        <p>modifier</p>
                        </i>
                    </a>`;
projetitle.insertAdjacentHTML("beforeend",editbtn);

const btnmodal = document.querySelector(".edit-btn");


    btnmodal.addEventListener('click',function(){
         containermodal.style.display='flex';
        modal.style.display='flex';
        containeraddphoto.style.display='none'
        
    });
};


//------------------- close modal ----------------------------
function closeModal(){
    closemodalbtn.addEventListener('click',function(){
        containermodal.style.display='none'
    });
    containermodal.addEventListener('click',function(e){
        if(e.target === this){
            this.style.display='none'  
        }
        
    });
};


 //------------------------ creation add-photo---------------
 const containeraddphoto = document.querySelector('.container-add-photo');
  function addPhoto(){
const ajoutphoto = `<div class="add-photo">
	<i class="fa-solid fa-arrow-left"></i>
	<i class="fa-solid fa-xmark"></i>
	<h3>Ajout photo</h3>
	<div class="photo-container">
		<i class="fa-regular fa-image"></i>
		<button>+ Ajouter photo</button>
		<p>jpg, png : 4mo max</p>
	</div>
	<form class="form-add" method="post">
		<label for="Titre">Titre</label>
		<input type="text" name="Titre" id="" >
		<label for="Catégorie">Catégorie</label>
		<select name="Catégories" id="">
			<option value="Objets">Objets</option>
			<option value="Appartements">Appartements</option>
			<option value="Hotels & restaurants">Hotels & restaurants</option>
		</select> 
		<hr>
		<button type="submit">Valider</button>
	</form>

</div>
`;
containeraddphoto.insertAdjacentHTML("beforeend",ajoutphoto)

const btnopenaddphoto = document.querySelector('#container-modal button')
    //  console.log(btnopenaddphoto); 
     btnopenaddphoto.addEventListener('click',function(){
         modal.style.display='none';
         containeraddphoto.style.display='block'
    })

returnModaldelete()
closeAllmodals()
 }
 addPhoto()
 

//------------------------- revenir sur modale uppression photo--------------
function returnModaldelete() {
    const returnmodal = document.querySelector('.fa-arrow-left')
    console.log(returnmodal);
    returnmodal.addEventListener('click',function(){
        modal.style.display='flex'
        containeraddphoto.style.display='none'
    })
    
}
function closeAllmodals() {
    const closemodals = document.querySelector('.add-photo .fa-xmark')
    closemodals.addEventListener('click',function(){
        containermodal.style.display='none'
        containeraddphoto.style.display='none'
        modal.style.display='flex'
        
    })
    
}