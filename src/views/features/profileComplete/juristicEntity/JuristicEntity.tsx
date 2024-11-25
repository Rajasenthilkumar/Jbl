import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'antd';
import type { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import type { ApiError } from 'utilities/api';
import { useStepper } from 'views/components/FormStepper/StepperProvider';
import { useHostProfileJuristic } from '../hook';
import {
  type JuristicEntityApiSchema,
  type JuristicEntitySchema,
  juristicEntitySchema,
} from './JuristicEntitySchema';
import JuristicEntityStep1 from './JuristicEntityStep1';
import JuristicEntityStep2 from './JuristicEntityStep2';
import JuristicEntityStep3 from './JuristicEntityStep3';

export enum JuristicEntitySteps {
  STEP1 = 0,
  STEP2 = 1,
  STEP3 = 2,
}

type Props = {
  handleSuccess: () => void;
};

const JuristicEntity: FC<Props> = ({ handleSuccess }) => {
  const { activeStep, setActiveStep } = useStepper();
  const { loading, postProfileJuristic } = useHostProfileJuristic();

  const methods = useForm<JuristicEntitySchema>({
    shouldUnregister: false,
    mode: 'onChange',
    resolver: zodResolver(juristicEntitySchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: JuristicEntitySchema) => {
    const { company_website, ...otherDetails } = data.stepThree;
    const cleanedOtherDetails = company_website
      ? { ...otherDetails, company_website }
      : otherDetails;

    const payload: JuristicEntityApiSchema = {
      profile: {
        company: data.stepOne,
        card: data.stepTwo,
        other_details: cleanedOtherDetails,
      },
    };
    try {
      await postProfileJuristic(payload);
      handleSuccess();
    } catch (error) {
      const apiError: ApiError = error as ApiError;

      const errorMsgString = apiError.data.error.msg;
      if (typeof errorMsgString === 'string') {
        toast.error(errorMsgString.replace(/\\/g, ''));
      } else {
        const test = String(errorMsgString).replace(/\\/g, '');
        toast.error(test);
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <Form onFinish={handleSubmit(onSubmit)}>
        <>
          {activeStep === JuristicEntitySteps.STEP1 && (
            <JuristicEntityStep1 setStep={setActiveStep} />
          )}
          {activeStep === JuristicEntitySteps.STEP2 && (
            <JuristicEntityStep2 setStep={setActiveStep} />
          )}
          {activeStep === JuristicEntitySteps.STEP3 && (
            <JuristicEntityStep3
              setStep={setActiveStep}
              isSubmitting={loading}
            />
          )}
        </>
      </Form>
    </FormProvider>
  );
};

export default JuristicEntity;
