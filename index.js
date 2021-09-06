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
let renderAll;

class Filter {
    constructor(data){
        this.recipes = data;
        this.ingredients = [];
        this.selectedIngredients = [];
        this.selectedAppliances = [];
        this.selectedUstensils = [];
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
               this.appliances = new Set([...this.appliances]);
               this.appliances = [...this.appliances];
               
               this.ustensils = this.result.map(u => u.ustensils);
               this.ustensils = this.ustensils.reduce(function(a,b){ return [...a,...b]});
               this.ustensils = new Set([...this.ustensils]);
               this.ustensils = [...this.ustensils];
               console.log(this.ustensils)
           }
            
       }
}
filterWithAdvancesdSearchBar(arr,requete){
     return arr.filter(el =>  el.toLowerCase().indexOf(requete.toLowerCase()) !== -1);
}

addOrRemoveUstensils(){}

addOrRemoveAppliance(tagName){
console.log(this.result)
console.log(tagName)
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
    console.log(this.result)
    this.result = this.result.filter(r => {

     console.log(r.appliance, this.selectedAppliances);
    const t = r.appliance.toLowerCase().includes(this.selectedAppliances[this.selectedAppliances.length - 1].toLowerCase());
    console.log(t)
    return t
    
    }) 
}
this.appliances = this.result.map(r => r.appliance);
this.appliances = this.appliances.filter(x => !this.selectedAppliances.includes(x))
  

}
/*
addOrRemoveUstensils(tagName){
    console.log(this.result)
    console.log(tagName)
    if(this.selectedUstensils.includes(tagName)){
        this.selectedUstensils = this.selectedUstensils.filter(t => t !== tagName);
        this.ustensils.push(tagName);
        this.filterWithSearchBar(this.query)
         
        if(!this.selectedUstensils.length == 0){
            this.result = this.result.filter(r => {

                console.log(r.ustensils, this.selectedUstensils);
               const tu = r.ustensils.toLowerCase().includes(this.selectedUstensils[this.selectedUstensils.length - 1].toLowerCase());
               console.log(tu)
               return tu
               
               }) 
            
        }
        
    }else{
        this.selectedUstensils.push(tagName);
        console.log(this.result)
        this.result = this.result.filter(r => {

            console.log(r.ustensils, this.selectedUstensils);
           const tu = r.ustensils.includes(this.selectedUstensils[this.selectedUstensils.length - 1].toLowerCase());
           console.log(tu)
           return tu
           
           }) 
    }
    this.ustensils = this.result.map(r => r.ustensils);
    this.ustensils = this.ustensils.reduce(function(a,b){ return [...a,...b]});
    this.ustensils = new Set([...this.ustensils]);
    this.ustensils = [...this.ustensils]
    this.ustensils= this.ustensils.filter(x => !this.selectedUstensils.includes(x))
      
    
    }*/
    addOrRemoveUstensils(tagName){
        console.log(this.result)
        console.log(tagName)
        if(this.selectedUstensils.includes(tagName)){
            this.selectedUstensils = this.selectedUstensils.filter(t => t !== tagName);
            this.ustensils.push(tagName);
            this.filterWithSearchBar(this.query)
             
            if(!this.selectedUstensils.length == 0){
                this.result = this.result.filter(r => {
    
                    console.log(r.ustensils, this.selectedUstensils);
                   const tu = r.ustensils.some(u => {
                       console.log(u)
                       return this.selectedUstensils[this.selectedUstensils.length - 1].includes(u)
                   })
                   console.log(tu)
                   return tu
                   
                   }) 
                
            }
            
        }else{
            this.selectedUstensils.push(tagName);
            console.log(this.result)
            this.result = this.result.filter(r => {
    
                console.log(r.ustensils, this.selectedUstensils);
               const tu = r.ustensils.some(u => {
                   console.log(u)
                   return this.selectedUstensils[this.selectedUstensils.length - 1].includes(u)
               })
               console.log(tu)
               return tu
               
               }) 
        }
        this.ustensils = this.result.map(r => r.ustensils);
        this.ustensils = this.ustensils.reduce(function(a,b){ return [...a,...b]});
        this.ustensils = new Set([...this.ustensils]);
        this.ustensils = [...this.ustensils]
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
    // select ustensils tags
    function openSelectUstensils(){
        selectUstensils.addEventListener("click", () => {
            advanceSearchByUstensils.removeAttribute("placeholder");
            advanceSearchByUstensils.setAttribute("placeholder", "rechercher un ustensil");
            loadUstensils.classList.replace("bi-chevron-down", "bi-chevron-up");
            advanceSearchResultsUstensils.innerHTML = "";
            advanceSearchResultsUstensils.innerHTML += `${filter.ustensils.map(r => `<li class="add_tag">${r}</li>`).join(" ")}`
            advanceSearchResultsUstensils.querySelectorAll(".add_tag").forEach(el => {
        
                el.addEventListener("click", e => {      
                const nameTag = e.target.textContent;
                 filter.addOrRemoveUstensils(nameTag);
                 advanceSearchResultsUstensils.innerHTML = "";
                renderAll = recipeCardTemplate.innerHTML = "";
                renderAll = filter.result.forEach(el => renderCards(el));
                tags.innerHTML += `<li class="tag tag_u" data-tag="${nameTag}"><span>${nameTag}</span><i class="bi bi-x-circle" ></i></li>`;
            tags.querySelectorAll(".tag_u").forEach(el => {
             el.addEventListener("click", ()=> {
                 const su = el.getAttribute("data-tag");
                 console.log(su)
                 filter.addOrRemoveUstensils(su);
                 tags.removeChild(el);
                 renderAll = recipeCardTemplate.innerHTML = "";
                 renderAll = filter.result.forEach(el => renderCards(el));
                 
             })  
           }) 
    
    
    
                })
    
         
         })
  
    
     

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
            advanceSearchResultsIngredients.querySelectorAll(".add_tag").forEach(el => {
        
                el.addEventListener("click", e => {      
                const nameTag = e.target.textContent;
                 filter.addOrRemoveIngredient(nameTag);
                 advanceSearchResultsIngredients.innerHTML = "";
                renderAll = recipeCardTemplate.innerHTML = "";
                renderAll = filter.result.forEach(el => renderCards(el));
                tags.innerHTML += `<li class="tag tag_i" data-tag="${nameTag}"><span>${nameTag}</span><i class="bi bi-x-circle" ></i></li>`;
            tags.querySelectorAll(".tag_i").forEach(el => {
             el.addEventListener("click", ()=> {
                 const s = el.getAttribute("data-tag");
                 console.log(s)
                 filter.addOrRemoveIngredient(s);
                 tags.removeChild(el);
                 renderAll = recipeCardTemplate.innerHTML = "";
                 renderAll = filter.result.forEach(el => renderCards(el));
                 
             })  
           }) 
    
    
    
                })
    
         
         })
  
    
     

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
        advanceSearchResultsAppliance.querySelectorAll(".add_tag").forEach(el => {
    
            el.addEventListener("click", e => {      
            const nameTag = e.target.textContent;
             filter.addOrRemoveAppliance(nameTag);
             advanceSearchResultsAppliance.innerHTML = "";
            renderAll = recipeCardTemplate.innerHTML = "";
            renderAll = filter.result.forEach(el => renderCards(el));
            tags.innerHTML += `<li class="tag tag_a" data-tag="${nameTag}"><span>${nameTag}</span><i class="bi bi-x-circle" ></i></li>`;
        tags.querySelectorAll(".tag_a").forEach(el => {
         el.addEventListener("click", ()=> {
             const sa = el.getAttribute("data-tag");
             console.log(sa)
             filter.addOrRemoveAppliance(sa);
             tags.removeChild(el);
             renderAll = recipeCardTemplate.innerHTML = "";
             renderAll = filter.result.forEach(el => renderCards(el));
             
         })  
       }) 



            })

     
     })


 

})



}

openSelectUstensils();

openSelectAppliances();

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



