import { type FC, useState } from 'react';
import { HouseHeartFill } from 'react-bootstrap-icons';
import Stepper from 'views/components/FormStepper/Stepper';
import {
  StepperProvider,
  useStepper,
} from 'views/components/FormStepper/StepperProvider';
import FormModal from 'views/components/modals/FormModal';
import AddBookingEntity from './addBookingForm/AddBookingEntity';
import type { AddBookingFormSchema } from './addBookingForm/StepFormSchema';
import { BOOKING_FORM } from './constants';

type Props = {
  open: boolean;
  handleOk: (data: AddBookingFormSchema) => void;
  handleCancel: () => void;
};

type FormType = 'AddBookingEntity';

const AddBookingFormModal: FC<Props> = ({ open, handleCancel, handleOk }) => {
  return (
    <FormModal
      open={open}
      handleOk={handleCancel}
      handleCancel={handleCancel}
      headerIcon={<HouseHeartFill />}
      title="Manual Booking"
      subTitle="Take these easy steps to initiate the Booking."
    >
      <StepperProvider initialSteps={BOOKING_FORM}>
        <FormBody handleCancel={handleCancel} handleOk={handleOk} />
      </StepperProvider>
    </FormModal>
  );
};

type FormBodyProps = {
  handleCancel: () => void;
  handleOk: (data: AddBookingFormSchema) => void;
};

const FormBody: FC<FormBodyProps> = ({ handleCancel, handleOk }) => {
  const [formType, setFormType] = useState<FormType>('AddBookingEntity');
  const { activeStep, setTotalSteps, totalSteps } = useStepper();

  // biome-ignore lint/correctness/noUnusedVariables: <explanation>
  const handleSetIndividual = () => {
    setFormType('AddBookingEntity');
    setTotalSteps(BOOKING_FORM);
  };

  return (
    <div>
      <Stepper steps={totalSteps} active={activeStep} />
      {formType === 'AddBookingEntity' && (
        <AddBookingEntity handleCancel={handleCancel} handleOk={handleOk} />
      )}
    </div>
  );
};

export default AddBookingFormModal;
