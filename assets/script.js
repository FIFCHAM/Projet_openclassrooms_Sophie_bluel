console.log('hello world');
// ------------------- Les variables
const gallery = document.querySelector('.gallery ');
const filternav = document.querySelector('.filterproject');

//-------------------- recupérations des travaux dans l'API 
async function displayWorks() {
    const reponse = await fetch("http://localhost:5678/api/works");

    return await reponse.json()

}
displayWorks()

//---------------------- récupérations des categories dans l'API
async function displayCategory() {

    const reponse = await fetch('http://localhost:5678/api/categories');

    return await reponse.json();
}
displayCategory()


//------------- creation des projets dans le DOM 
async function getWorks() {
    const works = await displayWorks();
    works.forEach(work => {
        galleryWorks(work)
    });
}
getWorks()

function galleryWorks(work) {
    const figure =
        ` <figure data-id="${work.category.id}">
           <img src=${work.imageUrl} alt="Abajour Tahina">
           <figcaption>${work.title}</figcaption>
           </figure>                                             `
    gallery.insertAdjacentHTML("beforeend", figure);

}


//--------------- creation des categories dans le DOM

async function galleryCategory() {
    const categories = await displayCategory();
    categories.forEach(category => {
        const filteritem =
            `<ul class="filter-item" id="${category.id}">
            ${category.name}
            </ul>
            `
        filternav.insertAdjacentHTML("beforeend", filteritem);
        console.log(category);

    });

}
galleryCategory()

// ------------------- creation du filtre des projets
async function filterProjects() {
    const allWorks = await displayWorks();
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
                getWorks()
            }
        });
    });
}
filterProjects()

