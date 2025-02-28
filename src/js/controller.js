import 'regenerator-runtime/runtime';
import 'core-js/stable';
import * as model from './model';
import RecipeView from './views/recipeView';
import SearchView from './views/searchView';
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// Show Recipe
const controlRecipes = async function () {
  try {
    const recipeId = window.location.hash.slice(1);

    if (!recipeId) return;

    RecipeView.renderSpinner();

    await model.loadRecipe(recipeId);

    RecipeView.render(model.state.recipe);
  } catch (error) {
    RecipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    const query = SearchView.getQuery();

    if (!query) return;

    await model.loadSearchResults(query);
  } catch (error) {
    RecipeView.renderError();
  }
};

const init = function () {
  RecipeView.addHandlerRender(controlRecipes);
  SearchView.addHandlerSearch(controlSearchResults);
};
init();
