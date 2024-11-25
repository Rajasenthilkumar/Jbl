import Icon from '../../../assets/icons/close.svg';

const CloseIcon = () => {
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

export default CloseIcon;
