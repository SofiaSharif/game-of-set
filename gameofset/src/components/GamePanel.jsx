import Card from './Card'
import Header from './Header';

function GamePanel({cards, isMinimized, onMinimize, onClose}) {
    const style = {display: isMinimized ? "none" : "grid"};

    return(
        <>
        <div className="game-panel">
            <Header isMinimized={isMinimized} title="Cards" onMinimize={() => onMinimize("Game Panel")} onClose={() => onClose("Game Panel")}/>
            <div id="cards" className="cards" style={style}>
                {cards.map((card) => (
                    <Card 
                        key={`${card.num}-${card.color}-${card.shape}-${card.bgd}`} 
                        num={card.num} 
                        color={card.color} 
                        shape={card.shape} 
                        bgd={card.bgd}
                    />
                ))}
            </div>
        </div>
        </>
    );
}

export default GamePanel;