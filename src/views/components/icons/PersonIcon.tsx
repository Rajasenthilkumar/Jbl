import Icon from '../../../assets/icons/person-check.svg';

const PersonIcon = () => {
  return (
    <div>
      <img
        src={Icon as unknown as string}
        alt="person-icon"
        className="w-4 h-4 mx-1"
      />
    </div>
  );
};

export default PersonIcon;
