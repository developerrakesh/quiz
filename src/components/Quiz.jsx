import React from 'react'
import Option from './Option'

export default function Quiz() {

  return (
    <div className='quiz'>
        <h2 className='quiz--title'>How would one say goodbye in Spanish?</h2>
        <div className="quiz--btns">
          <Option />
          <Option />
          <Option />
          <Option />
        </div>
    </div>
  )
}
