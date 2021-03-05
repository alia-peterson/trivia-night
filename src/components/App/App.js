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
      trivia: [],
      questionNumber: 1,
      currentQuestion: {}
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
      localStorage.setItem('triviology-info', JSON.stringify(this.state))
    })
  }

  populateTrivia = () => {
    const triviaInfo = Promise.resolve(fetchAPI.getTrivia('medium'))
    triviaInfo.then(trivia => {
      trivia.results.forEach((question, index) => question.id = index + 1)
      this.setState({ trivia: trivia.results, currentQuestion: trivia.results[0] })

    }).then(() => {
      localStorage.setItem('triviology-info', JSON.stringify(this.state))
    })
  }

  answerQuestion = (event) => {
    event.preventDefault()
    const thisQuestionNumber = event.target.closest('article').id
    const thisAnswer = !event.target.classList.contains('incorrect')
    const thisQuestion = this.state.currentQuestion
    thisQuestion.answer = thisAnswer

    console.log('before', this.state);
    this.setState(prevState => ({
      currentQuestion: prevState.trivia[prevState.questionNumber + 1],
      questionNumber: prevState.questionNumber + 1
    }))

    console.log('after', this.state)
  }

  componentDidMount = () => {
    const storedInformation = localStorage.getItem('triviology-info')
    const parsedInformation = JSON.parse(storedInformation)

    if (storedInformation) {
      this.setState({
        recipes: parsedInformation.recipes,
        currentBeverage: parsedInformation.currentBeverage,
        trivia: parsedInformation.trivia,
        questionNumber: parsedInformation.questionNumber,
        currentQuestion: parsedInformation.currentQuestion
      })
    }
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
                return <Question
                  question={this.state.currentQuestion}
                  answerQuestion={this.answerQuestion}
                  />
              }}
              />
          </main>
          <Footer />
        </div>
      </Router>
    )
  }
}
