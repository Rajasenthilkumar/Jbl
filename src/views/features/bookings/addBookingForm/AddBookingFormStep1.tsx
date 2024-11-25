import { Button, DatePicker, Input, Select } from 'antd';
import { bookingSourceOptions } from 'constants/SelectOptions';
import { DEFAULT_PAGE_LIMIT } from 'constants/pageLimit';
import dayjs from 'dayjs';
import debounce from 'lodash/debounce';
import { type FC, useEffect, useMemo, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import { BsCalendarFill } from 'react-icons/bs';
import type { ApiError } from 'utilities/api';
import { toastErrorDisplay } from 'utilities/toastErrorDisplay';
import AntdCurrency from 'views/components/AntdCurrency';
import DecimalInput from 'views/components/DecimalInput';
import {
  FormContent,
  FormFooter,
  FromContainer,
} from 'views/components/FormComponents';
import { useGetProperties } from '../hooks';
import type { PropertyType } from '../types';
import { AddBookingSteps } from './AddBookingEntity';
import type { AddBookingFormSchema } from './StepFormSchema';

type Props = {
  setStep: (value: number) => void;
};

const DATE_FORMAT = 'DD-MM-YYYY';

const AddBookingFormStep1: FC<Props> = ({ setStep }) => {
  const { status, propertiesData, getAllProperties } = useGetProperties();
  const { control, trigger, setValue, watch } =
    useFormContext<AddBookingFormSchema>();
  const [_, setRevalidateState] = useState(false);

  const debounceTimeout = 800;

  const fetchAllProperties = async (searchValue = '') => {
    try {
      await getAllProperties({
        pageNumber: 1,
        pageLimit: DEFAULT_PAGE_LIMIT,
        searchField: {
          'manualProperty.propertyName': searchValue,
        },
      });
    } catch (error) {
      toastErrorDisplay(error);
      const apiError: ApiError = error as ApiError;
      if (apiError.data?.error?.msg) {
        const msg = apiError.data.error.msg;
        // biome-ignore lint/suspicious/noConsoleLog: <explanation>
        console.log(msg, 'error msg');
      }
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchAllProperties();
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const debounceFetcher = useMemo(() => {
    const loadOptions = async (value: string) => {
      await fetchAllProperties(value);
    };

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout]);

  const onNext = async () => {
    // Triggers only the validation schema for stepOne
    const isValid = await trigger('stepOne');
    if (!isValid) {
      setRevalidateState(true);
    }
    if (isValid) {
      setStep(AddBookingSteps.STEP2);
    }
  };

  const checkInData = watch('stepOne.CheckInDate');
  const checkOutData = watch('stepOne.CheckOutDate');

  const minCheckInDate = dayjs();
  const maxCheckInDate = checkOutData
    ? dayjs(checkOutData, DATE_FORMAT)
    : undefined;
  const minCheckOutDate = checkInData
    ? dayjs(checkInData, DATE_FORMAT)
    : dayjs();

  const handleFilterOption = (
    input: string,
    option: PropertyType | undefined,
  ) => {
    const label = (option?.label ?? '').toLowerCase();
    const searchInput = input.toLowerCase();
    return label.includes(searchInput);
  };

  return (
    <FromContainer>
      <FormContent>
        <p className="mb-2 color-[#051621] text-base font-semibold">
          Identification & Booking Information
        </p>
        <FormItem
          control={control}
          name="stepOne.bookingReference"
          className="w-full"
        >
          <Controller
            control={control}
            name="stepOne.bookingReference"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Booking Reference"
                size="large"
                variant="filled"
                className="w-full py-3"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </FormItem>
        <FormItem control={control} name="stepOne.propertyId">
          <Select
            className="w-full"
            options={propertiesData}
            showSearch
            loading={status === 'pending'}
            placeholder="Select Property"
            optionFilterProp="label"
            onSearch={debounceFetcher}
            filterOption={(input, option) =>
              handleFilterOption(input, option as PropertyType | undefined)
            }
            size="large"
            variant="filled"
            onChange={(data) => {
              setValue('stepOne.propertyId', data);
            }}
          />
        </FormItem>
        <div className="flex items-center gap-4 mb-3">
          <FormItem
            name="stepOne.CheckInDate"
            className="w-1/2"
            control={control}
          >
            <Controller
              control={control}
              name="stepOne.CheckInDate"
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  placement="bottomLeft"
                  inputReadOnly={true}
                  showNow={false}
                  minDate={minCheckInDate}
                  maxDate={maxCheckInDate}
                  format={DATE_FORMAT}
                  onChange={(_, dateString) => {
                    onChange(dateString);
                    if (Array.isArray(dateString)) {
                      setValue('stepOne.CheckInDate', dateString[0]);
                    } else {
                      setValue('stepOne.CheckInDate', dateString);
                    }
                  }}
                  value={value ? dayjs(value, DATE_FORMAT) : null}
                  className="w-full py-3"
                  variant="filled"
                  size="large"
                  placeholder="Check In Date"
                  suffixIcon={<BsCalendarFill color="#7d7d7d" size={18} />}
                />
              )}
            />
          </FormItem>

          <FormItem
            name="stepOne.CheckOutDate"
            className="w-1/2"
            control={control}
          >
            <Controller
              control={control}
              name="stepOne.CheckOutDate"
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  placement="bottomRight"
                  inputReadOnly={true}
                  showNow={false}
                  minDate={minCheckOutDate}
                  format={DATE_FORMAT}
                  onChange={(_date, dateString) => {
                    onChange(dateString);
                    if (Array.isArray(dateString)) {
                      setValue('stepOne.CheckOutDate', dateString[0]);
                    } else {
                      setValue('stepOne.CheckOutDate', dateString);
                    }
                  }}
                  value={value ? dayjs(value, DATE_FORMAT) : null}
                  className="w-full py-3"
                  variant="filled"
                  size="large"
                  placeholder="Check Out Date"
                  suffixIcon={<BsCalendarFill color="#7d7d7d" size={18} />}
                />
              )}
            />
          </FormItem>
        </div>

        <FormItem name="stepOne.GrossBookingValue" control={control}>
          <Controller
            control={control}
            name="stepOne.GrossBookingValue"
            render={({ field: { value } }) => (
              <AntdCurrency
                placeholder="Gross Booking Value"
                value={value}
                onChange={(currency, value) => {
                  setValue('stepOne.CurrencyType', currency);
                  if (
                    typeof value === 'string' &&
                    !Number.isNaN(Number(value))
                  ) {
                    setValue('stepOne.GrossBookingValue', value);
                  }
                }}
              />
            )}
          />
        </FormItem>
        <FormItem control={control} name="stepOne.BookingSource">
          <Select
            className="w-full mb-3"
            options={bookingSourceOptions}
            showSearch
            placeholder="Booking Source"
            optionFilterProp="label"
            filterOption={(input, option) =>
              handleFilterOption(input, option as PropertyType | undefined)
            }
            size="large"
            variant="filled"
          />
        </FormItem>
        <FormItem name="stepOne.TotalGuest" control={control}>
          <Controller
            control={control}
            name="stepOne.TotalGuest"
            render={({ field: { onChange, value } }) => (
              <DecimalInput
                placeholder="Total Guests"
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
        <div style={{ marginTop: 24 }}>
          <Button
            type="primary"
            className="p-5 ml-4 text-sm font-bold"
            htmlType="button"
            onClick={onNext}
          >
            Next
          </Button>
        </div>
      </FormFooter>
    </FromContainer>
  );
};

export default AddBookingFormStep1;
