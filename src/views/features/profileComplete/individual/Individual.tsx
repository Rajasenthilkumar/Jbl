import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'antd';
import type { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import type { ApiError } from 'utilities/api';
import { useStepper } from 'views/components/FormStepper/StepperProvider';
import { useHostProfileIndividual } from '../hook';
import {
  type IndividualApiSchema,
  type IndividualSchema,
  individualSchema,
} from './IndividualSchema';
import IndividualStep1 from './IndividualStep1';
import IndividualStep2 from './IndividualStep2';
import IndividualStep3 from './IndividualStep3';

export enum IndividualEntitySteps {
  STEP1 = 0,
  STEP2 = 1,
  STEP3 = 2,
}
type Props = {
  handleSuccess: () => void;
};

const Individual: FC<Props> = ({ handleSuccess }) => {
  const { activeStep, setActiveStep } = useStepper();
  const { loading, postProfileIndividual } = useHostProfileIndividual();

  const methods = useForm<IndividualSchema>({
    shouldUnregister: false,
    mode: 'onChange',
    resolver: zodResolver(individualSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: IndividualSchema) => {
    const payload: IndividualApiSchema = {
      profile: {
        company: {
          id_number: data.stepOne.id_number,
          country_of_issue: data.stepOne.country_of_issue,
          document_path: data.stepOne.document_path,
          address_proof: data.stepOne.address_proof,
        },
        card: {
          card_holder_name: data.stepTwo.card_holder_name,
          card_number: data.stepTwo.card_number,
          expiration_date: data.stepTwo.expiration_date,
          cvv: data.stepTwo.cvv,
        },
        other_details: {
          name: data.stepOne.name,
          sur_name: data.stepOne.sur_name,
          residential_address: data.stepOne.residential_address,
          protected_properties_count: data.stepThree.protected_properties_count,
          host_type: data.stepThree.host_type,
          pms: data.stepThree.pms,
          alternative_contact_number: data.stepThree.alternative_contact_number,
          company_website: data.stepThree.company_website,
          is_terms_approved: data.stepThree.is_terms_approved,
        },
      },
    };
    try {
      await postProfileIndividual(payload);
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
          {activeStep === IndividualEntitySteps.STEP1 && (
            <IndividualStep1 setStep={setActiveStep} />
          )}
          {activeStep === IndividualEntitySteps.STEP2 && (
            <IndividualStep2 setStep={setActiveStep} />
          )}
          {activeStep === IndividualEntitySteps.STEP3 && (
            <IndividualStep3 setStep={setActiveStep} isSubmitting={loading} />
          )}
        </>
      </Form>
    </FormProvider>
  );
};

export default Individual;
