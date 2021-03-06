import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'

export default function Header({ recipeEnabled, triviaEnabled }) {
  return (
    <header className='header'>
      <h1>Triviology</h1>
      <div className='nav-container'>
        <NavLink
          exact to='/'
          name='home'
          className='nav-link'
          aria-current='page'
          >
          Home
        </NavLink>
        <NavLink
          exact to='/preferences'
          name='preferences'
          className='nav-link'
          aria-current='page'
          >
          Preferences
        </NavLink>
        {recipeEnabled &&
          <NavLink
            exact to='/recipe'
            name='recipe'
            className='nav-link'
            aria-current='page'
            >
            Recipe
          </NavLink>
        }
        {triviaEnabled &&
          <NavLink
            exact to='/trivia'
            name='trivia'
            className='nav-link'
            aria-current='page'
            >
            Trivia
          </NavLink>
        }
      </div>
    </header>
  )
}
