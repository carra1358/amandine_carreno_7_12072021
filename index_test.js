//DOM
const recipeCardTemplate = document.getElementById("recipes_wrap");
const searchBar = document.getElementById("search_bar");
const advanceSearchResultsIngredients = document.getElementById("search_and_select_ingredients_results");
const advanceSearchResultsAppliance = document.getElementById("search_and_select_appareil_results");
const advanceSearchResultsUstensils = document.getElementById("search_and_select_ustensils_results");
const advanceSearchByIngredients = document.getElementById("search_ingredients");
const advanceSearchByAppliance = document.getElementById("search_appliances");
const advanceSearchByUstensils = document.getElementById("search_ustensils");
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
        this.appliances = [...this.a];
        this.ustensils =[...this.u];
        this.selectedIngredients = [];
        this.selectedUstensils = [];
        this.selectedAppliances = [];
        this.query = null;
        this.result = [];
    }
    get i (){
        let i = this.recipes.map(r => r.ingredients.map(ingredients => ingredients.ingredient.toLowerCase()));
        i = i.reduce(function(a,b){ return [...a,...b];});
        i = new Set([...i]);
        this.ingredients = [...i];
       return this.ingredients;
    }

    get u (){
        let u = this.recipes.map(r => r.ustensils);
        u = u.reduce(function(a,b){ return [...a,...b];});
        u = new Set([...u]);
        this.ustensils = [...u];
      return this.ustensils;
    }
    get a (){
        let a = this.recipes.map(r => r.appliance);
        a = new Set([...a]);
        this.appliances = [...a];
        return a; 
    }
    get allTags (){
        
        return [...this.selectedIngredients,...this.selectedUstensils,...this.selectedAppliances];
    }
  

filterWithSearchBar(query){
   this.query = query;
 
   let data = this.result;
   if(this.result.length == 0){
      data = this.recipes;
   } 
   
  
    this.result = data.filter((r) =>  
    r.name.toLowerCase().includes(query) || r.description.toLowerCase().split(" ").includes(query)|| r.ingredients.find(i => i.ingredient.toLowerCase().includes(query))
    
         ); 
         console.log(this.result);
       
    
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
filterWithAdvancesdSearchBar(arr,requete){
     return arr.filter(el =>  el.toLowerCase().indexOf(requete.toLowerCase()) !== -1);
}

addOrRemoveTag(tagName,type){
    this.allTags;
    if(this[type] !== undefined){
        if (this[type].includes(tagName)) {
            this[type]= this[type].filter(t => t !== tagName);
    
            if(this.allTags.length == 0)
            this.allTags;
            this.result = [];
            this.a; this.i; this.u;
        } else {
            this[type].push(tagName);
        } 
        

    }

}
// permert de revenir a zero et appliquer chaque selected tags un a un
ResetDom(data){
  this.allTags;
  this.result = [];
  renderResult(this[data]);
  this.a ; this.i ; this.u;

}
 

searchWithTag(){
    this.allTags;
    
   

    this.allTags.forEach((tag)=> {
        let data = this.result;
        if(this.result.length == 0){
           data = this.recipes;
        } 
        
        this.result = data.filter(r => {
            let appliances = [r.appliance];
            let ustensils = [...r.ustensils];
            let ingredients = r.ingredients.map(ingredients => ingredients.ingredient);
            this.allTags;

        const result =  [...appliances,...ustensils,...ingredients].some(i => { const z = i.toLowerCase()== tag.toLowerCase(); return z;});
            
            return result;
           
        }); 
            console.log(this.result);
            console.log(this.allTags);
        this.ingredients = this.result.map(r => r.ingredients.map(ingredients => ingredients.ingredient.toLowerCase()));
        this.ingredients = reduce(this.ingredients);
        
      
       

       this.appliances = this.result.map(r => r.appliance);
       this.appliances = new Set([...this.appliances]);
       this.appliances = [...this.appliances];
       
       this.ustensils = this.result.map(u => u.ustensils);
       this.ustensils = reduce(this.ustensils);
    }); 


}






}

const filter = new Filter(data);


function renderResult (x){
    recipeCardTemplate.innerHTML = "";
    x.forEach(el => {
  return  renderCards(el);
});
}


renderResult(filter.recipes);


// Events Tags Ingredients

advanceSearchByIngredients.addEventListener("input",e => {
    const input = e.target.value.toLowerCase().trim();
    const i = filter.ingredients;
    const result = filter.filterWithAdvancesdSearchBar(i,input);
    advanceSearchResultsIngredients.innerHTML = "";
    advanceSearchResultsIngredients.innerHTML += `${result.map(r => `<li class="add_tag">${r}</li>`).join(" ")}`;
    advanceSearchResultsIngredients.querySelectorAll(".add_tag").forEach(el => {
        
        el.addEventListener("click", e => {      
        const nameTag = e.target.textContent;
          filter.addOrRemoveTag(nameTag,"selectedIngredients");
           filter.searchWithTag();
         advanceSearchResultsIngredients.innerHTML = "";
         recipeCardTemplate.innerHTML = "";
        renderResult(filter.result);
        tags.innerHTML += `<li class="tag tag_i" data-tag="${nameTag}"><span>${nameTag}</span><i class="bi bi-x-circle" ></i></li>`;
        tags.querySelectorAll(".tag").forEach(el => {
            el.addEventListener("click", ()=> {
                const s = el.getAttribute("data-tag");
                filter.addOrRemoveTag(s,"selectedIngredients");
                filter.searchWithTag();
                tags.removeChild(el);
                recipeCardTemplate.innerHTML = "";
                renderResult(filter.result);
                if(tags.textContent.trim() === ""){
                     filter.ResetDom("recipes");
                     filter.filterWithSearchBar(searchBar.value.trim());
                     renderResult(filter.result);
                  }
                
                
            });  
          }); 
        });
    });
     
});

// Events Tags Ustensils

advanceSearchByUstensils.addEventListener("input",e => {
    const input = e.target.value.toLowerCase().trim();
    const u = filter.ustensils;
    const result = filter.filterWithAdvancesdSearchBar(u,input);
    advanceSearchResultsUstensils.innerHTML = "";
    advanceSearchResultsUstensils.innerHTML += `${result.map(r => `<li class="add_tag">${r}</li>`).join(" ")}`;
    advanceSearchResultsUstensils.querySelectorAll(".add_tag").forEach(el => {
        
        el.addEventListener("click", e => {      
        const nameTag = e.target.textContent;
          filter.addOrRemoveTag(nameTag,"selectedUstensils");
           filter.searchWithTag();
         advanceSearchResultsIngredients.innerHTML = "";
         recipeCardTemplate.innerHTML = "";
        renderResult(filter.result);
        tags.innerHTML += `<li class="tag tag_u" data-tag="${nameTag}"><span>${nameTag}</span><i class="bi bi-x-circle" ></i></li>`;
        tags.querySelectorAll(".tag").forEach(el => {
            el.addEventListener("click", ()=> {
                const su = el.getAttribute("data-tag");
                filter.addOrRemoveTag(su,"selectedUstensils");
                filter.searchWithTag();
                tags.removeChild(el);
                recipeCardTemplate.innerHTML = "";
                renderResult(filter.result);
                if(tags.textContent.trim() === ""){
                     filter.ResetDom("recipes");
                     filter.filterWithSearchBar(searchBar.value.trim());
                     renderResult(filter.result);
                  }
                
                
            });  
          }); 
        });
    });
     
});

// Events Tags Appliances

advanceSearchByAppliance.addEventListener("input",e => {
    const input = e.target.value.toLowerCase().trim();
    const a = filter.appliances;
    const result = filter.filterWithAdvancesdSearchBar(a,input);
    advanceSearchResultsAppliance.innerHTML = "";
    advanceSearchResultsAppliance.innerHTML += `${result.map(r => `<li class="add_tag">${r}</li>`).join(" ")}`;
    advanceSearchResultsAppliance.querySelectorAll(".add_tag").forEach(el => {
        
        el.addEventListener("click", e => {      
        const nameTag = e.target.textContent;
          filter.addOrRemoveTag(nameTag,"selectedAppliances");
           filter.searchWithTag();
         advanceSearchResultsIngredients.innerHTML = "";
         recipeCardTemplate.innerHTML = "";
        renderResult(filter.result);
        tags.innerHTML += `<li class="tag tag_a" data-tag="${nameTag}"><span>${nameTag}</span><i class="bi bi-x-circle" ></i></li>`;
        tags.querySelectorAll(".tag").forEach(el => {
            el.addEventListener("click", ()=> {
                const sa = el.getAttribute("data-tag");
                filter.addOrRemoveTag(sa,"selectedAppliances");
                filter.searchWithTag();
                tags.removeChild(el);
                recipeCardTemplate.innerHTML = "";
                renderResult(filter.result);
                if(tags.textContent.trim() === ""){
                     filter.ResetDom("recipes");
                     filter.filterWithSearchBar(searchBar.value.trim());
                     renderResult(filter.result);
                  }
                
                
            });  
          }); 
        });
    });
     
});






searchBar.addEventListener("input", e => {
    const input = e.target.value.toLowerCase().trim();
    filter.filterWithSearchBar(input);
    filter.searchWithTag();
     setTimeout(()=>{if(input == searchBar.value){
    if(input.length >= 4 && filter.result.length > 0){
        recipeCardTemplate.innerHTML = "";
        renderResult(filter.result);
    }else if (filter.result.length <=0 && input.length >= 4){
    advanceSearchResultsAppliance.innerHTML = "";
    advanceSearchResultsIngredients.innerHTML = "";
    advanceSearchResultsUstensils.innerHTML = "";
    recipeCardTemplate.innerHTML = "aucun resultat";
    
}else if(filter.selectedAppliances.length > 0 || filter.selectedIngredients.length > 0 || filter.selectedUstensils.length > 0 && input.length == 0){
    filter.ResetDom("recipes");
    recipeCardTemplate.innerHTML = "";
    filter.searchWithTag();
    renderResult(filter.result);
}    



    }},300);

 
});





});




//END CODE



function reduce(t){
    t = t.reduce(function(a,b){ return [...a,...b];});
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
          let unit = i.unit;
          if(typeof unit === "undefined"){
              unit = "";
          }
          if(typeof quantity === "undefined"){
              quantity = "";
          }
           return `<li>${ingredient} : ${quantity} ${unit}</li>`;}).join("")}
        </ul>
        <p id="text_in_card" class="card-text col">${el.description}</p>
    </div>
  
  </div>
  `;
  }



