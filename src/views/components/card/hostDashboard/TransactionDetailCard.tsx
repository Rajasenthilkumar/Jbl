interface TransactionDetail {
  classname: string;
  heading: string;
  headingClasssname: string;
  contentClassname: string;
  contentname: string;
  subheadingClassname: string;
  subheading: string;
  imgClassname?: string;
  imgsrc?: string;
}

const TransactionDetailCard: React.FC<TransactionDetail> = ({
  classname,
  headingClasssname,
  heading,
  subheadingClassname,
  contentClassname,
  subheading,
  imgClassname,
  imgsrc,
}) => {
  return (
    <div className={classname}>
      <h3 className={headingClasssname}>{heading}</h3>
      <div className={contentClassname}>
        <h3 className={subheadingClassname}>{subheading}</h3>
        {imgsrc && <img src={imgsrc} alt="icon" className={imgClassname} />}
      </div>
    </div>
  );
};
export default TransactionDetailCard;
