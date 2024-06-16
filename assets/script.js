
console.log();
// ------------------- Les variables
const gallery = document.querySelector('.gallery ');
const filternav = document.querySelector('#filterproject');
    async function init(){
        
        const connected =  localStorage.getItem('connected');
        
        if(connected=='true'){
            console.log('connecté');
            getWorks()
            
            loopGalleryworks()
            window.localStorage.setItem('connected','false');
            }
            else{
                //loginPage()
                getWorks()
                loopGalleryworks()
                galleryCategory()
                getCategory()
                filterProjects()

            console.log('disconected');
        }
    
    }
    init()
    

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
    const works = await getWorks()
    works.forEach(work => {
        galleryWorks(work)
})
}
async function galleryWorks(work) {
        const figure =
    ` <figure data-id="${work.category.id}">
    <img src=${work.imageUrl} alt="Abajour Tahina">
    <figcaption>${work.title}</figcaption>
    </figure>                                             `
gallery.insertAdjacentHTML("beforeend", figure);
};




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
const projetitle = document.querySelector('#project-title')
const modalgallery = document.querySelector('.modal-gallery');
const containermodal = document.querySelector('#container-modal');
console.log(containermodal);
const closemodalbtn = document.querySelector('.fa-xmark');
const deletebtn = [...document.querySelectorAll('.fa-trash-can')];
console.log(deletebtn);

async function getWorksmodal() {
    const works = await getWorks();
    works.forEach(work => {
        galleryWorksmodal(work)
    });
}
getWorksmodal();

function galleryWorksmodal(work) {
    const figuremodal =
        ` <figure class="figure-modal" data-id="${work.category.id}">
           <img src=${work.imageUrl} alt="Abajour Tahina">
                      <i class="fa-solid fa-trash-can"></i>
            </figure>                                             `
    modalgallery.insertAdjacentHTML("beforeend", figuremodal);

}
//------------------ open modal-----------------------------
//----------- creation du btn ouverture de la modale-------------
const editbtn= `<a class="edit-btn" >
                    <i class="fa-regular fa-pen-to-square">
                        <p>modifier</p>
                        </i>
                    </a>`;
projetitle.insertAdjacentHTML("beforeend",editbtn);
console.log(editbtn);
const btnmodal = document.querySelector(".edit-btn");
console.log(btnmodal);



function openModal(){
containermodal.style.display='flex';
};
btnmodal.addEventListener('click',openModal);


//------------------- close modal ----------------------------
function closeModal(){
containermodal.style.display='none'
};
closemodalbtn.addEventListener('click',closeModal);
containermodal.addEventListener('click',closeModal);

//------------------  delete project ----------------------------

 async function deleteWork(){
    const works = await getWorks();
    works.forEach(work => {
        
    });


}
deletebtn.forEach(e => {
    e.addEventListener('click',deleteWork);
    console.log(e);
    
});




