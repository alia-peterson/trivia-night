import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Form.css'

export default function Form({ populateRecipe, populateTrivia }) {
  const [drinkBase, setDrinkBase] = useState('')
  const [triviaDifficulty, setTriviaDifficulty] = useState([])

  return (
    <article className='form-container'>
      <form className='form'>
        <label htmlFor='dropdown-drinks'>Drink Base:</label>
        <select
          onChange={() => {
            setDrinkBase()
            populateRecipe()
          }}
          className='dropdown'
          id='dropdown-drinks'
          >
          <option value='vodka'>Vodka</option>
          <option value='tequila'>Tequila</option>
          <option value='gin'>Gin</option>
        </select>
        <label htmlFor='dropdown-trivia'>Trivia Difficulty:</label>
        <select
          onChange={() => {
            setTriviaDifficulty()
            populateTrivia()
          }}
          className='dropdown'
          id='dropdown-trivia'
          >
          <option value='easy'>Easy</option>
          <option value='medium'>Medium</option>
          <option value='hard'>Hard</option>
        </select>
        <div className='button-container'>
          <Link to='/recipe'>
            <button className='button'>
              View Recipe
            </button>
          </Link>
          <Link to='/trivia'>
            <button className='button'>
              View Trivia
            </button>
          </Link>
        </div>
      </form>
    </article>
  )
}
