import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import Option from './Option'

export default forwardRef(function Quiz({question, allOptions, correctAns}, ref) {
  const [selectedBtnId, setSelectedBtnId] = useState("")
  const [matchAns, setMatchAns] = useState(false)

  useImperativeHandle(ref, () => {
    return {
      consol: () => setMatchAns(true)
    }
  })

  function btnClicked(id) {
    console.log(id)
    setSelectedBtnId(id)
  }
  const options = allOptions.map(option => {
    const id = option
    return <Option 
      key={id} 
      value={option} 
      handleClick={() => btnClicked(id)} 
      selected={selectedBtnId === id} 
      matchAns={matchAns}
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
})
