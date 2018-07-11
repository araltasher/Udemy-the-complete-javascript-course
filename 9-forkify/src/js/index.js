import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements} from './views/base';

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
  console.log(query);

  if (query) {
    //  New Search Object and add to state
    state.search = new Search(query);

    //  Prepare UI for Results
    searchView.clearInput();
    searchView.clearResults();

    //  Search for Recipes
    await state.search.getResults();

    //  Render results on UI
    searchView.renderResults(state.search.result);
  }
}

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});