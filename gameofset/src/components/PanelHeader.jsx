function PanelHeader({title, isMinimized, onMinimize, onClose}) {
    const style = {borderRadius: isMinimized ? "20px" : "20px 20px 0 0"};

    return(
        <div className='header' style={style}>
            <h2>{title}</h2>
            <div className='buttons'>
                <button className='minimize-btn' onClick={onMinimize}>-</button>
                <button className='close-btn' onClick={onClose}>x</button>
            </div> 
        </div>
    );
}

export default PanelHeader;