import Start from "./components/Start"
import Main from "./components/Main"
import { useState, useReducer } from "react"
import reducer from './reducer'
import { QuizContext, AnsContext } from './context'
import { REMOVE_SHOW_START, SHOW_ANS, RESET_GAME, initialState } from './reducer'

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const style1 = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
  const style2 = {
    display: 'block'
  }

  const hideStartPage = () => {
    dispatch({type: REMOVE_SHOW_START})
  }

  const processQuiz = () => {
    let count = 0;
    const data = state.data
    document.querySelectorAll('.quiz').forEach((quiz, index) => {
      if (quiz.querySelector('.quiz--btn__selected')?.textContent == state.data[index].correct_answer) {
        count++
      } else {
        quiz.querySelectorAll('.quiz--btn').forEach((quiz, i) => {
          if (quiz.classList.contains('quiz--btn__selected')) {
            data[index] = {...data[index], wrongAnsPos: i}
          } 
        })
      } 
    })
    dispatch({type: SHOW_ANS, payload: {data, count}})
  }

  const handleClick = evt => {
    const elem = evt.target

    if (elem.classList.contains('quiz--btn')) {
      elem.parentElement.querySelectorAll('.quiz--btn').forEach(btn => {
        btn.className = 'quiz--btn'
      })
      elem.classList.add('quiz--btn__selected')
    }  

    if (elem.classList.contains('main--check')) {
      processQuiz()
    }

    if (elem.classList.contains('main--play-again')) {
      dispatch({type: RESET_GAME})
    }
  }

  return (
    <QuizContext.Provider value={{state, dispatch}}>
      <AnsContext.Provider value={handleClick}>
        <div className="container" style={state.showStart ? style1 : style2}>
          {state.showStart ? <Start hide={hideStartPage} /> : <Main />}
        </div>
      </AnsContext.Provider>
    </QuizContext.Provider>
  )
}

export default App
