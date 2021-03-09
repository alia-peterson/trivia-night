import React, { useState, useEffect } from 'react'
import './Question.css'

export default function Question({ question, answered, number, score, answerQuestion, restart, newGame }) {
  const [possibleAnswers, setPossibleAnswers] = useState([])

  if (!question.category) {
    question = JSON.parse(localStorage.getItem('triviology-info')).currentQuestion
  }

  const allAnswers = possibleAnswers.map((answer, index) => {
    if (answer === question.correct_answer) {
      return <button
        key={index}
        onClick={answerQuestion}
        className='button correct'
        dangerouslySetInnerHTML={{__html: answer}}
        >
      </button>
    } else {
      return <button
        key={index}
        onClick={answerQuestion}
        className='button incorrect'
        dangerouslySetInnerHTML={{__html: answer}}
        >
      </button>
    }
  })

  useEffect(() => {
    const answers = question.incorrect_answers.map(answer => answer)
    const random = Math.floor(Math.random() * Math.floor(answers.length))
    answers.splice(random, 0, question.correct_answer)
    setPossibleAnswers(answers)
  }, [question])

  return (
    <>
      <h2 className='trivia-category'>Category: {question.category}</h2>
      <article className={`trivia-container ${answered && 'show-results'}`} id={question.id}>
        {number > 10 ?
          <>
            <h3>Your Score:</h3>
            <p className='trivia-score'>You got {score} out of 10 correct!</p>
            <div className='button-container'>
              <button
                className='button'
                name='button-restart'
                onClick={restart}
                >
                Play Again
              </button>
              <button
                className='button'
                name='button-newgame'
                onClick={newGame}
                >
                New Game
              </button>
            </div>
          </> :
          <>
            <h3>Question {question.id} of 10:</h3>
            <p dangerouslySetInnerHTML={{__html: question.question}} />
            <div className='button-container'>
              {allAnswers}
            </div>
          </>
        }
      </article>
    </>
  )
}
