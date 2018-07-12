import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements, renderLoader, clearLoader} from './views/base';

/*  GLOBAL STATE of THE APP
 * - Search object
 * - Current Recipe object
 * - Shopping List object
 * - Liked recipes
 */

const state = {};

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


    //  Search for Recipes
    await state.search.getResults();

    //  Render results on UI
    clearLoader();
    searchView.renderResults(state.search.result);
  }
}

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener('click', e=> {
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    renderLoader(elements.searchRes);
    searchView.renderResults(state.search.result, goToPage);
    clearLoader();
  }
});