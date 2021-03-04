import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import fetchAPI from '../../fetchAPI'
import './App.css'

import Header from '../Header/Header'
import Form from '../Form/Form'
import Recipe from '../Recipe/Recipe'
import Question from '../Question/Question'
import Footer from '../Footer/Footer'

export default function App() {
  const [recipes, setRecipes] = useState([])
  const [currentBeverage, setCurrentBeverage] = useState({})
  const [trivia, setTrivia] = useState([])

  const populateInformation = (event) => {
    event.preventDefault()
    const recipeInfo = fetchAPI.getRecipe()
    const triviaInfo = fetchAPI.getTrivia()
    const number = Math.floor(Math.random() * Math.floor(recipes.length))

    setRecipes(recipeInfo)
    setTrivia(triviaInfo)
    setCurrentBeverage(recipes[0])
    console.log('recipe', recipes[0])

    // Promise.all([recipeInfo, triviaInfo])
    //   .then(response => {
    //     setRecipes(response[0])
    //     setTrivia(response[1])
    //   })
    //   .then(() => {
    //     setCurrentBeverage(recipes[number])
    //   })
  }

  // useEffect(() => {
  // }, [])

  return (
    <Router>
      <div className='App'>
        <Header />
        <main className='main'>
          <Route
            exact path='/'
            render={() => {
              return <Form submit={populateInformation}/>
            }}
            />
          <Route
            exact path='/recipe'
            render={() => {
              return <Recipe
                recipe={currentBeverage}
                />
            }}
            />
          <Route
            exact path='/trivia'
            render={() => {
              return <Question />
            }}
            />
        </main>
        <Footer />
      </div>
    </Router>
  )
}
