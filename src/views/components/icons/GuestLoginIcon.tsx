import Icon from '../../../assets/icons/guestLogin.svg';

const GuestLoginIcon = () => {
  return (
    <div>
      <img
        src={Icon as unknown as string}
        alt="guest-login-icon"
        className="w-4 h-4 mx-1"
      />
    </div>
  );
};

export default GuestLoginIcon;
