import Icon from '../../../assets/icons/date.svg';

const DateIcon = () => {
  return (
    <div>
      <img
        src={Icon as unknown as string}
        alt="plus-icon"
        className="w-10 h-10 mx-1"
      />
    </div>
  );
};

export default DateIcon;
