import { useState } from "react";

const Difficulty = (props) => {
    const [hardness, setHardness] = useState("impossible")

    const handleChange = e => {
        if (e.target.checked) {
            setHardness(e.target.value);
        }
    };

    function handleSubmit(event) {
        sessionStorage.setItem("HardnessOfPlayer", hardness);
        props.setScreen("grid")
        event.preventDefault()
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className={`radio${hardness === "easy" ? "--checked" : ""}`}>
                    <input
                        type="radio"
                        name="hardness"
                        id="easy"
                        value="easy"
                        checked={hardness === "easy"}
                        onChange={handleChange}
                        autoFocus
                    />
                    EASY
                </div>
                <div
                    className={`radio${hardness === "meduim" ? "--checked" : ""}`}>
                    <input
                        type="radio"
                        name="hardness"
                        id="meduim"
                        value="meduim"
                        checked={hardness === "meduim"}
                        onChange={handleChange}
                    />
                    MEDUIM
                </div>
                <div
                    className={`radio${hardness === "hard" ? "--checked" : ""}`}>
                    <input
                        type="radio"
                        name="hardness"
                        id="hard"
                        value="hard"
                        checked={hardness === "hard"}
                        onChange={handleChange}
                    />
                    HARD
                </div>
                <input type="submit" hidden />
            </form>
        </div>
    )
}

export default Difficulty;