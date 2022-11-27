//arrays of items recipes
let ustensilsArray = [];
let applianceArray = [];
let ingredientsArray = [];
let resultRecipes = recipes;

//array tags
let ingredientTagsArray = [];
let applianceTagsArray = [];
let ustensilTagsArray = [];

//dom elements
const fields = document.querySelectorAll(".field");
const allInput = document.querySelectorAll(".fields .field input");
const ingredientList = document.querySelector(".list-ingredient");
const ingredientField = document.querySelector(".field.color-blue");
const ingredientInput = document.querySelector(".input-ingredient");
const applianceList = document.querySelector(".list-appliance");
const applianceField = document.querySelector(".field.color-green");
const applianceInput = document.querySelector(".input-appliance");
const ustensilList = document.querySelector(".list-ustensil");
const ustensilField = document.querySelector(".field.color-red");
const ustensilInput = document.querySelector(".input-ustensil");
const searchBarRecipe = document.querySelector(".search-recette");
const researchIcon = document.querySelector(".research-bar .bi");
const closeTagIcon = document.querySelector(".tag i");
const yourResultWord = document.querySelector(".you-have-type-this-research");

//Change placeholder when hover
allInput.forEach(input => {
    input.parentElement.parentElement.addEventListener('mouseover', () => {
        input.setAttribute("placeholder", `Rechercher un ${input.name}...`);
    });
});

//Change placeholder when mousout
allInput.forEach(input => {
    input.parentElement.parentElement.addEventListener('mouseout', () => {
        input.setAttribute("placeholder", `${input.name}`);
    });
});

//take value of the search bar while type Enter
searchBarRecipe.addEventListener('keyup', (e) => {
    if (e.key != "Enter" || e.target.value.length < 3) return
    displayResultFromSearchBar(e.target.value);
});

searchBarRecipe.addEventListener('keyup', (e) => {
    if (e.key != "Enter" || e.target.value.length > 2) return
    e.target.value = "";
    displayResultFromSearchBar(e.target.value);
});

//We can also click in the icon search bar
researchIcon.addEventListener('click', () => {
    if (searchBarRecipe.value.length < 3) return
    displayResultFromSearchBar(searchBarRecipe.value);
});

//Display your result after a event, with parameters the element Html Value
function displayResultFromSearchBar(elementHtmlValue) {
    yourResultWord.innerHTML = "";
    if (elementHtmlValue) {
        yourResultWord.style.color = "grey";
        yourResultWord.append(`Voici le résultat de votre recherche : "${elementHtmlValue}" `)
    } else {
        yourResultWord.style.color = "red";
        yourResultWord.append(`Votre résultat doit faire au moins 3 lettres pour rechercher !`)
    }
    updateResultAfterResearch(resultRecipes);
}

ingredientInput.addEventListener('keyup', (e) => {
    filterInputFieldByType(ingredientInput, ingredientList, ingredientsArray, e)
});

applianceInput.addEventListener('keyup', (e) => {
    filterInputFieldByType(applianceInput, applianceList, applianceArray, e)
});

ustensilInput.addEventListener('keyup', (e) => {
    filterInputFieldByType(ustensilInput, ustensilList, ustensilsArray, e)
});

// This function filters tags based on type
function filterInputFieldByType(inputType, listType, arrayType, e) {
    ulType = document.createElement('ul');
    let newArrayType = [];
    switch (inputType) {
        case ingredientInput:
            elementName = "ing";
            typeNameForFrenchText = "ingrédient"
            typeNameUniversal = "ingredient"
            newArrayType = `newIngredientsArray`;
            break;
        case applianceInput:
            elementName = "app";
            typeNameForFrenchText = "appareils"
            typeNameUniversal = "appliance"
            newArrayType = `newAppliancesArray`;
            break;
        case ustensilInput:
            elementName = "ust";
            typeNameForFrenchText = "ustensile"
            typeNameUniversal = "ustensil"
            newArrayType = `newUstensilsArray`;
            break;
        default:
            break;
    }

    if (e.target.value.length > 2) {
        //Clear the ingredient List for put the new list with filter
        listType.innerHTML = "";
        const newArrayType = arrayType.filter(elementName => {
            return elementName.toLowerCase().includes(e.target.value.toLowerCase());
        });

        ulType = document.createElement('ul');

        listType.append(ulType);

        if (newArrayType.length === 0) {
            let p = document.createElement("p");
            p.innerText = `Désolé il n'y a d'${typeNameForFrenchText} sous ce nom, veuillez réitérer votre recherche !`
            listType.append(p)
        }

        newArrayType.map((elementName, i) => { //element, index
            let createLI = document.createElement("li");
            createLI.setAttribute("id", elementName + ": " + i)

            clickTags(createLI, typeNameUniversal, elementName);

            createLI.innerText = elementName;
            ulType.appendChild(createLI);

            return
        });

    } else {
        displayTags();
    }
}

function displayRecipes(recipes) {
    const listRecipesSection = document.getElementById('list-recette-section');
    listRecipesSection.innerHTML = "";
    if (recipes.length === 0) {
        listRecipesSection.innerText = "Vos Recherches ont rien données, essayez de chercher un ingrédient valide !";
    }

    //Display card in the result
    recipes.map((recipe) => {
        const recipeModel = recipesFactory(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        listRecipesSection.appendChild(recipeCardDOM);
    });
};

function createTagsArrays(recipeArray) {
    ustensilsArray = [];
    applianceArray = [];
    ingredientsArray = [];
    recipeArray.map((recipe) => {

        //ustenstiles array
        recipe.ustensils.map((ustensil) => {
            ustensilsArray.push(ustensil.toLowerCase());
            ustensilsArray = [...new Set(ustensilsArray)].sort();
        });
        //Check if the tag, then remove this tag in th array
        removeTagArray(ustensilsArray, ustensilTagsArray);

        //ingredients array
        let ingredientList = recipe.ingredients.map(a => a.ingredient.toLowerCase());
        ingredientsArray.push(...ingredientList);
        removeTagArray(ingredientsArray, ingredientTagsArray);
        ingredientsArray = [...new Set(ingredientsArray)].sort();

        // appareils array
        applianceArray.push(recipe.appliance.toLowerCase());
        removeTagArray(applianceArray, applianceTagsArray);
        applianceArray = [...new Set(applianceArray)].sort();
    })
}

//Remove the tag  when clicked
function removeTagArray(typeArray, typeTagArray) {
    typeTagArray.forEach(element => {
        const index = typeArray.indexOf(element);
        if (index > -1) { // only splice array when item is found
            typeArray.splice(index, 1); // 2nd parameter means remove one item only
        }
    });
}

function displayTags() {
    ingredientList.innerHTML = "";
    applianceList.innerHTML = "";
    ustensilList.innerHTML = "";
    const ulIngredient = document.createElement('ul');
    const ulAppliance = document.createElement('ul');
    const ulUstensil = document.createElement('ul');

    ingredientList.append(ulIngredient);
    applianceList.append(ulAppliance);
    ustensilList.append(ulUstensil);

    ingredientsArray.map((ing, i) => {
        let createLI = document.createElement("li");
        createLI.setAttribute("id", `${ing}-${i}`)

        clickTags(createLI, "ingredient", ing);

        createLI.innerText = ing;
        ulIngredient.appendChild(createLI);
    });

    applianceArray.map((app, i) => {
        let createLI = document.createElement("li");
        createLI.setAttribute("id", `${app}-${i}`)

        clickTags(createLI, "appliance", app);

        createLI.innerText = app;
        ulAppliance.appendChild(createLI);
    });

    ustensilsArray.map((ust, i) => {
        let createLI = document.createElement("li");
        createLI.setAttribute("id", `${ust}-${i}`)

        clickTags(createLI, "ustensil", ust);

        createLI.innerText = ust;
        ulUstensil.appendChild(createLI);
    });
}

//This function close tags with parameters the type of the array tag, and the name of the tag
function closeTags(typeTagArray, nameTag) {
    typeTagArray = typeTagArray.filter(e => e.toLowerCase() !== nameTag.toLowerCase());
    document.getElementById(nameTag).parentElement.remove();
    return typeTagArray;
}

//click the tags will do something
function clickTags(htmlElement, typeTag, nameTag) {
    htmlElement.addEventListener('click', () => {

        //dom elements
        const ingredientTags = document.querySelector(".ingredient-tags");
        const applianceTags = document.querySelector(".appliance-tags");
        const ustensilTags = document.querySelector(".ustensil-tags");

        let spanTag = document.createElement("span");
        let pTag = document.createElement("span");
        let iconI = document.createElement("i");

        spanTag.classList.add("tag");
        iconI.classList.add("bi", "bi-x-circle");

        //Click in the cross to remove the tag
        clickOnCrossForCloseTag(iconI, nameTag);

        pTag.textContent = nameTag;
        pTag.setAttribute("id", nameTag);
        spanTag.appendChild(pTag);
        spanTag.appendChild(iconI);

        switch (typeTag) {
            case "ingredient":
                spanTag.classList.add("color-blue");
                if (!ingredientTagsArray.includes(nameTag)) {
                    ingredientTags.appendChild(spanTag);
                    ingredientTagsArray.push(nameTag);

                    updateResultAfterResearch(resultRecipes);
                }
                break;
            case "appliance":
                spanTag.classList.add("color-green");
                if (!applianceTagsArray.includes(nameTag)) {
                    applianceTags.appendChild(spanTag);
                    applianceTagsArray.push(nameTag);

                    updateResultAfterResearch(resultRecipes);
                }
                break;
            case "ustensil":
                spanTag.classList.add("color-red");
                if (!ustensilTagsArray.includes(nameTag)) {
                    ustensilTags.appendChild(spanTag);
                    ustensilTagsArray.push(nameTag);

                    updateResultAfterResearch(resultRecipes);
                }
                break;

            default:
                break;
        }
    })
}

//This function able to close tag
function clickOnCrossForCloseTag(elementHtml, nameTag) {
    elementHtml.addEventListener('click', (e) => {
        //Get the parent of the parent to the element of cross to display the class name
        switch (e.target.parentElement.classList[1]) {
            case "color-blue":
                ingredientTagsArray = closeTags(ingredientTagsArray, nameTag);
                updateResultAfterResearch(resultRecipes);
                break;
            case "color-green":
                applianceTagsArray = closeTags(applianceTagsArray, nameTag);
                updateResultAfterResearch(resultRecipes);
                break;
            case "color-red":
                ustensilTagsArray = closeTags(ustensilTagsArray, nameTag);
                updateResultAfterResearch(resultRecipes);
                break;
            default:
                break;
        }
    })
}

function updateResultAfterResearch(resultRecipes) {
    //1- Filter resultRecipes by the value of the searchBar
    resultRecipes = recipes.filter(recipe => { //Récupère chaque Recipe avec filter, ceci est une boucle
        let resultRecipesByName = recipe.name.toLowerCase().includes(searchBarRecipe.value.toLowerCase()); //vérifie si le recipe name concorde avec la value du input, si oui return la valeur dans resultRecipes
        let resultRecipesByDescription = recipe.description.toLowerCase().includes(searchBarRecipe.value.toLowerCase());
        let resultRecipesByIngredient = recipe.ingredients.filter(ing => ing.ingredient.toLowerCase().includes(searchBarRecipe.value.toLowerCase()));
        if (resultRecipesByName || resultRecipesByDescription || resultRecipesByIngredient.length >= 1) {
            return true; //return la valeur puis reboucle la fonction
        }
        return false;//Sinon return false.
    });

    //2- TAGS CHECK
    if (applianceTagsArray.length > 0) {

        resultRecipes = resultRecipes.filter(recipe => {
            const resultApplianceTag = applianceTagsArray.filter(apptag => recipe.appliance.toLowerCase().includes(apptag))
            return resultApplianceTag.length
        });

    }

    if (ingredientTagsArray.length > 0) {

        ingredientTagsArray.forEach(ingtag => {
            resultRecipes = resultRecipes.filter(recipe => {
                const resultIngredientTag = recipe.ingredients.filter(ing => ing.ingredient.toLowerCase().includes(ingtag));
                return resultIngredientTag.length
            });
        });

    }

    if (ustensilTagsArray.length > 0) {

        ustensilTagsArray.forEach(usttag => {
            resultRecipes = resultRecipes.filter(recipe => {
                const resultUstensilTag = recipe.ustensils.filter(ust => ust.toLowerCase().includes(usttag));
                return resultUstensilTag.length
            });
        });

    }

    displayRecipes(resultRecipes);
    createTagsArrays(resultRecipes);
    displayTags();
}

//Display all recipes for the begining
function init() {
    displayRecipes(recipes);
    createTagsArrays(recipes);
    displayTags();
};

//init ellen page
init();