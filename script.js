


const recipeGrid = document.querySelector('.recipes-grid');
const recipeCard = document.querySelector('.recipe-card');





const locateRecipes = () =>{

    fetch("data.json")
    .then((response)=>{
        if(!response.ok){
            throw new Error(`Could not load recpies ${response.status}`);
        }
        return response.json();
    })
    .then((recipes) =>{
    console.log(recipes); 

        
    const CookTimeSearch = document.querySelector('#cooktime')
const PrepTimeSearch = document.querySelector('#preptime')



    const CookTimeFilter = () =>{
    filterCards()
    }
    const PrepTimeFilter = () =>{
    filterCards()
    }



    CookTimeSearch.addEventListener('change', CookTimeFilter);
    PrepTimeSearch.addEventListener('change', PrepTimeFilter);




   renderCards(recipes)

   const filterCards = () =>{
        
   const cookTime = CookTimeSearch.value
    const prepTime = PrepTimeSearch.value

    console.log(cookTime, prepTime)
    const searchText = searchContent.value.trim().toLowerCase();
    const filteredCards = recipes.filter((recipe) => {
    if(cookTime != "any" && recipe.cookMinutes > Number(cookTime)){
        return false
    }
    if(prepTime != "any" && recipe.prepMinutes > Number(prepTime)){
        return false
    }
    
     if (!recipe.title.toLowerCase().includes(searchText) && !recipe.ingredients.some((ingredient) => ingredient.toLowerCase().includes(searchText))) {
  return false;
}   
 
    
    return true
    
});

renderCards(filteredCards);

};


const searchContent = document.querySelector('#search');

searchContent.addEventListener('input', filterCards)
//    



})


.catch((error) =>{
        console.log("Recpie loading failed:", error);
        const catchError = document.createElement('p')
        catchError.innerText = `Recipe loading failed: ${error}`
        const grid = document.querySelector('.recipes-grid');
        grid.appendChild(catchError)
        
});

}
locateRecipes()


const renderCards = (recipes) =>{

    

  const grid = document.querySelector('.recipes-grid');
  grid.replaceChildren(); 
   recipes.forEach((recipe) =>{
    //    create recipe card
        const recipeCard = document.createElement('article')
        recipeCard.classList.add('recipe-card' , 'col-12', 'col-lg-4' , 'd-flex' , 'flex-column' ,'align-items-center' ,'justify-content-center')
        grid.appendChild(recipeCard)
       const recipeCardInner = document.createElement('div')
        //  create recipe card inner
        recipeCardInner.classList.add('recipe-card-inner', 'py-2','pb-3','px-1','d-flex' ,'flex-column', 'align-items-center', 'justify-content-start', 'gap-2')
        //  create and append recipe image
        let recipeImg = document.createElement('img')
        recipeImg.src = recipe.image.small
        recipeImg.classList.add('recipe-card-img' , 'img-fluid')
        recipeCard.appendChild(recipeCardInner)
        recipeCardInner.appendChild(recipeImg)
        // create recipe information
        const recipeName = document.createElement('h2')
        recipeName.innerText = recipe.title
        recipeName.classList.add('card-heading','align-self-start')
        recipeCardInner.appendChild(recipeName)
        // create overview
        const recipeOverview = document.createElement('p')
        recipeOverview.innerText = recipe.overview
        recipeOverview.classList.add('recipe-description')
        recipeCardInner.appendChild(recipeOverview)
        // create description / details. //
        const descriptionContainer = document.createElement('div')
        descriptionContainer.classList.add('details-container' ,'d-flex' ,'gap-3' ,'flex-wrap' ,'align-self-start')
        recipeCardInner.appendChild(descriptionContainer)
        // Create cook / serving / prep
        // cook
        const cookContainer =  document.createElement('div')
        cookContainer.classList.add('cook', 'align-self-start')
        const cookImg = document.createElement('img')
        const cookTime = document.createElement('p')
        const cookTimeMinutes = document.createElement('span');
        cookTimeMinutes.classList.add('cook-time-count')
        cookImg.src = "assets/images/icon-cook-time.svg"
        cookImg.classList.add('cook-icon');
        cookTime.innerText = "Cook:";
        cookTime.classList.add('mb-0')
        cookTimeMinutes.innerText = recipe.cookMinutes
        cookContainer.append(cookImg, cookTime)
        cookTime.appendChild(cookTimeMinutes)
        recipeCardInner.appendChild(cookContainer)




        // prep container and servings

        const servingContainer =  document.createElement('div')
        servingContainer.classList.add('serving' )
        const servingImg = document.createElement('img')
        const servingCount = document.createElement('p')
        const servingCountNumber = document.createElement('span');
        servingCount.classList.add('serving-count')
        servingImg.src = "assets/images/icon-servings.svg"
        servingImg.classList.add('serving-icon');
        servingCount.innerText = "Servings:";
        servingCount.classList.add('mb-0')
        servingCountNumber.innerText = recipe.servings
        servingContainer.append(servingImg, servingCount)
        servingCount.appendChild(servingCountNumber)
        descriptionContainer.appendChild(servingContainer)

        const prepContainer =  document.createElement('div')
        prepContainer.classList.add('prep')
        const prepImg = document.createElement('img')
        const prepTime = document.createElement('p')
        const prepTimeMinutes = document.createElement('span');
        prepTimeMinutes.classList.add('prep-time-count')
        prepImg.src = "assets/images/icon-prep-time.svg"
        prepImg.classList.add('prep-icon');
        prepTime.innerText = "Prep:";
        prepTime.classList.add('mb-0')
        prepTimeMinutes.innerText = recipe.prepMinutes
        prepContainer.append(prepImg, prepTime)
        prepTime.appendChild(prepTimeMinutes)
        descriptionContainer.appendChild(prepContainer)

        
        //add link button 
        const btnLink = document.createElement('a')
        btnLink.innerText = "View Recipe"
        btnLink.classList.add('btn' ,'pill-btn', 'align-self-stretch', 'btn-primary')
        btnLink.href = `recipe.html?slug=${recipe.slug}`
        recipeCardInner.appendChild(btnLink)
        
        

   });
   if(recipes.length === 0){
            const   noRecipes = document.createElement('p');
         grid.replaceChildren()
         noRecipes.classList.add('no-recipes-error')
        grid.appendChild(noRecipes).innerText = "Sorry, there were no recipes found that met your search"
        }
}



const searchContent = document.querySelector('#search')




