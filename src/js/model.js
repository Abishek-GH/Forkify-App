export const state = {
  recipe: {},
};

export const loadRecipe = async function (recipeId) {
  try {
    const response = await fetch(
      `https://forkify-api.jonas.io/api/v2/recipes/${recipeId}`
    );

    const data = await response.json();

    if (!response.ok)
      throw new Error(`Error: ${data.message}, Status: ${response.status}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (error) {
    console.error(error.message);
  }
};
