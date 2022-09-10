import Start from "./components/Start"
import Main from "./components/Main"
import { useState } from "react"

function App() {
  const [showStart, setShowStart] = useState(true)
  const style1 = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
  const style2 = {
    display: 'block'
  }

  const hideStartPage = () => {
    setShowStart(false)
  }

  return (
    <div className="container" style={showStart ? style1 : style2}>
      {showStart ? <Start hide={hideStartPage} /> : <Main />}
    </div>
  )
}

export default App
