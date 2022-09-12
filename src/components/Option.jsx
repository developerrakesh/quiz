import React from 'react'

export default function Option({option, handleClick, stat, quizId}) {
  return (
    <button className='quiz--btn' onClick={evt => handleClick(evt, quizId)} data-correct={stat}>{option}</button> 
  )
}
