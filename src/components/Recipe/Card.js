import React from 'react'
import iconFilled from '../../assets/icon-heart-filled.png'
import iconOutline from '../../assets/icon-heart-outline.png'
import './Card.css'

export default function Card({ recipe, isFavorite, toggleFavorite }) {
  const instructions = recipe.strInstructions
  const ingredientDescriptions = Object.values(recipe)
  const ingredientProperties = Object.keys(recipe)

  let favoriteIcon
  let iconAltText

  if (isFavorite) {
    favoriteIcon = iconFilled
    iconAltText = 'Favorite icon filled'
  } else {
    favoriteIcon = iconOutline
    iconAltText = 'Favorite icon unfilled'
  }

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
    <>
      <img
        className='fav-icon'
        src={favoriteIcon}
        alt={iconAltText}
        onClick={toggleFavorite}
        />
      <h3 className='recipe-name'>{recipe.strDrink}</h3>
      <div className='recipe-inst-container'>
        <div>
          <h4 className='recipe-heading'>Ingredients:</h4>
          <ul className='recipe-ingr'>{ingredients}</ul>
        </div>
        <img className='recipe-image' src={recipe.strDrinkThumb} alt=''/>
      </div>
      <h4 className='recipe-heading'>Instructions:</h4>
      <p className='recipe-inst'>{instructions}</p>
    </>
  )
}
