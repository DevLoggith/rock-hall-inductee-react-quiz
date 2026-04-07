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
	const responseText = `${question.inductee.name} was inducted in ${question.correctAnswer} by ${question.inductee.inductionPresenter}`;
	const priorNoms = question.inductee.priorNominations;
	const priorNomText = `Prior nominations were in ${priorNoms.length > 1 ? priorNoms.slice(0, -1).join(", ") + " and " + priorNoms.slice(-1) : priorNoms}`;

	if (selectedAnswer === null) {
		headerText = `What year was ${question.inductee.name} inducted into the Rock & Roll Hall of Fame?`;
	} else if (selectedAnswer === question.correctAnswer) {
		headerText = "That's correct!";
	} else if (selectedAnswer !== null && selectedAnswer !== question.correctAnswer) {
		headerText = "Sorry, that's incorrect";
	}

	return (
		<article>
			<h2>{headerText}</h2>
			{selectedAnswer ? <p>{responseText}</p> : null}
			{selectedAnswer && priorNoms.length > 0 ? <p>{priorNomText}</p> : null}
			<ul>{answerButtons}</ul>
		</article>
	);
}

export default QuestionCard;
