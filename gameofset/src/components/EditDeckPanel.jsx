import Card from './Card';
import PanelHeader from './PanelHeader';
import Draggable from 'react-draggable';
import { useRef, useState, useEffect } from 'react';

function EditDeckPanel({cards, onCardClick, isMinimized, isVisible, onMinimize, onClose, onEditDeck}) {
    const container_style = {display: isMinimized ? "none" : "grid"};
    const panel_style = {display: isVisible ? "flex" : "none"};
    const nodeRef = useRef(null);

    const [draftCards, setDraftCards] = useState([]);

    useEffect(() => {
        if (isVisible) {
        setDraftCards([...cards]); 
        }
    }, [isVisible, cards]);

    const handleSelectChange = (index, field, newValue) => {
        const nextDraft = [...draftCards];
        nextDraft[index] = { ...nextDraft[index], [field]: newValue };
        setDraftCards(nextDraft);
    };

    const handleApply = () => {
        const uniqueCards = new Set(draftCards.map(c => `${c.num}-${c.color}-${c.shape}-${c.bgd}`));
        if (uniqueCards.size !== draftCards.length) {
            alert("All cards must be unique. Please fix duplicates before applying.");
        } else {
            onEditDeck(draftCards);
            onClose();
        }   
    };

    return(
        <>
            <Draggable nodeRef={nodeRef} handle=".header" bounds="parent" defaultPosition={{x: 345, y: 220}}>
                <div ref={nodeRef} className="edit-deck-panel" style={panel_style}>
                    <PanelHeader isMinimized={isMinimized} title="Edit Deck" onMinimize={() => onMinimize("Edit Deck Panel")} onClose={() => onClose("Edit Deck Panel")}/>
                    <div className="deck-grid-editor" style={container_style}>
                        {draftCards.map((card, index) => (
                            <div key={`${card.num}-${card.color}-${card.shape}-${card.bgd}`} className="card-edit-row">
                                <span>Card {index + 1}:</span>

                                <select value={card.num} onChange={(e) => handleSelectChange(index, "num", parseInt(e.target.value))}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>

                                <select value={card.color} onChange={(e) => handleSelectChange(index, "color", e.target.value)}>
                                    <option value="red">Red</option>
                                    <option value="green">Green</option>
                                    <option value="purple">Purple</option>
                                </select>

                                <select value={card.shape} onChange={(e) => handleSelectChange(index, "shape", e.target.value)}>
                                    <option value="oval">Oval</option>
                                    <option value="diamond">Diamond</option>
                                    <option value="squiggle">Squiggle</option>
                                </select>

                                <select value={card.bgd} onChange={(e) => handleSelectChange(index, "bgd", e.target.value)}>
                                    <option value="empty">Empty</option>
                                    <option value="shaded">Shaded</option>
                                    <option value="solid">Solid</option>
                                </select>
                            </div>
                        ))}
                        <button onClick={handleApply} className="save-btn">Apply</button>
                    </div>
                </div>
            </Draggable>
        </>
    );
}

export default EditDeckPanel;