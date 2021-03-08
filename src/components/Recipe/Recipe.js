import React from 'react'
import { Link } from 'react-router-dom'
import './Recipe.css'

export default function Recipe({ recipe, newBeverage, triviaEnabled }) {
  const instructions = recipe.strInstructions
  const ingredientDescriptions = Object.values(recipe)
  const ingredientProperties = Object.keys(recipe)

  let ingredientNumber = 1
  const ingredientsList = ingredientProperties.reduce((acc, curr, index, array) => {

    if (curr === `strIngredient${ingredientNumber}` &&
                  ingredientDescriptions[index]) {
      const measurement = array.find(item => {
        return item === `strMeasure${ingredientNumber}`
      })

      acc.push(recipe[curr] + ': ' + recipe[measurement])
      ingredientNumber += 1
    }

    return acc
  }, [])

  const ingredients = ingredientsList.map((ing, index) => {
    return <li key={index}>{ing}</li>
  })

  return (
    <article className='recipe-container'>
      <h2>Beverage Recipe:</h2>
      <div className='recipe-inst-container'>
        <div>
          <h3 className='recipe-name'>{recipe.strDrink}</h3>
          <h4 className='recipe-heading'>Ingredients:</h4>
          <ul className='recipe-ingr'>{ingredients}</ul>
        </div>
        <img className='recipe-image' src={recipe.strDrinkThumb} alt=''/>
      </div>
      <h4 className='recipe-heading'>Instructions:</h4>
      <p className='recipe-inst'>{instructions}</p>
      <button
        className='button'
        onClick={newBeverage}
        >
        Generate New Beverage
      </button>
      <Link to='./trivia'>
        <button
          className='button'
          disabled={triviaEnabled}
          >
          Start Trivia >
        </button>
      </Link>
    </article>
  )
}
