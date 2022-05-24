import { useState } from "react";

const Grid = (props) => {
    const [gridTime, setGridTime] = useState("")

    const handleChange = e => {
        if (e.target.value) {
            setGridTime(e.target.value)
        }
    };

    function handleSubmit(event) {
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