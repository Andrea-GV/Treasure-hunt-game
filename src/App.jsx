import { useState } from 'react'
import './App.css'
import Board from './board/Board';


function App() {

  const [attempts, setAttempts] = useState(0);
  const handleAttempts = () => {
    setAttempts(prevAttempts => prevAttempts + 1)
  }
  // const handlePrompt = () => {
  //   setPrompt()
  // }

  return (
    <>
      <section className='app'>
        <h2 className='attemps'>Attemps: <span>{attempts}</span></h2>
        {/* <button onClick={handlePrompt}>Start</button> */}
        {/* <button onClick={handleReset}>Reset</button> */}
        <Board className="board" onAttempt={handleAttempts}></Board>
      </section>

    </>
  )
}

export default App
