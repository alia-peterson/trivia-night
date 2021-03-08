import React from 'react'
import { Link } from 'react-router-dom'
import Card from './Card'
import './Recipe.css'

export default function Recipe({ recipe, newBeverage, triviaEnabled, isFavorite, toggleFavorite }) {
  return (
    <div>
      <h2>Beverage Recipe:</h2>
      <article className='recipe-container' id={recipe.idDrink}>
        <Card
          recipe={recipe}
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
          />
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
    </div>
  )
}
