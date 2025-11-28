import GamePanel from './components/GamePanel'
import Solutions from './components/Solutions';
import './App.css'
import { useState } from 'react';

const nums = [1, 2, 3];
const colors = ["green", "purple", "red"];
const shapes = ["diamond", "squiggle", "oval"];
const bgds = ["empty", "shaded", "solid"];

let allSols = [];
let numChecks = [];
let allCards = [];
let gameCards = [];

nums.map((num) => {
    return colors.map((color) => {
        return shapes.map((shape) => {
            return bgds.map((bgd) => {
                const card = {num: num, color: color, shape: shape, bgd: bgd};
                allCards.push(card);
            });
        });
    });
});

for (let i = 0; i < 12; i++){
  const num = Math.floor(Math.random() * 80);
  if (gameCards.includes(allCards[num])){
    i--;
  } else {
    gameCards.push(allCards[num]);
  }
}

const checkAllSols = ((firstCard, secondCard, thirdCard) => {
  if (checkId(firstCard, secondCard, thirdCard) &&
      checkNum(firstCard, secondCard, thirdCard) &&
      checkColor(firstCard, secondCard, thirdCard) &&
      checkShape(firstCard, secondCard, thirdCard) &&
      checkBgd(firstCard, secondCard, thirdCard)){
        return true;
      }
  return false;
});

const checkId = ((firstCard, secondCard, thirdCard) => {
  numChecks++;
  if ((firstCard !== secondCard) && (firstCard !== thirdCard) && (secondCard !== thirdCard)){
        return true;
  }
  return false;
});

const checkNum = ((firstCard, secondCard, thirdCard) => {
  numChecks++;
  if ((firstCard.num === secondCard.num) && (secondCard.num === thirdCard.num)){
    return true;
  } else if ((firstCard.num !== secondCard.num) && (firstCard.num !== thirdCard.num) && (secondCard.num !== thirdCard.num)){
    return true;
  }
  return false;
});

const checkColor = ((firstCard, secondCard, thirdCard) => {
  numChecks++;
  if ((firstCard.color === secondCard.color) && (secondCard.color === thirdCard.color)){
    return true;
  } else if ((firstCard.color !== secondCard.color) && (firstCard.color !== thirdCard.color) && (secondCard.color !== thirdCard.color)){
    return true;
  }
  return false;
});

const checkShape = ((firstCard, secondCard, thirdCard) => {
  numChecks++;
  if ((firstCard.shape === secondCard.shape) && (secondCard.shape === thirdCard.shape)){
    return true;
  } else if ((firstCard.shape !== secondCard.shape) && (firstCard.shape !== thirdCard.shape) && (secondCard.shape !== thirdCard.shape)){
    return true;
  }
  return false;
});

const checkBgd = ((firstCard, secondCard, thirdCard) => {
  numChecks++;
  if ((firstCard.bgd === secondCard.bgd) && (secondCard.bgd === thirdCard.bgd)){
    return true;
  } else if ((firstCard.bgd !== secondCard.bgd) && (firstCard.bgd !== thirdCard.bgd) && (secondCard.bgd !== thirdCard.bgd)){
    return true;
  }
  return false;
});

for (let i = 0; i < gameCards.length; i++){
  for (let j = i + 1; j < gameCards.length; j++){
    for (let k = j + 1; k < gameCards.length; k++){
      const firstCard = gameCards[i];
      const secondCard = gameCards[j];
      const thirdCard = gameCards[k];

      if (checkAllSols(firstCard, secondCard, thirdCard)) {
        allSols.push([firstCard, secondCard, thirdCard]);
      }
    }
  }
}


function App() {
  const [windows, setWindows] = useState([
    {name: "Game Panel", isMinimized: false, isVisible: true},
    {name: "Solutions Panel", isMinimized: false, isVisible: true}
  ]);

  const onMinimize = (name) => {
      setWindows(prevWindows =>
        prevWindows.map(window =>
          window.name === name
            ? {...window, isMinimized: !window.isMinimized} : window
        )
      );
  }

  const onClose = (name) => {
    setWindows(prevWindows =>
      prevWindows.map(window =>
        window.name === name
          ? {...window, isVisible: !window.isVisible} : window
      )
    );
  }

  return (
    <>
      <GamePanel cards={gameCards} isMinimized={windows[0].isMinimized} onMinimize={onMinimize} onClose={onClose}/>
      <Solutions solutions={allSols} numChecks={numChecks} isMinimized={windows[1].isMinimized} onMinimize={onMinimize} onClose={onClose}/>
    </>
  )
}

export default App;
