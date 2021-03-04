import React from 'react'
import './Recipe.css'

export default function Recipe({ recipe }) {
  const instructions = recipe.strInstructions
  const ingredientDescriptions = Object.values(recipe)
  const ingredientProperties = Object.keys(recipe)

  let ingredientNumber = 1
  const ingredientsList = ingredientProperties.reduce((acc, curr, index, array) => {

    if (curr === `strIngredient${ingredientNumber}` && ingredientDescriptions[index]) {
      const measurement = array.find(item => {
        return item === `strMeasure${ingredientNumber}`
      })

      const measurementIndex = array.indexOf(measurement)
      acc.push(ingredientDescriptions[index] + ' ' + ingredientDescriptions[measurementIndex])
      ingredientNumber += 1
    }

    return acc
  }, [])

  const ingredients = ingredientsList.map((ing, index) => {
    return <li key={index}>{ing}</li>
  })

  // console.log('recipe name', recipe);
  return (
    <article className='recipe-container'>
      <h2>Beverage Recipe:</h2>
      <h3>{recipe.strDrink}</h3>
      <ul>{ingredients}</ul>
      <p>{instructions}</p>
    </article>
  )
}
