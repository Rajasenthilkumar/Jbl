import Icon from '../../../assets/icons/location.svg';

const LocationIcon = () => {
  return (
    <div>
      <img
        src={Icon as unknown as string}
        alt="location-icon"
        className="w-3 h-3 mx-1"
      />
    </div>
  );
};

export default LocationIcon;
