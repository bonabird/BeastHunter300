import { useState } from "react";

const Name = (props) => {
        // Handles the hardness of the game 
    const how = sessionStorage.getItem("amountOfPlayers")
    const [secretIdentity, setSecretIdentity] = useState("")
    const [anotherSecretIdentity, setAnotherSecretIdentity] = useState("")
    // Handles what the user selects
    const handleChange = e => {
        if (e.target.value) {
            setSecretIdentity(e.target.value)
        }
    };

    const handleChanges = e => {
        if (e.target.value) {
            setAnotherSecretIdentity(e.target.value)
        }
    };
    // Handles when the page is submitted
    function handleSubmit(event) {
        // records the players settings in session storage
        if (how === "playa") {
            sessionStorage.setItem("NameOfSecondPlayer", anotherSecretIdentity)
        }
        sessionStorage.setItem("NameOfPlayer", secretIdentity)
        props.setScreen("difficulty")
        event.preventDefault()
    };


    return (
        <div>
            <p>Please insert name</p>
            <form onSubmit={handleSubmit}>
                <input
                    className="wellEndowed"
                    type="text"
                    onChange={handleChange}
                    name="identity"
                    value={secretIdentity}
                />
            </form>
            {how === "playa" ?
                <div>
                    <p>Please insert player 2's name</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            className="wellEndowed"
                            type="text"
                            onChange={handleChanges}
                            name="anotherIdentity"
                            value={anotherSecretIdentity}
                        />
                    </form>
                </div>
                : ""
            }
        </div>
    )
}

export default Name;