import React, { useEffect, useContext } from 'react'
import { QuizContext, AnsContext } from '../context'
import { DATA_RECEIVED } from '../reducer'
import Quiz from './Quiz'

export default function Main() {
  const {state, dispatch} = useContext(QuizContext)
  const handleClick = useContext(AnsContext)
  useEffect(() => {
    const url = 'https://opentdb.com/api.php?amount=5&category=17&difficulty=easy&type=multiple'
    const myAbortController = new AbortController();
    (async () => {
      const res = await fetch(url, { signal: myAbortController.signal })
      const wholeData = await res.json()
      const data = wholeData.results.map(quiz => {
        const random = Math.floor((Math.random() * (quiz.incorrect_answers.length + 1)))
        quiz.incorrect_answers.splice(random, 0, quiz.correct_answer)
        return {...quiz, correctAnsPos: random} 
      })
      dispatch({type: DATA_RECEIVED, payload: data})
    })()
    return () => {
      console.log('stop fetching data')
      myAbortController.abort()
    }
  }, [])

  const quiz = state.data.map((ques, index) => {
    return <Quiz key={index} question={ques.question} id={index} />
  })

  return (
    <div className='main'>
        {state.loading && <h1>Loading...</h1>}
        {quiz}
        {!state.loading && !state.showAns && <button className="main--check" onClick={handleClick}>Check answers</button>}
        
        {state.showAns && <><p className="main--score">You scored {state.correctAns}/5 correct answers</p>
        <button className="main--play-again" onClick={handleClick}>Play again</button></>}
    </div>
  )
}
