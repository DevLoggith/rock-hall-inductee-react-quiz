import { useState } from 'react'
import AnswerButton from './AnswerButton.jsx'

function QuestionCard({ question }) {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    
    function handleSelect(answer) {
        setSelectedAnswer(answer);
    }

    const answerButtons = question.answers.map((answer) => {
        function conditionalStyling() {
            if (answer === question.correctAnswer) {
                return 'correct';
            }
            if (answer === selectedAnswer && answer !== question.correctAnswer) {
                return 'incorrect';
            }
            return '';
        }

        return(
            <li key={answer}>
                <AnswerButton 
                    className={selectedAnswer ? conditionalStyling() : ''}
                    value={answer} 
                    onAnswerSelect={() => handleSelect(answer)}
                    disabled={selectedAnswer ? true : false}
                />
            </li>
        )
    });

    // TODO: conditionally render text based on answer:
        // if yes, style green & display:
            // "That's correct!"
            // "{artist} was inducted in {year} by {presenter}"
        // if no style red & display:
            // "Sorry, that's incorrect"
            // "{artist} was inducted in {year} by {presenter}"

    return(
        <article>
            <h2>what year was {question.inductee.name} inducted into the Rock & Roll Hall of Fame?</h2>
            <ul>{answerButtons}</ul>
        </article>
    );
}

export default QuestionCard;
