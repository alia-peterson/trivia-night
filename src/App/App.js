import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Header from '../Header/Header'
import Form from '../Form/Form'
import Recipe from '../Recipe/Recipe'
import Question from '../Question/Question'
import fetchAPI from '../fetchAPI'
import './App.css'

export default function App() {
  const [recipe, setRecipe] = useState([])
  const [trivia, setTrivia] = useState([])

  return (
    <Router>
      <Header />
      <Form />
    </Router>
  )
}
