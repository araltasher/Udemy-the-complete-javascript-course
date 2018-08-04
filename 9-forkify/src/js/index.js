import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import {
  elements,
  renderLoader,
  clearLoader
} from './views/base';

/*  GLOBAL STATE of THE APP
 * - Search object
 * - Current Recipe object
 * - Shopping List object
 * - Liked recipes
 */

const state = {};


/** SEARCH CONTROLLER **/
const controlSearch = async () => {

  // Get the query from the view
  const query = searchView.getInput();


  if (query) {


    //  New Search Object and add to state
    state.search = new Search(query);

    //  Prepare UI for Results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    try {
      //  Search for Recipes
      await state.search.getResults();

      //  Render results on UI
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (err) {
      alert('Something wrong with the search...');
      clearLoader();
    }

  }
}

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});


elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    renderLoader(elements.searchRes);
    searchView.renderResults(state.search.result, goToPage);
    clearLoader();
  }
});

/** RECIPE CONTROLLER **/

const controlRecipe = async () => {
  // Get ID from the URL
  const id = window.location.hash.replace('#', '');

  if (id) {
    //  Prepare the UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    try {
      //  Create a new recipe object
      state.recipe = new Recipe(id);


      //  Get the recipe data and parse ingredients
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      //  Calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      //  Render recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe);

    } catch (err) {
      alert('Error processing recipe!');
    }
  }
}

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));