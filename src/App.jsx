import { useState } from 'react'
import inductees from './data/inductees.json'
import './App.css'

function App() {
  console.log(inductees)
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <button
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>
    </>
  )
}

export default App
