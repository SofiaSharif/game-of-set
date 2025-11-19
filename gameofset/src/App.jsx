import GamePanel from './components/GamePanel'
import Solutions from './components/Solutions';
import './App.css'

function App() {
  const nums = [1, 2, 3];
  const colors = ["green", "purple", "red"];
  const shapes = ["diamond", "squiggle", "oval"];
  const bgds = ["empty", "shaded", "solid"];

  let allSols = [];
  let numChecks = [];
  let cards = [];

  nums.map((num) => {
      return colors.map((color) => {
          return shapes.map((shape) => {
              return bgds.map((bgd) => {
                  const card = {num: num, color: color, shape: shape, bgd: bgd};
                  cards.push(card);
              });
          });
      });
  });
  
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

  for (let i = 0; i < cards.length; i++){
    for (let j = i + 1; j < cards.length; j++){
      for (let k = j + 1; k < cards.length; k++){
        const firstCard = cards[i];
        const secondCard = cards[j];
        const thirdCard = cards[k];

        if (checkAllSols(firstCard, secondCard, thirdCard)) {
          allSols.push([firstCard, secondCard, thirdCard]);
        }
      }
    }
  }

  return (
    <>
      <GamePanel cards={cards}/>
      <h3>Number of Checks: {numChecks}</h3>
      <h3>Number of Solutions: {allSols.length}</h3>
      <Solutions solutions={allSols}/>
    </>
  )
}

export default App;
