import Icon from '../../../assets/icons/user.svg';

const UserIcon = () => {
  return (
    <div>
      <img
        src={Icon as unknown as string}
        alt="user-icon"
        className="w-4 h-4 mx-1"
      />
    </div>
  );
};

export default UserIcon;
