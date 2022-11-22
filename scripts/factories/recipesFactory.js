function recipesFactory(data) {
    const { name,ingredients, time, description } = data;

    function getRecipeCardDOM() {

        //Create element
        const article = document.createElement('article'); // create <article></article>
        const divInfosPlat = document.createElement('div');
        const spanImgPlat = document.createElement('span');
        const spanTextRecettePlat = document.createElement('span');
        const spanLeftInfoPlat = document.createElement('span');
        const namesPlatDOM = document.createElement('h3');
        const spanIngredientsList = document.createElement('span');
        const ul = document.createElement('ul');
        const spanRightInfoPlat = document.createElement('span');
        const spanTime = document.createElement('span');
        const icon = document.createElement('i');
        const pDescriptionPlat = document.createElement('p');

        //Add Classes in the element selectionate
        article.classList.add('box-plat');
        divInfosPlat.classList.add('infos-plat');
        spanImgPlat.classList.add('img-plat');
        spanTextRecettePlat.classList.add('text-recette-plat');
        spanLeftInfoPlat.classList.add('left-info-plat');
        spanIngredientsList.classList.add('ingredients-list');
        spanRightInfoPlat.classList.add('right-info-plat');
        spanTime.classList.add('time');
        icon.classList.add('bi', 'bi-clock');
        pDescriptionPlat.classList.add('description-plat');

        //display information in HTML
        namesPlatDOM.textContent = name;

        //Minimize the text of the description
        const maxLength = 200;
        if (description.length <= maxLength) {
            pDescriptionPlat.textContent = description; //If the text does not exceed the maxlength, put this
        } else {
            let descriptionShorten = description.slice(0, maxLength);
            pDescriptionPlat.textContent = descriptionShorten + `...`; //Otherwise put the text here with his limit text
        }

        article.appendChild(divInfosPlat);
        divInfosPlat.append(spanImgPlat, spanTextRecettePlat);
        spanTextRecettePlat.append(spanLeftInfoPlat, spanRightInfoPlat);
        spanLeftInfoPlat.append(namesPlatDOM, spanIngredientsList);
        spanIngredientsList.append(ul);

        //Display all ingredients in the balise <li>
        for (let i = 0; i < ingredients.length; i++) {
            let createLI = document.createElement("li");
            // It is possible that there is no quantity so avoid displaying undefined
            if (!ingredients[i].quantity) {
                ingredients[i].quantity = '';
            }
            // It is possible that there is no unit so avoid displaying undefined
            if (!ingredients[i].unit) {
                ingredients[i].unit = '';
            }
            // Shorten the word
            if (ingredients[i].unit == 'grammes') {
                ingredients[i].unit = 'g';
            }
            if (ingredients[i].unit == 'cuillères à soupe') {
                ingredients[i].unit = 'cuillères';
            }

            createLI.innerText = ingredients[i].ingredient + ': ' + ingredients[i].quantity + ' ' + ingredients[i].unit;
            ul.appendChild(createLI);
        };

        spanRightInfoPlat.appendChild(spanTime);
        spanRightInfoPlat.appendChild(pDescriptionPlat);
        spanTime.append(icon, ' ', time, ' min')

        return (article);

    }
    return {getRecipeCardDOM }
}