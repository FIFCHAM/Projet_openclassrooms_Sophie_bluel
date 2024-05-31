console.log('hello world');

//-------------------- recupérations des travaux dans l'API -------
async function displayWorks(){
    const reponse = await fetch("http://localhost:5678/api/works");
    console.log(reponse);
    const works = await reponse.json();
    console.log(works);
   const Arraycategory = works.map(work => work.category);
   console.log(Arraycategory);
    
creategallery(works);
displayCategory(works)

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
async function displayCategory(works){
    
    const reponse = await fetch('http://localhost:5678/api/categories');
    const categories= await reponse.json();
    console.log(categories);
  categories.unshift({id:4,name:'Tous' })
  
    console.log(categories);
    
    
    for(let i=0 ;i<categories.length;i++){
        const category = categories[i]
    
        const filternav = document.querySelector('.filterproject');
        //filternav.classList.add('fiterproject');

    const filteritem = document.createElement('ul');
    filteritem.innerText=category.name
    filteritem.classList.add('filter-item');
    filternav.appendChild(filteritem);
    const btnfilter = document.querySelectorAll('.filter-item');
    console.log(btnfilter);
    btnfilter.forEach(e => {
        e.addEventListener('click',function(){
            console.log(e);
            console.log(works);
            
            
        })
        
    });

    }
}














