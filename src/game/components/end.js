const EndHighScore = (props) => {
    let playerScore = sessionStorage.getItem("playerScore")
    const how = sessionStorage.getItem("amountOfPlayers")
    let hunter = sessionStorage.getItem("NameOfPlayer");
    let looser = sessionStorage.getItem("Looooser")
    return (
        <div>
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