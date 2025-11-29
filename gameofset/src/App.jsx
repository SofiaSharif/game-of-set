import GamePanel from './components/GamePanel'
import Solutions from './components/Solutions';
import './App.css'
import { useEffect, useState } from 'react';
import GameButtons from './components/GameButtons';

const nums = [1, 2, 3];
const colors = ["green", "purple", "red"];
const shapes = ["diamond", "squiggle", "oval"];
const bgds = ["empty", "shaded", "solid"];

const generateAllCards = () => {
  let deck = [];
  nums.forEach((num) => {
    colors.forEach((color) => {
        shapes.forEach((shape) => {
            bgds.forEach((bgd) => {
              const card = {num: num, color: color, shape: shape, bgd: bgd};
              deck.push(card);
            });
        });
    });
  });
  return deck;
}

const ALL_CARDS = generateAllCards();


function App() {
  const [windows, setWindows] = useState([
    {name: "Game Buttons", isMinimized: false, isVisible: true},
    {name: "Game Panel", isMinimized: false, isVisible: true},
    {name: "Solutions Panel", isMinimized: false, isVisible: true}
  ]);

  const [gameCards, setGameCards] = useState([]);
  const [allSols, setAllSols] = useState([]);
  const [numChecks, setNumChecks] = useState(0);

  useEffect(() => {
    onNewGame();
  }, []);

  const getDeck = () => {
    let deckCopy = [...ALL_CARDS];
    const gameCards = [];

    for (let i = 0; i < 12; i++){
      const index = Math.floor(Math.random() * deckCopy.length);
      gameCards.push(deckCopy[index]);
      deckCopy.splice(index, 1);
    }
    return gameCards;
  }

  const checkAllSols = ((firstCard, secondCard, thirdCard, incrementChecks) => {
    if (checkId(firstCard, secondCard, thirdCard, incrementChecks) &&
        checkNum(firstCard, secondCard, thirdCard, incrementChecks) &&
        checkColor(firstCard, secondCard, thirdCard, incrementChecks) &&
        checkShape(firstCard, secondCard, thirdCard, incrementChecks) &&
        checkBgd(firstCard, secondCard, thirdCard, incrementChecks)){
          return true;
        }
    return false;
  });


  const checkId = ((firstCard, secondCard, thirdCard, incrementChecks) => {
    incrementChecks();
    if ((firstCard !== secondCard) && (firstCard !== thirdCard) && (secondCard !== thirdCard)){
          return true;
    }
    return false;
  });

  const checkNum = ((firstCard, secondCard, thirdCard, incrementChecks) => {
    incrementChecks();
    if ((firstCard.num === secondCard.num) && (secondCard.num === thirdCard.num)){
      return true;
    } else if ((firstCard.num !== secondCard.num) && (firstCard.num !== thirdCard.num) && (secondCard.num !== thirdCard.num)){
      return true;
    }
    return false;
  });

  const checkColor = ((firstCard, secondCard, thirdCard, incrementChecks) => {
    incrementChecks();
    if ((firstCard.color === secondCard.color) && (secondCard.color === thirdCard.color)){
      return true;
    } else if ((firstCard.color !== secondCard.color) && (firstCard.color !== thirdCard.color) && (secondCard.color !== thirdCard.color)){
      return true;
    }
    return false;
  });

  const checkShape = ((firstCard, secondCard, thirdCard, incrementChecks) => {
    incrementChecks();
    if ((firstCard.shape === secondCard.shape) && (secondCard.shape === thirdCard.shape)){
      return true;
    } else if ((firstCard.shape !== secondCard.shape) && (firstCard.shape !== thirdCard.shape) && (secondCard.shape !== thirdCard.shape)){
      return true;
    }
    return false;
  });

  const checkBgd = ((firstCard, secondCard, thirdCard, incrementChecks) => {
    incrementChecks();
    if ((firstCard.bgd === secondCard.bgd) && (secondCard.bgd === thirdCard.bgd)){
      return true;
    } else if ((firstCard.bgd !== secondCard.bgd) && (firstCard.bgd !== thirdCard.bgd) && (secondCard.bgd !== thirdCard.bgd)){
      return true;
    }
    return false;
  });

  const generateSolutions = (gameCards) => {
    let checks = 0;
    const incrementChecks = () => {checks++};
    let allSols = [];
    for (let i = 0; i < gameCards.length; i++){
      for (let j = i + 1; j < gameCards.length; j++){
        for (let k = j + 1; k < gameCards.length; k++){
          const firstCard = gameCards[i];
          const secondCard = gameCards[j];
          const thirdCard = gameCards[k];

          if (checkAllSols(firstCard, secondCard, thirdCard, incrementChecks)) {
            allSols.push([firstCard, secondCard, thirdCard]);
          }
        }
      }
    }
    return {allSols, checks};
  }


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

  const onNewGame = () => {
    const newDeck = getDeck();
    const newSols = generateSolutions(newDeck);
    setGameCards(newDeck);
    setAllSols(newSols.allSols);
    setNumChecks(newSols.checks);
  }

  const onHint1 = () => {
    return;
  }

  const onHint2 = () => {
    return;
  }

  return (
    <div id="game-container">
      <GameButtons isMinimized={windows[0].isMinimized} onMinimize={onMinimize} onClose={onClose} onNewGame={onNewGame} onHint1={onHint1} onHint2={onHint2}/>
      <GamePanel cards={gameCards} isMinimized={windows[1].isMinimized} onMinimize={onMinimize} onClose={onClose}/>
      <Solutions solutions={allSols} numChecks={numChecks} isMinimized={windows[2].isMinimized} onMinimize={onMinimize} onClose={onClose}/>
    </div>
  )
}

export default App;
