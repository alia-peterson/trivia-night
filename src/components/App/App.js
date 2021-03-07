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
import Preferences from '../Preferences/Preferences'
import possibleCategories from '../../data/trivia-categories'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      recipes: [],
      currentBeverage: {},
      favoriteRecipes: [],
      allCategories: possibleCategories,
      userCategories: possibleCategories,
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
    const random = Math.floor(Math.random() * Math.floor(this.state.userCategories.length))
    const randomCategory = this.state.userCategories[random].value

    const triviaInfo = Promise.resolve(fetchAPI.getTrivia(randomCategory, difficulty))
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
    this.setState({ answered: true })

    setTimeout(() => {
      this.setState({ answered: false })
      this.updateQuestion(thisQuestionNumber, newScore)
    }, 1000)
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

  updateUserCategories = (categoryName, changeType) => {
    if (changeType) {
      this.addCategory(categoryName)
    } else {
      this.removeCategory(categoryName)
    }
  }

  addCategory = (categoryName) => {
    const thisCategory = this.state.allCategories.find(category => {
      return category.type === categoryName
    })

    this.setState(prevState => {
      return {
        userCategories: [...prevState.userCategories, thisCategory]
      }
    }, () => {
      localStorage.setItem('triviology-info', JSON.stringify(this.state))
    })
  }

  removeCategory = (categoryName) => {
    console.log(this.state.userCategories);
    const updatedCategories = this.state.userCategories.filter(category => {
      return category.type !== categoryName
    })
    console.log(updatedCategories);

    this.setState({ userCategories: updatedCategories }, () => {
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
        favoriteRecipes: parsedInformation.favoriteRecipes,
        userCategories: parsedInformation.userCategories,
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
              exact path='/preferences'
              render={() => {
                return <Preferences
                  possibleCategories={this.state.allCategories}
                  userCategories={this.state.userCategories}
                  updateCategories={this.updateUserCategories}
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
