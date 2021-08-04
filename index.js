//DOM
const recipeCardTemplate = document.getElementById("recipes_wrap");
const searchBar = document.getElementById("search_bar");
const card = recipeCardTemplate.querySelectorAll(".card");
const searchAndSelect = document.getElementById("search_and_select");
const advanceSearchResultsIngredients = document.getElementById("search_and_select_ingredients_results");
const advanceSearchResultsAppliance = document.getElementById("search_and_select_appareil_results");
const advanceSearchResultsUstensils = document.getElementById("search_and_select_ustensils_results");
const advanceSearchByIngredients = document.getElementById("search_ingredients");
const advanceSearchByAppliance = document.getElementById("search_appliances");
const advanceSearchByUstensils = document.getElementById("search_ustensils");
const selectIngredients = document.getElementById("select_ingredients");
const searchIngredients = document.getElementById("search_ingredients");
const chevronIngredients = document.getElementById("open_ingredients_search");

// Fetch 
fetch("./recipes.json")
.then(resp => resp.json())
.then((recipesJson) => {
  const allRecipes = recipesJson.recipes;
  const allIngredients = allRecipes.map(i => i.ingredients.map(i => i.ingredient));
  const allappliance = allRecipes.map(a => a.appliance);
  const allUstensils = allRecipes.map(u => u.ustensils);

 let renderAll = allRecipes.forEach(el => {
      renderCards(el);
  });



  searchBar.addEventListener("input", e => {
    const input = e.target.value.toLowerCase();
    setTimeout(()=> {
     
            if (input.length >= 3){

                const result = allRecipes.filter(r =>  
                    r.name.toLowerCase().includes(input) || r.description.toLowerCase().split(" ").includes(input) || r.ingredients.map(i => i.ingredient.toLowerCase()).includes(input));
               renderAll = recipeCardTemplate.innerHTML = "";
               let newResultIngredients = [];
               let newResultAppliance = [];
               let newResultUstensils = [];

               // recupère les données des champs avancés
               let ingredientsResult = result.map(r => r.ingredients.map(ingredients => ingredients.ingredient.toLowerCase()));
               let applianceResult = result.map(r => r.appliance);
               let ustensilsResult = result.map(r => r.ustensils);

               console.log(result);

               // fait une liste aux valeurs uniques
               
               newResultAppliance = newResultAppliance.concat(...applianceResult);
               newResultAppliance = new Set ([...newResultAppliance]);
               newResultAppliance = [...newResultAppliance];

               newResultUstensils = newResultUstensils.concat(...ustensilsResult);
               newResultUstensils = new Set ([...newResultUstensils]);
               newResultUstensils = [...newResultUstensils];


               newResultIngredients = newResultIngredients.concat(...ingredientsResult);
               newResultIngredients = new Set([...newResultIngredients]);
               newResultIngredients = [...newResultIngredients];
               
               // Affiche le résultat 

               selectIngredients.addEventListener("click", () => {
                searchIngredients.removeAttribute("readonly");
                searchIngredients.removeAttribute("placeholder");
                searchIngredients.setAttribute("placeholder", "rechercher un ingrédient");
                chevronIngredients.classList.replace("bi-chevron-down", "bi-chevron-up");
                searchIngredients.classList.add("open");
                advanceSearchResultsIngredients.innerHTML = "";
               advanceSearchResultsIngredients.innerHTML += `${newResultIngredients.map(r => `<li>${r}</li>`).join("")}`
                
            })
                
               
            
             //  advanceSearchResultsAppliance.innerHTML = "";
            //   advanceSearchResultsAppliance.innerHTML += `${newResultAppliance.map(a => `<li>${a}</li>`).join("")}`
               
            //   advanceSearchResultsUstensils.innerHTML = "";
            //   advanceSearchResultsUstensils.innerHTML += `${newResultUstensils.map(u => `<li>${u}</li>`).join("")}`

            
               
               return renderAll = result.forEach(el => renderCards(el));
              }else{
                advanceSearchResultsAppliance.innerHTML = "";
                advanceSearchResultsIngredients.innerHTML = "";
                advanceSearchResultsUstensils.innerHTML = "";
                renderAll = recipeCardTemplate.innerHTML = "Aucun résultat à votre recherche";}
        
    },350)
  });

  selectIngredients.addEventListener("click", () => {
    if(searchIngredients.classList.contains("open")){
        searchIngredients.setAttribute("readonly","readonly");
        searchIngredients.removeAttribute("placeholder");
        searchIngredients.setAttribute("placeholder", "Ingrédients");
        chevronIngredients.classList.replace("bi-chevron-up", "bi-chevron-down");
        searchIngredients.classList.remove("open");
    }
    searchIngredients.removeAttribute("readonly");
    searchIngredients.removeAttribute("placeholder");
    searchIngredients.setAttribute("placeholder", "rechercher un ingrédient");
    chevronIngredients.classList.replace("bi-chevron-down", "bi-chevron-up");
    searchIngredients.classList.add("open");
})

advanceSearchByIngredients.addEventListener("input", e => {
    let test = [];
    test = test.concat(...allIngredients);
    test = test.map(t => t.toLowerCase().replace(new RegExp(/[èéêë]/g),"e"));
    test = new Set([...test]);
    test = [...test]
   
    let input2 = e.target.value;

    const filtreTexte = (arr, requete) => {
        return arr.filter(el =>  el.toLowerCase().indexOf(requete.toLowerCase()) !== -1);
      }

      let testResult = filtreTexte(test,input2);
         testResult = testResult.slice(0,29);
      
       advanceSearchResultsIngredients.innerHTML = "";
      advanceSearchResultsIngredients.innerHTML += `${testResult.map(r => `<li class="col">${r}</li>`).join("")}`
     
    console.log(filtreTexte(test,input2));
   

})

});





function renderCards (el){
   
  
  return recipeCardTemplate.innerHTML += `

   <div class="card card_custom visible" style="width: 380px;">
  <div class="card-img-top img_custom"></div>
  <div class="card-body">
    <h5 class="card_title"><span class="recipe_name">${el.name}</span><i class="bi bi-clock icon-clock"><span class="minute">${el.time} min</span></i>
    </h5>
    <di id="card_content" class="row">
      <ul id="list_in_card" class="col">
      ${el.ingredients.map((i) => { 
        let ingredient = i.ingredient;
        let quantity = i.quantity;
        let unit = i.unit
        if(typeof unit === "undefined"){
            unit = "";
        }
        if(typeof quantity === "undefined"){
            quantity = "";
        }
         return `<li>${ingredient} : ${quantity} ${unit}</li>`}).join("")}
      </ul>
      <p id="text_in_card" class="card-text col">${el.description}</p>
  </div>

</div>
`
}

function makeSearch (allRecipes){
   
    for(i = 0; i < allRecipes.lenght ; i++){
        if(allRecipes.description.includes(input)){
            card.classList.replace("invisible", "visible")
 
        }else{
            card.classList.replace("visible", "invisible");
        }
    }
    
}

class Recipe {
   constructor(id,name,servings,time,description,appliance,ustensils,ingredients){
       this.id = id,
       this.name = name,
       this.servings = servings,
       this.time = time,
       this.description = description,
       this.appliance = appliance,
       this.ustensils = ustensils,
       this.ingredients = ingredients
   }
} 

/*

                 // recherche par tag
             

  advanceSearchResultsAppliance.addEventListener("click", e => {
    let selectedTag = result.filter(t => t.appliance.includes(e.target.textContent));
    console.log(e.target.textContent)
    rendal = recipeCardTemplate.innerHTML = "";
    renderAll = selectedTag.forEach(el => renderCards(el));
    
});

advanceSearchResultsUstensils.addEventListener("click", e => {
    let selectedTag = result.filter(t => t.ustensils.includes(e.target.textContent));
    console.log(e.target.textContent)
    rendal = recipeCardTemplate.innerHTML = "";
    renderAll = selectedTag.forEach(el => renderCards(el));
})

advanceSearchResultsIngredients.addEventListener("click", e => {
    let selectedTag = result.filter(t => t.ingredients.map(i => i.ingredient.toLowerCase()).includes(e.target.textContent));
    console.log(e.target.textContent)
    rendal = recipeCardTemplate.innerHTML = "";
    renderAll = selectedTag.forEach(el => renderCards(el));
})
 

   
  });
*/