import Card from './Card'

function GamePanel({cards}) {
    return(
        <>
        <h2>Cards</h2>
        <div className="game-panel">
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
        </>
    );
}

export default GamePanel;