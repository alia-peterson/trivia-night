import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'
import fetchAPI from '../../fetchAPI'
import utilities from '../../utilities'
import './App.css'

import Header from '../HeaderFooter/Header'
import Footer from '../HeaderFooter/Footer'
import Form from '../Form/Form'
import Recipe from '../Recipe/Recipe'
import Question from '../Question/Question'
import Preferences from '../Preferences/Preferences'
import possibleCategories from '../../data/trivia-categories'
import possibleBases from '../../data/recipe-bases'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      allRecipeBases: possibleBases,
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

  // Recipe functions
  populateRecipe = (drinkBase) => {
    this.populateAllRecipes(drinkBase)
      .then(() => this.populateCurrentBeverage())
  }

  populateAllRecipes = (drinkBase) => {
    const cocktailUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${drinkBase}`
    const allRecipesByType = Promise.resolve(fetchAPI.getInformation(cocktailUrl))

    return allRecipesByType.then(result => {
      this.setState({ recipes: result.drinks })
    })
  }

  populateCurrentBeverage = () => {
    const number = Math.floor(Math.random() * Math.floor(this.state.recipes.length))
    const randomRecipeId = this.state.recipes[number].idDrink
    const recipeUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${randomRecipeId}`
    const recipeInfo = Promise.resolve(fetchAPI.getInformation(recipeUrl))

    recipeInfo.then(recipe => {
      const cleanedRecipe = utilities.cleanRecipeData(recipe.drinks[0])
      this.setState({ currentBeverage: cleanedRecipe })
      localStorage.setItem('triviology-info', JSON.stringify(this.state))
    })
  }

  toggleFavoriteRecipe = (event) => {
    const thisRecipeId = event.target.closest('article').id
    const foundRecipe = this.state.favoriteRecipes.find(recipe => {
      return recipe.idDrink === thisRecipeId
    })

    const updatedBeverage = this.state.currentBeverage
    const updatedFavorites = this.state.favoriteRecipes

    if (foundRecipe) {
      const recipeIndex = updatedFavorites.indexOf(foundRecipe)
      updatedBeverage.favorite = false
      updatedFavorites.splice(recipeIndex, 1)

    } else {
      updatedBeverage.favorite = true
      updatedFavorites.push(this.state.currentBeverage)
    }

    this.setState({
      currentBeverage: updatedBeverage,
      favoriteRecipes: updatedFavorites

    }, () => localStorage.setItem('triviology-info', JSON.stringify(this.state)))
  }

  // Trivia functions
  populateTrivia = (difficulty) => {
    const random = Math.floor(Math.random() * Math.floor(this.state.userCategories.length))
    const randomCategory = this.state.userCategories[random].value
    const triviaUrl = `https://opentdb.com/api.php?amount=10&category=${randomCategory}&difficulty=${difficulty}`

    const triviaInfo = Promise.resolve(fetchAPI.getInformation(triviaUrl))
    triviaInfo.then(trivia => {
      trivia.results.forEach((question, index) => question.id = index + 1)
      this.setState({
        trivia: trivia.results,
        questionNumber: 1,
        currentQuestion: trivia.results[0]
      })

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

  startNewTrivia = () => {
    const currentDifficulty = this.state.currentQuestion.difficulty
    this.populateTrivia(currentDifficulty)
    this.restartTrivia()
  }

  // User preference functions
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
    let updatedCategories

    if (this.state.userCategories.length === 1) {
      updatedCategories = this.state.allCategories

    } else {
      updatedCategories = this.state.userCategories.filter(category => {
        return category.type !== categoryName
      })
    }

    this.setState({ userCategories: updatedCategories }, () => {
      localStorage.setItem('triviology-info', JSON.stringify(this.state))
    })
  }

  // App component functions
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
            recipeEnabled={this.state.currentBeverage?.idDrink ? true : false}
            triviaEnabled={this.state.currentQuestion?.category ? true : false}
            />
          <main className='main'>
            <Route
              exact path='/'
              render={() => {
                return <Form
                  possibleBases={this.state.allRecipeBases}
                  populateRecipe={this.populateRecipe}
                  populateTrivia={this.populateTrivia}
                  recipeEnabled={this.state.currentBeverage?.strDrink ? false : true}
                  triviaEnabled={this.state.currentQuestion?.question ? false : true}
                  />
              }}
              />
            <Route
              path='/preferences'
              render={() => {
                return <Preferences
                  possibleCategories={this.state.allCategories}
                  userCategories={this.state.userCategories}
                  updateCategories={this.updateUserCategories}
                  favoriteRecipes={this.state.favoriteRecipes}
                  isFavorite={true}
                  toggleFavorite={this.toggleFavoriteRecipe}
                  />
              }}
              />
            <Route
              path='/recipe'
              render={() => {
                return <Recipe
                  recipe={this.state.currentBeverage}
                  newBeverage={this.populateCurrentBeverage}
                  triviaEnabled={this.state.currentQuestion.question ? false : true}
                  isFavorite={this.state.favoriteRecipes.find(recipe => {
                    return recipe.idDrink === this.state.currentBeverage.idDrink}) ?
                    true :
                    false
                  }
                  toggleFavorite={this.toggleFavoriteRecipe}
                  />
              }}
              />
            <Route
              path='/trivia'
              render={() => {
                return <Question
                  question={this.state.currentQuestion}
                  answered={this.state.answered}
                  number={this.state.questionNumber}
                  score={this.state.score}
                  answerQuestion={this.answerQuestion}
                  restart={this.restartTrivia}
                  newGame={this.startNewTrivia}
                  />
              }}
              />
            <Route
              path='*'
              render={() => <Redirect to='/' />}
              />
          </main>
          <Footer />
        </div>
      </Router>
    )
  }
}
