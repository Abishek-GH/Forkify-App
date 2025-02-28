import { API_URL } from './config';
import { getJSON } from './helper';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
};

export const loadRecipe = async function (recipeId) {
  try {
    const data = await getJSON(`${API_URL}/${recipeId}`);
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
    throw error;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}/?search=${query}`);
    state.search.results = data.data.recipes.map(record => {
      return {
        id: record.id,
        title: record.title,
        publisher: record.publisher,
        image: record.image_url,
      };
    });
  } catch (error) {
    throw error;
  }
};
