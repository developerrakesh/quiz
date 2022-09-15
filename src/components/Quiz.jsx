import { nanoid } from 'nanoid'
import React, { useContext } from 'react'
import { QuizContext } from '../context'
import Option from './Option'
import { decode } from 'html-entities'

export default function Quiz({question, id}) {
  const {state, dispatch} = useContext(QuizContext)
  const currentQuiz = state.data[id]
  const option = currentQuiz.incorrect_answers.map((el, index) => {
    return <Option 
      key={nanoid()} 
      text={el} 
      rightAns={state.showAns && state.data[id].correctAnsPos == index ? 'quiz--btn__correct' : ''} 
      wrongAns={state.data[id].wrongAnsPos == index ? 'quiz--btn__false' : ''}
    />
  })

  return (
    <div className='quiz' id={id}>
        <h2 className='quiz--title'>{decode(question)}</h2>
        <div className="quiz--btns">
          {option}
        </div>
    </div>
  )
}
