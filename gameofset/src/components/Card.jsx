function Card(props) {
    return (
        <img src={`src/assets/newcards/${props.num}-${props.color}-${props.shape}-${props.bgd}.gif`}></img>
    );
}

export default Card;