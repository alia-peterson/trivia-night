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
      currentQuestion: {},
      answered: false,
      score: 0
    }
  }

  populateRecipe = (drinkBase) => {
    this.populateAllRecipes(drinkBase)
      .then(() => this.populateCurrentBeverage())
  }

  populateAllRecipes = (drinkBase) => {
    const allRecipesByType = Promise.resolve(fetchAPI.getRecipesbyType(drinkBase))

    return allRecipesByType.then(result => {
      this.setState({ recipes: result.drinks })
    })
  }

  populateCurrentBeverage = () => {
    const number = Math.floor(Math.random() * Math.floor(this.state.recipes.length))
    const randomRecipeId = this.state.recipes[number].idDrink
    const recipeInfo = Promise.resolve(fetchAPI.getRecipesbyId(randomRecipeId))

    recipeInfo.then(recipe => {
      this.setState({ currentBeverage: recipe.drinks[0] })
      localStorage.setItem('triviology-info', JSON.stringify(this.state))
    })
  }

  populateTrivia = (difficulty) => {
    const triviaInfo = Promise.resolve(fetchAPI.getTrivia(difficulty))
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
    let newScore = this.state.score

    thisQuestion.answer = thisAnswer
    if (thisAnswer) {
      newScore++
    }

    setTimeout(() => {
      this.setState({ answered: false })
      this.updateQuestion(thisQuestionNumber, newScore)
    }, 1000)

    this.setState({ answered: true })
  }

  updateQuestion = (thisQuestionNumber, newScore) => {
    if (thisQuestionNumber < 10) {
      this.setState({ currentQuestion: this.state.trivia[thisQuestionNumber] })
    }

    this.setState({
      questionNumber: parseInt(thisQuestionNumber) + 1,
      score: newScore
    }, () => {
      localStorage.setItem('triviology-info', JSON.stringify(this.state))
    })
  }

  restartTrivia = () => {
    this.setState({
      currentQuestion: this.state.trivia[0],
      questionNumber: 1,
      score: 0
    }, () => {
      localStorage.setItem('triviology-info', JSON.stringify(this.state))
    })
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
          <Header
            recipeEnabled={this.state.currentBeverage.idDrink ? true : false}
            triviaEnabled={this.state.currentQuestion.category ? true : false}
            />
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
                  answered={this.state.answered}
                  number={this.state.questionNumber}
                  score={this.state.score}
                  answerQuestion={this.answerQuestion}
                  restart={this.restartTrivia}
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
