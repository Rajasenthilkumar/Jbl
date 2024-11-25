import Icon from '../../../assets/icons/link.svg';

const LinkIcon = () => {
  return (
    <div>
      <img
        src={Icon as unknown as string}
        alt="link-icon"
        className="w-4 h-4 mx-1"
      />
    </div>
  );
};

export default LinkIcon;
