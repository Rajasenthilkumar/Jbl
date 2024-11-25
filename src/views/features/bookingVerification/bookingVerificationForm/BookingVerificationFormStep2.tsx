import { InfoCircleFilled } from '@ant-design/icons';
import { Button, Radio, Space } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { type FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import { fetchDamageProtection } from 'stores/slice/guestBookingVerificationSlice';
import {
  FormContent,
  FormFooter,
  FromContainer,
} from 'views/components/FormComponents';
import { AddBookingVerificationFormSteps } from './BookingVerificationEntity';
import type { BookingVerificationFormSchema } from './BookingVerificationSchema';
import NonRefundableModal from './NonRefundableModal';
import RefundableModal from './RefundableModal';
import SetOpenBothFund from './SetOpenBothFund';

type Props = {
  setStep: (value: number) => void;
  guestToken: string;
};

interface Deposit {
  createdAt: string;
  id: number;
  name: string;
  updatedAt: string;
}

const BookingVerificationFormStep2: FC<Props> = ({ setStep, guestToken }) => {
  const dispatch = useAppDispatch();
  const { control, trigger } = useFormContext<BookingVerificationFormSchema>();
  const [_, setRevalidateState] = useState(false);
  const [openRefundable, setOpenRefundable] = useState(false);
  const [openNonRefundable, setOpenNonRefundable] = useState(false);
  const [openBothFund, setOpenBothFund] = useState(false);

  useEffect(() => {
    dispatch(fetchDamageProtection({ guestToken }));
  }, [dispatch, guestToken]);

  const damageProtection = useAppSelector(
    (state) => state.guestBookingVerification.damageProtection.data,
  );
  const bookingDetails = useAppSelector(
    (state) => state.guestBookingVerification.getBooking.data,
  );

  const options = damageProtection ? damageProtection.result : [];

  const onNext = async () => {
    const isValid = await trigger('stepTwo');
    if (isValid) {
      setStep(AddBookingVerificationFormSteps.STEP3);
    } else {
      setRevalidateState(true);
    }
  };

  const onPrevious = () => {
    setStep(AddBookingVerificationFormSteps.STEP1);
  };

  const handleRefundable = () => setOpenRefundable(true);
  const handleRefundCancel = () => setOpenRefundable(false);
  const handleNonRefundable = () => setOpenNonRefundable(true);
  const handleNonRefundCancel = () => setOpenNonRefundable(false);
  const handleBoth = () => setOpenBothFund(true);
  const handleBothCancel = () => setOpenBothFund(false);
  const openInfoModal = (id: number) => {
    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log('option info', id);
    if (id === 1) {
      handleRefundable();
    }
    if (id === 2) {
      handleNonRefundable();
    }
    if (id === 3) {
      handleBoth();
    }
  };
  const filterOptions = options
    ?.filter(
      (option: Deposit) =>
        option.id !== 3 &&
        (option.id === bookingDetails?.damage_protection_id ||
          bookingDetails?.damage_protection_id === 3),
    )
    ?.map((value: Deposit) => {
      return {
        ...value,
        amount:
          value.id === 1
            ? bookingDetails?.refundAmount
            : bookingDetails?.nonRefundAmount,
        currencyType:
          value.id === 1
            ? bookingDetails?.refundCurrencyType
            : bookingDetails?.nonRefundCurrencyType,
      };
    });
  // console.log("(((",filterOptions)

  return (
    <>
      <p className="text-[#051621] font-medium text-base my-4">
        Damage Protection
      </p>
      <FromContainer>
        <FormContent>
          <p className="text-[#051621] font-medium text-base mb-3">
            Choose Damage protection option
          </p>
          <div className="flex flex-col gap-1 refund-radio">
            <FormItem
              control={control}
              name="stepTwo.damage_protection_id"
              className="w-full"
            >
              <Radio.Group>
                <Space direction="vertical">
                  {filterOptions?.map((option) => {
                    return (
                      <div
                        key={option.id}
                        className="w-full p-4 border border-gray-300 rounded-lg flex justify-between items-center"
                      >
                        <Radio value={option.id}>
                          <div>
                            <p className="text-black">{option.name}</p>
                            <p className="text-Grey text-base fs13">
                              {option.currencyType} {option.amount}
                            </p>
                          </div>
                        </Radio>
                        <InfoCircleFilled
                          className="text-lg text-primary"
                          onClick={() => openInfoModal(option.id)}
                        />
                      </div>
                    );
                  })}
                </Space>
              </Radio.Group>
            </FormItem>
          </div>
        </FormContent>
        <FormFooter>
          <div style={{ marginTop: 24 }}>
            <Button
              type="default"
              htmlType="button"
              onClick={onPrevious}
              className="font-medium bg-gray-b py-5 px-6 border-0 ml-4 text-sm font-bold"
            >
              Previous
            </Button>
            <Button
              type="primary"
              htmlType="button"
              onClick={onNext}
              className="mt-5 p-5 ml-4 text-sm font-bold md:mt-0"
            >
              Next
            </Button>
          </div>
        </FormFooter>
      </FromContainer>
      {openRefundable && (
        <RefundableModal open={true} handleCancel={handleRefundCancel} />
      )}
      {openNonRefundable && (
        <NonRefundableModal open={true} handleCancel={handleNonRefundCancel} />
      )}
      {openBothFund && (
        <SetOpenBothFund open={true} handleCancel={handleBothCancel} />
      )}
    </>
  );
};

export default BookingVerificationFormStep2;
