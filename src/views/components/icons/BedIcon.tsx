import Icon from '../../../assets/icons/guest-stay/outline.svg';
import '../../../styles.scss';

const BedIcon = () => {
  return (
    <div className="bed-icon">
      <img src={Icon as unknown as string} alt="bed-icon" />
    </div>
  );
};

export default BedIcon;
