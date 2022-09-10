import React, { useState } from 'react'

export default function Option({value, handleClick, selected, matchAns}) {
  console.log(matchAns)
  return (
    <button 
      className={`
        quiz--btn 
        ${selected && 'quiz--btn__selected'} 
        ${selected && matchAns && 'quiz--btn__false'}
      `}
      onClick={handleClick}
    >
      {value}
    </button>
  )
}
