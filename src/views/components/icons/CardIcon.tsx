import Icon from '../../../assets/icons/card.svg';

const CardIcon = () => {
  return (
    <div>
      <img
        src={Icon as unknown as string}
        alt="card-icon"
        className="w-8 h-8 mx-1"
      />
    </div>
  );
};

export default CardIcon;
