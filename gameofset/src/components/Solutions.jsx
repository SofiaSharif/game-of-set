import Card from './Card'
import PanelHeader from './PanelHeader';
import Draggable from 'react-draggable';
import { useRef } from 'react';

function Solutions({solutions, numSols, numChecks, isMinimized, onMinimize, onClose}) {
    const style = {display: isMinimized ? "none" : "grid"};
    const nodeRef = useRef(null);

    return(
        <Draggable nodeRef={nodeRef} handle=".header">
            <div ref={nodeRef} className="solutions-panel">
                <PanelHeader isMinimized={isMinimized} title="Solutions" onMinimize={() => onMinimize("Solutions Panel")} onClose={() => onClose("Solutions Panel")}/>
                <div className='solutions-container' style={style}>
                    <h3>Number of Checks: {numChecks}</h3>
                    <h3>Solutions Found: {solutions.length} of {numSols}</h3>
                    <div className='cards'>
                        {solutions.map((sol, index) => (
                            <div key={index} className="solution-row">
                                {sol.map((card) => (
                                    <Card 
                                        key={`${card.num}-${card.color}-${card.shape}-${card.bgd}`} 
                                        num={card.num} 
                                        color={card.color} 
                                        shape={card.shape} 
                                        bgd={card.bgd}
                                        isSelected={false}
                                        onClick={() => {}}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Draggable>
    );
}

export default Solutions;