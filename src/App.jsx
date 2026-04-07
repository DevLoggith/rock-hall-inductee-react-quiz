import { useState } from "react";
import inductees from "./data/inductees.json";
import QuestionCard from "./components/QuestionCard.jsx";
import NextButton from "./components/NextButton.jsx";
import ViewScoreButton from "./components/ViewScoreButton.jsx";
import PlayAgainButton from "./components/PlayAgainButton.jsx";
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
		const question = generateQuestion(inductees);
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
		const scorePercentage = (correctAnswers / TOTAL_QUESTIONS) * 100;
		const gameScoreText = `You got ${correctAnswers} out of ${TOTAL_QUESTIONS} questions right`;
		let gameResponseMsg = "The Rock Hall's history runs deep, but now you know a little more of it.";

		if (scorePercentage >= 80) {
			gameResponseMsg = "Front row knowledge! You've earned your place in the crowd.";
		} else if (scorePercentage >= 60) {
			gameResponseMsg = "You've got the foundation, just a few more deep cuts to learn.";
		}
		
		return (
			<main>
				<h1 className="game-title">Rock & Roll Hall of Fame Inductee Trivia</h1>
				<h2>{gameScoreText}</h2>
				<p>{gameResponseMsg}</p>
				<PlayAgainButton onPlayAgainSelect={() => handlePlayAgain()} />
			</main>
		);
	} else {
		// question card screen
		return (
			<main>
				<h1 className="game-title">Rock & Roll Hall of Fame Inductee Trivia</h1>
				<p>
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
				{selectedAnswer != null && isGameOver ? <ViewScoreButton onResultsSelect={() => handleGameOver()} /> : null}
			</main>
		);
	}
	
}

function generateQuestion(inducteeArray) {
	// TODO: pick only from inductees that are not also present in askedInductees
	// https://github.com/DevLoggith/rock-hall-inductee-react-quiz/issues/16
	const randomIndex = Math.floor(Math.random() * inducteeArray.length);
	const inductee = inducteeArray[randomIndex];
	const answers = [inductee.inductionYear];
	const min = Math.max(answers[0] - 10, 1986);
	const max = Math.min(answers[0] + 10, 2025);

	for (let i = 1; i < 4; i++) {
		let randomYear;
		while (answers.includes(randomYear) || randomYear === undefined) {
			randomYear = Math.floor(Math.random() * (max - min + 1)) + min;
		}
		answers.push(randomYear);
	}
	const shuffledAnswers = shuffleArray(answers);

	return {
		inductee: inductee,
		answers: shuffledAnswers,
		correctAnswer: inductee.inductionYear,
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

export default Game;
