import { Header } from 'antd/es/layout/layout';
import Logo from 'assets/logo/main_logo.svg';
import { useAppDispatch } from 'hooks/redux';
import { type FC, useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
import { getBookingDetails } from 'stores/slice/guestBookingVerificationSlice';
import Stepper from 'views/components/FormStepper/Stepper';
import {
  StepperProvider,
  useStepper,
} from 'views/components/FormStepper/StepperProvider';
import HostDetails from './HostDetails';
import AddBookingVerificationEntity from './bookingVerificationForm/BookingVerificationEntity';
import type { BookingVerificationFormSchema } from './bookingVerificationForm/BookingVerificationSchema';
import { BOOKING_VERIFICATION_FORM } from './constants';

type Props = {
  handleOk: () => void;
  guestToken: string;
};

type FormType = 'AddBookingVerificationEntity';
const BookingVerificationDetails: FC<Props> = ({ handleOk, guestToken }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (guestToken) {
      dispatch(getBookingDetails({ token: guestToken }));
    }
  }, [dispatch, guestToken]);
  return (
    <>
      <Header className="main_header booking-verfiy-header bg-white">
        <img
          className="w51 h48 my-0 mx-3"
          src={Logo as unknown as string}
          alt="logo"
        />
        <div className="w-[250px] px-4 br-gray flex items-center ml85 h80">
          <span className="lg:ms-7 ms-0 fw700">Booking Verification</span>
        </div>
      </Header>
      <div className="flex flex-col items-start justify-center gap-4 booking-verfication-details lg:flex-row flex-col md:justify-between bg-[#EBF8FF]">
        <div className="card booking-detail-form br20 lg:w-[60%] bg-white md:w-[100%] sm:w-full">
          <StepperProvider initialSteps={BOOKING_VERIFICATION_FORM}>
            <FormBody handleOk={handleOk} guestToken={guestToken} />
          </StepperProvider>
        </div>
        <div className="p-3 bg-white rounded-[20px] w-full lg:w-[37%] md:w-[100%] sm:w-full">
          <HostDetails propertyId={34} />
        </div>
      </div>
    </>
  );
};

type FormBodyProps = {
  handleOk: (data: BookingVerificationFormSchema) => void;
  guestToken: string;
};

const FormBody: FC<FormBodyProps> = ({ handleOk, guestToken }) => {
  const [formType, setFormType] = useState<FormType>(
    'AddBookingVerificationEntity',
  );
  const { activeStep, setTotalSteps, totalSteps } = useStepper();

  // biome-ignore lint/correctness/noUnusedVariables: <explanation>
  const handleSetIndividual = () => {
    setFormType('AddBookingVerificationEntity');
    setTotalSteps(BOOKING_VERIFICATION_FORM);
  };

  return (
    <div>
      <Stepper steps={totalSteps} active={activeStep} />
      {formType === 'AddBookingVerificationEntity' && (
        <AddBookingVerificationEntity
          handleOk={handleOk}
          handleCancel={() => {}}
          guestToken={guestToken}
        />
      )}
    </div>
  );
};

export default BookingVerificationDetails;
