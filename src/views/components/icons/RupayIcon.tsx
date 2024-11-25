import Icon from '../../../assets/icons/rupay.svg';

const RupayCardIcon = () => {
  return (
    <div>
      <img
        src={Icon as unknown as string}
        alt="rupaycard-icon"
        className="w-10 h-10 mx-1 mr-4"
      />
    </div>
  );
};

export default RupayCardIcon;
