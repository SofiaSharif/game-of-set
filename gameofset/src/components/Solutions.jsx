import Card from './Card'
import PanelHeader from './PanelHeader';
import Draggable from 'react-draggable';
import { useRef } from 'react';

function Solutions({solutions, numSols, numChecks, isMinimized, isVisible, onMinimize, onClose}) {
    const container_style = {display: isMinimized ? "none" : "grid"};
    const panel_style = {display: isVisible ? "flex" : "none"};
    const nodeRef = useRef(null);

    return(
        <Draggable nodeRef={nodeRef} handle=".header" bounds="parent" defaultPosition={{x: 318, y: 20}}>
            <div ref={nodeRef} className="solutions-panel" style={panel_style}>
                <PanelHeader isMinimized={isMinimized} title="Solutions" onMinimize={() => onMinimize("Solutions Panel")} onClose={() => onClose("Solutions Panel")}/>
                <div className='solutions-container' style={container_style}>
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