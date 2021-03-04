import React from 'react'
import './Question.css'

export default function Question({ questions, answerQuestion }) {
  let questionNumber = 1
  const triviaCategory = questions[0].category
  const currentQuestion = questions[questionNumber]
  const possibleAnswers = [currentQuestion.correct_answer, ...currentQuestion.incorrect_answers]
  const answerList = possibleAnswers.map((answer, index) => {
    if (index === 0) {
      return <button
        key={index}
        onClick={answerQuestion}
        className='button-trivia correct'
        >
        {answer}
      </button>
    } else {
      return <button
        key={index}
        onClick={answerQuestion}
        className='button-trivia incorrect'
        >
        {answer}
      </button>
    }
  })

  return (
    <div>
      <h2>Category: {triviaCategory}</h2>
      <article className='trivia-container' id={questionNumber}>
        <h2>Question {questionNumber}:</h2>
        <p>{currentQuestion.question}</p>
        <div>{answerList}</div>
        <button className='button'>Next Question ></button>
      </article>
    </div>
  )
}
