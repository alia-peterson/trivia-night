import React from 'react'
import './Question.css'

export default function Question({ question, number, score, answerQuestion }) {
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
        {number >= 10 ?
          <div>
            <h2>Your Score:</h2>
            <p>You got {score} out of 10 correct!</p>
            <button className='button'>Play Again</button>
          </div> :
          <div>
            <h2>Question: {question.id}</h2>
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
          </div>
        }
      </article>
    </div>
  )
}
