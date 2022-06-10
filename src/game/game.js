import Double from "./double";
import Single from "./single"

const Game = (props) => {
    // Depending on the maount of players, the game will show either the 2 player or 1 player version
    const how = sessionStorage.getItem("amountOfPlayers")
    return (
        <div>
            {how !== "playa" ?
                <Single
                    setReadyBoi={props.setReadyBoi}
                />
                : <Double
                    setReadyBoi={props.setReadyBoi}
                />
            }
        </div>
    )
}

export default Game;