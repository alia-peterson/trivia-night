import triviaData from './data/trivia-data'
import recipeData from './data/recipe-data'

export default {
  getRecipe() {
    return recipeData.drinks // array
  },

  getTrivia() {
    return triviaData.results // array
  }
}
