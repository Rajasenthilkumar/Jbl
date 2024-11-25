interface CardProps {
  cardinfoclassName: string;
  emergencycardtitle: string;
  emergencycardValue: string;
  profileType: string;
  subclassName: string;
  textDetailsclassName: string;
}

const EmergencyCardComponent: React.FC<CardProps> = ({
  cardinfoclassName,
  emergencycardtitle,
  emergencycardValue,
  subclassName,
  textDetailsclassName,
}) => {
  return (
    <div className="bg-white p-4 custom-creditcard br-bl-10px">
      <div className="">
        <div className="">
          <h2 className={subclassName}>{emergencycardtitle}</h2>
          <div className={cardinfoclassName}>
            <p className={textDetailsclassName}>{emergencycardValue}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EmergencyCardComponent;
