import { DevTool } from '@hookform/devtools';
import { Button, Form, Input } from 'antd';
import { useAppSelector } from 'hooks/redux';
import { type FC, useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import { Link } from 'react-router-dom';
import { extractFileName, maxSize } from 'utilities/utils';
import { AntPhoneGuest } from 'views/components/AntPhoneGuest';
import FileUpload from 'views/components/FileUpload';
import {
  FormContent,
  FormFooter,
  FromContainer,
} from 'views/components/FormComponents';
import LabelComponent from 'views/components/label';
import BookingInformation from '../BookingInformation';
import { AddBookingVerificationFormSteps } from './BookingVerificationEntity';
import type { BookingVerificationFormSchema } from './BookingVerificationSchema';

type Props = {
  setStep: (value: number) => void;
  guestToken: string;
  // countryCode: string;
};

export type BookingDetailsFormType = {
  id_number: string;
  id_document: string | undefined;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
};

const BookingVerificationFormStep1: FC<Props> = ({ setStep, guestToken }) => {
  const { control, trigger, setValue, setError, formState } =
    useFormContext<BookingVerificationFormSchema>();
  const [_, setRevalidateState] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const handleChangeCountryCode = (countryCode: string) => {
    setValue('stepOne.country_code', countryCode);
  };

  const yourDetails = useAppSelector(
    (state) => state.guestBookingVerification.getBooking.data,
  );

  const createdAtRef = useRef(yourDetails?.created_at);
  const updatedAtRef = useRef(yourDetails?.updated_at);

  useEffect(() => {
    if (yourDetails) {
      if (yourDetails?.created_at !== yourDetails?.updated_at) {
        setValue('stepOne.first_name', yourDetails?.first_name || '');
        setValue('stepOne.last_name', yourDetails?.last_name || '');
        setValue('stepOne.phone', yourDetails?.phone || '');
        setValue('stepOne.country_code', yourDetails?.country_code || 'za');
        setValue('stepOne.email', yourDetails?.email || '');
        setValue('stepOne.id_number', yourDetails?.id_number || '');
        setValue('stepOne.id_document', yourDetails?.id_document || '');
        createdAtRef.current = yourDetails?.created_at;
        updatedAtRef.current = yourDetails?.updated_at;
      }
    }
  }, [yourDetails, setValue]);

  useEffect(() => {
    if (yourDetails?.created_at !== yourDetails?.updated_at) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [yourDetails]);

  const onNext = async () => {
    try {
      const isValid = await trigger('stepOne');

      if (!isValid) {
        const errors = formState.errors;
        console.error('Validation failed for stepOne. Errors:', errors);
        setRevalidateState(true);
      } else {
        setStep(AddBookingVerificationFormSteps.STEP2);
      }
    } catch (error) {
      // Log any unexpected errors with full details
      console.error(
        'Unexpected error during validation or step change:',
        error,
      );
      if (error instanceof Error) {
        console.error('Error details:', error.message);
      } else {
        console.error('Unknown error:', error);
      }
    }
  };

  return (
    <>
      <BookingInformation />
      <FromContainer>
        <div className="flex flex-col gap-1">
          <p className="color-[#051621] font-medium text-base mb-0">
            Your Details
          </p>
          <div className="mb-3">
            <p>
              <span className="color-[#051621] font-medium text-base">
                Already a user?
              </span>
              <Link to="/login" className="mx-2 text-primary-color font-medium">
                Log In
              </Link>
            </p>
          </div>
        </div>
        <Form>
          <FormContent>
            <div className="block lg:flex md:flex gap-4 step1-form-bookingverify">
              <FormItem
                control={control}
                name="stepOne.first_name"
                className="w-full"
              >
                <LabelComponent
                  labeltext={'FIRST NAME'}
                  className="text-grey-color fs12 fw500"
                  inputId={''}
                />
                <Input
                  placeholder="First Name"
                  size="large"
                  className="py-2 bg-gray-a border-0 get-input-placeholder"
                  disabled={isDisabled}
                  // defaultValue={yourDetails && yourDetails.id_number !== null ?
                  //   yourDetails.first_name : ""}
                />
              </FormItem>
              <FormItem
                control={control}
                name="stepOne.last_name"
                className="w-full md:ml-4 ml-0"
              >
                <LabelComponent
                  labeltext={'LAST NAME'}
                  className="text-grey-color fs12 fw500"
                  inputId={''}
                />
                <Input
                  placeholder="Last Name"
                  size="large"
                  className="py-2 bg-gray-a border-0 get-input-placeholder"
                  disabled={isDisabled}
                />
              </FormItem>
            </div>
            <div className="block lg:flex md:flex gap-4 step1-form-bookingverify">
              <FormItem
                control={control}
                name="stepOne.phone"
                className="w-full verify-phone-number"
              >
                <LabelComponent
                  labeltext="CELL NO"
                  className="text-grey-color fs12 fw500"
                  inputId={''}
                />
                <Controller
                  control={control}
                  name="stepOne.phone"
                  render={({ field: { onChange, value, onBlur } }) => (
                    <AntPhoneGuest
                      value={value}
                      countryCode={'stepOne.country_code'}
                      onChange={(countryCode, phoneNumber) => {
                        onChange(phoneNumber);
                        handleChangeCountryCode(countryCode);
                      }}
                      onBlur={onBlur}
                      disabled={isDisabled}
                    />
                  )}
                />
              </FormItem>

              <FormItem
                control={control}
                name="stepOne.email"
                className="w-full md:ml-4 ml-0"
              >
                <LabelComponent
                  labeltext={'EMAIL'}
                  className="text-grey-color fs12 fw500"
                  inputId={''}
                />
                <Input
                  placeholder="Email"
                  size="large"
                  className="py-2 bg-gray-a border-0 get-input-placeholder"
                  disabled={isDisabled}
                />
              </FormItem>
            </div>
            <div className="block lg:flex md:flex gap-4 flex-wrap md:flex-nowrap md:justify-between step1-form-bookingverify">
              <FormItem
                control={control}
                name="stepOne.id_number"
                className="w-full"
              >
                <LabelComponent
                  labeltext={'ID NUMBER'}
                  className="text-grey-color fs12 fw500"
                  inputId={''}
                />
                <Input
                  placeholder="Identification Number"
                  size="large"
                  className="py-2 bg-gray-a border-0 get-input-placeholder"
                  disabled={isDisabled}
                />
              </FormItem>
              <FormItem
                control={control}
                name="stepOne.id_document"
                className="w-full"
              >
                <Controller
                  control={control}
                  name="stepOne.id_document"
                  render={({ field: { value } }) => {
                    const isDisabled = yourDetails?.id_document !== null;
                    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
                    useEffect(() => {
                      if (isDisabled && value) {
                        setValue('stepOne.id_document', value);
                      }
                    }, [isDisabled, value, setValue]);
                    return isDisabled ? (
                      <div className="my-5 mx-2 fw500">
                        <span>
                          {extractFileName(
                            value || 'Document already uploaded',
                          )}
                        </span>
                      </div>
                    ) : (
                      <FileUpload
                        type="button"
                        fileName={extractFileName(value || '')}
                        fileLocation={value}
                        setValue={(newValue) =>
                          setValue('stepOne.id_document', newValue)
                        }
                        acceptedFileTypes={'.pdf'}
                        draggerText={'Upload property image'}
                        maxSize={maxSize}
                        setError={(error) =>
                          setError('stepOne.id_document', { message: error })
                        }
                        token={guestToken}
                      />
                    );
                  }}
                />
              </FormItem>
            </div>
          </FormContent>
          <FormFooter>
            <div style={{ marginTop: 2 }}>
              <Button
                type="primary"
                className="py-5 px-7 ml-4 text-sm font-bold"
                htmlType="button"
                onClick={onNext}
              >
                Next
              </Button>
            </div>
          </FormFooter>
        </Form>
      </FromContainer>
      <DevTool control={control} />
    </>
  );
};

export default BookingVerificationFormStep1;
