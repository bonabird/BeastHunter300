import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid'
import Tile from './components/Tile';
import Player from './components/Player';
import Beast from './components/Beast';
import SuperBeast from './components/SuperBeast';

export default function Double(props) {
    let superBeastMaker = 0
    let hunter = sessionStorage.getItem("NameOfPlayer");
    let hunterMan = sessionStorage.getItem("NameOfSecondPlayer");
    let soHard = theRock(sessionStorage.getItem("HardnessOfPlayer"))
    let SizeMatters = parseInt(sessionStorage.getItem("SizeMatters"));
    const [tiles, setTiles] = useState(allNewTiles())
    const [tileElements, setTileElements] = useState()
    const [onePosition, setOnePosition] = useState(0)
    const [twoPosition, setTwoPosition] = useState(0)
    const [playerPoints, setPlayerPoints] = useState(0)
    const [playerTwoPoints, setPlayerTwoPoints] = useState(0)
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
            } {
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

        // // todo: This is for the high score
        // setPlayerPoints(oldElements => tiles.map(tile => {
        //     if (tile.isPlayer && tile.player === 1) {
        //         return tile.points
        //     }
        // }))

        
        setPlayerPoints(() => {
            for (let i = 0; i < (SizeMatters * SizeMatters); i++) {
                if (tiles[i].isPlayer && tiles[i].player === 1) {
                    return tiles[i].points
                }
            }
        })

        // setPlayerTwoPoints(oldElements => tiles.map(tile => {
        //     if (tile.isPlayer && tile.player === 2) {
        //         return tile.points
        //     }
        // }))

        setPlayerTwoPoints(() => {
            for (let i = 0; i < (SizeMatters * SizeMatters); i++) {
                if (tiles[i].isPlayer && tiles[i].player === 2) {
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
                whereUGonnaGo(-1 * SizeMatters, 1)
                break;
            case "ArrowLeft":
                whereUGonnaGo(-1, 1)
                break;
            case "ArrowRight":
                whereUGonnaGo(1, 1)
                break;
            case "ArrowDown":
                whereUGonnaGo(SizeMatters, 1)
                break;
            case "w":
                whereUGonnaGo(-1 * SizeMatters, 2)
                break;
            case "a":
                whereUGonnaGo(-1, 2)
                break;
            case "d":
                whereUGonnaGo(1, 2)
                break;
            case "s":
                whereUGonnaGo(SizeMatters, 2)
                break;
        }
    }

    function frothing() {
        for (let i = 0; i < tiles.length; i++) {
            if (tiles[i].isBeast || tiles[i].isSuperBeast) {
                if (Math.sqrt((onePosition % SizeMatters - tiles[i].value % SizeMatters) + (onePosition / SizeMatters - tiles[i].value / SizeMatters)) < Math.sqrt((twoPosition % SizeMatters - tiles[i].value % SizeMatters) + (twoPosition / SizeMatters - tiles[i].value / SizeMatters))) {
                    hunting(i, onePosition, 1)
                } else {
                    hunting(i, twoPosition, 2)
                }
            }
        }
    }

    function hunting(i, thePosition, sillyBanana) {
        let y
        if (tiles[i].hasMoved === false) {
            if ((thePosition % SizeMatters - i % SizeMatters) < 0) {
                y = -1
            } else if ((thePosition % SizeMatters - i % SizeMatters) > 0) {
                y = 1
            } else if (i > thePosition) {
                y = -1 * SizeMatters
            } else if (i < thePosition) {
                y = SizeMatters
            }
            if (!tiles[i + y].isBeast && !tiles[i + y].isSuperBeast) {
                if (thePosition === (i + y)) {
                    byeFeliciaProtocal(i, sillyBanana)
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
    }

    function whereUGonnaGo(x, z) {
        for (let i = 0; i < tiles.length; i++) {
            if (tiles[i].isPlayer && tiles[i].player === z) {
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
            if (tiles[i].player === 1) {
                frothing()
                setOnePosition(i + x)
            } else if (tiles[i].player === 2) {
                setTwoPosition(i + x)

            }
        }
        [tiles[i], tiles[i + x]] = [tiles[i + x], tiles[i]]
        tiles[i + x].hasMoved = true
        return
    }

    function allNewTiles() {
        const newTiles = []
        const playerOne = randomLocation()
        const playerTwo = randomLocation()
        const beast = randomLocation()
        for (let i = 1; i <= (SizeMatters * SizeMatters); i++) {
            if (i === playerOne) {
                newTiles.push(placePlayer(playerOne, 1))
            } else if (i === playerTwo) {
                newTiles.push(placePlayer(playerTwo, 2))
            } else if (i === beast) {
                newTiles.push(makeBeast(beast))
            } else {
                newTiles.push(generateNewTiles(i))
            }
        }
        return newTiles
    }

    function placePlayer(value, no) {
        return {
            id: nanoid(),
            value: value,
            isPlayer: true,
            player: no,
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

    function byeFeliciaProtocal(i, sillyBanana) {
        if (sillyBanana === 1) {
            if (tiles[i].points > tiles[onePosition].points) {
                sessionStorage.setItem("playerScore", playerTwoPoints)
                sessionStorage.setItem("NameOfPlayer", hunterMan)
                sessionStorage.setItem("Looooser", hunter)
                props.setReadyBoi("highScore")
            } else {
                tiles[onePosition].points = tiles[i].points / 2 + tiles[onePosition].points
                tiles.splice(i, 1, { id: tiles[i].id, value: i, hasPoint: false })
            }
        } else {
            if (tiles[i].points > tiles[twoPosition].points) {
                sessionStorage.setItem("playerScore", playerPoints)
                sessionStorage.setItem("NameOfPlayer", hunter)
                sessionStorage.setItem("Looooser", hunterMan)
                props.setReadyBoi("highScore")
            } else {
                tiles[twoPosition].points = tiles[i].points / 2 + tiles[twoPosition].points
                tiles.splice(i, 1, { id: tiles[i].id, value: i, hasPoint: false })
            }
        }
    }

    return (
        <div>
            <main>
                <div className="playerstats">
                    <p>{hunter}: {playerPoints}</p>
                    <p>{hunterMan}: {playerTwoPoints}</p>
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