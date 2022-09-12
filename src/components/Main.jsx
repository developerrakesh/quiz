import React from 'react'
import Quiz from './Quiz'

export default function Main() {

  return (
    <div className='main'>
        <Quiz />
        {true && <button className="main--check">Check answers</button>}
        
        {false && <><p className="main--score">You scored 3/5 correct answers</p>
        <button className="main--check">Play again</button></>}
    </div>
  )
}
