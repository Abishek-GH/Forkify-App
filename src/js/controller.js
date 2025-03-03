import 'regenerator-runtime/runtime';
import 'core-js/stable';
import * as model from './model';
import RecipeView from './views/recipeView';
import SearchView from './views/searchView';
import ResultView from './views/resultView';
import PaginationView from './views/paginationView';
import BookmarkView from './views/bookmarkView';
import AddRecipeView from './views/addRecipeView';
import { MODAL_CLOSE_SEC } from './config';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

if (module.hot) {
  module.hot.accept();
}

// Show Recipe
const controlRecipes = async function () {
  try {
    const recipeId = window.location.hash.slice(1);

    if (!recipeId) return;

    RecipeView.renderSpinner();

    ResultView.update(model.getSearchResultsPage());
    BookmarkView.update(model.state.bookmarks);
    await model.loadRecipe(recipeId);

    RecipeView.render(model.state.recipe);
  } catch (error) {
    console.error('Controller:', error);
    RecipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    ResultView.renderSpinner();
    const query = SearchView.getQuery();

    if (!query) return;

    await model.loadSearchResults(query);

    ResultView.render(model.getSearchResultsPage());
    PaginationView.render(model.state.search);
  } catch (error) {
    console.error('Controller:', error);
    RecipeView.renderError();
  }
};

const controlPagination = function (goToPage) {
  ResultView.render(model.getSearchResultsPage(goToPage));

  PaginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);

  // RecipeView.render(model.state.recipe);
  RecipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  RecipeView.update(model.state.recipe);

  BookmarkView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  BookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    AddRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);

    RecipeView.render(model.state.recipe);

    AddRecipeView.renderMessage();

    BookmarkView.render(model.state.bookmarks);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // window.history.back();

    window.setTimeout(function () {
      AddRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (error) {
    AddRecipeView.renderError(error.message);
  }
};

const init = function () {
  BookmarkView.addHandlerRender(controlBookmarks);
  RecipeView.addHandlerRender(controlRecipes);
  RecipeView.addHandlerUpdateServings(controlServings);
  RecipeView.addHandlerAddBookmark(controlAddBookmark);
  SearchView.addHandlerSearch(controlSearchResults);
  PaginationView.addHandlerClick(controlPagination);
  AddRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
