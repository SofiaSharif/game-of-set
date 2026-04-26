import Card from './Card';
import PanelHeader from './PanelHeader';
import Draggable from 'react-draggable';
import { useRef } from 'react';

function GamePanel({cards, selectedCards, onCardClick, isMinimized, isVisible, onMinimize, onClose}) {
    const container_style = {display: isMinimized ? "none" : "grid"};
    const panel_style = {display: isVisible ? "flex" : "none"};
    const nodeRef = useRef(null);

    return(
        <>
        <Draggable nodeRef={nodeRef} handle=".header" bounds="parent" defaultPosition={{x: -82, y: 20}}>
            <div ref={nodeRef} className="game-panel" style={panel_style}>
                <PanelHeader isMinimized={isMinimized} title="Deck" onMinimize={() => onMinimize("Game Panel")} onClose={() => onClose("Game Panel")}/>
                <div id="cards" className="cards" style={container_style}>
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