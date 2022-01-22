import './SingleCard.css';

const SingleCard = (props) => {
  return (
    <div className="card" onClick={props.onClick}>
      <img
        src={props.src}
        className={`front ${props.visible ? 'flipped' : ''}`}
        alt="card front"
      />
      {/* <img src="/img/cover.png" className="back" alt="card back" /> */}
      <div className={`back ${props.visible ? 'flipped' : ''}`}></div>
    </div>
  );
};

export default SingleCard;
