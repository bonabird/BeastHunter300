const HighScore = () => {
    // Gets the highscore form the computers memory, if there is not any highscores, it creates an empty array
    const highScores = (JSON.parse(localStorage.getItem("daddyCool")) || [])
    // Get's the new score from the most recent game
    let highScore = {
        name: sessionStorage.getItem("NameOfPlayer"),
        score: sessionStorage.getItem("playerScore")
    }
    // Adds this to the high scores
    highScores.push(highScore)
    // Sorts the high scores according to the value
    highScores.sort(function (a, b) {
        return b.score - a.score;
    });
    // Stores the new list of highscores
    localStorage.setItem("daddyCool", JSON.stringify(highScores));
    // Creates a new element to display the scores on the screen
    const highElements = highScores.map((yes, i) => (
        <p>{i + 1}) {yes.name}: {yes.score}</p>
    ))

    return (
        <div>
            <h2>Well done to these seek cans</h2>
            {highElements}
        </div>
    )
}

export default HighScore;