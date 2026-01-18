import Card from './Card';
import Header from './Header';
import Draggable from 'react-draggable';
import { useRef } from 'react';

function GamePanel({cards, selectedCards, onCardClick, isMinimized, onMinimize, onClose}) {
    const style = {display: isMinimized ? "none" : "grid"};
    const nodeRef = useRef(null);

    return(
        <>
        <Draggable nodeRef={nodeRef} handle=".header">
            <div ref={nodeRef} className="game-panel">
                <Header isMinimized={isMinimized} title="Cards" onMinimize={() => onMinimize("Game Panel")} onClose={() => onClose("Game Panel")}/>
                <div id="cards" className="cards" style={style}>
                    {cards.map((card) => (
                        <Card 
                            key={`${card.num}-${card.color}-${card.shape}-${card.bgd}`} 
                            num={card.num} 
                            color={card.color} 
                            shape={card.shape} 
                            bgd={card.bgd}
                            isSelected={selectedCards.includes(card)}
                            onClick={() => onCardClick(card)}
                        />
                    ))}
                </div>
            </div>
        </Draggable>
        </>
    );
}

export default GamePanel;