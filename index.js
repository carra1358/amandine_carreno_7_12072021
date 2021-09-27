//DOM
const recipeCardTemplate = document.getElementById("recipes_wrap");
const searchBar = document.getElementById("search_bar");
const advanceSearchResultsIngredients = document.getElementById("search_and_select_ingredients_results");
const advanceSearchResultsAppliance = document.getElementById("search_and_select_appareil_results");
const advanceSearchResultsUstensils = document.getElementById("search_and_select_ustensils_results");
const advanceSearchByIngredients = document.getElementById("search_ingredients");
const advanceSearchByAppliance = document.getElementById("search_appliances");
const advanceSearchByUstensils = document.getElementById("search_ustensils");
const selectIngredients = document.getElementById("select_ingredients");
const selectUstensils = document.getElementById("select_ustensils");
const selectAppareil = document.getElementById("select_appareil");
const loadIngredients = document.getElementById("load_ingredients");
const loadAppliances = document.getElementById("load_appliances");
const loadUstensils = document.getElementById("load_ustensils");
const tags = document.getElementById("tags");

// START CODE

fetch("./recipes.json")
.then(resp => resp.json())
.then((recipesJSON) => {

const data = recipesJSON.recipes;

class Filter {
    constructor(data){
        this.recipes = data;
        this.ingredients = [...this.i];
        
        this.selectedIngredients = [];
        this.selectedAppliances = [];
        this.selectedUstensils = [];
        this.appliances = [];
        this.ustensils =[];
        this.query = null;
        this.result = [];
    }
    get i (){
        let i = this.recipes.map(r => r.ingredients.map(ingredients => ingredients.ingredient.toLowerCase()));
        i = i.reduce(function(a,b){ return [...a,...b]});
        i = new Set([...i])
        this.ingredients = [...i];
      return this.ingredients}



filterWithSearchBar(query){
   this.query = query;


       if(this.query.length >= 3){
        this.result = this.recipes.filter((r) =>  
        r.name.toLowerCase().includes(query) || r.description.toLowerCase().split(" ").includes(query)|| r.ingredients.find(i => i.ingredient.toLowerCase().includes(query))
        
             ); 
             

           if(this.result.length > 0){
               this.ingredients = this.result.map(r => r.ingredients.map(ingredients => ingredients.ingredient.toLowerCase()));
                this.ingredients = reduce(this.ingredients);
                
              
               

               this.appliances = this.result.map(r => r.appliance);
               this.appliances = new Set([...this.appliances]);
               this.appliances = [...this.appliances];
               
               this.ustensils = this.result.map(u => u.ustensils);
               this.ustensils = reduce(this.ustensils);
              
           }
            
       }
}
filterWithAdvancesdSearchBar(arr,requete){
     return arr.filter(el =>  el.toLowerCase().indexOf(requete.toLowerCase()) !== -1);
}



addOrRemoveAppliance(tagName){

if(this.selectedAppliances.includes(tagName)){
    this.selectedAppliances = this.selectedAppliances.filter(t => t !== tagName);
    this.appliances.push(tagName);
    this.filterWithSearchBar(this.query)
     
    if(!this.selectedAppliances.length == 0){
        this.result = this.result.filter(r => {
            const result = this.selectedAppliances[this.selectedAppliances.lengths -1].includes(r.appliance).toLowerCase()
        
            return result
        }) 
        
    }
    
}else{
    this.selectedAppliances.push(tagName);
   
    this.result = this.result.filter(r => {
     
    const t = r.appliance.toLowerCase().includes(this.selectedAppliances[this.selectedAppliances.length - 1].toLowerCase());
    return t
    }) 
}
this.appliances = this.result.map(r => r.appliance);
this.appliances = this.appliances.filter(x => !this.selectedAppliances.includes(x))
}

    addOrRemoveUstensils(tagName){
      
        if(this.selectedUstensils.includes(tagName)){
            this.selectedUstensils = this.selectedUstensils.filter(t => t !== tagName);
            this.ustensils.push(tagName);
            this.filterWithSearchBar(this.query)
             
            if(!this.selectedUstensils.length == 0){
                this.result = this.result.filter(r => {
    
                   
                   const tu = r.ustensils.some(u => {
                       
                       return this.selectedUstensils[this.selectedUstensils.length - 1].includes(u)
                   })
                  
                   return tu
                   
                   }) 
                
            }
            
        }else{
            this.selectedUstensils.push(tagName);
            this.result = this.result.filter(r => {
    
               const tu = r.ustensils.some(u => {
                  
                   return this.selectedUstensils[this.selectedUstensils.length - 1].includes(u)
               })
        
               return tu
               
               }) 
        }
        this.ustensils = this.result.map(u => u.ustensils);
        this.ustensils = reduce(this.ustensils);
        this.ustensils= this.ustensils.filter(x => !this.selectedUstensils.includes(x))
        
        }

addOrRemoveIngredient(tagName){
    
    if(this.selectedIngredients.includes(tagName)){
    this.selectedIngredients = this.selectedIngredients.filter(t => t !== tagName);
    this.ingredients.push(tagName);
    this.filterWithSearchBar(this.query);

    if(!this.selectedIngredients.length == 0){
        this.result = this.result.filter(r => {
            const result = r.ingredients.some(i => 
                {  
                    return this.selectedIngredients[this.selectedIngredients.length - 1].includes(i.ingredient.toLowerCase())
                }
                    )    
            return result;
          
        })
    
        this.ingredients = this.result.map(r => r.ingredients.map(ingredients => ingredients.ingredient.toLowerCase()));
        this.ingredients = reduce(this.ingredients);
        
        console.log(this.test)
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

   this.ingredients = this.ingredients.filter( x => !this.selectedIngredients.includes(x));

    }

}


     
}


const filter = new Filter(data);



// Appeler renderResult au lieux de renderAll =
function renderResult (x){
    recipeCardTemplate.innerHTML = "";
    x.forEach(el => {
  return  renderCards(el);
});
}


renderResult(filter.recipes);

function getTagsIngredient(){
    advanceSearchResultsIngredients.querySelectorAll(".add_tag").forEach(el => {
        
        el.addEventListener("click", e => {      
        const nameTag = e.target.textContent;
         filter.addOrRemoveIngredient(nameTag);
         advanceSearchResultsIngredients.innerHTML = "";
         recipeCardTemplate.innerHTML = "";
        renderResult(filter.result)
        tags.innerHTML += `<li class="tag tag_i" data-tag="${nameTag}"><span>${nameTag}</span><i class="bi bi-x-circle" ></i></li>`;
        tags.querySelectorAll(".tag").forEach(el => {
            el.addEventListener("click", ()=> {
                const s = el.getAttribute("data-tag");
                filter.addOrRemoveIngredient(s);
                tags.removeChild(el);
                recipeCardTemplate.innerHTML = "";
                renderResult(filter.result);
                
                
            })  
          }) 
        })
    })
    
}
function getTagsUstensils(){
    advanceSearchResultsUstensils.querySelectorAll(".add_tag").forEach(el => {

        el.addEventListener("click", e => {      
        const nameTag = e.target.textContent;
         filter.addOrRemoveUstensils(nameTag);
         advanceSearchResultsUstensils.innerHTML = "";
        recipeCardTemplate.innerHTML = "";
        renderResult(filter.result);
        tags.innerHTML += `<li class="tag tag_u" data-tag="${nameTag}"><span>${nameTag}</span><i class="bi bi-x-circle" ></i></li>`;
    tags.querySelectorAll(".tag").forEach(el => {
     el.addEventListener("click", ()=> {
         const su = el.getAttribute("data-tag");
         filter.addOrRemoveUstensils(su);
         tags.removeChild(el);
          recipeCardTemplate.innerHTML = "";
          renderResult(filter.result);

         
     })  
   }) 



        })

 
 })

}
function getTagsAppliances(){
    advanceSearchResultsAppliance.querySelectorAll(".add_tag").forEach(el => {
    
        el.addEventListener("click", e => {      
        const nameTag = e.target.textContent;
         filter.addOrRemoveAppliance(nameTag);
         advanceSearchResultsAppliance.innerHTML = "";
        renderAll = recipeCardTemplate.innerHTML = "";
        renderAll = filter.result.forEach(el => renderCards(el));
        tags.innerHTML += `<li class="tag tag_a" data-tag="${nameTag}"><span>${nameTag}</span><i class="bi bi-x-circle" ></i></li>`;
    tags.querySelectorAll(".tag").forEach(el => {
     el.addEventListener("click", ()=> {
         const sa = el.getAttribute("data-tag");
         filter.addOrRemoveAppliance(sa);
         tags.removeChild(el);
         recipeCardTemplate.innerHTML = "";
         renderResult(filter.result);
         
     })  
   }) 



        })

 
 })

}



advanceSearchByIngredients.addEventListener("input",e => {
    const input = e.target.value.toLowerCase().trim();
    const i = filter.ingredients;
    const result = filter.filterWithAdvancesdSearchBar(i,input);
    advanceSearchResultsIngredients.innerHTML = "";
    advanceSearchResultsIngredients.innerHTML += `${result.map(r => `<li class="add_tag">${r}</li>`).join(" ")}`;
    
})

advanceSearchByUstensils.addEventListener("input",e => {
    const input = e.target.value.toLowerCase().trim();
    const u = filter.ustensils;
    const result = filter.filterWithAdvancesdSearchBar(u,input);
   
    advanceSearchResultsUstensils.innerHTML = "";
    advanceSearchResultsUstensils.innerHTML += `${result.map(r => `<li class="add_tag">${r}</li>`).join(" ")}`;
   getTagsUstensils();
    
})

advanceSearchByAppliance.addEventListener("input",e => {
    const input = e.target.value.toLowerCase().trim();
    const a = filter.appliances;
    const result = filter.filterWithAdvancesdSearchBar(a,input);
   
    advanceSearchResultsAppliance.innerHTML = "";
    advanceSearchResultsAppliance.innerHTML += `${result.map(r => `<li class="add_tag">${r}</li>`).join(" ")}`;
   getTagsAppliances();

    
})

searchBar.addEventListener("input", e => {
    const input = e.target.value.toLowerCase().trim();
    filter.filterWithSearchBar(input);
     setTimeout(()=>{if(input == searchBar.value){
    if(input.length >= 4 && filter.result.length > 0){
        recipeCardTemplate.innerHTML = ""
        renderResult(filter.result);
       console.log(filter.test)
    }else if (filter.result.length <=0 && input.length >= 4){
    advanceSearchResultsAppliance.innerHTML = "";
    advanceSearchResultsIngredients.innerHTML = "";
    advanceSearchResultsUstensils.innerHTML = "";
    recipeCardTemplate.innerHTML = "aucun resultat"
    
}else{
    recipeCardTemplate.innerHTML = "";
    renderResult(filter.result);
}    



    }},300)
    // select ustensils tags
    function openSelectUstensils(){
        selectUstensils.addEventListener("click", () => {
            advanceSearchByUstensils.removeAttribute("placeholder");
            advanceSearchByUstensils.setAttribute("placeholder", "rechercher un ustensil");
            loadUstensils.classList.replace("bi-chevron-down", "bi-chevron-up");
            advanceSearchResultsUstensils.innerHTML = "";
            advanceSearchResultsUstensils.innerHTML += `${filter.ustensils.map(r => `<li class="add_tag">${r}</li>`).join(" ")}`;
            getTagsUstensils();
           
     

})

    }
    
    // select ingredients tags

    function openSelectIngredients () {
        selectIngredients.addEventListener("click", () => {
            advanceSearchByIngredients.removeAttribute("placeholder");
            advanceSearchByIngredients.setAttribute("placeholder", "rechercher un ingrédient");
            loadIngredients.classList.replace("bi-chevron-down", "bi-chevron-up");
            advanceSearchResultsIngredients.innerHTML = "";
            advanceSearchResultsIngredients.innerHTML += `${filter.ingredients.map(r => `<li class="add_tag">${r}</li>`).join(" ")}`
            
           getTagsIngredient();
           console.log(filter.test)
})



}
// Select appareils tags 

function openSelectAppliances () {
    selectAppareil.addEventListener("click", () => {
        advanceSearchByAppliance.removeAttribute("placeholder");
        advanceSearchByAppliance.setAttribute("placeholder", "rechercher un appareil");
        loadAppliances.classList.replace("bi-chevron-down", "bi-chevron-up");
        advanceSearchResultsAppliance.innerHTML = "";
        advanceSearchResultsAppliance.innerHTML += `${filter.appliances.map(r => `<li class="add_tag">${r}</li>`).join("")}`
       getTagsAppliances();
       

 

})





}

openSelectUstensils();

openSelectAppliances();

openSelectIngredients();


 
});





});




//END CODE



function reduce(t){
    t = t.reduce(function(a,b){ return [...a,...b]});
      t = new Set([...t]);
     t = [...t];
     return t;
}

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


