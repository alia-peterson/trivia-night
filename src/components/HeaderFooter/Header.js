import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'

export default function Header({ recipeEnabled, triviaEnabled }) {
  console.log(recipeEnabled);
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
        {recipeEnabled &&
          <NavLink
            exact to='/recipe'
            className='nav-link'
            >
            Recipe
          </NavLink>
        }
        {triviaEnabled &&
          <NavLink
            exact to='/trivia'
            className='nav-link'
            >
            Trivia
          </NavLink>
        }
      </div>
    </header>
  )
}
