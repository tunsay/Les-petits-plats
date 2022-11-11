//arrays des items des recettes
let ustensilsArray = [];
let applianceArray = [];
let ingredientsArray = [];
let resultRecipes = [];

//array des tags
let ingredientTagsArray = [];
let applianceTagsArray = [];
let ustensilTagsArray = [];

//dom elements
const fields = document.querySelectorAll(".field");
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
const closeTagIcon = document.querySelector(".tag .bi");
const yourResultWord = document.querySelector(".you-have-type-this-research");

//take value of the search bar while type Enter
searchBarRecipe.addEventListener('keyup', (e) => {
    if (e.key != "Enter" || e.target.value.length < 3) return
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
    yourResultWord.append(`Voici le résultat de votre recherche : "${elementHtmlValue}" `)

    document.getElementById('list-recette-section').innerHTML = "";
    ingredientList.innerHTML = "";
    applianceList.innerHTML = "";
    ustensilList.innerHTML = "";

    const resultRecipes = recipes.filter(recipe => { //Récupère chaque Recipe avec filter, ceci est une boucle
        let resultRecipesByName = recipe.name.toLowerCase().includes(elementHtmlValue.toLowerCase()); //vérifie si le recipe name concorde avec la value du input, si oui return la valeur dans resultRecipes
        let resultRecipesByDescription = recipe.description.toLowerCase().includes(elementHtmlValue.toLowerCase());
        let resultRecipesByIngredient = recipe.ingredients.filter(ing => ing.ingredient.toLowerCase().includes(elementHtmlValue.toLowerCase()));
        if (resultRecipesByName || resultRecipesByDescription || resultRecipesByIngredient.length >= 1) {
            return true; //return la valeur puis sors de la fonction
        }
        return false;//Si pas sorti de la fonction return false
    });


    if (resultRecipes == "") {
        document.getElementById('list-recette-section').innerHTML = "Désolé, vos recherches ont rien données !";
    }

    displayRecipes(resultRecipes);
    ustensilsArray = [];
    applianceArray = [];
    ingredientsArray = [];
    createTagsArrays(resultRecipes);
    displayTags();
}

function filterInputFieldByType(inputType, listType, arrayType, e) {
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
        ingredientList.innerHTML = "";
        applianceList.innerHTML = "";
        ustensilList.innerHTML = "";
        displayTags();
    }
}

ulType = document.createElement('ul');

ingredientInput.addEventListener('keyup', (e) => {
    filterInputFieldByType(ingredientInput, ingredientList, ingredientsArray, e)
});

applianceInput.addEventListener('keyup', (e) => {
    filterInputFieldByType(applianceInput, applianceList, appliancesArray, e)
});

ustensilInput.addEventListener('keyup', (e) => {
    filterInputFieldByType(ustensilInput, ustensilList, ustensilsArray, e)
});


function displayRecipes(recipes) {
    const listRecipesSection = document.getElementById('list-recette-section');
    //create and display each article since factory
    // recipes.forEach((recipe) => {
    //     const recipeModel = recipesFactory(recipe);
    //     const recipeCardDOM = recipeModel.getRecipeCardDOM();
    //     listRecipesSection.appendChild(recipeCardDOM);
    // });

    recipes.map((recipe) => {
        const recipeModel = recipesFactory(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        listRecipesSection.appendChild(recipeCardDOM);
    });
};

ingredientField.addEventListener('mouseover', () => {
    document.querySelector(".input-ingredient").setAttribute("placeholder", "Rechercher un ingredient...");
});
applianceField.addEventListener('mouseover', () => {
    document.querySelector(".input-appliance").setAttribute("placeholder", "Rechercher un appliance...");
});
ustensilField.addEventListener('mouseover', () => {
    document.querySelector(".input-ustensil").setAttribute("placeholder", "Rechercher un ustensil...");
});

ingredientField.addEventListener('mouseout', () => {
    document.querySelector(".input-ingredient").setAttribute("placeholder", "Ingredient");
});
applianceField.addEventListener('mouseout', () => {
    document.querySelector(".input-appliance").setAttribute("placeholder", "Appareil");
});
ustensilField.addEventListener('mouseout', () => {
    document.querySelector(".input-ustensil").setAttribute("placeholder", "Ustensil");
});

function createTagsArrays(recipeArray) {
    recipeArray.map((recipe) => {
        //ustenstiles array
        recipe.ustensils.map((ustensil) => {
            ustensilsArray.push(ustensil.toLowerCase());
            ustensilsArray = [...new Set(ustensilsArray)].sort();
        });
        //ingredients array
        let ingredientList = recipe.ingredients.map(a => a.ingredient.toLowerCase());
        ingredientsArray.push(...ingredientList);
        ingredientsArray = [...new Set(ingredientsArray)].sort();
        // appareils array
        applianceArray.push(recipe.appliance.toLowerCase());
        applianceArray = [...new Set(applianceArray)].sort();
    })
}

function displayTags() {
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
    document.getElementById(nameTag).parentElement.remove();
}

//click the tags will do something
function clickTags(htmlElement, typeTag, nameTag) {
    htmlElement.addEventListener('click', (event) => {

        //dom elements
        const ingredientTags = document.querySelector(".ingredient-tags");
        const applianceTags = document.querySelector(".appliance-tags");
        const ustensilTags = document.querySelector(".ustensil-tags");

        let spanTag = document.createElement("span");
        let pTag = document.createElement("span");
        let iconI = document.createElement("i");

        spanTag.classList.add("tag");
        iconI.classList.add("bi", "bi-x-circle");

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
                } else {
                    closeTags(ingredientTagsArray, nameTag)
                    ingredientTagsArray = ingredientTagsArray.filter(e => e.toLowerCase() !== nameTag.toLowerCase());
                }
                break;
                case "appliance":
                    spanTag.classList.add("color-green");
                    if (!applianceTagsArray.includes(nameTag)) {
                        applianceTags.appendChild(spanTag);
                        applianceTagsArray.push(nameTag);
                    } else {
                        closeTags(applianceTagsArray, nameTag);
                        applianceTagsArray = applianceTagsArray.filter(e => e.toLowerCase() !== nameTag.toLowerCase());
                    }
                    break;
                    case "ustensil":
                        spanTag.classList.add("color-red");
                        if (!ustensilTagsArray.includes(nameTag)) {
                            ustensilTags.appendChild(spanTag);
                            ustensilTagsArray.push(nameTag);
                        } else {
                            closeTags(ustensilTagsArray, nameTag);
                            ustensilTagsArray = ustensilTagsArray.filter(e => e.toLowerCase() !== nameTag.toLowerCase());
                        }
                        break;
                        
                        default:
                break;
        }

        console.log(ingredientTagsArray);

        console.log(ingredientTags);
        console.log(event.target.innerText);
    })
}


function init() {
    displayRecipes(recipes);
    createTagsArrays(recipes);
    displayTags();
};

//init ellen page
init();