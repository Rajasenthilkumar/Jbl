import { Button } from 'antd';
import { type FC, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import DecimalInput from 'views/components/DecimalInput';
import {
  FormContent,
  FormFooter,
  FromContainer,
} from 'views/components/FormComponents';
import { ManualListingSteps } from './ManualListing';
import type { ManualListingEntitySchema } from './ManualListingSchema';

type Props = {
  setStep: (value: number) => void;
};

const ManualListingStep2: FC<Props> = ({ setStep }) => {
  const { control, trigger } = useFormContext<ManualListingEntitySchema>();
  const [_, setRevalidateState] = useState(false);

  const onNext = async () => {
    // Triggers only the validation schema for stepOne
    const isValid = await trigger('stepTwo');
    if (!isValid) {
      setRevalidateState(true);
    }

    if (isValid) {
      setStep(ManualListingSteps.STEP3);
    }
  };

  const onPrevious = () => {
    setStep(ManualListingSteps.STEP1);
  };

  return (
    <FromContainer>
      <FormContent>
        <p className="my-2 text-base font-bold text-PrimaryText">
          Accommodation
        </p>
        <FormItem
          control={control}
          name="stepTwo.noOfBedrooms"
          className="w-full"
        >
          <Controller
            control={control}
            name="stepTwo.noOfBedrooms"
            render={({ field: { onChange, value } }) => (
              <DecimalInput
                placeholder="Number of Bedrooms"
                size="large"
                variant="filled"
                className="py-3"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </FormItem>
        <FormItem
          control={control}
          name="stepTwo.noOfBathrooms"
          className="w-full"
        >
          <Controller
            control={control}
            name="stepTwo.noOfBathrooms"
            render={({ field: { onChange, value } }) => (
              <DecimalInput
                placeholder="Number of Bathrooms"
                size="large"
                variant="filled"
                className="py-3"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </FormItem>
        <FormItem control={control} name="stepTwo.maxGuest" className="w-full">
          <Controller
            control={control}
            name="stepTwo.maxGuest"
            render={({ field: { onChange, value } }) => (
              <DecimalInput
                placeholder="Maximum Guests"
                size="large"
                variant="filled"
                className="py-3"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </FormItem>
      </FormContent>
      <FormFooter>
        <Button
          type="default"
          htmlType="button"
          className="font-medium bg-bg_primary"
          onClick={onPrevious}
        >
          Previous
        </Button>
        <Button
          type="primary"
          htmlType="button"
          className="font-medium"
          onClick={onNext}
        >
          Next
        </Button>
      </FormFooter>
    </FromContainer>
  );
};

export default ManualListingStep2;
