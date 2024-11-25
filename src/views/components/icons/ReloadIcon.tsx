import Icon from '../../../assets/icons/reload.svg';

const ReloadIcon = () => {
  return (
    <div>
      <img
        src={Icon as unknown as string}
        alt="reload-icon"
        className="w-6 h-6 mx-1"
      />
    </div>
  );
};

export default ReloadIcon;
