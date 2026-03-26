import { useState } from 'react'
import inductees from './data/inductees.json'
import QuestionCard from './components/QuestionCard.jsx'
import './App.css'

function Game() {
  const [currentQuestion, setCurrentQuestion] = useState(() => generateQuestion(inductees));
  // TODO: set initial askedInductees state to `currentQuestion.inductee.name
  const [askedInductees, setAskedInductees] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  // TODO: remove questionsAnswered state with variable:
  // const questionsAnswered = askedInductees.length;
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  // TODO: create isGameOver & TOTAL_QUESTIONS variables with:
  // const isGameOver = questionsAnswered === TOTAL_QUESTIONS;

  return (
    <main>
      <h1>Rock & Roll Hall of Fame Inductee Trivia</h1>
      <p>Question n of n</p>
      <QuestionCard question={currentQuestion} />
    </main>
  )
}

// TODO: move functions to a utils directory
function generateQuestion(inducteeArray) {
  // TODO: pick only from inductees that are not also present in askedInductees
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
