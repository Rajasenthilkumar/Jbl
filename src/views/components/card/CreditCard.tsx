interface CardProps {
  cardLogo: string;
  cardinfoclassName: string;
  title: string;
  imageUrl: string;
  textValue: string;
  infoClassname: string;
  subclassName: string;
  textDetailsclassName: string;
  cardNameValue: string;
  cardName: string;
  expirydateValue: string;
  expirydateLabel: string;
  titleDetail: string;
}

const CreditCardComponent: React.FC<CardProps> = ({
  cardinfoclassName,
  title,
  textValue,
  infoClassname,
  subclassName,
  textDetailsclassName,
  cardName,
  cardNameValue,
  expirydateLabel,
  expirydateValue,
  titleDetail,
}) => {
  const getCardIcon = (cardName: string | undefined) => {
    if (!cardName) {
      return '/images/icons/master_card.png';
    }

    const extension = cardName.split('.').pop()?.toLowerCase();

    switch (extension) {
      case 'pdf':
        return '/images/icons/master_card.png'; // Revisit based on cards
      case 'docx':
        return '/images/icons/master_card.png';
      default:
        return '/images/icons/master_card.png';
    }
  };

  return (
    <div className="bg-white p-4 br-bl-10px custom-creditcard">
      <h2 className={subclassName}>{title}</h2>
      <div className="">
        <div className="flex items-center pt-1">
          <img
            src={getCardIcon(textValue)}
            alt={textValue}
            className="cardLogo me-1"
          />
          <div className={cardinfoclassName}>
            <p className={textDetailsclassName} title={titleDetail}>
              {textValue}
            </p>
            <span className={infoClassname}>i</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-[50%_50%] gap-2 mb-2 mt-3">
        <div className="">
          <div className="">
            <h2 className={subclassName}>{cardName}</h2>
            <div className={cardinfoclassName}>
              <p className={textDetailsclassName}>{cardNameValue}</p>
            </div>
          </div>
        </div>
        <div className="">
          <div className="">
            <h2 className={subclassName}>{expirydateLabel}</h2>
            <div className={cardinfoclassName}>
              <p className={textDetailsclassName}>{expirydateValue}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreditCardComponent;
