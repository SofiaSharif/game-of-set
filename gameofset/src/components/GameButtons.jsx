import PanelHeader from './PanelHeader';
import Draggable from 'react-draggable';
import { useRef } from 'react';

function GameButtons({ isMinimized, onMinimize, onClose, onNewGame, onHint1, onHint2}) {
    const style = {display: isMinimized ? "none" : "grid"};
    const nodeRef = useRef(null);
    
    return(
        <Draggable nodeRef={nodeRef} handle='.header'>
            <div ref={nodeRef} className="game-btns-panel">
                <PanelHeader isMinimized={isMinimized} title="Actions" onMinimize={() => onMinimize("Game Buttons")} onClose={() => onClose("Game Buttons")}/>
                <div className="game-btn-container" style={style}>
                    <button id="new game" onClick={onNewGame}>New Game</button>
                    <button id="hint-1" onClick={onHint1}>One Card Hint</button>
                    <button id="hint-2" onClick={onHint2}>Two Card Hint</button>
                </div>
            </div>
        </Draggable>
    );
}

export default GameButtons;