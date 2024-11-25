import Icon from '../../../assets/icons/protect.svg';

const LockIcon = () => {
  return (
    <div>
      <img
        src={Icon as unknown as string}
        alt="lock-icon"
        className="w-4 h-4 mx-1"
      />
    </div>
  );
};

export default LockIcon;
