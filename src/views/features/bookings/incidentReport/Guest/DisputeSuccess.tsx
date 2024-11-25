import { Button } from 'antd';
import successImage from '../../../../../assets/report/success.svg';
const DisputeSuccess = () => {
  return (
    <div className="payment-success">
      <img
        src={successImage as unknown as string}
        alt="loading"
        className="payment-img"
      />
      <h1 className="pt-2 md:text-sm text-sm font-bold text-black-color">
        Dispute Submitted Successfully
      </h1>
      <p className="text-grey-f md:text-xs text-sm text-center my-2">
        Your dispute has been submitted. The host will review your dispute and
        respond to you shortly.
      </p>
      <div className="text-center pt-5">
        <Button
          size="large"
          className="font-medium bg-primary custom-btn text-xs py-1 h35 text-white w-100"
          // onClick={handleCancel}
        >
          Back to dashboard
        </Button>
      </div>
    </div>
  );
};
export default DisputeSuccess;
