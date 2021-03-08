import React from 'react'

export default function Footer() {
  return (
    <footer className='footer'>
      <a
        href='https://opentdb.com/api_config.php'
        name='triviaAPI'
        target='_blank'
        rel="noreferrer"
        >
        Trivia API
      </a>
      <a
        href='https://www.thecocktaildb.com/api.php'
        name='cocktailAPI'
        target='_blank'
        rel="noreferrer"
        >
        Cocktail API
      </a>
    </footer>
  )
}
