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

  const populateRecipe = (event) => {
    console.log('success!');
    const recipeInfo = fetchAPI.getRecipe()
    const number = Math.floor(Math.random() * Math.floor(recipes.length))

    setRecipes(recipeInfo)
    setCurrentBeverage(recipes[number])
  }

  const populateTrivia = () => {
    const triviaInfo = fetchAPI.getTrivia()
    setTrivia(triviaInfo)
  }

  return (
    <Router>
      <div className='App'>
        <Header />
        <main className='main'>
          <Route
            exact path='/'
            render={() => {
              return <Form
                populateRecipe={populateRecipe}
                populateTrivia={populateTrivia}
                />
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
