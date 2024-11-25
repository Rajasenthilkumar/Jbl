import { Button } from 'antd';
import finalReport from '../../../../../assets/report/report-finalize.svg';
const RatingReport = () => {
  return (
    <div className="incident-report-claim">
      <img
        src={finalReport as unknown as string}
        alt="report"
        className="h250"
      />

      <h1 className="pt-0 md:text-lg text-sm font-bold text-black-color">
        Report Finalised!
      </h1>
      <p className="pt-0">This incident report has been emailed to the guest</p>
      <div className="text-center pt-5">
        <Button
          size="large"
          className="font-medium bg-primary text-xs py-1 h35 text-white"
          // onClick={handleCancel}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
export default RatingReport;
