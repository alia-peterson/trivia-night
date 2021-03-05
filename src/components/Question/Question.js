import React from 'react'
import './Question.css'

export default function Question({ question, answerQuestion }) {
  if (!question.category) {
    question = JSON.parse(localStorage.getItem('triviology-info')).currentQuestion
  }

  const incorrectAnswers = question.incorrect_answers.map((answer, index) => {
    return <button
      key={index}
      onClick={answerQuestion}
      className='incorrect'
      >
      {answer}
    </button>
  })

  return (
    <div>
      <h2>Category: {question.category}</h2>
      <article className='trivia-container' id={question.id}>
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
          onClick={answerQuestion}
          disabled
          >
          Next Question >
        </button>
      </article>
    </div>
  )
}
