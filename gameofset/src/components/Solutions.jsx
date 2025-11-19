import Card from './Card'

function Solutions({solutions}) {
    return(
        <>
        <h2>Solutions</h2>
        <div className="solutions-panel">
            {solutions.map((sol) => (
                sol.map((card) => (
                    <Card 
                        key={`${card.num}-${card.color}-${card.shape}-${card.bgd}`} 
                        num={card.num} 
                        color={card.color} 
                        shape={card.shape} 
                        bgd={card.bgd}
                    />
                ))
            ))}
        </div>
        </>
    );
}

export default Solutions;