import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'antd';
import { useAppDispatch } from 'hooks/redux';
import { useAuth } from 'hooks/useAuth';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { createManualProperty } from 'stores/slice/propertiesSlice';
import { DepositType } from 'types/depostitType';
import { useStepper } from 'views/components/FormStepper/StepperProvider';
import {
  type ManualListingAPIEntitySchema,
  type ManualListingEntitySchema,
  manualListingSchemaEntitySchema,
} from './ManualListingSchema';
import ManualListingStep1 from './ManualListingStep1';
import ManualListingStep2 from './ManualListingStep2';
import ManualListingStep3 from './ManualListingStep3';

export enum ManualListingSteps {
  STEP1 = 0,
  STEP2 = 1,
  STEP3 = 2,
}

const AddManualListing = () => {
  const { activeStep, setActiveStep } = useStepper();

  const { userId } = useAuth();

  const methods = useForm<ManualListingEntitySchema>({
    shouldUnregister: false,
    mode: 'onChange',
    defaultValues: {
      stepThree: {
        damage_protection_id: 1,
      },
    },
    resolver: zodResolver(manualListingSchemaEntitySchema),
  });

  const dispatch = useAppDispatch();

  const { handleSubmit, setError } = methods;

  const onSubmit = (data: ManualListingEntitySchema) => {
    if (!userId) {
      toast.error('User ID is required');
      return;
    }

    const manualProperty: ManualListingAPIEntitySchema = {
      propertyName: data.stepOne.propertyName,
      propertyLocation: data.stepOne.propertyLocation,
      propertyImage: data.stepOne.propertyImage,
      noOfBedrooms: data.stepTwo.noOfBedrooms,
      noOfBathrooms: data.stepTwo.noOfBathrooms,
      maxGuest: data.stepTwo.maxGuest,
      damage_protection_id: data.stepThree.damage_protection_id,
      property_type_id: 2,
      property_status_id: 2,
      host_id: userId,
    };

    if (
      data.stepThree.damage_protection_id ===
        DepositType.NON_REFUNDABLE_DAMAGE_WAIVER_ONLY ||
      data.stepThree.damage_protection_id === DepositType.BOTH
    ) {
      if (
        !data.stepThree.nonRefundCurrencyType ||
        !data.stepThree.nonRefundAmount
      ) {
        setError('stepThree.nonRefundCurrencyType', {
          message: 'Currency type is required',
        });
        setError('stepThree.nonRefundAmount', {
          message: 'Non refund amount is required',
        });

        return;
      }

      manualProperty.nonRefundCurrencyType =
        data.stepThree.nonRefundCurrencyType;
      manualProperty.nonRefundAmount = data.stepThree.nonRefundAmount;
    }

    if (
      data.stepThree.damage_protection_id ===
        DepositType.REFUNDABLE_SECURITY_DEPOSIT_ONLY ||
      data.stepThree.damage_protection_id === DepositType.BOTH
    ) {
      if (!data.stepThree.refundCurrencyType || !data.stepThree.refundAmount) {
        setError('stepThree.refundCurrencyType', {
          message: 'Currency type is required',
        });
        setError('stepThree.refundAmount', {
          message: 'Refund amount is required',
        });

        return;
      }
      manualProperty.refundCurrencyType = data.stepThree.refundCurrencyType;
      manualProperty.refundAmount = data.stepThree.refundAmount;
    }

    dispatch(createManualProperty(manualProperty));
  };

  return (
    <FormProvider {...methods}>
      <Form onFinish={handleSubmit(onSubmit)}>
        <>
          {activeStep === ManualListingSteps.STEP1 && (
            <ManualListingStep1 setStep={setActiveStep} />
          )}
          {activeStep === ManualListingSteps.STEP2 && (
            <ManualListingStep2 setStep={setActiveStep} />
          )}
          {activeStep === ManualListingSteps.STEP3 && (
            <ManualListingStep3 setStep={setActiveStep} />
          )}
        </>
      </Form>
    </FormProvider>
  );
};

export default AddManualListing;
