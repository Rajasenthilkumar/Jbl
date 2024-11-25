import { Button, Radio, Space } from 'antd';
import classNames from 'classnames';
import { useAppSelector } from 'hooks/redux';
import type { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import { addDamageProtection } from 'stores/slice/propertiesSlice';
import AntdCurrency from 'views/components/AntdCurrency';
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

const ManualListingStep3: FC<Props> = ({ setStep }) => {
  const { control, setValue, watch } =
    useFormContext<ManualListingEntitySchema>();
  const damageProtection = useAppSelector(addDamageProtection);

  const submittingStatus = useAppSelector(
    (state) => state.properties.createProperty.status,
  );

  const onPrevious = () => {
    setStep(ManualListingSteps.STEP2);
  };

  const selectedDamageProtection = watch('stepThree.damage_protection_id');

  const isRefundable =
    Number(selectedDamageProtection) === 1 ||
    Number(selectedDamageProtection) === 3;

  const isDamageWaiver =
    Number(selectedDamageProtection) === 2 ||
    Number(selectedDamageProtection) === 3;

  return (
    <FromContainer>
      <FormContent>
        <FormItem
          control={control}
          name="stepThree.damage_protection_id"
          className="w-full"
        >
          <div>
            <p className="my-2 text-base font-bold text-PrimaryText">
              Damage Protection Options
            </p>
            <Radio.Group defaultValue={1}>
              <Space direction="vertical">
                {damageProtection?.map((option) => (
                  <div
                    key={option.id}
                    className={classNames(
                      'p-3 border rounded-lg bottom-1 text-sm',
                      {
                        'border-primary':
                          option.id === selectedDamageProtection,
                        'border-gray-400':
                          option.id !== selectedDamageProtection,
                      },
                    )}
                  >
                    <Radio value={option.id}>{option.name}</Radio>
                  </div>
                ))}
              </Space>
            </Radio.Group>
          </div>
        </FormItem>
        <div>
          <p className="my-2 text-base font-bold text-PrimaryText">
            Enter Amount
          </p>
          {/* Show refundable security deposit amount  */}
          {isRefundable && (
            <FormItem control={control} name="stepThree.refundAmount">
              <Controller
                control={control}
                name="stepThree.refundAmount"
                render={({ field: { value } }) => (
                  <AntdCurrency
                    placeholder="Refundable security deposit amount"
                    value={value}
                    onChange={(currency, value) => {
                      setValue('stepThree.refundCurrencyType', currency);
                      if (
                        typeof value === 'string' &&
                        !Number.isNaN(Number(value))
                      ) {
                        setValue('stepThree.refundAmount', Number(value));
                      } else {
                        setValue('stepThree.refundAmount', 0);
                      }
                    }}
                  />
                )}
              />
            </FormItem>
          )}
          {/* Show damage waiver cover amount  */}
          {isDamageWaiver && (
            <FormItem control={control} name="stepThree.nonRefundAmount">
              <Controller
                control={control}
                name="stepThree.nonRefundAmount"
                render={({ field: { value } }) => (
                  <AntdCurrency
                    placeholder="Damage waiver cover amount"
                    value={value}
                    onChange={(currency, value) => {
                      setValue('stepThree.nonRefundCurrencyType', currency);
                      if (
                        typeof value === 'string' &&
                        !Number.isNaN(Number(value))
                      ) {
                        setValue('stepThree.nonRefundAmount', Number(value));
                      } else {
                        setValue('stepThree.nonRefundAmount', 0);
                      }
                    }}
                  />
                )}
              />
            </FormItem>
          )}
        </div>
      </FormContent>
      <FormFooter>
        <Button
          type="default"
          htmlType="button"
          className="font-medium bg-bg_primary"
          onClick={onPrevious}
          disabled={submittingStatus === 'pending'}
        >
          Previous
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          className="font-medium"
          loading={submittingStatus === 'pending'}
        >
          Submit
        </Button>
      </FormFooter>
    </FromContainer>
  );
};

export default ManualListingStep3;
