import React from 'react'
import './Question.css'

export default function Question({ questions }) {
  let questionNumber = 1
  const triviaCategory = questions[0].category
  const currentQuestion = questions[questionNumber]
  const possibleAnswers = [currentQuestion.correct_answer, ...currentQuestion.incorrect_answers]
  const answerList = possibleAnswers.map((answer, index) => {
    return <li key={index}>{answer}</li>
  })

  return (
    <div>
      <h2>Category: {triviaCategory}</h2>
      <article className='trivia-container'>
        <h2>Question {questionNumber}:</h2>
        <p>{currentQuestion.question}</p>
        <ul>{answerList}</ul>
      </article>
    </div>
  )
}
