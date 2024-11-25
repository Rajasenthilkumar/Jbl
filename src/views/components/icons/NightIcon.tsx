import Icon from '../../../assets/icons/night.svg';

const NightIcon = () => {
  return (
    <div>
      <img
        src={Icon as unknown as string}
        alt="addcard-icon"
        className="w-10 h-10 mx-1"
      />
    </div>
  );
};

export default NightIcon;
