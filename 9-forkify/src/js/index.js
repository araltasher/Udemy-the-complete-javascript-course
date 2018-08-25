import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
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
window.state = state;


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

    //  Highlight Selected item
    if (state.search) {
      searchView.highlightSelected(id);
    }

    //  Create a new recipe object
    state.recipe = new Recipe(id);

    try {
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

/**
 * LIST CONTROLLER
 */

const controlList = () => {
  // Create a new list IF there isn't one yet
  if (!state.list) {
    state.list = new List();
  }

  //  Add each ingredient to the list
  state.recipe.ingredients.forEach(el => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient);
    listView.renderItem(item);
  });
}

//  Handle delete & update list item events
elements.shopping.addEventListener('click', e => {
  const id = e.target.closest('.shopping__item').dataset.itemid;

  //  Handle the delete
  if (e.target.matches('.shopping__delete, .shopping__delete *')) {
    //  Delete from state
    state.list.deleteItem(id);

    //  Delete from interface
    listView.deleteItem(id);
  } else if (e.target.matches('.shopping__count-value')) {
    const val = parseFloat(e.target.value, 10);
    state.list.updateCount(id, val);
  }
});

/**
 * LIKE CONTROLLER
 */

const controlLike = () => {
  if (!state.likes) {
    state.likes = new Likes();
  }
  const currentID = state.recipe.id;

  if (!state.likes.isLiked(currentID)) {
    //  Add Like to the state
    const newLike = state.likes.addLike(
      currentID,
      state.recipe.title,
      state.recipe.author,
      state.recipe.img
    )
    //  Toggle the like button

    //  Add Like to the UI li
    console.log(state.likes);

  } else {
    //  User already liked the recipe
    //  Remove Like from the state
    state.likes.deleteLike(currentID);

    //  Toggle the like button

    //  Remove Like to the UI list
    console.log(state.likes);
  }
};



// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
  if (e.target.matches('.btn-decrease, .btn-decrease *')) {
    //  Decrease button is clicked
    if (state.recipe.servings > 1) {
      state.recipe.updateServings('dec');
      recipeView.updateServingsIngredients(state.recipe);
    }

  } else if (e.target.matches('.btn-increase, .btn-increase *')) {
    //  Increase button is clicked
    state.recipe.updateServings('inc');
    recipeView.updateServingsIngredients(state.recipe);
  } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    //  Add ingredients to shopping list
    controlList();
  } else if (e.target.matches('.recipe__love, .recipe__love *')) {
    //  Like controller
    controlLike();
  }
});

window.l = new List();