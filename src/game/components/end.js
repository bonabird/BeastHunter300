const EndHighScore = (props) => {
    // Gets the data from the session and stores them in variables
    let playerScore = sessionStorage.getItem("playerScore")
    let how = sessionStorage.getItem("amountOfPlayers");
    let hunter = sessionStorage.getItem("NameOfPlayer");
    let looser = sessionStorage.getItem("Looooser")
    return (
        <div>
            {/* If statement to determine whether it was a two or one player game */}
            {how === "playa" ?
                <div>
                    <p>{looser} LOST</p>
                    <p>That Silly Banana</p>
                    <h3>{hunter} WON!</h3>
                    <p>Score: {playerScore}</p>
                </div>
                : <div>
                    <p>{hunter}</p>
                    <h1>YOU DIED</h1>
                    <p>You Silly Banana</p>
                    <p>Score: {playerScore}</p>
                </div>
            }
        </div>
    )
}

export default EndHighScore;