import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'antd';
import { FormProvider, useForm } from 'react-hook-form';
import { updateGuestDetails } from 'stores/slice/guestBookingVerificationSlice';
import { useStepper } from 'views/components/FormStepper/StepperProvider';
import BookingVerificationFormStep1 from './BookingVerificationFormStep1';
import BookingVerificationFormStep2 from './BookingVerificationFormStep2';
import BookingVerificationFormStep3 from './BookingVerificationFormStep3';
import BookingVerificationFormStep4 from './BookingVerificationFormStep4';
import {
  type BookingVerificationFormSchema,
  bookingVerificationFormSchema,
} from './BookingVerificationSchema';

import { useAppDispatch } from 'hooks/redux';
import { type FC, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import type { UpdateGuestPayload } from '../type';

export enum AddBookingVerificationFormSteps {
  STEP1 = 0,
  STEP2 = 1,
  STEP3 = 2,
  STEP4 = 3,
}
type Props = {
  handleCancel: () => void;
  handleOk: (data: BookingVerificationFormSchema) => void;
  guestToken: string;
};
const AddBookingVerificationEntity: FC<Props> = ({ guestToken }) => {
  const { activeStep, setActiveStep } = useStepper();
  const dispatch = useAppDispatch();
  const methods = useForm<BookingVerificationFormSchema>({
    shouldUnregister: false,
    mode: 'onChange',
    resolver: zodResolver(bookingVerificationFormSchema),
  });

  const { handleSubmit } = methods;

  const navigate = useNavigate();
  const onSubmit = async (data: BookingVerificationFormSchema) => {
    const payload: UpdateGuestPayload = {
      guest: {
        id_number: data.stepOne.id_number,
        id_document: data.stepOne.id_document,
        first_name: data.stepOne.first_name,
        last_name: data.stepOne.last_name,
        phone: data.stepOne.phone,
        email: data.stepOne.email,
        country_code: data.stepOne.country_code,
      },
      damage: {
        damage_protection_id: data.stepTwo.damage_protection_id,
      },
      paymentDetails: {
        card_holder_name: data.stepThree.card_holder_name,
        card_number: data.stepThree.card_number,
        expiration_date: data.stepThree.expiration_date,
        cvv: data.stepThree.cvv,
      },
      ESignature: data.stepFour.signatureFile?.toString() ?? '',
    };

    try {
      await dispatch(
        updateGuestDetails({
          token: guestToken,
          payload: payload,
        }),
      ).unwrap();

      sessionStorage.setItem('guestToken', guestToken);

      toast.success('Guest details updated successfully');

      setTimeout(() => {
        navigate('/guest-set-password');
      }, 2000);
    } catch (error) {
      console.error('Error updating guest details:', error);
      if (error instanceof Error) {
        console.error(`Failed to update guest details: ${error.message}`);
      } else {
        console.error(
          'Failed to update guest details. Please try again later.',
        );
      }
    }
  };

  const [_imageURL, setImageURL] = useState<string | boolean>(false);

  return (
    <FormProvider {...methods}>
      <Form onFinish={handleSubmit(onSubmit)}>
        <>
          {activeStep === AddBookingVerificationFormSteps.STEP1 && (
            <BookingVerificationFormStep1
              setStep={setActiveStep}
              guestToken={guestToken}
            />
          )}
          {activeStep === AddBookingVerificationFormSteps.STEP2 && (
            <BookingVerificationFormStep2
              setStep={setActiveStep}
              guestToken={guestToken}
            />
          )}
          {activeStep === AddBookingVerificationFormSteps.STEP3 && (
            <BookingVerificationFormStep3
              setStep={setActiveStep}
              guestToken={guestToken}
            />
          )}
          {activeStep === AddBookingVerificationFormSteps.STEP4 && (
            <BookingVerificationFormStep4
              setStep={setActiveStep}
              guestToken={guestToken}
              setImageURL={setImageURL}
              setShowMannualSign={(): void => {}}
              setCloseMannualSign={(): void => {}}
            />
          )}
        </>
      </Form>
    </FormProvider>
  );
};

export default AddBookingVerificationEntity;
