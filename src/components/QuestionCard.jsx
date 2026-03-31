import { useState } from 'react'
import AnswerButton from './AnswerButton.jsx'

function QuestionCard({ question }) {
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    // TODO: create selected answer button onClick callback setSelectedAnswer
    // check if selectedAnswer === currentQuestion.correctAnswer
        // if yes, style green & display:
            // "That's correct!"
            // "{artist} was inducted in {year} by {presenter}"
        // if no style red & display:
            // "Sorry, that's incorrect"
            // "{artist} was inducted in {year} by {presenter}"

    const answerButtons = question.answers.map((answer) => {
        return(
            <li key={answer}>
                <AnswerButton value={answer} />
            </li>
        )
    });

    return(
        <article>
            <h2>what year was {question.inductee.name} inducted into the Rock & Roll Hall of Fame?</h2>
            <ul>{answerButtons}</ul>
        </article>
    );
}

export default QuestionCard;
