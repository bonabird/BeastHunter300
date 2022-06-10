import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid'
import Tile from './components/Tile';
import Player from './components/Player';
import Beast from './components/Beast';
import SuperBeast from './components/SuperBeast';

export default function Single(props) {
    // initialises the value in order to create *SuperBeasts*
    let superBeastMaker = 0
    // Retrieves the game settings
    let hunter = sessionStorage.getItem("NameOfPlayer");
    let soHard = theRock(sessionStorage.getItem("HardnessOfPlayer"))
    let SizeMatters = parseInt(sessionStorage.getItem("SizeMatters"));
    // Handles the states of the various elements
    const [tiles, setTiles] = useState(allNewTiles())
    const [tileElements, setTileElements] = useState()
    const [playerPosition, setPlayerPosition] = useState(0)
    const [playerPoints, setPlayerPoints] = useState(0)
    const [beastTracker, setBeastTracker] = useState()
    // Handles the difficulty of the game
    function theRock(maybeHard) {
        if (maybeHard === "easy") {
            return 10;
        } else if (maybeHard === "meduim") {
            return 15;
        } else {
            return 20;
        }
    }
    // Handles what the tiles display
    useEffect(() => {
        setTileElements(oldElements => tiles.map(tile => {
            if (tile.isPlayer) {
                return <Player
                    isPlayer={tile.isPlayer}
                />
            } else if (tile.isBeast) {
                return <Beast
                    isBeast={tile.isBeast}
                />
            } else if (tile.isSuperBeast) {
                return <SuperBeast
                    isBeast={tile.isSuperBeast}
                />
            } else {
                return <Tile
                    key={tile.id}
                    value={tile.value}
                    hasPoint={tile.hasPoint}
                />
            }
        }))
        // Handles the location of the various beasts
        setBeastTracker(oldElements => tiles.map(tile => {
            if (tile.isBeast || tile.isSuperBeast) {
                return <li className="beastlist">{tile.points}</li>
            }
        }))
        // Handles the players points
        setPlayerPoints(() => {
            for (let i = 0; i < (SizeMatters * SizeMatters); i++) {
                if (tiles[i].isPlayer) {
                    return tiles[i].points
                }
            }
        })
        // Handles the key presses
        window.addEventListener("keyup", onKeyup);
        return () => window.removeEventListener('keyup', onKeyup)
    })
    // Handles the creating of new beasts
    useEffect(() => {
        const interval = setInterval(() => {
            whoLetTheDogsOut()
        }, 5000);

        return () => clearInterval(interval);
    }, [])
    // Function that gets called and calls a function wit the relevent movement
    function onKeyup(e) {
        switch (e.key) {
            case "ArrowUp":
                whereUGonnaGo((-1 * SizeMatters))
                break;
            case "ArrowLeft":
                whereUGonnaGo(-1)
                break;
            case "ArrowRight":
                whereUGonnaGo(1)
                break;
            case "ArrowDown":
                whereUGonnaGo(SizeMatters)
                break;
        }
    }
    //Funciton in charge of what happens with the beast
    function whereUGonnaGo(x) {
        let y
        for (let i = 0; i < tiles.length; i++) {
            //cheacks which tiles hold a beast/superbeast
            if (tiles[i].isBeast || tiles[i].isSuperBeast) {
                // Checks whether the beast has moved
                if (tiles[i].hasMoved === false) {
                    // Makes the beast follow the location of the plater
                    if ((playerPosition % SizeMatters - i % SizeMatters) < 0) {
                        y = -1
                    } else if ((playerPosition % SizeMatters - i % SizeMatters) > 0) {
                        y = 1
                    } else if (i > playerPosition) {
                        y = (-1 * SizeMatters)
                    } else if (i < playerPosition) {
                        y = SizeMatters
                    }
                    // Checks if the next tile is a player or not
                    if (!tiles[i + y].isBeast && !tiles[i + y].isSuperBeast) {
                        if (playerPosition === (i + y)) {
                            byeFeliciaProtocal(i)
                        }
                        if (tiles[i].isBeast || tiles[i].isSuperBeast) {
                            runForrestRun(y, i, false)
                            if (y < 0) {
                                i = i + y - 1
                            }
                        }
                    }
                } else if (tiles[i].hasMoved === true) {
                    tiles[i].hasMoved = false
                }
            } else if (tiles[i].isPlayer) {
                if (tiles[i].hasMoved === false) {
                    if (!(i % SizeMatters === (SizeMatters - 1) && x === 1) && !(i % SizeMatters === 0 && x === -1)) {
                        // if ((i + x) === (i + y)) {
                        //   byeFeliciaProtocal(i)
                        // }
                        runForrestRun(x, i, true)
                        if (x < 0) {
                            i = i + x - 1
                        }
                    }
                } else if (tiles[i].hasMoved === true) {
                    tiles[i].hasMoved = false
                }
            }
        }
    }
    // Moves the player according to the button clicked
    function runForrestRun(x, i, player) {
        if (player) {
            if (tiles[i + x].hasPoint) {
                tiles[i].points = tiles[i].points + 5
                tiles[i + x].hasPoint = false
            }
            setPlayerPosition(i + x)
        }
        [tiles[i], tiles[i + x]] = [tiles[i + x], tiles[i]]
        tiles[i + x].hasMoved = true
        return
    }
    // Decides what tile should represent what
    function allNewTiles() {
        const newTiles = []
        const value = randomLocation()
        const valueTwo = randomLocation()
        for (let i = 1; i <= (SizeMatters * SizeMatters); i++) {
            if (i === value) {
                newTiles.push(placePlayer(value))
            } else if (i === valueTwo) {
                newTiles.push(makeBeast(valueTwo))
            } else {
                newTiles.push(generateNewTiles(i))
            }
        }
        return newTiles
    }
    // Handles the creation of players
    function placePlayer(value) {
        return {
            id: nanoid(),
            value: value,
            isPlayer: true,
            hasMoved: false,
            points: 0
        }
    }
    // Handles the creation of tiles
    function generateNewTiles(i) {
        return {
            id: nanoid(),
            value: i,
            hasPoint: Math.ceil(Math.random() * 20) < soHard ? false : true,
        }
    }
    // Handles the creation of beasts
    function makeBeast(value) {
        return {
            id: nanoid(),
            value: value,
            isBeast: true,
            hasMoved: false,
            points: Math.ceil(Math.random() * 500)
        }
    }
    // Handles the creation of superbeasts
    function makeSuperBeast(value, x) {
        return {
            id: nanoid(),
            value: value,
            isSuperBeast: true,
            hasMoved: false,
            points: 100 * x
        }
    }
    // Creates a beast/superbeast
    function whoLetTheDogsOut() {
        superBeastMaker = superBeastMaker + 1
        const where = randomLocation()
        for (let i = 1; i <= (SizeMatters * SizeMatters); i++) {
            if (i === where) {
                if (superBeastMaker % 5 === 0) {
                    return tiles[i] = makeSuperBeast(where, superBeastMaker)
                }
                return tiles[i] = makeBeast(where)
            }
        }
    }
    // Calls a random locatuion on the board
    function randomLocation() {
        return Math.ceil(Math.random() * (SizeMatters * SizeMatters))
    }
    // Checks whether the player is stronger than the best
    function byeFeliciaProtocal(i) {
        if (tiles[i].points > tiles[playerPosition].points) {
            sessionStorage.setItem("playerScore", playerPoints)
            props.setReadyBoi("highScore")
        } else {
            tiles[playerPosition].points = tiles[i].points / 2 + tiles[playerPosition].points
            tiles.splice(i, 1, { id: tiles[i].id, value: i, hasPoint: false })
        }
    }

    return (
        <div>
            <main>
                <div className="playerstats">
                    <p>{hunter}</p>
                    <p>{playerPoints}</p>
                </div>
                <div className="coliseum">
                    <div className="tile"
                        style={{
                            gridTemplateRows: `repeat(${SizeMatters}, 10px)`,
                            gridTemplateColumns: `repeat(${SizeMatters}, 10px)`
                        }}
                    >
                        {tileElements}
                    </div>
                </div>
                <div>
                    <ul>{beastTracker}</ul>
                </div>
            </main>
        </div>
    );
}