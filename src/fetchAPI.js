import triviaData from './data/trivia-data'
import recipeData from './data/recipe-data'

export default {
  getRecipesbyType(drinkBase) {
    return fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${drinkBase}`)
      .then(response => response.json())
      .catch(error => console.log(error))
  },

  getRecipesbyId(id) {
    return fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(response => response.json())
      .catch(error => console.log(error))
  },

  getTrivia(difficulty) {
    return fetch(`https://opentdb.com/api.php?amount=10&category=20&difficulty=${difficulty}`)
      .then(response => response.json())
      .catch(error => console.log(error))
  }
}
