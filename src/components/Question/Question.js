import React from 'react'
import './Question.css'

export default function Question({ question, answered, number, score, answerQuestion, restart, newGame }) {
  let possibleAnswers

  if (!question.category) {
    question = JSON.parse(localStorage.getItem('triviology-info')).currentQuestion
  }

  if (question.correct_answer) {
    const incorrectAnswers = question.incorrect_answers.map((answer, index) => {
      return <button
        key={index}
        onClick={answerQuestion}
        className='button incorrect'
        dangerouslySetInnerHTML={{__html: answer}}
        >
      </button>
    })
    // dangerouslySetInnerHTML is a solution i'm tolerating for now as i can't
    // find a better solution for interpreting html characters

    const correctAnswer = (
      <button
        key={3}
        onClick={answerQuestion}
        className='button correct'
        dangerouslySetInnerHTML={{__html: question.correct_answer}}
        >
      </button>
    )

    const random = Math.floor(Math.random() * Math.floor(incorrectAnswers.length))
    possibleAnswers = incorrectAnswers
    possibleAnswers.splice(random, 0, correctAnswer)
  }

  return (
    <div>
      <h2>Category: {question.category}</h2>
      <article className={`trivia-container ${answered && 'show-results'}`} id={question.id}>
        {number > 10 ?
          <div>
            <h2>Your Score:</h2>
            <p>You got {score} out of 10 correct!</p>
            <div className='button-container'>
              <button
                className='button'
                onClick={restart}
                >
                Play Again
              </button>
              <button
                className='button'
                onClick={newGame}
                >
                New Game
              </button>
            </div>
          </div> :
          <div>
            <h2>Question {question.id} of 10:</h2>
            <p dangerouslySetInnerHTML={{__html: question.question}} />
            <div className='button-container'>
              {possibleAnswers}
            </div>
          </div>
        }
      </article>
    </div>
  )
}
