import Icon from '../../../assets/icons/plus.svg';

const PlusIcon = () => {
  return (
    <div>
      <img
        src={Icon as unknown as string}
        alt="plus-icon"
        className="w-4 h-4 mx-1"
      />
    </div>
  );
};

export default PlusIcon;
