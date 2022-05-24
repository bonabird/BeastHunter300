import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid'
import Tile from './components/Tile';
import Player from './components/Player';
import Beast from './components/Beast';
import SuperBeast from './components/SuperBeast';

export default function Single(props) {
    let superBeastMaker = 0
    let hunter = sessionStorage.getItem("NameOfPlayer");
    let soHard = theRock(sessionStorage.getItem("HardnessOfPlayer"))
    let SizeMatters = parseInt(sessionStorage.getItem("SizeMatters"));
    const [tiles, setTiles] = useState(allNewTiles())
    const [tileElements, setTileElements] = useState()
    const [playerPosition, setPlayerPosition] = useState(0)
    const [playerPoints, setPlayerPoints] = useState(0)
    const [beastTracker, setBeastTracker] = useState()

    function theRock(maybeHard) {
        if (maybeHard === "easy") {
            return 10;
        } else if (maybeHard === "meduim") {
            return 15;
        } else {
            return 20;
        }
    }

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

        setBeastTracker(oldElements => tiles.map(tile => {
            if (tile.isBeast || tile.isSuperBeast) {
                return <li className="beastlist">{tile.points}</li>
            }
        }))

        setPlayerPoints(() => {
            for (let i = 0; i < (SizeMatters * SizeMatters); i++) {
                if (tiles[i].isPlayer) {
                    return tiles[i].points
                }
            }
        })

        window.addEventListener("keyup", onKeyup);
        return () => window.removeEventListener('keyup', onKeyup)
    })

    useEffect(() => {
        const interval = setInterval(() => {
            whoLetTheDogsOut()
        }, 5000);

        return () => clearInterval(interval);
    }, [])

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

    function whereUGonnaGo(x) {
        let y
        for (let i = 0; i < tiles.length; i++) {
            if (tiles[i].isBeast || tiles[i].isSuperBeast) {
                if (tiles[i].hasMoved === false) {
                    if ((playerPosition % SizeMatters - i % SizeMatters) < 0) {
                        y = -1
                    } else if ((playerPosition % SizeMatters - i % SizeMatters) > 0) {
                        y = 1
                    } else if (i > playerPosition) {
                        y = (-1 * SizeMatters)
                    } else if (i < playerPosition) {
                        y = SizeMatters
                    }
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

    function placePlayer(value) {
        return {
            id: nanoid(),
            value: value,
            isPlayer: true,
            hasMoved: false,
            points: 0
        }
    }

    function generateNewTiles(i) {
        return {
            id: nanoid(),
            value: i,
            hasPoint: Math.ceil(Math.random() * 20) < soHard ? false : true,
        }
    }

    function makeBeast(value) {
        return {
            id: nanoid(),
            value: value,
            isBeast: true,
            hasMoved: false,
            points: Math.ceil(Math.random() * 500)
        }
    }

    function makeSuperBeast(value, x) {
        return {
            id: nanoid(),
            value: value,
            isSuperBeast: true,
            hasMoved: false,
            points: 100 * x
        }
    }

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

    function randomLocation() {
        return Math.ceil(Math.random() * (SizeMatters * SizeMatters))
    }

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