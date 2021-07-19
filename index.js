//DOM
const recipeCardTemplate = document.getElementById("recipes_wrap");
// Fetch 
fetch("./recipes.json")
.then(resp => resp.json())
.then((recipesJson) => {
  const allRecipes = recipesJson.recipes;
  console.log(allRecipes);
  allRecipes.forEach(el => {
      renderCards(el);
  });




});




function renderCards (el){
    const allIngredients = el.ingredients;
  
  return recipeCardTemplate.innerHTML += `

   <div class="card card_custom" style="width: 380px;">
  <div class="card-img-top img_custom"></div>
  <div class="card-body">
    <h5 class="card_title"><span class="recipe_name">${el.name}</span><i class="bi bi-clock icon-clock"><span class="minute">${el.time} min</span></i>
    </h5>
    <di id="card_content" class="row">
      <ul id="list_in_card" class="col">
      ${el.ingredients.map((i) => { 
        let quantity = i.quantity;
        let unit = i.unit
        if(typeof unit === "undefined"){
            unit = "";
        }
        if(typeof quantity === "undefined"){
            quantity = "";
        }
         return `<li>${i.ingredient} : ${i.quantity} ${unit}</li>`}).join("")}
      </ul>
      <p id="text_in_card" class="card-text col">${el.description}</p>
  </div>

</div>
`
}