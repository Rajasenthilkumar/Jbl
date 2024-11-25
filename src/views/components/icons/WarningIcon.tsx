import Icon from '../../../assets/icons/warning.svg';

const WarningIcon = () => {
  return (
    <div>
      <img
        src={Icon as unknown as string}
        alt="warning-icon"
        className="w-6 h-6 mx-1"
      />
    </div>
  );
};

export default WarningIcon;
