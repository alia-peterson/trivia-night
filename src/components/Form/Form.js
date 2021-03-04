import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Form.css'

export default function Form({ submit }) {
  const [drinkBase, setDrinkBase] = useState('')
  const [triviaDifficulty, setTriviaDifficulty] = useState([])

  return (
    <article className='form-container'>
      <form className='form'>
        <label htmlFor='dropdown-drinks'>Drink Base:</label>
        <select className='dropdown' onChange={setDrinkBase} id='dropdown-drinks'>
          <option value='vodka'>Vodka</option>
          <option value='tequila'>Tequila</option>
          <option value='gin'>Gin</option>
        </select>
        <label htmlFor='dropdown-trivia'>Trivia Difficulty:</label>
        <select className='dropdown' onChange={setTriviaDifficulty} id='dropdown-trivia'>
          <option value='easy'>Easy</option>
          <option value='medium'>Medium</option>
          <option value='hard'>Hard</option>
        </select>
        <Link to='/trivia'>
          <button className='button' onClick={submit}>Submit</button>
        </Link>
      </form>
    </article>
  )
}
