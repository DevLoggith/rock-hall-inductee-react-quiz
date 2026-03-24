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

function generateQuestion(inducteeArray) {
  const randomIndex = Math.floor(Math.random() * inducteeArray.length);
  const inductee = inducteeArray[randomIndex];
  const answers = [inductee.inductionYear];

  for (let i = 1; i < 4; i++) {
    // - generate a year that is either either 10 less or ten more than answers[0]
    const min = (answers[0] - 10);
    const max = (answers[0] + 10);
    // - push that number to answers
    answers[i] = Math.floor(Math.random() * (max - min + 1)) + min;
  }
  // shuffle answers array using Fisher-Yates algorithm
  // assign to A/B/C/D options
}

export default App
