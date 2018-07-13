import axios from 'axios';
import {proxy, key} from '../config';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const res = await axios(`${proxy}http://food2fork.com/api/get?key=${key}&rId=${this.id}`);
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.image = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
    } catch (err) {
      console.log(err);
      alert('Couldn\'t get the recipe!');
    }
  }

  calcTime() {
      // Assuming we need 15mins for every 3 ingredients
      const numIng = this.ingredients.length;
      const periods = Math.ceil(numIng /3);
      this.time = periods *15;
  }

  calcServings() {
      this.servings = 4;
  }
}