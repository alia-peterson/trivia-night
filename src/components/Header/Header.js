import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'

export default function Header() {
  return (
    <header className='header'>
      <h1>Triviology</h1>
      <div>
        <button className='button-nav'>Home</button>
        <button className='button-nav'>Recipe</button>
        <button className='button-nav'>Trivia</button>
      </div>
    </header>
  )
}
