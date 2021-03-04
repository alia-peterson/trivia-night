import React, { Component } from 'react'
import './Question.css'

export default class Question extends Component {
  constructor() {
    super()
    this.state = {
      allQuestions: [],
      category: '',
      questionNumber: 1,
      currentQuestion: {}
    }
  }

  // let questionNumber = 1
  // const triviaCategory = questions[0].category
  // const currentQuestion = questions[questionNumber]
  // const possibleAnswers = [currentQuestion.correct_answer, ...currentQuestion.incorrect_answers]
  // const answerList = possibleAnswers.map((answer, index) => {
  //   if (index === 0) {
  //     return <button
  //       key={index}
  //       onClick={answerQuestion}
  //       className='button-trivia correct'
  //       >
  //       {answer}
  //     </button>
  //   } else {
  //     return <button
  //       key={index}
  //       onClick={answerQuestion}
  //       className='button-trivia incorrect'
  //       >
  //       {answer}
  //     </button>
  //   }
  // })

  randomizeAnswers = () => {

  }

  updateQuestion = () => {

  }

  componentDidMount = () => {
    this.setState({
      allQuestions: this.props.questions,
      category: this.props.questions[0].category,
      currentQuestion: this.props.questions[0]
    })
    this.randomizeAnswers()
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <h2>Category: {this.state.category}</h2>
        <article className='trivia-container' id={this.state.questionNumber}>
          <h2>Question {this.state.questionNumber}:</h2>
          <p>{this.state.currentQuestion.question}</p>
          <div></div>
          <button
            className='button'
            onClick={this.updateQuestion}
            >
            Next Question >
          </button>
        </article>
      </div>
    )
  }
}
