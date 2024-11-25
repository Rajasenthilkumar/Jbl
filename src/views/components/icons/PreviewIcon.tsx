import Icon from '../../../assets/icons/preview.svg';

const PreviewIcon = () => {
  return (
    <div>
      <img
        src={Icon as unknown as string}
        alt="plus-icon"
        className="customize-mask w-9 h-9 mx-1"
      />
    </div>
  );
};

export default PreviewIcon;
