

// ------------------- Les variables
const gallery = document.querySelector('.gallery ');
const filternav = document.querySelector('#filterproject');
const projetitle = document.querySelector('#project-title')
const modalgallery = document.querySelector('.modal-gallery');
const containermodal = document.querySelector('#container-modal');
const closemodalbtn = document.querySelector('.fa-xmark');
console.log(closemodalbtn);
const headerbanner = document.querySelector('#banner-editmode');
const login = document.querySelectorAll('li');
const btnnavlogin = login[2];
const token ='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODc5NjczMiwiZXhwIjoxNzE4ODgzMTMyfQ.ae07vOdnJCfTf3kMJRZ9T-YdxQyE-4Jc5T2RN5pYK7w';
console.log(token);


async function init(){
    
    const connected =  localStorage.getItem('token');
    
    if(connected){
        console.log('connecté');
        getWorks()
        loopGalleryworks()
        //getWorksmodal()
        galleryWorksmodal()
        
        bannerEdit()
        openModal()
        closeModal()
        logOut()
        window.localStorage.removeItem('token');
        
    }
    else{
        
        getWorks()
        loopGalleryworks()
        galleryCategory()
        getCategory()
        filterProjects()
        logIn()
        
        console.log('disconected');
    }
    
}
init()

//------------------- Se diriger vers page deconnexion ----------------------
function logIn(){
    btnnavlogin.addEventListener('click',function(e){
        console.log(e);
        window.location.href= "../login.html"
    });
};
function logOut(){
    btnnavlogin.textContent='logout'
    btnnavlogin.addEventListener('click',function(e){
        console.log(e);
        window.location.href= "../index.html"
        
        
    });
};    

//-------------------- recupérations des travaux dans l'API 
async function getWorks() {
    const reponse = await fetch("http://localhost:5678/api/works");
    return await reponse.json()
}

//---------------------- récupérations des categories dans l'API
async function getCategory() {
    
    const reponse = await fetch('http://localhost:5678/api/categories');
    
    return await reponse.json();
}


//------------- creation des projets dans le DOM 
async function loopGalleryworks(){
    const works = await getWorks();
    works.forEach(work => {
        galleryWorks(work)
    });
}
async function galleryWorks(work) {
    gallery.innerHTML=""
    
    const figure =
    ` <figure data-id="${work.category.id}">
    <img src=${work.imageUrl} alt="Abajour Tahina">
    <figcaption>${work.title}</figcaption>
    </figure>                                             `
    gallery.insertAdjacentHTML("beforeend", figure);
    
}



//--------------- creation des categories dans le DOM

async function galleryCategory() {
    const categories = await getCategory();
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
        console.log(category);

    });

}

// ------------------- creation du filtre des projets
async function filterProjects() {
    const allWorks = await getWorks();
    const btnfilter = document.querySelectorAll('.filter-item');
    console.log(btnfilter);
    btnfilter[0].classList.add('filter-itemactive')
    btnfilter.forEach(e => {
        e.addEventListener('click', function () {
// ------------------- changer la class des buttons ------------
            btnfilter.forEach(btn => btn.classList.remove('filter-itemactive'));
            e.classList.add('filter-itemactive');

            
// --------------------- afficher les projets par categories
            gallery.innerHTML = "";
            if (e.id !== "0") {
                const filtercategoryworks = allWorks.filter((work) => work.category.id == e.id);
                filtercategoryworks.forEach((work) => {

                    galleryWorks(work)

                })
            }
            else {
                loopGalleryworks()
            }
        });
    });
}

//------------------------- edit mod----------------------------------

//-------------------------- modale-------------------------

async function galleryWorksmodal() {
    modalgallery.innerHTML=""
    const works = await getWorks();
    works.forEach(work => {
        
        const figuremodal =
        ` <figure class="figure-modal" data-id="${work.category.id}">
        <img src=${work.imageUrl} alt="Abajour Tahina">
        <i class="fa-solid fa-trash-can" id=${work.id}></i>
        </figure>                                             `
        modalgallery.insertAdjacentHTML("beforeend", figuremodal);
        console.log(work.id);
    });
    deleTeproject()   
    
}
//------------------  delete project ----------------------------

 function deleTeproject(){
    const trashbtn =document.querySelectorAll('.fa-trash-can');
    console.log(trashbtn);
    trashbtn.forEach(e => {
        e.addEventListener('click',function(e){
            const trash = e.target.id;
         fetch('http://localhost:5678/api/works/'+ trash ,{
            method:'DELETE',
            headers: {
                "Content-Type": "application/json",
                'Authorization':token
              },
          }).then(response=>{
            if(!response.ok){
                throw new Error('Erreur de la requête : '+ response.statusText);
            }
            return response.json();
          })
        .then(data=>{
            console.log('Réponse du serveur :', data);

        })
        .catch(error => {
            console.error('Erreur :', error);
          });
            
        })
        
    });
    
     }
     

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
        
    });
};
//openModal()

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
//closeModal()

 

console.log();


