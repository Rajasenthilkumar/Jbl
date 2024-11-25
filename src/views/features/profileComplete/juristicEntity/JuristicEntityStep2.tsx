import { Button, Input } from 'antd';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { type FC, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import DecimalInput from 'views/components/DecimalInput';
import {
  FormContent,
  FormFooter,
  FromContainer,
} from 'views/components/FormComponents';
import { JuristicEntitySteps } from './JuristicEntity';
import type { JuristicEntitySchema } from './JuristicEntitySchema';

dayjs.extend(customParseFormat);
const expirationFormat = 'MM/YYYY';

type Props = {
  setStep: (value: number) => void;
};

const JuristicEntityStep2: FC<Props> = ({ setStep }) => {
  const { control, trigger, setValue } = useFormContext<JuristicEntitySchema>();
  const [_, setRevalidateState] = useState(false);

  const onNext = async () => {
    // Triggers only the validation schema for stepOne
    const isValid = await trigger('stepTwo');
    if (!isValid) {
      setRevalidateState(true);
    }

    if (isValid) {
      setStep(JuristicEntitySteps.STEP3);
    }
  };

  const onPrevious = () => {
    setStep(JuristicEntitySteps.STEP1);
  };

  return (
    <FromContainer>
      <FormContent>
        <FormItem
          control={control}
          name="stepTwo.card_holder_name"
          className="w-full"
        >
          <Input
            placeholder="Cardholder Name"
            size="large"
            variant="filled"
            className="py-3"
          />
        </FormItem>
        <FormItem
          control={control}
          name="stepTwo.card_number"
          className="w-full"
        >
          <Controller
            control={control}
            name="stepTwo.card_number"
            render={({ field: { onChange, value } }) => (
              <DecimalInput
                value={value}
                onChange={onChange}
                placeholder="Card Number"
                size="large"
                variant="filled"
                className="py-3"
                maxLength={16}
              />
            )}
          />
        </FormItem>
        <div className="flex gap-2">
          <FormItem
            control={control}
            name="stepTwo.expiration_date"
            className="w-full"
          >
            <Controller
              control={control}
              name="stepTwo.expiration_date"
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  minDate={dayjs()}
                  size="large"
                  showNow={false}
                  className="w-full py-3"
                  variant="filled"
                  value={value ? dayjs(value, expirationFormat) : null}
                  picker="month"
                  inputReadOnly={true}
                  format={expirationFormat}
                  placeholder="Expiration Date"
                  onChange={(_, dateString) => {
                    // console.log(_, dateString);
                    onChange(dateString);
                    if (Array.isArray(dateString)) {
                      setValue('stepTwo.expiration_date', dateString[0]);
                    } else {
                      setValue('stepTwo.expiration_date', dateString);
                    }
                  }}
                />
              )}
            />
          </FormItem>
          <FormItem control={control} name="stepTwo.cvv" className="w-full">
            <Controller
              control={control}
              name="stepTwo.cvv"
              render={({ field: { onChange, value } }) => (
                <DecimalInput
                  value={value}
                  onChange={onChange}
                  placeholder="CVV"
                  size="large"
                  variant="filled"
                  className="py-3"
                  maxLength={3}
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
          size="large"
        >
          Previous
        </Button>
        <Button
          type="primary"
          htmlType="button"
          className="font-medium"
          onClick={onNext}
          size="large"
        >
          Next
        </Button>
      </FormFooter>
    </FromContainer>
  );
};

export default JuristicEntityStep2;
