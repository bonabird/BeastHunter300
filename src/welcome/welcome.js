import { useState } from "react";
import Difficulty from "./sections/difficulty";
import Grid from "./sections/grid";
import Name from "./sections/name";
import Players from "./sections/players";

const Welcome = (props) => {
    const [screen, setScreen] = useState("players")

    return (
        <div>
            <p>
                <small>
                    Welcome to
                </small>
            </p>
            <h2>BeastHunter3000</h2>
            {screen === "players" ?
                <Players
                    setScreen={setScreen}
                />
                : screen === "name" ?
                    <Name
                        setScreen={setScreen}
                    />
                    : screen === "difficulty" ?
                        <Difficulty
                            setScreen={setScreen}
                        />
                        : screen === "grid" ?
                            <Grid
                            setScreen={setScreen}
                            />
                            : props.setReadyBoi("YeeeBoi")
            }
        </div>
    )
}

export default Welcome;