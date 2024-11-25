import { Button, Checkbox, Input, Select } from 'antd';
import { HostType } from 'constants/hostType';
import type { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import { Link } from 'react-router-dom';
import DecimalInput from 'views/components/DecimalInput';
import {
  FormContent,
  FormFooter,
  FromContainer,
} from 'views/components/FormComponents';
import { JuristicEntitySteps } from './JuristicEntity';
import type { JuristicEntitySchema } from './JuristicEntitySchema';

type Props = {
  setStep: (value: number) => void;
  isSubmitting: boolean;
};

const JuristicEntityStep3: FC<Props> = ({ setStep, isSubmitting }) => {
  const { control } = useFormContext<JuristicEntitySchema>();

  const onPrevious = () => {
    setStep(JuristicEntitySteps.STEP2);
  };

  return (
    <FromContainer>
      <FormContent>
        <FormItem
          control={control}
          name="stepThree.protected_properties_count"
          className="w-full"
        >
          <Controller
            control={control}
            name="stepThree.protected_properties_count"
            render={({ field: { onChange, value } }) => (
              <DecimalInput
                placeholder="No of properties to be protected"
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
          name="stepThree.host_type"
          className="w-full"
        >
          <Select
            placeholder="Host Type"
            size="large"
            variant="filled"
            options={HostType}
          />
        </FormItem>
        <FormItem control={control} name="stepThree.pms" className="w-full">
          <Select
            placeholder="PMS"
            size="large"
            variant="filled"
            options={[
              {
                title: 'Boom',
                value: 'Boom',
              },
            ]}
          />
        </FormItem>
        <FormItem
          control={control}
          name="stepThree.alternative_contact_number"
          className="w-full"
        >
          <Controller
            control={control}
            name="stepThree.alternative_contact_number"
            render={({ field: { onChange, value } }) => (
              <DecimalInput
                placeholder="Alternative Contact Number"
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
        <FormItem
          control={control}
          name="stepThree.company_website"
          className="w-full"
        >
          <Input
            placeholder="Website URL (Optional)"
            size="large"
            variant="filled"
            className="py-3"
          />
        </FormItem>
        <FormItem
          control={control}
          name="stepThree.is_terms_approved"
          valuePropName="checked"
        >
          <Checkbox>
            <p className="text-base text-PrimaryText">
              <span className="mr-1">I agree to the</span>
              <Link
                target="_blank"
                className="underline text-primary"
                to={'/terms-and-conditions'}
              >
                Terms and Conditions
              </Link>
            </p>
          </Checkbox>
        </FormItem>
      </FormContent>
      <FormFooter>
        <Button
          disabled={isSubmitting}
          type="default"
          htmlType="button"
          className="font-medium bg-bg_primary"
          onClick={onPrevious}
          size="large"
        >
          Previous
        </Button>
        <Button
          loading={isSubmitting}
          type="primary"
          htmlType="submit"
          className="font-medium"
          size="large"
        >
          Submit
        </Button>
      </FormFooter>
    </FromContainer>
  );
};

export default JuristicEntityStep3;
