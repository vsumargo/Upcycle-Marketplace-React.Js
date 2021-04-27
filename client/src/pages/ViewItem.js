function ViewItem(props) {
  return (
    <div>
      <div>
        <button onClick={props.handleClick}>Back</button>
      </div>
      <h1>This is View Item page</h1>
      <img src={props.itemDetails.images[0].location} />
      <div>{props.itemDetails.title}</div>
      <div>{props.itemDetails.price}</div>
    </div>
  );
}

export default ViewItem;
