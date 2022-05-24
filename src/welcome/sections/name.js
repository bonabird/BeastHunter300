import { useState } from "react";

const Name = (props) => {
    const how = sessionStorage.getItem("amountOfPlayers")
    const [secretIdentity, setSecretIdentity] = useState(" ")
    const [anotherSecretIdentity, setAnotherSecretIdentity] = useState(" ")

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

    function handleSubmit(event) {
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