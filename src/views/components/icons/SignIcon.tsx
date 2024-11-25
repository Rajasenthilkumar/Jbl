import Icon from '../../../assets/icons/sign.svg';

const SignIcon = () => {
  return (
    <div>
      <img
        src={Icon as unknown as string}
        alt="sign-icon"
        className="w-4 h-4 mx-1"
      />
    </div>
  );
};

export default SignIcon;
