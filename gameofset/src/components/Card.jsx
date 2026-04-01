function Card(props) {
    return (
        <img onClick={props.onClick}
             className={props.isSelected ? "card-selected" : "card"} 
             src={`/newcards/${props.num}-${props.color}-${props.shape}-${props.bgd}.gif`}
        />
    );
}

export default Card;