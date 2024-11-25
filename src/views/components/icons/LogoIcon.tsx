import Icon from '../../../assets/icons/icon-logo.svg';

const LogoIcon = () => {
  return (
    <div>
      <img
        src={Icon as unknown as string}
        alt="pdf-icon"
        className="w-4 h-4 mx-1"
      />
    </div>
  );
};

export default LogoIcon;
