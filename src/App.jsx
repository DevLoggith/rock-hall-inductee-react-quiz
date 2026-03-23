import { useState } from 'react'
import inductees from './data/inductees.json'
import './App.css'

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [askedInductees, setAskedInductees] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  return (
    <>
    </>
  )
}

export default App
