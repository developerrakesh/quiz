import React, { useEffect, useContext } from 'react'
import { QuizContext, AnsContext } from '../context'
import { DATA_RECEIVED } from '../reducer'
import Quiz from './Quiz'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

export default function Main() {
  const {state, dispatch} = useContext(QuizContext)
  const handleClick = useContext(AnsContext)
  const { width, height } = useWindowSize()
  useEffect(() => {
    //from site https://opentdb.com/api_config.php
    const url = `https://opentdb.com/api.php?amount=5&category=${state.category}&difficulty=easy&type=multiple`
    const myAbortController = new AbortController();
    (async () => {
      try {
        const res = await fetch(url, { signal: myAbortController.signal })
        const wholeData = await res.json()
        const data = wholeData.results.map(quiz => {
          const random = Math.floor((Math.random() * (quiz.incorrect_answers.length + 1)))
          quiz.incorrect_answers.splice(random, 0, quiz.correct_answer)
          return {...quiz, correctAnsPos: random} 
        })
        dispatch({type: DATA_RECEIVED, payload: data})
      } catch (err) {
        console.log(err)
      }
    })()
    return () => {
      myAbortController.abort()
    }
  }, [])
  console.log(state.data)

  const quiz = state.data.map((ques, index) => {
    return <Quiz key={index} question={ques.question} id={index} />
  })

  return (
    <div className='main'>
        {state.loading && <h1>Loading...</h1>}
        {quiz}
        {!state.loading && !state.showAns && <button className="main--check" onClick={handleClick}>Check answers</button>}
        
        {state.showAns && <>
          <p className="main--score">You scored {state.correctAns}/5 correct answers</p>
          <button className="main--play-again" onClick={handleClick}>Play again</button>
          {state.correctAns == 5 && <Confetti width={width} height={height} />}
        </>}
    </div>
  )
}
