import Card from './Card'

function GamePanel() {
    const nums = [1, 2, 3];
    const colors = ["green", "purple", "red"];
    const shapes = ["diamond", "squiggle", "oval"];
    const bgds = ["empty", "shaded", "solid"];

    return(
        <>
        <h2>Cards</h2>
        <div className="game-panel">
            {nums.map((num) => {
                return colors.map((color) => {
                    return shapes.map((shape) => {
                        return bgds.map((bgd) => {
                            const uniqueKey = `${num}-${color}-${shape}-${bgd}`;
                            return <Card key={uniqueKey} num={num} color={color} shape={shape} bgd={bgd} />;
                        });
                    });
                });
            })}
        </div>
        </>
    );
}

export default GamePanel;