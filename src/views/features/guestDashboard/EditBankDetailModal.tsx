import { Button, DatePicker, Form, Input, Modal } from 'antd';
import dayjs from 'dayjs';
import type { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import DecimalInput from 'views/components/DecimalInput';
import {
  FormContent,
  FormFooter,
  FromContainer,
} from 'views/components/FormComponents';
import type { EditBankDetailschema } from './EditBankDetailschema';

interface EditBankDetailModalProps {
  open: boolean;
  onCancel: () => void;
}

const EditBankDetailModal: FC<EditBankDetailModalProps> = ({
  open,
  onCancel,
}) => {
  const { control } = useFormContext<EditBankDetailschema>();
  const expirationFormat = 'MM/YYYY';
  return (
    <Modal
      className="guestdashboard-edit-card"
      title="Edit card details"
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      <FromContainer>
        <FormContent>
          <Form>
            <div className="flex gap-4 flex-wrap md:flex-nowrap md:justify-between step1-form-bookingverify ">
              <FormItem
                control={control}
                name="card_holder_name"
                className="w-full"
              >
                <Input
                  placeholder="Cardholder Name"
                  size="large"
                  className="py-3 get-input-placeholder"
                />
              </FormItem>

              <FormItem control={control} name="card_number" className="w-full">
                <Controller
                  control={control}
                  name="card_number"
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

            <div className="flex gap-2 step1-form-bookingverify">
              <FormItem
                control={control}
                name="expiration_date"
                className="w-full"
              >
                <Controller
                  control={control}
                  name="expiration_date"
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

              <FormItem control={control} name="cvv" className="w-full">
                <Controller
                  control={control}
                  name="cvv"
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
          <Button className="mx-2" type="primary" htmlType="submit">
            Update
          </Button>
        </FormFooter>
      </FromContainer>
    </Modal>
  );
};

export default EditBankDetailModal;
