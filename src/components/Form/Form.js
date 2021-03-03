import React, { useState } from 'react'
import './Form.css'

export default function Form() {
  const [drinkBase, setDrinkBase] = useState('')
  const [triviaDifficulty, setTriviaDifficulty] = useState([])

  return (
    <section className='form-container'>
      <form className='form'>
        <label for='dropdown-drinks'>Drink Base:</label>
        <select onChange={setDrinkBase} id='dropdown-drinks'>
          <option value='vodka'>Vodka</option>
          <option value='tequila'>Tequila</option>
          <option value='gin'>Gin</option>
        </select>
        <label for='dropdown-trivia'>Trivia Difficulty:</label>
        <select onChange={setTriviaDifficulty} id='dropdown-trivia'>
          <option value='easy'>Easy</option>
          <option value='medium'>Medium</option>
          <option value='hard'>Hard</option>
        </select>
        <button>Submit</button>
      </form>
    </section>
  )
}
