import Icon from '../../../assets/icons/eraser.svg';

const EraseIcon = () => {
  return (
    <div>
      <img
        src={Icon as unknown as string}
        alt="erase-icon"
        className="w-6 h-6 mx-1"
      />
    </div>
  );
};

export default EraseIcon;
