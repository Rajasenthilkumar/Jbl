import Icon from '../../../assets/icons/rating.svg';

const RatingIcon = () => {
  return (
    <div>
      <img
        src={Icon as unknown as string}
        alt="plus-icon"
        className="w-5 h-5 mx-1"
      />
    </div>
  );
};

export default RatingIcon;
