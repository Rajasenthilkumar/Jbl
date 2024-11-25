interface AnalyticsDetail {
  classname: string;
  heading: string;
  headingClasssname: string;
  contentClassname: string;
  contentname: string;
  subheadingClassname: string;
  subheading: string;
  imgClassname: string;
  imgsrc: string;
  analyticHeading: string;
  analyticValue: number;
  analyticClassname: string;
}

const AnalyticsSummaryCard: React.FC<AnalyticsDetail> = ({
  subheadingClassname,
  analyticClassname,
  contentClassname,
  subheading,
  imgClassname,
  imgsrc,
  analyticHeading,
  analyticValue,
}) => {
  return (
    <div className={contentClassname}>
      <div>
        <img src={imgsrc} alt="icon" className={imgClassname} />
      </div>
      <div className={analyticClassname}>
        <h3 className={subheadingClassname}>{subheading}</h3>
        <p className={analyticHeading}>{analyticValue}</p>
      </div>
    </div>
  );
};
export default AnalyticsSummaryCard;
