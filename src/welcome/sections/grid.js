import { useState } from "react";

const Grid = (props) => {
        // Handles the hardness of the game 
    const [gridTime, setGridTime] = useState("")
    // Handles what the user selects
    const handleChange = e => {
        if (e.target.value) {
            setGridTime(e.target.value)
        }
    };
    // Handles when the page is submitted
    function handleSubmit(event) {
        // records the players settings in session storage
        sessionStorage.setItem("SizeMatters", gridTime)
        props.setScreen("banana pancakes")
        event.preventDefault()
    };
    return (
        <div>
            <p>Please insert grid size</p>
            <form onSubmit={handleSubmit}>
                <input
                    className="wellEndowed"
                    type="text"
                    onKeyPress={(event) => {
                        if (event.key === "Enter") {
                            handleSubmit(event)
                        } else if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                        }
                    }}
                    onChange={handleChange}
                    name="size"
                    value={gridTime}
                />
            </form>
        </div>
    )
}

export default Grid;