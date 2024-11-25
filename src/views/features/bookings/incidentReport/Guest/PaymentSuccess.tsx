import { Button } from 'antd';
import successImage from '../../../../../assets/report/success.svg';
const PaymentSuccess = () => {
  return (
    <div className="payment-success">
      <img
        src={successImage as unknown as string}
        alt="loading"
        className="payment-img"
      />
      <h1 className="pt-2 md:text-sm text-sm font-bold text-black-color">
        Payment Successful
      </h1>
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
export default PaymentSuccess;
