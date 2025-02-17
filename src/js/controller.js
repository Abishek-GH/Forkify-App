const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// Show Recipe

const showRecipe = async function (id) {
  try {
    const response = await fetch(
      `https://forkify-api.jonas.io/api/v2/recipes/${id}`
    );
    const data = await response.json();
    if (!response.ok)
      throw new Error(`Error: ${data.message}, Status: ${response.status}`);

    console.log(data);

    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(recipe);
  } catch (error) {
    console.error(error.message);
  }
};

showRecipe('5ed6604591c37cdc054bc886');
