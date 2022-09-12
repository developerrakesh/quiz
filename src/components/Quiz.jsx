import { nanoid } from 'nanoid'
import React from 'react'
import Option from './Option'

export default function Quiz({question, allOptions, handleClick, quizId}) {

  console.log(allOptions)
  const options = allOptions.map(option => {
    return <Option 
      key={nanoid()} 
      option={option.value} 
      stat={option.stat}
      handleClick={handleClick}
      quizId={quizId}
    />
  })

  return (
    <div className='quiz'>
        <h2 className='quiz--title'>{question}</h2>
        <div className="quiz--btns">
          {options}
        </div>
    </div>
  )
}
