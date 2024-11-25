import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Divider, Drawer, Form, Input, Radio, Space } from 'antd';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useAuth } from 'hooks/useAuth';
import { type FC, useEffect } from 'react';
import { Archive } from 'react-bootstrap-icons';
import { Controller, useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import toast from 'react-hot-toast';
import {
  PropertyStatusEnum,
  addDamageProtection,
  fetchPropertyDetail,
  updateProperty,
  updatePropertyStatus,
} from 'stores/slice/propertiesSlice';
import { DepositType } from 'types/depostitType';
import { extractFileName, maxSize } from 'utilities/utils';
import AntdCurrency from 'views/components/AntdCurrency';
import AppLabel from 'views/components/AppLabel';
import DecimalInput from 'views/components/DecimalInput';
import FileUpload from 'views/components/FileUpload';
import SuspenseLoading from 'views/components/SuspenseLoading';
import {
  type EditPropertyApiType,
  type EditPropertySchemaType,
  editPropertySchema,
} from './schema';

type Props = {
  onCloseDrawer: () => void;
  open: boolean;
};

const PropertiesEdit: FC<Props> = ({ onCloseDrawer, open }) => {
  const dispatch = useAppDispatch();

  const selectedPropertyId = useAppSelector(
    (state) => state.properties.editProperty.selectedPropertyId,
  );

  const propertyFetchStatus = useAppSelector(
    (state) => state.properties.editProperty.selectedProperty.status,
  );

  useEffect(() => {
    if (selectedPropertyId) {
      dispatch(fetchPropertyDetail(selectedPropertyId));
    }
  }, [selectedPropertyId, dispatch]);

  return (
    <Drawer
      title="Edit property"
      onClose={onCloseDrawer}
      open={open}
      width={423}
      style={{ padding: '0px' }}
    >
      {propertyFetchStatus === 'pending' ? (
        <SuspenseLoading type="secondary" />
      ) : (
        <EditForm onCloseDrawer={onCloseDrawer} />
      )}
    </Drawer>
  );
};

type EditFormProps = {
  onCloseDrawer: () => void;
};

const EditForm: FC<EditFormProps> = ({ onCloseDrawer }) => {
  const dispatch = useAppDispatch();

  const propertyDetail = useAppSelector(
    (state) => state.properties.editProperty.selectedProperty.data,
  );

  const status = useAppSelector(
    (state) => state.properties.editProperty.status,
  );

  const damageProtection = useAppSelector(addDamageProtection);

  const { userId } = useAuth();

  const { result } = propertyDetail || {};
  const { control, handleSubmit, watch, setValue, setError } =
    useForm<EditPropertySchemaType>({
      resolver: zodResolver(editPropertySchema),
      mode: 'onChange',
      defaultValues: {
        property_type_id: result?.property_type_id,
        property_status_id: result?.property_status_id,
        propertyName: result?.manualProperty.propertyName,
        propertyLocation: result?.manualProperty.propertyLocation,
        propertyImage: result?.manualProperty.propertyImage,
        noOfBedrooms: result?.manualProperty.noOfBedrooms,
        noOfBathrooms: result?.manualProperty.noOfBathrooms,
        maxGuest: result?.manualProperty.maxGuest,
        damage_protection_id: result?.manualProperty.damage_protection_id,
        nonRefundCurrencyType:
          result?.manualProperty.nonRefundCurrencyType || '',
        refundCurrencyType: result?.manualProperty.refundCurrencyType || '',
        refundAmount: result?.manualProperty.refundAmount
          ? Number(result?.manualProperty.refundAmount)
          : 0,
        nonRefundAmount: result?.manualProperty.nonRefundAmount
          ? Number(result?.manualProperty.nonRefundAmount)
          : 0,
      },
    });

  const selectedDamageProtection = watch('damage_protection_id');

  const isRefundable =
    Number(selectedDamageProtection) === 1 ||
    Number(selectedDamageProtection) === 3;

  const isDamageWaiver =
    Number(selectedDamageProtection) === 2 ||
    Number(selectedDamageProtection) === 3;

  const handleArchiveProperty = () => {
    if (!result?.id) {
      toast.error('Property ID is required');
      return;
    }
    dispatch(
      updatePropertyStatus({
        propertyId: result?.id,
        propertyStatusId: PropertyStatusEnum.ARCHIVED,
      }),
    );
  };

  const handleSaveChanges = (data: EditPropertySchemaType) => {
    if (!userId) {
      toast.error('User ID is required');
      return;
    }

    const manualProperty: EditPropertyApiType = {
      propertyName: data.propertyName,
      propertyLocation: data.propertyLocation,
      propertyImage: data.propertyImage,
      noOfBedrooms: data.noOfBedrooms,
      noOfBathrooms: data.noOfBathrooms,
      maxGuest: data.maxGuest,
      damage_protection_id: data.damage_protection_id,
      property_type_id: 2,
      property_status_id: 2,
      host_id: userId,
    };

    if (
      data.damage_protection_id ===
        DepositType.NON_REFUNDABLE_DAMAGE_WAIVER_ONLY ||
      data.damage_protection_id === DepositType.BOTH
    ) {
      if (!data.nonRefundCurrencyType || !data.nonRefundAmount) {
        setError('nonRefundCurrencyType', {
          message: 'Currency type is required',
        });
        setError('nonRefundAmount', {
          message: 'Non refund amount is required',
        });

        return;
      }

      manualProperty.nonRefundCurrencyType = data.nonRefundCurrencyType;
      manualProperty.nonRefundAmount = data.nonRefundAmount;
    }

    if (
      data.damage_protection_id ===
        DepositType.REFUNDABLE_SECURITY_DEPOSIT_ONLY ||
      data.damage_protection_id === DepositType.BOTH
    ) {
      if (!data.refundCurrencyType || !data.refundAmount) {
        setError('refundAmount', {
          message: 'Currency type is required',
        });
        setError('refundAmount', {
          message: 'Refund amount is required',
        });

        return;
      }
      manualProperty.refundCurrencyType = data.refundCurrencyType;
      manualProperty.refundAmount = data.refundAmount;
    }

    if (result?.id) {
      dispatch(
        updateProperty({
          property: manualProperty,
          propertyId: result?.id,
        }),
      );
    } else {
      toast.error('Property ID is required');
    }
  };

  const handleCancel = () => {
    onCloseDrawer();
  };

  return (
    <Form onFinish={handleSubmit(handleSaveChanges)}>
      <div className="mb-4">
        <AppLabel label="PROPERTY ID">
          <Input size="middle" variant="filled" value={result?.id} disabled />
        </AppLabel>
      </div>

      <div>
        <AppLabel label="PROPERTY NAME">
          <FormItem control={control} name="propertyName">
            <Input size="middle" variant="filled" />
          </FormItem>
        </AppLabel>
      </div>

      <div>
        <AppLabel label="PROPERTY IMAGE">
          <FormItem control={control} name="propertyImage">
            <Controller
              control={control}
              name="propertyImage"
              render={({ field: { value } }) => (
                <>
                  <FileUpload
                    type="button"
                    fileName={extractFileName(value)}
                    fileLocation={value}
                    setValue={(value) => setValue('propertyImage', value)}
                    acceptedFileTypes={'.jpg, .jpeg, .png,'}
                    draggerText={'Upload property image'}
                    maxSize={maxSize}
                    setError={(error) =>
                      setError('propertyImage', {
                        message: error,
                      })
                    }
                  />
                </>
              )}
            />
          </FormItem>
        </AppLabel>
      </div>
      <div>
        <AppLabel label="NO OF BEDS">
          <FormItem control={control} name="noOfBedrooms">
            <Controller
              control={control}
              name="noOfBedrooms"
              render={({ field: { onChange, value } }) => (
                <DecimalInput
                  placeholder="No of Bedrooms"
                  size="middle"
                  variant="filled"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </FormItem>
        </AppLabel>
      </div>
      <div>
        <AppLabel label="NO OF BATHROOMS">
          <FormItem control={control} name="noOfBathrooms">
            <Controller
              control={control}
              name="noOfBathrooms"
              render={({ field: { onChange, value } }) => (
                <DecimalInput
                  placeholder="No of Bathrooms"
                  size="middle"
                  variant="filled"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </FormItem>
        </AppLabel>
      </div>
      <div>
        <AppLabel label="MAX GUESTS">
          <FormItem control={control} name="maxGuest">
            <Controller
              control={control}
              name="maxGuest"
              render={({ field: { onChange, value } }) => (
                <DecimalInput
                  placeholder="No of Guests"
                  size="middle"
                  variant="filled"
                  value={value}
                  onChange={onChange}
                />
              )}
            />{' '}
          </FormItem>
        </AppLabel>
      </div>
      <div>
        <p className="mb-2 text-base font-medium text-PrimaryText">
          Damage Protection Options
        </p>
        <FormItem control={control} name="damage_protection_id">
          <Radio.Group>
            <Space direction="vertical">
              {damageProtection?.map((option) => (
                <div
                  key={option.id}
                  className={classNames(
                    'p-3 border rounded-lg bottom-1 text-sm',
                    {
                      'border-primary': option.id === selectedDamageProtection,
                      'border-gray-400': option.id !== selectedDamageProtection,
                    },
                  )}
                >
                  <Radio value={option.id}>{option.name}</Radio>
                </div>
              ))}
            </Space>
          </Radio.Group>
        </FormItem>
      </div>

      <div className="property-enter-amount">
        <p className="my-2 text-base font-bold text-PrimaryText">
          Enter Amount
        </p>
        {/* Show refundable security deposit amount  */}
        {isRefundable && (
          <FormItem control={control} name="refundAmount">
            <Controller
              control={control}
              name="refundAmount"
              render={({ field: { value } }) => (
                <AntdCurrency
                  defaultCurrency={result?.manualProperty.refundCurrencyType}
                  placeholder="Refundable security deposit amount"
                  value={value}
                  onChange={(currency, value) => {
                    setValue('refundCurrencyType', currency);
                    if (
                      typeof value === 'string' &&
                      !Number.isNaN(Number(value))
                    ) {
                      setValue('refundAmount', Number(value));
                    } else {
                      setValue('refundAmount', 0);
                    }
                  }}
                />
              )}
            />
          </FormItem>
        )}
        {/* Show damage waiver cover amount  */}
        {isDamageWaiver && (
          <FormItem control={control} name="nonRefundAmount">
            <Controller
              control={control}
              name="nonRefundAmount"
              render={({ field: { value } }) => (
                <AntdCurrency
                  defaultCurrency={result?.manualProperty.nonRefundCurrencyType}
                  placeholder="Damage waiver cover amount"
                  value={value}
                  onChange={(currency, value) => {
                    setValue('nonRefundCurrencyType', currency);
                    if (
                      typeof value === 'string' &&
                      !Number.isNaN(Number(value))
                    ) {
                      setValue('nonRefundAmount', Number(value));
                    } else {
                      setValue('nonRefundAmount', 0);
                    }
                  }}
                />
              )}
            />
          </FormItem>
        )}
        <div className="pt-4 mb-12">
          <Button
            onClick={handleArchiveProperty}
            icon={
              <Archive className="w-4 h-4 border-0 fill-primary text-primary" />
            }
          >
            Archive Property
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 z-20 w-full pb-2 bg-white">
        <Divider className="m-0 mb-4" />
        <Space
          direction="horizontal"
          size={10}
          className="justify-end w-full pr-8"
        >
          <Button
            disabled={status === 'pending'}
            size="large"
            className="font-bold bg-lightBlue"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="font-bold"
            loading={status === 'pending'}
          >
            Save changes
          </Button>
        </Space>
      </div>
    </Form>
  );
};

export default PropertiesEdit;
