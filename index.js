//DOM
const recipeCardTemplate = document.getElementById("recipes_wrap");
const searchBar = document.getElementById("search_bar");
const advanceSearchResultsIngredients = document.getElementById(
  "search_and_select_ingredients_results"
);
const advanceSearchResultsAppliance = document.getElementById(
  "search_and_select_appareil_results"
);
const advanceSearchResultsUstensils = document.getElementById(
  "search_and_select_ustensils_results"
);
const advanceSearchByIngredients =
  document.getElementById("search_ingredients");
const advanceSearchByAppliance = document.getElementById("search_appliances");
const advanceSearchByUstensils = document.getElementById("search_ustensils");
const selectIngredients = document.getElementById("select_ingredients");
const selectUstensils = document.getElementById("select_ustensils");
const selectAppareil = document.getElementById("select_appareil");
const loadIngredients = document.getElementById("load_ingredients");
const loadAppliances = document.getElementById("load_appliances");
const loadUstensils = document.getElementById("load_ustensils");
const buttonIngredient = document.getElementById("button_ingredient");
const buttonAppareil = document.getElementById("button_appareil");
const buttonUstensils = document.getElementById("button_ustensils");
const tags = document.getElementById("tags");

// START CODE

fetch("./recipes.json")
  .then((resp) => resp.json())
  .then((recipesJSON) => {
    const data = recipesJSON.recipes;

    // INTRAGTION DATA DANS UNE CLASS

    class Filter {
      constructor(data) {
        this.recipes = data;
        this.ingredients = [...this.i];
        this.appliances = [...this.a];
        this.ustensils = [...this.u];
        this.tags = [];
        this.query = null;
        this.result = [];
      }

      // CALCUL VALEUR DEFAULT INGREDIENTS USTENSILS ET APPAREIL

      get i() {
        let i = this.recipes.map((r) =>
          r.ingredients.map((ingredients) =>
            ingredients.ingredient.toLowerCase()
          )
        );
        i = i.reduce(function (a, b) {
          return [...a, ...b];
        });
        i = new Set([...i]);
        this.ingredients = [...i];
        return this.ingredients;
      }

      get u() {
        let u = this.recipes.map((r) => r.ustensils);
        u = u.reduce(function (a, b) {
          return [...a, ...b];
        });
        u = new Set([...u]);
        this.ustensils = [...u];
        return this.ustensils;
      }
      get a() {
        let a = this.recipes.map((r) => r.appliance);
        a = new Set([...a]);
        this.appliances = [...a];
        return a;
      }
      get allTags() {
        return [...this.tags];
      }

      //FILTRE NOM DESCRIPTION ET NOM PAR RAPPORT A INPUT

      filterWithSearchBar(query) {
        console.time("filterWithSearchBar");
        this.query = query;

        let data = this.result;
        if (this.result.length == 0 || this.query != searchBar.value) {
          data = this.recipes;
        }

        this.result = data.filter(
          (r) =>
            r.name.toLowerCase().includes(query) ||
            r.description.toLowerCase().split(" ").includes(query) ||
            r.ingredients.find((i) =>
              i.ingredient.toLowerCase().includes(query)
            )
        );
        console.log(this.result)
        if (this.result.length > 0) {
          this.ingredients = this.result.map((r) =>
            r.ingredients.map((ingredients) =>
              ingredients.ingredient.toLowerCase()
            )
          );
          console.timeEnd("filterWithSearchBar");
          this.ingredients = reduce(this.ingredients);

          this.appliances = this.result.map((r) => r.appliance);
          this.appliances = new Set([...this.appliances]);
          this.appliances = [...this.appliances];

          this.ustensils = this.result.map((u) => u.ustensils);
          this.ustensils = reduce(this.ustensils);
        }
      }
      // FILTRE CONTENU DU DROPDOWN PAR RAPPORT A INPUT

      filterWithAdvancesdSearchBar(arr, requete) {
        console.time("advancedsearchbar");
        const x = arr.filter(
          (el) => el.toLowerCase().indexOf(requete.toLowerCase()) !== -1
        );
        console.timeEnd("advancedsearchbar");
        return x;
      }

      // D'AJOUT OU RETRAIT DE TAG

      addOrRemoveTag(tagName) {
        this.allTags;

        if (this.allTags.includes(tagName)) {
          this.tags = this.tags.filter((t) => t !== tagName);
          this.allTags;

          if (this.allTags.length == 0) this.allTags;
          this.result = [];
          this.a;
          this.i;
          this.u;
        } else {
          this.tags.push(tagName);
        }
      }

      // REMISE AU VALEUR PAR DEFAULT

      ResetDom(data) {
        this.allTags;
        this.result = [];
        renderResult(this[data]);
        this.a;
        this.i;
        this.u;
      }

      //FILTRE DATA CONTIENT TAG SELECTIONNER

      searchWithTag() {
        console.time("searchwithtag");
        this.allTags;

        this.allTags.forEach((tag) => {
          let data = this.result;
          if (this.result.length == 0) {
            data = this.recipes;
          }

          this.result = data.filter((r) => {
            let appliances = [r.appliance];
            let ustensils = [...r.ustensils];
            let ingredients = r.ingredients.map(
              (ingredients) => ingredients.ingredient
            );
            this.allTags;

            const result = [...appliances, ...ustensils, ...ingredients].some(
              (i) => {
                const z = i.toLowerCase() == tag.toLowerCase();
                return z;
              }
            );

            return result;
          });

          this.ingredients = this.result.map((r) =>
            r.ingredients.map((ingredients) =>
              ingredients.ingredient.toLowerCase()
            )
          );
          this.ingredients = reduce(this.ingredients);
          

          this.appliances = this.result.map((r) => r.appliance);
          this.appliances = new Set([...this.appliances]);
          this.appliances = [...this.appliances];

          this.ustensils = this.result.map((u) => u.ustensils);
          this.ustensils = reduce(this.ustensils);
          this.allTags.forEach((tag) => {
            if (this.appliances.includes(tag)) {
              this.appliances = this.appliances.filter((t) => t !== tag);
            }
            if (this.ustensils.includes(tag)) {
              this.ustensils = this.ustensils.filter((t) => t !== tag);
            }
            if (this.ingredients.includes(tag)) {
              this.ingredients = this.ingredients.filter((t) => t !== tag);
            }
          });
        });
        console.timeEnd("searchwithtag");
      }
    }

    // INITIALISATION OBJET

    const filter = new Filter(data);

    // CREATION RENDU DOM PAR DEFAULT

    function renderResult(x) {
      recipeCardTemplate.innerHTML = "";
      x.forEach((el) => {
        return renderCards(el);
      });
    }

    renderResult(filter.recipes);

    /*
     ** EVENTS DROPDOWM
     * déclanche à l'input et applique methode sur la liste selectionner
     * créer nouvel element de la liste disponible
     *  gère les evenements au click sur les tags
     */

    // DROPDOWN INGREDIENTS

    advanceSearchByIngredients.addEventListener("input", (e) => {
      const input = e.target.value.toLowerCase().trim();
      const i = filter.ingredients;
      const result = filter.filterWithAdvancesdSearchBar(i, input);

      advanceSearchResultsIngredients.innerHTML = "";
      advanceSearchResultsIngredients.innerHTML += `${result
        .map((r) => `<li class="add_tag">${r}</li>`)
        .join(" ")}`;
      advanceSearchResultsIngredients
        .querySelectorAll(".add_tag")
        .forEach((el) => {
          el.addEventListener("click", (e) => {
            const nameTag = e.target.textContent;
            filter.addOrRemoveTag(nameTag);
            filter.searchWithTag();
            advanceSearchResultsIngredients.innerHTML = "";
            recipeCardTemplate.innerHTML = "";
            advanceSearchByIngredients.value = "";
            close(
              buttonIngredient,
              advanceSearchByIngredients,
              selectIngredients,
              loadIngredients
            );
            renderResult(filter.result);
            tags.innerHTML += `<li class="tag tag_i" data-tag="${nameTag}"><span>${nameTag}</span><i class="bi bi-x-circle" ></i></li>`;
            tags.querySelectorAll(".tag").forEach((el) => {
              el.addEventListener("click", () => {
                const s = el.getAttribute("data-tag");
                filter.addOrRemoveTag(s);
                filter.ResetDom("recipes");
                filter.searchWithTag();
                tags.removeChild(el);
                recipeCardTemplate.innerHTML = "";
                renderResult(filter.result);
                if (tags.childElementCount > 0 && searchBar.value.length >= 3) {
                  filter.ResetDom("recipes");
                  filter.filterWithSearchBar(searchBar.value);
                  filter.searchWithTag();
                  renderResult(filter.result);
                }
                if (
                  tags.textContent.trim() === "" &&
                  searchBar.value.length >= 3
                ) {
                  filter.ResetDom("recipes");
                  filter.filterWithSearchBar(searchBar.value);
                  renderResult(filter.result);
                }

                if (
                  tags.textContent.trim() === "" &&
                  searchBar.value.length === 0
                ) {
                  filter.ResetDom("recipes");
                  recipeCardTemplate.innerHTML = "";
                  renderResult(filter.recipes);
                }
              });
            });
          });
        });
    });

    // DROPDOMW USTENSILS

    advanceSearchByUstensils.addEventListener("input", (e) => {
      const input = e.target.value.toLowerCase().trim();
      const u = filter.ustensils;
      const result = filter.filterWithAdvancesdSearchBar(u, input);
      advanceSearchResultsUstensils.innerHTML = "";
      advanceSearchResultsUstensils.innerHTML += `${result
        .map((r) => `<li class="add_tag">${r}</li>`)
        .join(" ")}`;
      advanceSearchResultsUstensils
        .querySelectorAll(".add_tag")
        .forEach((el) => {
          el.addEventListener("click", (e) => {
            const nameTag = e.target.textContent;
            filter.addOrRemoveTag(nameTag);
            filter.searchWithTag();
            advanceSearchResultsUstensils.innerHTML = "";
            recipeCardTemplate.innerHTML = "";
            advanceSearchByUstensils.value = "";
            close(
              buttonUstensils,
              advanceSearchByUstensils,
              selectUstensils,
              loadUstensils
            );
            renderResult(filter.result);
            tags.innerHTML += `<li class="tag tag_u" data-tag="${nameTag}"><span>${nameTag}</span><i class="bi bi-x-circle" ></i></li>`;
            tags.querySelectorAll(".tag").forEach((el) => {
              el.addEventListener("click", () => {
                const su = el.getAttribute("data-tag");
                filter.addOrRemoveTag(su);
                filter.ResetDom("recipes");
                filter.searchWithTag();
                tags.removeChild(el);
                recipeCardTemplate.innerHTML = "";
                renderResult(filter.result);
                if (tags.childElementCount > 0 && searchBar.value.length >= 3) {
                  filter.ResetDom("recipes");
                  filter.filterWithSearchBar(searchBar.value);
                  filter.searchWithTag();
                  renderResult(filter.result);
                }
                if (
                  tags.textContent.trim() === "" &&
                  searchBar.value.length >= 3
                ) {
                  filter.ResetDom("recipes");
                  filter.filterWithSearchBar(searchBar.value);
                  renderResult(filter.result);
                }

                if (
                  tags.textContent.trim() === "" &&
                  searchBar.value.length === 0
                ) {
                  filter.ResetDom("recipes");
                  recipeCardTemplate.innerHTML = "";
                  renderResult(filter.recipes);
                }
              });
            });
          });
        });
    });

    // DROPDOWN APPAREIL

    advanceSearchByAppliance.addEventListener("input", (e) => {
      const input = e.target.value.toLowerCase().trim();
      const a = filter.appliances;
      const result = filter.filterWithAdvancesdSearchBar(a, input);
      advanceSearchResultsAppliance.innerHTML = "";
      advanceSearchResultsAppliance.innerHTML += `${result
        .map((r) => `<li class="add_tag">${r}</li>`)
        .join(" ")}`;
      advanceSearchResultsAppliance
        .querySelectorAll(".add_tag")
        .forEach((el) => {
          el.addEventListener("click", (e) => {
            const nameTag = e.target.textContent;
            filter.addOrRemoveTag(nameTag);
            filter.searchWithTag();
            advanceSearchResultsAppliance.innerHTML = "";
            advanceSearchByAppliance.value = "";
            close(
              buttonAppareil,
              advanceSearchByAppliance,
              selectAppareil,
              loadAppliances
            );
            recipeCardTemplate.innerHTML = "";
            renderResult(filter.result);
            tags.innerHTML += `<li class="tag tag_a" data-tag="${nameTag}"><span>${nameTag}</span><i class="bi bi-x-circle" ></i></li>`;
            tags.querySelectorAll(".tag").forEach((el) => {
              el.addEventListener("click", () => {
                const sa = el.getAttribute("data-tag");
                filter.addOrRemoveTag(sa);
                filter.ResetDom("recipes");
                filter.searchWithTag();
                tags.removeChild(el);
                recipeCardTemplate.innerHTML = "";
                renderResult(filter.result);
                if (tags.childElementCount > 0 && searchBar.value.length >= 3) {
                  filter.ResetDom("recipes");
                  filter.filterWithSearchBar(searchBar.value);
                  filter.searchWithTag();
                  renderResult(filter.result);
                }
                if (
                  tags.textContent.trim() === "" &&
                  searchBar.value.length >= 3
                ) {
                  filter.ResetDom("recipes");
                  filter.filterWithSearchBar(searchBar.value);
                  renderResult(filter.result);
                }

                if (
                  tags.textContent.trim() === "" &&
                  searchBar.value.length === 0
                ) {
                  filter.ResetDom("recipes");
                  recipeCardTemplate.innerHTML = "";
                  renderResult(filter.recipes);
                }
              });
            });
          });
        });
    });

    /*
     ** EVENT BARRE DE RECHERCHE PRINCIPALE
     * se déclanche au remplissage du champ, toutes le 300 ms et si le champ est différent
     * déclanche à l'input et applique la méthode de trie par le nom , description et ingredients
     * conditions qui exécute le code  en fonction du résultat trouvé
     *
     */

    searchBar.addEventListener("input", (e) => {
      const input = e.target.value.toLowerCase().trim();
      filter.filterWithSearchBar(input);
      filter.searchWithTag();
      setTimeout(() => {
        if (input == searchBar.value) {
          if (input.length >= 3 && filter.result.length > 0) {
            recipeCardTemplate.innerHTML = "";
            renderResult(filter.result);
          } else if (filter.result.length <= 0 && input.length >= 3) {
            advanceSearchResultsAppliance.innerHTML = "";
            advanceSearchResultsIngredients.innerHTML = "";
            advanceSearchResultsUstensils.innerHTML = "";
            recipeCardTemplate.innerHTML = "aucun resultat";
          } else if (input.length === 0 && filter.tags.length > 0) {
            filter.ResetDom("recipes");
            recipeCardTemplate.innerHTML = "";
            filter.searchWithTag();
            renderResult(filter.result);
          } else if (input.length === 0) {
            filter.ResetDom("recipes");
            recipeCardTemplate.innerHTML = "";
            renderResult(filter.recipes);
          }
        }
      }, 300);
    });

    /*
     ** EVENTS DROPDOWM ON CLIK
     * Ouvre et ferme les dropdowns
     * creer les elements des listes dans le DOM
     * gère les evenements au click sur les tags
     */

    function createTagsList(triggerI, triggerA, triggerU) {
      triggerI.addEventListener("click", () => {
        if (selectIngredients.classList.contains("close")) {
          open(
            buttonIngredient,
            advanceSearchByIngredients,
            selectIngredients,
            loadIngredients
          );
          close(
            buttonAppareil,
            advanceSearchByAppliance,
            selectAppareil,
            loadAppliances
          );
          close(
            buttonUstensils,
            advanceSearchByUstensils,
            selectUstensils,
            loadUstensils
          );
          advanceSearchResultsUstensils.innerHTML = "";
          advanceSearchResultsAppliance.innerHTML = "";
          const i = filter.ingredients;
          advanceSearchResultsIngredients.innerHTML = "";
          advanceSearchResultsIngredients.innerHTML += `${i
            .map((r) => `<li class="add_tag">${r}</li>`)
            .join(" ")}`;
          advanceSearchResultsIngredients
            .querySelectorAll(".add_tag")
            .forEach((el) => {
              el.addEventListener("click", (e) => {
                const nameTag = e.target.textContent;

                filter.addOrRemoveTag(nameTag);
                filter.searchWithTag();
                advanceSearchResultsIngredients.innerHTML = "";
                recipeCardTemplate.innerHTML = "";
                advanceSearchByIngredients.innerHTML = "";
                close(
                  buttonIngredient,
                  advanceSearchByIngredients,
                  selectIngredients,
                  loadIngredients
                );
                renderResult(filter.result);
                tags.innerHTML += `<li class="tag tag_i" data-tag="${nameTag}"><span>${nameTag}</span><i class="bi bi-x-circle" ></i></li>`;
                tags.querySelectorAll(".tag").forEach((el) => {
                  el.addEventListener("click", () => {
                    const s = el.getAttribute("data-tag");
                    filter.addOrRemoveTag(s);
                    filter.searchWithTag();
                    tags.removeChild(el);
                    recipeCardTemplate.innerHTML = "";
                    renderResult(filter.result);
                    if (
                      tags.childElementCount > 0 &&
                      searchBar.value.length >= 3
                    ) {
                      filter.ResetDom("recipes");
                      filter.filterWithSearchBar(searchBar.value);
                      filter.searchWithTag();
                      renderResult(filter.result);
                    }
                    if (
                      tags.textContent.trim() === "" &&
                      searchBar.value.length >= 3
                    ) {
                      filter.ResetDom("recipes");
                      filter.filterWithSearchBar(searchBar.value);
                      renderResult(filter.result);
                    }

                    if (
                      tags.textContent.trim() === "" &&
                      searchBar.value.length === 0
                    ) {
                      filter.ResetDom("recipes");
                      recipeCardTemplate.innerHTML = "";
                      renderResult(filter.recipes);
                    }
                  });
                });
              });
            });
        } else {
          close(
            buttonIngredient,
            advanceSearchByIngredients,
            selectIngredients,
            loadIngredients
          );
          advanceSearchResultsIngredients.innerHTML = "";
        }
      });

      triggerA.addEventListener("click", () => {
        if (selectAppareil.classList.contains("close")) {
          open(
            buttonAppareil,
            advanceSearchByAppliance,
            selectAppareil,
            loadAppliances
          );
          close(
            buttonIngredient,
            advanceSearchByIngredients,
            selectIngredients,
            loadIngredients
          );
          close(
            buttonUstensils,
            advanceSearchByUstensils,
            selectUstensils,
            loadUstensils
          );
          advanceSearchResultsUstensils.innerHTML = "";
          advanceSearchResultsIngredients.innerHTML = "";
          open(
            buttonAppareil,
            advanceSearchByAppliance,
            selectAppareil,
            loadAppliances
          );
          close(
            buttonIngredient,
            advanceSearchByIngredients,
            selectIngredients,
            loadIngredients
          );
          close(
            buttonUstensils,
            advanceSearchByUstensils,
            selectUstensils,
            loadUstensils
          );
          const a = filter.appliances;
          advanceSearchResultsAppliance.innerHTML = "";
          advanceSearchResultsAppliance.innerHTML += `${a
            .map((r) => `<li class="add_tag">${r}</li>`)
            .join(" ")}`;
          advanceSearchResultsAppliance
            .querySelectorAll(".add_tag")
            .forEach((el) => {
              el.addEventListener("click", (e) => {
                const nameTag = e.target.textContent;
                filter.addOrRemoveTag(nameTag);
                filter.searchWithTag();
                advanceSearchResultsAppliance.innerHTML = "";
                advanceSearchByAppliance.value = "";
                close(
                  buttonAppareil,
                  advanceSearchByAppliance,
                  selectAppareil,
                  loadAppliances
                );
                recipeCardTemplate.innerHTML = "";
                renderResult(filter.result);
                tags.innerHTML += `<li class="tag tag_a" data-tag="${nameTag}"><span>${nameTag}</span><i class="bi bi-x-circle" ></i></li>`;
                tags.querySelectorAll(".tag").forEach((el) => {
                  el.addEventListener("click", () => {
                    const sa = el.getAttribute("data-tag");
                    filter.addOrRemoveTag(sa);
                    filter.searchWithTag();
                    tags.removeChild(el);
                    recipeCardTemplate.innerHTML = "";
                    renderResult(filter.result);
                    if (
                      tags.childElementCount > 0 &&
                      searchBar.value.length >= 3
                    ) {
                      filter.ResetDom("recipes");
                      filter.filterWithSearchBar(searchBar.value);
                      filter.searchWithTag();
                      renderResult(filter.result);
                    }
                    if (
                      tags.textContent.trim() === "" &&
                      searchBar.value.length >= 3
                    ) {
                      filter.ResetDom("recipes");
                      filter.filterWithSearchBar(searchBar.value);
                      renderResult(filter.result);
                    }

                    if (
                      tags.textContent.trim() === "" &&
                      searchBar.value.length === 0
                    ) {
                      filter.ResetDom("recipes");
                      recipeCardTemplate.innerHTML = "";
                      renderResult(filter.recipes);
                    }
                  });
                });
              });
            });
        } else {
          close(
            buttonAppareil,
            advanceSearchByAppliance,
            selectAppareil,
            loadAppliances
          );
          advanceSearchResultsAppliance.innerHTML = "";
        }
      });

      triggerU.addEventListener("click", () => {
        if (selectUstensils.classList.contains("close")) {
          open(
            buttonUstensils,
            advanceSearchByUstensils,
            selectUstensils,
            loadUstensils
          );
          close(
            buttonIngredient,
            advanceSearchByIngredients,
            selectIngredients,
            loadIngredients
          );
          close(
            buttonAppareil,
            advanceSearchByAppliance,
            selectAppareil,
            loadAppliances
          );
          advanceSearchResultsIngredients.innerHTML = "";
          advanceSearchResultsAppliance.innerHTML = "";
          open(
            buttonUstensils,
            advanceSearchByUstensils,
            selectUstensils,
            loadUstensils
          );
          close(
            buttonIngredient,
            advanceSearchByIngredients,
            selectIngredients,
            loadIngredients
          );
          close(
            buttonAppareil,
            advanceSearchByAppliance,
            selectAppareil,
            loadAppliances
          );
          const u = filter.ustensils;
          advanceSearchResultsUstensils.innerHTML = "";
          advanceSearchResultsUstensils.innerHTML += `${u
            .map((r) => `<li class="add_tag">${r}</li>`)
            .join(" ")}`;
          advanceSearchResultsUstensils
            .querySelectorAll(".add_tag")
            .forEach((el) => {
              el.addEventListener("click", (e) => {
                const nameTag = e.target.textContent;
                filter.addOrRemoveTag(nameTag);
                filter.searchWithTag();
                advanceSearchResultsUstensils.innerHTML = "";
                recipeCardTemplate.innerHTML = "";
                advanceSearchByUstensils.value = "";
                close(
                  buttonUstensils,
                  advanceSearchByUstensils,
                  selectUstensils,
                  loadUstensils
                );
                renderResult(filter.result);
                tags.innerHTML += `<li class="tag tag_u" data-tag="${nameTag}"><span>${nameTag}</span><i class="bi bi-x-circle" ></i></li>`;
                tags.querySelectorAll(".tag").forEach((el) => {
                  el.addEventListener("click", () => {
                    const su = el.getAttribute("data-tag");
                    filter.addOrRemoveTag(su);
                    filter.searchWithTag();
                    tags.removeChild(el);
                    recipeCardTemplate.innerHTML = "";
                    renderResult(filter.result);
                    if (
                      tags.childElementCount > 0 &&
                      searchBar.value.length >= 3
                    ) {
                      filter.ResetDom("recipes");
                      filter.filterWithSearchBar(searchBar.value);
                      filter.searchWithTag();
                      renderResult(filter.result);
                    }
                    if (
                      tags.textContent.trim() === "" &&
                      searchBar.value.length >= 3
                    ) {
                      filter.ResetDom("recipes");
                      filter.filterWithSearchBar(searchBar.value);
                      renderResult(filter.result);
                    }

                    if (
                      tags.textContent.trim() === "" &&
                      searchBar.value.length === 0
                    ) {
                      filter.ResetDom("recipes");
                      recipeCardTemplate.innerHTML = "";
                      renderResult(filter.recipes);
                    }
                  });
                });
              });
            });
        } else {
          close(
            buttonUstensils,
            advanceSearchByUstensils,
            selectUstensils,
            loadUstensils
          );
          advanceSearchResultsUstensils.innerHTML = "";
        }
      });
    }

    createTagsList(buttonIngredient, buttonAppareil, buttonUstensils);

    createTagsList(loadIngredients, loadAppliances, loadUstensils);
  });

//END CODE

// REDUIT LES TABLEAU

function reduce(t) {
  t = t.reduce(function (a, b) {
    return [...a, ...b];
  });
  t = new Set([...t]);
  t = [...t];
  return t;
}

// CREER CARD

function renderCards(el) {
  return (recipeCardTemplate.innerHTML += `
  <span class="card_space">
     <div class="card card_custom">
    <div class="card-img-top img_custom"></div>
    <div class="card-body">
      <h5 class="card_title"><span class="recipe_name">${
        el.name
      }</span><i class="bi bi-clock icon-clock"><span class="minute">${
    el.time
  } min</span></i>
      </h5>
      <di id="card_content" class="row">
        <ul id="list_in_card" class="col">
        ${el.ingredients
          .map((i) => {
            let ingredient = i.ingredient;
            let quantity = i.quantity;
            let unit = i.unit;
            if (typeof unit === "undefined") {
              unit = "";
            }
            if (typeof quantity === "undefined") {
              quantity = "";
            }
            return `<li>${ingredient} : ${quantity} ${unit}</li>`;
          })
          .join("")}
        </ul>
        <p id="text_in_card" class="card-text col">${el.description}</p>
    </div>
  
  </div>
  </span>
  `);
}

// FERME DROPDOWN

function close(button, input, container, icon) {
  button.style.display = "block";
  input.style.width = "0px";
  container.classList.replace("open", "close");
  icon.classList.replace("bi-chevron-up", "bi-chevron-down");
}

//OUVRE DROPDOWN

function open(button, input, container, icon) {
  button.style.display = "none";
  input.style.width = "220px";
  container.classList.replace("close", "open");
  icon.classList.replace("bi-chevron-down", "bi-chevron-up");
}

//FERME TOUS LES DROPDOWN  ON FOUCUS SUR BARRE DE RECHERCHE PRINCIPALE

searchBar.addEventListener("focus", () => {
  close(
    buttonIngredient,
    advanceSearchByIngredients,
    selectIngredients,
    loadIngredients
  );
  close(
    buttonAppareil,
    advanceSearchByAppliance,
    selectAppareil,
    loadAppliances
  );

  close(
    buttonUstensils,
    advanceSearchByUstensils,
    selectUstensils,
    loadUstensils
  );
  advanceSearchResultsUstensils.innerHTML = "";
  advanceSearchResultsIngredients.innerHTML = "";
  advanceSearchResultsAppliance.innerHTML = "";
});
