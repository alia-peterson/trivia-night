import triviaData from './data/trivia-data'
import recipeData from './data/recipe-data'

export default {
  getRecipe() {
    return triviaData.results // array
  },

  getTrivia() {
    return recipeData.drinks // array
  }
}
