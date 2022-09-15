import React, { useState, useContext } from 'react'
import { QuizContext } from '../context'
import { UPDATE_CATEGORY } from '../reducer'

export default function Start({hide}) {
  const [goNext, setGoNext] = useState(false)
  const {state, dispatch} = useContext(QuizContext)

  function handleChange(evt) {
    dispatch({type: UPDATE_CATEGORY, payload: evt.target.value})
  }

  return (
    <>
      {!goNext ? <div className='start'>
          <h1 className='start--title'>Quizzical</h1>
          <p>Some description if needed</p>
          <button className='start--button' onClick={() => setGoNext(true)}>Start quiz</button>
      </div> : <div className='select'>
        <label htmlFor="category" className='select--label'>Select Category</label>
        <select name="category" id="category" className='select--select' onChange={handleChange} value={state.category}>
          <option value="17">Science & Nature</option>
          <option value="18">Science: Computers</option>
          <option value="19">Science: Mathematics</option>
          <option value="22">Geography</option>
          <option value="27">Animals</option>
          <option value="9">General Knowledge</option>
        </select>
        <br />
        <button className='select--button' onClick={hide}>Next</button>
      </div>
      }
    </>
  )
}
