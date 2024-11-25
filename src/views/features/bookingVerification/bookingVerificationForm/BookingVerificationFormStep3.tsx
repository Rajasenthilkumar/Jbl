import { Button, DatePicker, Form, Input } from 'antd';
import dayjs from 'dayjs';
import { type FC, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import DecimalInput from 'views/components/DecimalInput';
import {
  FormContent,
  FormFooter,
  FromContainer,
} from 'views/components/FormComponents';
import { AddBookingVerificationFormSteps } from './BookingVerificationEntity';
import type { BookingVerificationFormSchema } from './BookingVerificationSchema';

type Props = {
  setStep: (value: number) => void;
  guestToken: string;
};

const BookingVerificationFormStep3: FC<Props> = ({ setStep }) => {
  const { control, trigger } = useFormContext<BookingVerificationFormSchema>();
  const [_, setRevalidateState] = useState(false);

  async function onNext() {
    const isValid = await trigger('stepThree');
    if (!isValid) {
      setRevalidateState(true);
    }
    if (isValid) {
      setStep(AddBookingVerificationFormSteps.STEP4);
    }
  }

  const onPrevious = () => {
    setStep(AddBookingVerificationFormSteps.STEP2);
  };

  const expirationFormat = 'MM/YYYY';

  return (
    <>
      <p className="text-[#051621] font-medium text-base mb-2">
        Payment Details
      </p>
      <FromContainer>
        <FormContent>
          <Form>
            <div className="flex gap-4 flex-wrap md:flex-nowrap md:justify-between step1-form-bookingverify mt-5">
              <FormItem
                control={control}
                name="stepThree.card_holder_name"
                className="w-full"
              >
                <Input
                  placeholder="Cardholder Name"
                  size="large"
                  className="py-3 get-input-placeholder"
                />
              </FormItem>

              <FormItem
                control={control}
                name="stepThree.card_number"
                className="w-full"
              >
                <Controller
                  control={control}
                  name="stepThree.card_number"
                  render={({ field: { onChange, value } }) => (
                    <DecimalInput
                      value={value}
                      onChange={onChange}
                      placeholder="Card Number"
                      size="large"
                      className="py-3 get-input-placeholder"
                      maxLength={16}
                    />
                  )}
                />
              </FormItem>
            </div>

            <div className="flex gap-2 step1-form-bookingverify mt-5">
              <FormItem
                control={control}
                name="stepThree.expiration_date"
                className="w-full"
              >
                <Controller
                  control={control}
                  name="stepThree.expiration_date"
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      minDate={dayjs()}
                      size="large"
                      className="w-full py-3 get-input-placeholder"
                      value={value ? dayjs(value, expirationFormat) : null}
                      picker="month"
                      inputReadOnly={true}
                      format={expirationFormat}
                      placeholder="Expiration Date"
                      onChange={(_, dateString) => {
                        onChange(dateString);
                      }}
                    />
                  )}
                />
              </FormItem>

              <FormItem
                control={control}
                name="stepThree.cvv"
                className="w-full"
              >
                <Controller
                  control={control}
                  name="stepThree.cvv"
                  render={({ field: { onChange, value } }) => (
                    <DecimalInput
                      value={value}
                      onChange={onChange}
                      placeholder="CVV"
                      size="large"
                      className="py-3 get-input-placeholder"
                      maxLength={3}
                    />
                  )}
                />
              </FormItem>
            </div>
          </Form>
        </FormContent>
        <FormFooter>
          <div style={{ marginTop: 24 }}>
            <Button
              type="default"
              htmlType="button"
              className="font-medium bg-gray-b py-5 px-6 border-0 ml-4 text-sm font-bold"
              onClick={onPrevious}
            >
              Previous
            </Button>
            <Button
              type="primary"
              htmlType="button"
              className="p-5 ml-4 text-sm font-bold"
              onClick={onNext}
            >
              Next
            </Button>
          </div>
        </FormFooter>
      </FromContainer>
    </>
  );
};

export default BookingVerificationFormStep3;
