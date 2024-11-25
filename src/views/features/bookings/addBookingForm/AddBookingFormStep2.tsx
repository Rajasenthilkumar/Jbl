import { Button, Input } from 'antd';
import type { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import DecimalInput from 'views/components/DecimalInput';
import {
  FormContent,
  FormFooter,
  FromContainer,
} from 'views/components/FormComponents';
import { useAddBookings } from '../hooks';
import { AddBookingSteps } from './AddBookingEntity';
import type { AddBookingFormSchema } from './StepFormSchema';

type Props = {
  setStep: (value: number) => void;
  handleCancel: () => void;
};

const AddBookingFormStep2: FC<Props> = ({ setStep }) => {
  const { control } = useFormContext<AddBookingFormSchema>();
  const { status } = useAddBookings();

  const onPrevious = () => {
    setStep(AddBookingSteps.STEP1);
  };

  return (
    <FromContainer>
      <FormContent>
        <div className="flex flex-col gap-1">
          <p className="mb-2 color-[#051621] text-base font-semibold">
            Guest Information
          </p>
          <FormItem
            control={control}
            name="stepTwo.guestName"
            className="w-full"
          >
            <Input
              placeholder="Guest Name"
              size="large"
              variant="filled"
              className="py-3"
            />
          </FormItem>
          <FormItem
            control={control}
            name="stepTwo.guestEmail"
            className="w-full"
          >
            <Input
              placeholder="Guest Email"
              size="large"
              variant="filled"
              className="py-3"
            />
          </FormItem>
          <FormItem name="stepTwo.guestPhone" control={control}>
            <Controller
              control={control}
              name="stepTwo.guestPhone"
              render={({ field: { onChange, value } }) => (
                <DecimalInput
                  placeholder="Guest Mobile No."
                  size="large"
                  variant="filled"
                  className="py-3"
                  value={value}
                  onChange={onChange}
                  maxLength={15}
                />
              )}
            />
          </FormItem>
        </div>
      </FormContent>
      <FormFooter>
        <Button
          type="default"
          htmlType="button"
          className="font-medium bg-bg_primary"
          onClick={onPrevious}
          loading={status === 'pending'}
        >
          Previous
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          className="font-medium"
          loading={status === 'pending'}
        >
          Confirm
        </Button>
      </FormFooter>
    </FromContainer>
  );
};

export default AddBookingFormStep2;
