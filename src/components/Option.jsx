import React, { useContext } from 'react'
import { QuizContext, AnsContext } from '../context'

export default function Option({text, rightAns, wrongAns}) {
  const handleClick = useContext(AnsContext)
  const {state, dispatch} = useContext(QuizContext)

  return (
    <button className={`quiz--btn ${state.newClass} ${rightAns} ${wrongAns}`} onClick={handleClick} >{text}</button> 
  )
}
