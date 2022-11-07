function displayRecipes(recipes) {
    const listRecipesSection = document.getElementById('list-recette-section');
    //create and display each article since factory
    recipes.forEach((recipe) => {
        console.log(recipe);
        const recipeModel = recipesFactory(recipe);
        console.log(recipeModel);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        console.log(recipeCardDOM);
        listRecipesSection.appendChild(recipeCardDOM);
    });
};

function init() {
    console.log(recipes);
    displayRecipes(recipes);
};
//init ellen page
init();