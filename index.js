//DOM
const recipeCardTemplate = document.getElementById("recipes_wrap");
const searchBar = document.getElementById("search_bar");
const card = recipeCardTemplate.querySelectorAll(".card");
// Fetch 
fetch("./recipes.json")
.then(resp => resp.json())
.then((recipesJson) => {
  const allRecipes = recipesJson.recipes;
  console.log(allRecipes);
  let lokkingForIng = allRecipes.map(recipes => recipes.ingredients.map(ingredient => ingredient.ingredient.toLowerCase().split(" ")));
  console.log(lokkingForIng)
 let renderAll = allRecipes.forEach(el => {
      renderCards(el);
  });

  searchBar.addEventListener("keyup", e => {
    const input = e.target.value.toLowerCase();
    console.log(input)
    setTimeout(()=> {
     
            if (input.length >= 3){
                const result = allRecipes.filter(r =>  
                    r.name.toLowerCase().includes(input) || r.description.toLowerCase().split(" ").includes(input) || r.ingredients.map(i => i.ingredient.toLowerCase()).includes(input));
               renderAll = recipeCardTemplate.innerHTML = "";
               let newResult = [];
               let ingredientsResult = result.map(r => r.ingredients.map(ingredients => ingredients.ingredient));
               console.log(newResult.concat(...ingredientsResult));
               return renderAll = result.forEach(el => renderCards(el));
              }else{
                  renderAll = recipeCardTemplate.innerHTML = "Aucun résultat à votre recherche";
              }

        
    },500)
 

   
  });


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
  searchBar.addEventListener("keyup", e => {
    const input = e.target.value.toLowerCase();
    console.log(input)
    setTimeout(()=> {
     
            if (input.length >= 3){
                const result = allRecipes.filter(r => r.name.toLowerCase().includes(input) || r.description.toLowerCase().split(" ").includes(input) || r.ingredients.map(i => i.ingredient).includes(input) );
                console.log(result);
              }else{
                  console.log("no result")
              }

        
    },200)
 

   
  });
*/