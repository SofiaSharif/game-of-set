import Card from './Card'
import Header from './Header';
import Draggable from 'react-draggable';
import { useRef } from 'react';

function Solutions({solutions, numChecks, isMinimized, onMinimize, onClose}) {
    const style = {display: isMinimized ? "none" : "grid"};
    const nodeRef = useRef(null);

    return(
        <Draggable nodeRef={nodeRef} handle=".header">
            <div ref={nodeRef} className="solutions-panel">
                <Header isMinimized={isMinimized} title="Solutions" onMinimize={() => onMinimize("Solutions Panel")} onClose={() => onClose("Solutions Panel")}/>
                <h3>Number of Checks: {numChecks}</h3>
                <h3>Number of Solutions: {solutions.length}</h3>
                <div className='cards' style={style}>
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
            </div>
        </Draggable>
    );
}

export default Solutions;