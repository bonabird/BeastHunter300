import { useState } from "react";

const Players = (props) => {
    const [amount, setAmount] = useState("singlePlayer")

    const handleChange = e => {
        if (e.target.checked) {
            setAmount(e.target.value);
        }
    };

    function handleSubmit(event) {
        sessionStorage.setItem("amountOfPlayers", amount);
        props.setScreen("name")
        event.preventDefault()
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className={`radio${amount === "lonely" ? "--checked" : ""}`}>
                    <input
                        type="radio"
                        name="amount"
                        id="lonely"
                        value="lonely"
                        checked={amount === "lonely"}
                        onChange={handleChange}
                        autoFocus
                    />
                    Lonely Soul
                </div>
                <div
                    className={`radio${amount === "playa" ? "--checked" : ""}`}>
                    <input
                        type="radio"
                        name="amount"
                        id="playa"
                        value="playa"
                        checked={amount === "playa"}
                        onChange={handleChange}
                    />
                    Playa
                </div>
                <input type="submit" hidden />
            </form>
        </div>
    )
}

export default Players;