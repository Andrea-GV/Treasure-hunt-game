import { useState } from 'react'
import './App.css'
import Board from './board/Board';
import { useCallback } from 'react';


function App() {

  const [attempts, setAttempts] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const handleAttempts = () => {
    setAttempts(prevAttempts => prevAttempts + 1)
  }
  const handleReset = useCallback(() => {
    setAttempts(0);
    setGameStarted(false);
  }, [setAttempts, setGameStarted]);

  return (
    <>
      <section className='app'>
        <h1>🏴‍☠️ Welcome to the treasure hunt! 🏴‍☠️</h1>
        <h2 className='attemps'>Attemps: <span>{attempts} 🔥</span></h2>
        <Board className="board" onAttempt={handleAttempts} onReset={handleReset} gameStarted={gameStarted} setGameStarted={setGameStarted}></Board>
        <button onClick={handleReset}> Reset Game ☠️ </button>
      </section>

    </>
  )
}

export default App
