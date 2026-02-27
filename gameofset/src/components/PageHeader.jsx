function PageHeader({ onClose }) {
    return (
    <div className="page-header">
        <button onClick={() => onClose("Game Buttons")}>Actions</button>
        <button onClick={() => onClose("Game Panel")}>Cards</button>
        <button onClick={() => onClose("Solutions Panel")}>Solutions</button>
        <button>Upload Deck Image</button>
        <button>How to Play</button>
        <button onClick={() => onClose("About Panel")}>About</button>
    </div>
    );
}

export default PageHeader;