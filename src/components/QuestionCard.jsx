function QuestionCard({ question }) {
    const answerButtons = question.answers.map((answer) => {
        return(
            <li key={answer}>
                <button>{answer}</button>
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
