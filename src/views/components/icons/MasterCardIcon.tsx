import Icon from '../../../assets/icons/mastercard.svg';

const MasterCardIcon = () => {
  return (
    <div>
      <img
        src={Icon as unknown as string}
        alt="mastercard-icon"
        className="w-10 h-10 mx-1 mr-2"
      />
    </div>
  );
};

export default MasterCardIcon;
