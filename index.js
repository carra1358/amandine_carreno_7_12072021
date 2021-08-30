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
const selectUstensils = document.getElementById("search_ustensils");
const searchIngredients = document.getElementById("search_ingredients");
const loadIngredients = document.getElementById("load_ingredients");
const tags = document.getElementById("tags");

// START CODE

fetch("./recipes.json")
.then(resp => resp.json())
.then((recipesJSON) => {

const data = recipesJSON.recipes;
let renderAll;

class Filter {
    constructor(data){
        this.recipes = data;
        this.ingredients = [];
        this.selectedIngredients = [];
        this.appliances = [];
        this.ustensils =[];
        this.query = null;
        this.tagResult= [];
        this.result = [];
    }

filterWithSearchBar(query){
   this.query = query;


       if(this.query.length >= 3){
        this.result = this.recipes.filter((r) =>  
         r.name.toLowerCase().includes(query) || r.description.toLowerCase().split(" ").includes(query)// manque pour les ingrédients: n'arrive pas a accéder [obj.value]
             );

           if(this.result.length > 0){
               let i = this.result.map(r => r.ingredients.map(ingredients => ingredients.ingredient.toLowerCase()));
                i = i.reduce(function(a,b){ return [...a,...b]});
                i = new Set([...i])
                this.ingredients = [...i];

               this.appliances = this.result.map(r => r.appliance);
               this.ustensils = this.result.map(u => u.ustensils);
           }
            
       }
}
filterWithAdvancesdSearchBar(arr,requete){
     return arr.filter(el =>  el.toLowerCase().indexOf(requete.toLowerCase()) !== -1);
}

addOrRemove(tagName){
    
    if(this.selectedIngredients.includes(tagName)){
    this.selectedIngredients = this.selectedIngredients.filter(t => t !== tagName);
    this.ingredients.push(tagName);
    this.filterWithSearchBar(this.query);
    console.log(this.result);
    if(!this.selectedIngredients.length == 0){
        this.result = this.result.filter(r => {
            const result = r.ingredients.some(i => 
                {  
                    return this.selectedIngredients[this.selectedIngredients.length - 1].includes(i.ingredient.toLowerCase())
                }
                    )    
            return result;
          
        })
    
        let newI = this.result.map(r => r.ingredients.map(ingredients => ingredients.ingredient.toLowerCase()));
        newI = newI.reduce(function(a,b){ return [...a,...b]});
        newI = new Set([...newI])
       this.ingredients = [...newI];
       this.ingredients = this.ingredients.filter( x => !this.selectedIngredients.includes(x));

       }

    }else{
    this.selectedIngredients.push(tagName);

    this.result = this.result.filter(r => {
        const result = r.ingredients.some(i => 
            {  
                return this.selectedIngredients[this.selectedIngredients.length - 1].includes(i.ingredient.toLowerCase())
            }
                )
                
        return result;
      
    })

    let newI = this.result.map(r => r.ingredients.map(ingredients => ingredients.ingredient.toLowerCase()));
    newI = newI.reduce(function(a,b){ return [...a,...b]});
    newI = new Set([...newI])
   this.ingredients = [...newI];
   this.ingredients = this.ingredients.filter( x => !this.selectedIngredients.includes(x));

    }

  


}


     
}


const filter = new Filter(data);


renderAll = data.forEach(el => {
    renderCards(el);
});


searchBar.addEventListener("input", e => {
    const input = e.target.value.toLowerCase().trim();
    filter.filterWithSearchBar(input);
     setTimeout(()=>{if(input == searchBar.value){
    if(input.length >= 4 && filter.result.length > 0){
        renderAll = recipeCardTemplate.innerHTML = ""
        renderAll = filter.result.forEach(el => {
        renderCards(el);
        })
    }else if (filter.result.length <=0 && input.length >= 4){
    advanceSearchResultsAppliance.innerHTML = "";
    advanceSearchResultsIngredients.innerHTML = "";
    advanceSearchResultsUstensils.innerHTML = "";
    renderAll = recipeCardTemplate.innerHTML = "aucun resultat"
    
}else{
    renderAll = recipeCardTemplate.innerHTML = ""
    renderAll = data.forEach(el => {
        renderCards(el)
    })
}    



    }},300)
    
    
   function openSelectIngredients () {
    selectIngredients.addEventListener("click", () => {
        searchIngredients.removeAttribute("placeholder");
        searchIngredients.setAttribute("placeholder", "rechercher un ingrédient");
        loadIngredients.classList.replace("bi-chevron-down", "bi-chevron-up");
        advanceSearchResultsIngredients.innerHTML = "";
        advanceSearchResultsIngredients.innerHTML += `${filter.ingredients.map(r => `<li class="add_tag">${r}</li>`).join("")}`
        advanceSearchResultsIngredients.querySelectorAll(".add_tag").forEach(el => {
    
            el.addEventListener("click", e => {      
            const nameTag = e.target.textContent;
             filter.addOrRemove(nameTag);
             advanceSearchResultsIngredients.innerHTML = "";
            renderAll = recipeCardTemplate.innerHTML = "";
            renderAll = filter.result.forEach(el => renderCards(el));
            tags.innerHTML += `<li class="tag tag_i" data-tag="${nameTag}"><span>${nameTag}</span><i class="bi bi-x-circle" ></i></li>`;
        tags.querySelectorAll(".tag_i").forEach(el => {
         el.addEventListener("click", (e)=> {
             const s = el.getAttribute("data-tag");
             const rt = el;
             console.log(rt)
             console.log(s)
             filter.addOrRemove(s);
             tags.removeChild(el);
             renderAll = recipeCardTemplate.innerHTML = "";
             renderAll = filter.result.forEach(el => renderCards(el));
             
         })  
       }) 



            })
     
        })
      

})


}

openSelectIngredients();




/*  
    advanceSearchByIngredients.addEventListener("input", e => {
        let test = [];
        test = test.concat(...listOfIngredients);
        test = test.map(t => t.toLowerCase().replace(new RegExp(/[èéêë]/g),"e"));
        test = new Set([...test]);
        test = [...test]
       
        let input2 = e.target.value;
    
    
          let testResult = filterWithAdvancesdSearchBar(test,input2);
             testResult = testResult.slice(0,29);
         
        advanceSearchResultsIngredients.innerHTML = "";
        advanceSearchResultsIngredients.innerHTML += `${testResult.map(r => `<li>${r}</li>`).join("")}`
    })
    advanceSearchResultsIngredients.addEventListener("click", e => {
  
     
   })
    */

   

 
});





});




//END CODE

function renderCards (el){
   
  
    return recipeCardTemplate.innerHTML += `
  
     <div class="card card_custom" style="width: 380px;">
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



