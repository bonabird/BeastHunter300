const HighScore = () => {
    const highScores = (JSON.parse(localStorage.getItem("daddyCool")) || [])

    let highScore = {
        name: sessionStorage.getItem("NameOfPlayer"),
        score: sessionStorage.getItem("playerScore")
    }
    highScores.push(highScore)
    localStorage.setItem("daddyCool", JSON.stringify(highScores));

    const sortiebois = highScores.sort(function (a, b) {
        return b.score - a.score;
      });

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