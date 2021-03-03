import React, { useState } from 'react'
import './Form.css'

export default function Form() {
  const [drinkBase, setDrinkBase] = useState('')
  const [triviaDifficulty, setTriviaDifficulty] = useState([])

  return (
    <form>
      <select onChange={setDrinkBase}>
        <option value='vodka'>Vodka</option>
        <option value='tequila'>Tequila</option>
        <option value='gin'>Gin</option>
      </select>
      <select onChange={setTriviaDifficulty}>
        <option value='easy'>Easy</option>
        <option value='medium'>Medium</option>
        <option value='hard'>Hard</option>
      </select>
      <button>Submit</button>
    </form>
  )
}
