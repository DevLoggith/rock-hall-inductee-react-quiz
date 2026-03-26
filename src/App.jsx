import { useState } from 'react'
import inductees from './data/inductees.json'
import QuestionCard from './components/QuestionCard.jsx'
import './App.css'

function Game() {
  const [currentQuestion, setCurrentQuestion] = useState(() => generateQuestion(inductees));
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [askedInductees, setAskedInductees] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  return (
    <main>
      <h1>Rock & Roll Hall of Fame Inductee Trivia</h1>
      <p>Question n of n</p>
      <QuestionCard question={currentQuestion} />
    </main>
  )
}

function generateQuestion(inducteeArray) {
  const randomIndex = Math.floor(Math.random() * inducteeArray.length);
  const inductee = inducteeArray[randomIndex];
  const answers = [inductee.inductionYear];
  const min = Math.max((answers[0] - 10), 1986);
  const max = Math.min((answers[0] + 10), 2025);
  

  for (let i = 1; i < 4; i++) {
    let randomYear;
    while(answers.includes(randomYear) || randomYear === undefined) {
      randomYear = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    answers.push(randomYear);
  }
  const shuffledAnswers = shuffleArray(answers);

  // TODO: add inductee to askedInductee 

  return {
    inductee: inductee,
    answers: shuffledAnswers,
    correctAnswer: inductee.inductionYear
  };
}

function shuffleArray(arr) {
  // Knuth shuffle algorithm w/immutability
  const shuffledArray = arr.slice();

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export default Game
