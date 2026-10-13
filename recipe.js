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
        
    } else {
        recipeName.innerText = "Failed to load recipe"
        recipeOverview.innerText = "";
        
    }


    
   


    
}

