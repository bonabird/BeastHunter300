import Double from "./double";
import Single from "./single"

const Game = (props) => {
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