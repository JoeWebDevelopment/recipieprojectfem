const querySearch = window.location.search
const recipeSlug = new URLSearchParams(querySearch).get('slug')






const locateRecipe = () =>{

    fetch("data.json")
    .then((response)=>{
        if(!response.ok){
            throw new Error(`Could not load recpies ${response.status}`);
        }
        return response.json();
    })
    .then((recipes) =>{
    console.log(recipes); 

   renderRecipe(recipes)

})
.catch((error) =>{
        console.log("Recpie loading failed:", error);
        
        
});

}

locateRecipe()

const renderRecipe = (recipes) => {

    
    const recipeInfo = recipes.find( recipe => recipe.slug === recipeSlug)

    const recipeName     = document.querySelector('.recipe-name');
   const recipeOverview = document.querySelector('.recipe-desc');
   const recipeCookTime = document.querySelector('.time');
   const recipePrepTime = document.querySelector('.prep-minutes');
   const servings = document.querySelector('.serving-count');
   const recipeSelected = document.querySelector('.recipe-selected')
   const recipeImg = document.querySelector('.recipe-img')
   const ingredientList = document.querySelector('.ingredients-list')
   const instructionsList = document.querySelector('.instructions-list')
   
   document.title = recipeInfo.title;


    if (recipeInfo) {

        console.log(recipeInfo) 
  
  
   recipeSelected.innerText = `Recipes / ${recipeInfo.title}`    
  
   recipeImg.src = recipeInfo.image.large
   
   
   
   recipeName.innerText = recipeInfo.title;
   recipeOverview.innerText = recipeInfo.overview;
   recipeCookTime.innerText = recipeInfo.cookMinutes;
   recipePrepTime.innerText = recipeInfo.prepMinutes;
   servings.innerText = recipeInfo.servings;     


   
   recipeInfo.ingredients.forEach(element => {
        const ingredient = document.createElement('li')
        ingredient.innerText = element
        ingredientList.appendChild(ingredient)
   });
   

   recipeInfo.instructions.forEach(element =>{
    const step = document.createElement('li')
    step.innerText= element
    instructionsList.appendChild(step)
   })

    const relatedCards = recipes.filter((recipe) =>{
        return recipe.id !== recipeInfo.id

    })

 const relatedRecipes = relatedCards.filter((recipe) => Math.abs(recipe.cookMinutes - recipeInfo.cookMinutes) <= 5)
  .slice(0, 3);

    renderRelatedCards(relatedRecipes)


                    

        
    } else {
        recipeName.innerText = `Failed to load recipe: ${error}`
        recipeOverview.innerText = "";
        
    }


    
   
 

    
}

const renderRelatedCards = (relatedRecipes) =>{

    

  const grid = document.querySelector('.related-grid');
  grid.replaceChildren(); 
   relatedRecipes.forEach((recipe) =>{
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
   
}