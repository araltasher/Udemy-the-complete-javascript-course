import Search from './models/Search';


/*  GLOBAL STATE of THE APP
 * - Search object
 * - Current Recipe object
 * - Shopping List object
 * - Liked recipes
 */

const state = {};

const controlSearch = async () => {
  
  // Get the query from the view
  const query = 'pizza';

  if (query) {
    //  New Search Object and add to state
    state.search = new Search(query);

    //  Prepare UI for Results

    //  Search for Recipes
    await state.search.getResults();

    //  Render results on UI
    console.log(state.search.result);
  }
}

document.querySelector('.search').addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});