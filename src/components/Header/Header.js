import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'

export default function Header() {
  return (
    <header className='header'>
      <h1>Trivia Night</h1>
      <div>
        <button>Home</button>
        <button>Recipe</button>
        <button>Trivia</button>
      </div>
    </header>
  )
}
