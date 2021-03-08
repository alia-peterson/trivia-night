import React from 'react'
import { Link } from 'react-router-dom'
import './Recipe.css'

export default function Recipe({ recipe, newBeverage }) {
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

      acc.push(recipe[curr] + ' ' + recipe[measurement])
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
      <h3>{recipe.strDrink}</h3>
      <ul>{ingredients}</ul>
      <p>{instructions}</p>
      <button
        className='button'
        onClick={newBeverage}
        >
        Generate New Beverage
      </button>
      <Link to='./trivia'>
        <button className='button'>Start Trivia ></button>
      </Link>
    </article>
  )
}
