import GamePanel from './components/GamePanel'
import Solutions from './components/Solutions';
import './App.css'
import { useEffect, useState } from 'react';
import GameButtons from './components/GameButtons';
import PageHeader from './components/PageHeader';

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
  const [selectedCards, setSelectedCards] = useState([]);
  const [allSols, setAllSols] = useState([]);
  const [foundSols, setFoundSols] = useState([]);
  const [numChecks, setNumChecks] = useState(0);

  useEffect(() => {
    onNewGame();
  }, []);

  useEffect(() => {
    if (selectedCards.length === 3) {
      validateSelection(selectedCards);
    }
  }, [selectedCards]);

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

  const validateSelection = (currentSelection) => {
    const getCardId = (c) => `${c.num}-${c.color}-${c.shape}-${c.bgd}`;
    const selectionIds = currentSelection.map(getCardId).sort();

    const isCorrect = allSols.some(sol => {
      const solIds = sol.map(getCardId).sort();
      return solIds.every((id, index) => id === selectionIds[index]);
    });

    const alreadyFound = foundSols.some(foundSet => {
        const foundIds = foundSet.map(getCardId).sort();
        return foundIds.every((id, index) => id === selectionIds[index]);
    });

    if (isCorrect && !alreadyFound) {
      setFoundSols(prev => [...prev, currentSelection]);
      setSelectedCards([]);
    } else {
      setSelectedCards([]);
    }
  };

  const getCardId = (c) => `${c.num}-${c.color}-${c.shape}-${c.bgd}`;

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
    setFoundSols([]);
    setSelectedCards([]);
  }

  const getNotFoundSols = () => {
    return allSols.filter(sol => {
    const solId = sol.map(getCardId).sort().join('|');

    return !foundSols.some(found => 
        found.map(getCardId).sort().join('|') === solId
    );
    });
  }

  const onHint1 = () => {
    const notFoundSols = getNotFoundSols();
    if (notFoundSols.length > 0) {
      const hintSol = notFoundSols[0];
      setSelectedCards([hintSol[0]]);
    }
  }

  const onHint2 = () => {
    const notFoundSols = getNotFoundSols();
    if (notFoundSols.length > 0) {
      const hintSol = notFoundSols[0];
      setSelectedCards([hintSol[0], hintSol[1]]);
    }
  }

  const handleCardClick = (clickedCard) => {
    setSelectedCards((prevSelected) => {
      const isAlreadySelected = prevSelected.some(
        (c) => c.num === clickedCard.num && 
              c.color === clickedCard.color && 
              c.shape === clickedCard.shape && 
              c.bgd === clickedCard.bgd
      );

      if (isAlreadySelected) {
        return prevSelected.filter(
          (c) => !(c.num === clickedCard.num && c.color === clickedCard.color && c.shape === clickedCard.shape && c.bgd === clickedCard.bgd)
        );
      }

      if (prevSelected.length >= 3) {
        return prevSelected;
      }

      return [...prevSelected, clickedCard];
    });
  };

  return (
    <>
      <PageHeader/>
      <h1>Game of Set</h1>
      <div id="game-container">
        <GameButtons isMinimized={windows[0].isMinimized} onMinimize={onMinimize} onClose={onClose} onNewGame={onNewGame} onHint1={onHint1} onHint2={onHint2}/>
        <GamePanel cards={gameCards} selectedCards={selectedCards} onCardClick={handleCardClick} isMinimized={windows[1].isMinimized} onMinimize={onMinimize} onClose={onClose}/>
        <Solutions solutions={foundSols} numSols={allSols.length} numChecks={numChecks} isMinimized={windows[2].isMinimized} onMinimize={onMinimize} onClose={onClose}/>
      </div>
    </>
  )
}

export default App;
