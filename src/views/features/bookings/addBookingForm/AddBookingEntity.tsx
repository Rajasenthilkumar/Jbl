import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'antd';
import type { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useStepper } from 'views/components/FormStepper/StepperProvider';
import AddBookingFormStep1 from './AddBookingFormStep1';
import AddBookingFormStep2 from './AddBookingFormStep2';
import {
  type AddBookingFormSchema,
  addBookingFormSchema,
} from './StepFormSchema';

export enum AddBookingSteps {
  STEP1 = 0,
  STEP2 = 1,
}

type Props = {
  handleCancel: () => void;
  handleOk: (data: AddBookingFormSchema) => void;
};

const AddBookingEntity: FC<Props> = ({ handleCancel, handleOk }) => {
  const { activeStep, setActiveStep } = useStepper();

  const methods = useForm<AddBookingFormSchema>({
    shouldUnregister: false,
    mode: 'onChange',
    resolver: zodResolver(addBookingFormSchema),
    defaultValues: {
      stepOne: {
        CurrencyType: 'USD',
      },
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: AddBookingFormSchema) => {
    handleOk(data);
  };

  return (
    <FormProvider {...methods}>
      <Form onFinish={handleSubmit(onSubmit)}>
        <>
          {activeStep === AddBookingSteps.STEP1 && (
            <AddBookingFormStep1 setStep={setActiveStep} />
          )}
          {activeStep === AddBookingSteps.STEP2 && (
            <AddBookingFormStep2
              setStep={setActiveStep}
              handleCancel={handleCancel}
            />
          )}
        </>
      </Form>
    </FormProvider>
  );
};

export default AddBookingEntity;
