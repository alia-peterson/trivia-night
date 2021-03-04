import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'

export default function Header() {
  return (
    <header className='header'>
      <h1>Triviology</h1>
      <div className='nav-container'>
        <NavLink
          exact to='/'
          className='nav-link'
          >
          Home
        </NavLink>
        <NavLink
          exact to='/recipe'
          className='nav-link'
          >
          Recipe
        </NavLink>
        <NavLink
          exact to='/trivia'
          className='nav-link'
          >
          Trivia
        </NavLink>
      </div>
    </header>
  )
}
