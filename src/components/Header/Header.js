import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'

export default function Header() {
  return (
    <header className='header'>
      <h1>Triviology</h1>
      <div>
        <NavLink
          exact to='/'
          className='button-nav'
          >
          Home
        </NavLink>
        <NavLink
          exact to='/recipe'
          className='button-nav'
          >
          Recipe
        </NavLink>
        <NavLink
          exact to='/trivia'
          className='button-nav'
          >
          Trivia
        </NavLink>
      </div>
    </header>
  )
}
