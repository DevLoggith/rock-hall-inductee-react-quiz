import { useState } from 'react'
import AnswerButton from './AnswerButton.jsx'

function QuestionCard({ question }) {
    const [selectedAnswer, setSelectedAnswer] = useState(null);

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
