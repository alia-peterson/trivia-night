import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import fetchAPI from '../../fetchAPI'
import './App.css'

import Header from '../HeaderFooter/Header'
import Footer from '../HeaderFooter/Footer'
import Form from '../Form/Form'
import Recipe from '../Recipe/Recipe'
import Question from '../Question/Question'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      recipes: [],
      currentBeverage: {},
      trivia: []
    }
  }

  populateRecipe = (event) => {
    const recipeInfo = Promise.resolve(fetchAPI.getRecipe())
    const number = Math.floor(Math.random() * Math.floor(this.state.recipes.length))

    recipeInfo.then(recipe => {
      this.setState({
        recipes: recipe.drinks,
        currentBeverage: recipe.drinks[number]
      })
    })
  }

  populateTrivia = () => {
    const triviaInfo = Promise.resolve(fetchAPI.getTrivia('medium'))
    triviaInfo.then(trivia => {
      this.setState({ trivia: trivia.results })
    })
  }

  render() {
    return (
      <Router>
        <div className='App'>
          <Header />
          <main className='main'>
            <Route
              exact path='/'
              render={() => {
                return <Form
                  populateRecipe={this.populateRecipe}
                  populateTrivia={this.populateTrivia}
                  />
              }}
              />
            <Route
              exact path='/recipe'
              render={() => {
                return <Recipe
                  recipe={this.state.currentBeverage}
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
}
