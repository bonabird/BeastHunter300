import { useState } from 'react';
import './App.css';
import EndHighScore from './game/components/end';
import HighScore from './game/components/score';
import Title from './game/components/title';
import Game from './game/game';
import Welcome from './welcome/welcome';

function App() {
  const [readyBoi, setReadyBoi] = useState("naFam");

  return (
    <div className="App">
      <header>
        {readyBoi === "naFam" ?
          <Welcome
            setReadyBoi={setReadyBoi}
          />
          : readyBoi === "YeeeBoi" ?
            <Title />
            : <EndHighScore readyBoi={readyBoi} />
        }
      </header>
      {readyBoi === "YeeeBoi" ?
        <Game
          setReadyBoi={setReadyBoi}
        />
        : readyBoi === "highScore" ?
         <HighScore />
         : ""
      }

    </div>
  );
}

export default App;

// function printerBoi (){
//   console.log(sessionStorage.getItem("amountOfPlayers"))
//   console.log(sessionStorage.getItem("NameOfPlayer"))
//   console.log(sessionStorage.getItem("HardnessOfPlayer"))
//   console.log(sessionStorage.getItem("SizeMatters"))
//   <button onClick={printerBoi}>Click Me</button>
// }