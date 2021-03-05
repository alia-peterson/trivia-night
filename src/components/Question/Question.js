import React, from 'react'
import './Question.css'

export default function Question({ question, answerQuestion }) {
  const incorrectAnswers = question.incorrect_answers.map(answer => {
    return <button
      onClick={answerQuestion}
      className='incorrect'
      >
      {answer}
    </button>
  })
  
  return (
    <div>
      <h2>Category: {question.category}</h2>
      <article className='trivia-container' id={}>
        <h2>Question:</h2>
        <p>{question.question}</p>
        <div>
          <button
            onClick={answerQuestion}
            className='correct'
            >
            {question.correct_answer}
          </button>
          {incorrectAnswers}
        </div>
        <button
          className='button'
          onClick={this.updateQuestion}
          disabled
          >
          Next Question >
        </button>
      </article>
    </div>
  )
}
