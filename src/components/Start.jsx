import React from 'react'

export default function Start({hide}) {
  return (
    <div className='start'>
        <h1 className='start--title'>Quizzical</h1>
        <p>Some description if needed</p>
        <button className='start--button' onClick={hide}>Start quiz</button>
    </div>
  )
}
