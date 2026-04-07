import AnswerButton from "./AnswerButton.jsx";

function QuestionCard({ question, selectedAnswer, selectAnswer, correctAnswer }) {
	function handleSelect(answer) {
		selectAnswer(answer);
		if (answer === question.correctAnswer) correctAnswer();
	}

	const answerButtons = question.answers.map((answer) => {
		function conditionalStyling() {
			if (answer === question.correctAnswer) {
				return "correct";
			}
			if (answer === selectedAnswer && answer !== question.correctAnswer) {
				return "incorrect";
			}
			return "";
		}

		return (
			<li key={answer}>
				<AnswerButton
					className={selectedAnswer ? conditionalStyling() : ""}
					value={answer}
					onAnswerSelect={() => handleSelect(answer)}
					disabled={selectedAnswer !== null}
				/>
			</li>
		);
	});

	let headerText;
	const responseText = (
		<>
			<span className="artist-name">{question.inductee.name}</span> was inducted in{" "}
			{question.correctAnswer} by{" "}
			<span className="artist-name">{question.inductee.inductionPresenter}</span>
		</>
	);
	const priorNoms = question.inductee.priorNominations;
	const priorNomText = `Prior nominations were in ${priorNoms.length > 1 ? priorNoms.slice(0, -1).join(", ") + " and " + priorNoms.slice(-1) : priorNoms}`;

	if (selectedAnswer === null) {
		headerText = (
			<>
				What year was <span className="artist-name">{question.inductee.name}</span> inducted
				into the Rock & Roll Hall of Fame?
			</>
		);
	} else if (selectedAnswer === question.correctAnswer) {
		headerText = (
			<>
				<span className="correct-response">That's correct!</span>
			</>
		);
	} else if (selectedAnswer !== null && selectedAnswer !== question.correctAnswer) {
		headerText = (
			<>
				<span className="incorrect-response">Sorry, that's incorrect</span>
			</>
		);
	}

	return (
		<article className="question-card">
			<h2>{headerText}</h2>
			{selectedAnswer ? <p>{responseText}</p> : null}
			{selectedAnswer && priorNoms.length > 0 ? <p>{priorNomText}</p> : null}
			<ul>{answerButtons}</ul>
		</article>
	);
}

export default QuestionCard;
