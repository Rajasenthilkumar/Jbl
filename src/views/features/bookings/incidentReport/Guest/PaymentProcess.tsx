import { Button } from 'antd';
import loadingImage from '../../../../../assets/report/loading.svg';

const PaymentProcess = () => {
  return (
    <div className="payment-success">
      <img
        src={loadingImage as unknown as string}
        alt="loading"
        className="payment-img"
      />
      <h1 className="pt-2 md:text-sm text-sm font-bold text-black-color">
        Payment Processing....
      </h1>
      <p className="text-grey-f md:text-xs text-sm text-center my-2">
        The payment is being processed. Please wait and do not close the window.
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
export default PaymentProcess;
