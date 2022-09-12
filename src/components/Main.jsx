import { nanoid } from 'nanoid'
import React, { useState, useEffect } from 'react'
import Quiz from './Quiz'

export default function Main() {
  const [quizs, setQuizs] = useState([])
  const [correctAns, setCorrectAns] = useState(0)
  const [checkAns, setCheckAns] = useState(false)
  const [clickedQuiz, setClickedQuiz] = useState([0, 0])
  console.log(clickedQuiz)
  useEffect(() => {
    (async () => {
      const res = await fetch('https://opentdb.com/api.php?amount=5&category=17&type=multiple')
      const data = await res.json()
      console.log(data.results)
      setQuizs(data.results.map(quiz => {
        const allOptions = quiz.incorrect_answers.map(el => ({value: el, stat: false}))
        console.log(allOptions)
        const correctAns = {value: quiz.correct_answer, stat: true}
        const randomNum = Math.floor(Math.random()*(allOptions.length))
        allOptions.splice(randomNum, 0, correctAns)
        return <Quiz 
          key={nanoid()} 
          quizId={nanoid()}
          question={quiz.question} 
          allOptions={allOptions} 
          handleClick={handleClick}
        />
      }))
    })()
  } ,[])

  function handleClick(evt, quizId) {
    console.log(evt.target.dataset.correct)
    console.log(quizId)
    console.log(clickedQuiz.includes(quizId))
    setClickedQuiz([0, 1])
    console.log('useEffect', clickedQuiz)
  }

  function checkAnsFn() {
    setCheckAns(true)
  }

  return (
    <div className='main'>
        {!quizs.length ? <h1>Loading...</h1> : quizs }
        {!!quizs.length && !checkAns && <button className="main--check" onClick={checkAnsFn} >Check answers</button>}
        
        {checkAns && <><p className="main--score">You scored {correctAns}/5 correct answers</p>
        <button className="main--check">Play again</button></>}
        
    </div>
  )
}
