import { Link } from "react-router-dom";

function ItemCard(props) {
  return (
      <div index={props.index} onClick={props.handleClick}>
        <img style={{ width: 300 }} src={props.details.images[0].location} />
        <div>{props.details.title}</div>
        <div>{props.details.price}</div>
      </div>
  );
}

export default ItemCard;
