import React, { useState, useEffect, useRef } from 'react'
import Quiz from './Quiz'
import { nanoid } from 'nanoid'

export default function Main() {
  const [loading, setLoading] = useState(true)
  const [quizArr, setQuizArr] = useState([])
  const [quizs, setQuizs] = useState([])
  const [noOfQuizs, setNoOfQuizs] = useState(0)
  const [checkAns, setCheckAns] = useState(false)
  const refEx = useRef(false)

  useEffect(() => {
    (async () => {
      const res = await fetch('https://opentdb.com/api.php?amount=5&category=17')
      const data = await res.json()
      const allQuizs = data.results
      console.log(allQuizs)
      setNoOfQuizs(allQuizs.length)
      setLoading(false)
      setQuizs(allQuizs.map(quiz => {
        const allOptions = quiz.incorrect_answers
        const correctAns = quiz.correct_answer
        const randomNum = Math.floor(Math.random()*(allOptions.length + 1))
        allOptions.splice(randomNum, 0, correctAns)
        return <Quiz 
          key={nanoid()} 
          question={quiz.question} 
          allOptions={allOptions} 
          correctAns={correctAns}
          ref={refEx}
        />
      }))
    })()
  }, [])

  function checkAnsFn() {
    setCheckAns(true)
    refEx.current.consol()
  }

  return (
    loading ? <h1 className='loading'>Loading...</h1> : 
    <div className='main'>
      {quizs}
      {!checkAns ? 
        <button className="main--check" onClick={checkAnsFn}>Check answers</button> : 
        <div>
          <p className="main--score">You scored 3/{noOfQuizs} correct answers</p>
          <button className="main--check">Play again</button>
        </div>
      }
    </div>
  )
}
