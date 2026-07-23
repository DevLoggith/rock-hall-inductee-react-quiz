import { useState } from "react";
import inductees from "./data/inductees.json";
import { generateQuestion } from "./utils/generateQuestion.js";
import QuestionCard from "./components/QuestionCard.jsx";
import NextButton from "./components/NextButton.jsx";
import ViewScoreButton from "./components/ViewScoreButton.jsx";
import PlayAgainButton from "./components/PlayAgainButton.jsx";
import ScoreScreen from "./components/ScoreScreen.jsx";
import "./App.css";

function Game() {
	const [currentQuestion, setCurrentQuestion] = useState(() => generateQuestion(inductees));
	const [askedInductees, setAskedInductees] = useState([currentQuestion.inductee.name]);
	const [correctAnswers, setCorrectAnswers] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [showScore, setShowScore] = useState(false);

	const TOTAL_QUESTIONS = 5;
	const questionsAnswered = askedInductees.length;
	const isGameOver = questionsAnswered === TOTAL_QUESTIONS;

	function handleCorrectAnswer() {
		setCorrectAnswers(correctAnswers + 1);
	}

	function onAnswerSelected(answer) {
		setSelectedAnswer(answer);
	}

	function handleNext() {
		const question = generateQuestion(inductees, askedInductees);
		setCurrentQuestion(question);
		setAskedInductees((prev) => [...prev, question.inductee.name]);
		setSelectedAnswer(null);
	}

	function handleGameOver() {
		setShowScore(true);
	}

	function handlePlayAgain() {
		const question = generateQuestion(inductees);
		setCurrentQuestion(question);
		setAskedInductees([question.inductee.name]);
		setCorrectAnswers(0);
		setSelectedAnswer(null);
		setShowScore(false);
	}

	if (showScore) {
		// score results screen
		return (
			<main>
				<h1 className="game-title">Rock & Roll Hall of Fame Inductee Trivia</h1>
				<ScoreScreen
					playAgain={() => handlePlayAgain()}
					correctAnswers={correctAnswers}
					totalQuestions={TOTAL_QUESTIONS}
				/>
			</main>
		);
	} else {
		// question card screen
		return (
			<main>
				<h1 className="game-title">Rock & Roll Hall of Fame Inductee Trivia</h1>
				<p className="progress-tracker">
					Question {questionsAnswered} of {TOTAL_QUESTIONS}
				</p>
				<QuestionCard
					question={currentQuestion}
					selectedAnswer={selectedAnswer}
					selectAnswer={(answer) => onAnswerSelected(answer)}
					correctAnswer={() => handleCorrectAnswer()}
				/>
				{selectedAnswer && !isGameOver ? (
					<NextButton onNextSelect={() => handleNext()} />
				) : null}
				{selectedAnswer != null && isGameOver ? (
					<ViewScoreButton onResultsSelect={() => handleGameOver()} />
				) : null}
			</main>
		);
	}
}

export default Game;
