interface CardProps {
  cardinfoclassName: string;
  title: string;
  titleValue: string;
  subclassName: string;
  textDetailsclassName: string;
  accountholderName: string;
  accountholderValue: string;
  accountNumber: string;
  accountNumberValue: number;
  bankPincodeName: string;
  bankPincodeValue: string;
  bankCodeName: string;
  bankCodeValue: number;
}

const BankDetailCardComponent: React.FC<CardProps> = ({
  cardinfoclassName,
  title,
  titleValue,
  subclassName,
  textDetailsclassName,
  accountholderName,
  accountholderValue,
  accountNumber,
  accountNumberValue,
  bankPincodeName,
  bankPincodeValue,
  bankCodeName,
  bankCodeValue,
}) => {
  return (
    <div className="bg-white p-4 br-bl-10px custom-creditcard bank-detailcard">
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-[50%_50%] gap-2 mt-2 mb-4">
        <div className="">
          <div className="">
            <h2 className={subclassName}>{title}</h2>
            <div className={cardinfoclassName}>
              <p className={textDetailsclassName}>{titleValue}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-[50%_50%] gap-2 mt-2 mb-4">
        <div className="">
          <div className="">
            <h2 className={subclassName}>{accountholderName}</h2>
            <div className={cardinfoclassName}>
              <p className={textDetailsclassName}>{accountholderValue}</p>
            </div>
          </div>
        </div>
        <div className="">
          <div className="">
            <h2 className={subclassName}>{accountNumber}</h2>
            <div className={cardinfoclassName}>
              <p className={textDetailsclassName}>{accountNumberValue}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-[50%_50%] gap-2 mt-2 mb-4">
        <div className="">
          <div className="">
            <h2 className={subclassName}>{bankPincodeName}</h2>
            <div className={cardinfoclassName}>
              <p className={textDetailsclassName}>{bankPincodeValue}</p>
            </div>
          </div>
        </div>
        <div className="">
          <div className="">
            <h2 className={subclassName}>{bankCodeName}</h2>
            <div className={cardinfoclassName}>
              <p className={textDetailsclassName}>{bankCodeValue}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BankDetailCardComponent;
