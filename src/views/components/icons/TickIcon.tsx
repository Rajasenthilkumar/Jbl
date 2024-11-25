import Icon from '../../../assets/icons/tick.svg';

const TickIcon = () => {
  return (
    <div>
      <img
        src={Icon as unknown as string}
        alt="submit-icon"
        className="w-6 h-6 mx-1"
      />
    </div>
  );
};

export default TickIcon;
