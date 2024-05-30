console.log('hello world');

//-------------------- recupérations des travaux dans l'API -------
async function displayWorks(){
    const reponse = await fetch("http://localhost:5678/api/works");
    console.log(reponse);
    const works = await reponse.json();
    console.log(works);
creategallery(works)
 }
 displayWorks() 
 
 //------------- creation des projet dans le DOM -------------
 function creategallery(works){
    for(let i=0 ;i<works.length;i++){
        console.log(i);
        const project =works[i];
        const gallery = document.querySelector('.gallery ');
        console.log(gallery);
        const figure = document.createElement('figure');
        const imggallery = document.createElement('img');
        imggallery.src = project.imageUrl
        const figcaption = document.createElement('figcaption');
        figcaption.innerText=project.title;
        figure.appendChild(imggallery);
        figure.appendChild(figcaption);
        gallery.appendChild(figure)

}       
}

//----------------- les filtres----------------------------------