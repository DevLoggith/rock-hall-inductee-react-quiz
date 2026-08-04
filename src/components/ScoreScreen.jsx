import PlayAgainButton from "./PlayAgainButton";

function ScoreScreen({ correctAnswers, totalQuestions, playAgain }) {
    const scorePercentage = (correctAnswers / totalQuestions) * 100;
    const gameScoreText = (
        <>
            You got{" "}
            <span className="artist-name">
                {correctAnswers} out of {totalQuestions}
            </span>{" "}
            questions right
        </>
    );

    let gameResponseMsg =
        "The Rock Hall's history runs deep, but now you know a little more of it.";

    if (scorePercentage >= 80) {
        gameResponseMsg = "Front row knowledge! You've earned your place in the crowd.";
    } else if (scorePercentage >= 60) {
        gameResponseMsg = "You've got the foundation, just a few more deep cuts to learn.";
    }

    return (
        <section>
            <h2 className="score-text">{gameScoreText}</h2>
            <p className="score-response">{gameResponseMsg}</p>
            <PlayAgainButton onPlayAgainSelect={() => playAgain()} />
        </section>
    );
}

export default ScoreScreen;
