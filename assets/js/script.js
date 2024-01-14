function addIngredient() {
  const ingredientContainer = document.getElementById("ingredientContainer");
  const newIngredientInput = document.createElement("div");
  newIngredientInput.className = "ingredient-input";
  newIngredientInput.innerHTML =
    '<input type="text" class="ingredient" name="ingredient" required>';
  ingredientContainer.appendChild(newIngredientInput);
}

function addToList() {
  const selectedIngredientsList = document.getElementById(
    "selectedIngredientsList"
  );
  const ingredients = document.querySelectorAll(".ingredient");

  // Display the recipe title
  const titleItem = document.createElement("li");
  titleItem.textContent = recipeTitle;
  selectedIngredientsList.appendChild(titleItem);

  // Display the ingredients as list items
  ingredients.forEach((ingredient) => {
    const ingredientItem = document.createElement("li");
    ingredientItem.textContent = ingredient;
    selectedIngredientsList.appendChild(ingredientItem);
  });

  // Add a separator after the ingredients
  const separatorItem = document.createElement("hr");
  selectedIngredientsList.appendChild(separatorItem);
}

function generateRecipePage() {
  const recipeTitle = document.getElementById("recipeTitle").value;
  const ingredients = document.querySelectorAll(".ingredient");
  const preparationInstructions = document.getElementById(
    "preparationInstructions"
  ).value;

  // Get existing recipes or initialize an empty array
  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];

  // Generate a unique identifier for the recipe
  const recipeId = Date.now().toString();

  // Save recipe data to local storage
  const recipeData = {
    id: recipeId,
    title: recipeTitle,
    ingredients: Array.from(ingredients).map((ingredient) => ingredient.value),
    preparationInstructions: preparationInstructions,
  };

  recipes.push(recipeData);

  localStorage.setItem("recipes", JSON.stringify(recipes));
}

document.addEventListener("DOMContentLoaded", function () {
  // Retrieve recipes from local storage
  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];

  // Display recipes list
  const recipesList = document.getElementById("recipesList");
  recipesList.innerHTML = "<h1>Recipes</h1>";

  if (recipes.length > 0) {
    recipes.forEach((recipe) => {
      const recipeContent = document.createElement("div");
      recipeContent.innerHTML = `
                <h2>${recipe.title}</h2>
                <h3>Ingredients:</h3>
                <ul>${recipe.ingredients
                  .map((ingredient) => `<li>${ingredient}</li>`)
                  .join("")}</ul>
                <h3>Preparation Instructions:</h3>
                <p>${recipe.preparationInstructions}</p>
                <button class="deleteRecipeBtn" data-id="${
                  recipe.id
                }">Delete Recipe</button>
                <hr>
            `;
      recipesList.appendChild(recipeContent);
    });

    // Delete Recipe button functionality
    const deleteRecipeBtns = document.querySelectorAll(".deleteRecipeBtn");
    deleteRecipeBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const recipeId = btn.dataset.id;

        // Remove the selected recipe from local storage
        const updatedRecipes = recipes.filter(
          (recipe) => recipe.id !== recipeId
        );
        localStorage.setItem("recipes", JSON.stringify(updatedRecipes));

        // Update the displayed recipes list
        recipesList.innerHTML = "<h1>Recipes</h1>";
        updatedRecipes.forEach((recipe) => {
          const recipeContent = document.createElement("div");
          recipeContent.innerHTML = `
                        <h2>${recipe.title}</h2>
                        <h3>Ingredients:</h3>
                        <ul>${recipe.ingredients
                          .map((ingredient) => `<li>${ingredient}</li>`)
                          .join("")}</ul>
                        <h3>Preparation Instructions:</h3>
                        <p>${recipe.preparationInstructions}</p>
                        <button class="deleteRecipeBtn" data-id="${
                          recipe.id
                        }">Delete Recipe</button>
                        <hr>
                    `;
          recipesList.appendChild(recipeContent);
        });
      });
    });
  } else {
    recipesList.innerHTML += "<p>No recipes available.</p>";
  }
});
