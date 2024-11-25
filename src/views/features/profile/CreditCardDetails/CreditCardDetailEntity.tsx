import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Input } from 'antd';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import { FormContent, FromContainer } from 'views/components/FormComponents';
import LabelComponent from 'views/components/label';

import { useAppDispatch } from 'hooks/redux';
import toast from 'react-hot-toast';
import { addCardDetails } from '../GuestCardSlice';
import { type AddCardDetailsSchema, addCardDetailsSchema } from '../schema';

type Props = {
  handleCancel: () => void;
  handleOk: () => void;
};

const CreditCardDetailEntity: FC<Props> = ({ handleOk, handleCancel }) => {
  const dispatch = useAppDispatch();

  const { control, setValue, handleSubmit } = useForm<AddCardDetailsSchema>({
    shouldUnregister: false,
    mode: 'onChange',
    resolver: zodResolver(addCardDetailsSchema),
    defaultValues: {},
  });

  // Limiting input to exact digits for card number and CVV
  const handleInputChange =
    (field: keyof AddCardDetailsSchema, maxLength?: number) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value.replace(/\D/g, ''); // Allow only digits
      if (maxLength && value.length > maxLength) {
        value = value.slice(0, maxLength); // Limit the input to maxLength
      }
      setValue(field, value, { shouldValidate: true });
    };

  const handleExpirationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 6) {
      value = value.slice(0, 6);
    }

    let month = value.slice(0, 2);
    const year = value.slice(2, 6);

    // Validate that the month is between 01 and 12
    if (month && (Number.parseInt(month) > 12 || Number.parseInt(month) < 1)) {
      month = '12'; // Set to "12" if invalid
    }

    // Format as MM/YYYY when the input reaches the proper length
    if (value.length >= 3) {
      value = `${month}/${year}`;
    }

    setValue('expiration_date', value, { shouldValidate: true });
  };

  const isValidCardNumber = (number: string) => {
    const regex = /^[0-9]{13,19}$/; // Valid length for card numbers
    if (!regex.test(number)) return false;

    let sum = 0;
    const cardNumberArray = number.split('').reverse().map(Number);

    for (let i = 0; i < cardNumberArray.length; i++) {
      let n = cardNumberArray[i];
      if (i % 2 === 1) {
        n *= 2;
        if (n > 9) n -= 9;
      }
      sum += n;
    }
    return sum % 10 === 0;
  };

  const onSave = (data: AddCardDetailsSchema) => {
    // Validate card number
    if (!isValidCardNumber(data.card_number)) {
      toast.error('Invalid card number');
      return;
    }

    const requestData: AddCardDetailsSchema = { ...data };

    dispatch(addCardDetails(requestData));
    toast.success('Company details updated successfully!');
    handleOk();
  };

  return (
    <Form onFinish={handleSubmit(onSave)}>
      <FromContainer>
        <FormContent>
          <div className="drawerContainer flex flex-col gap-1 edit-info-modal credit-card-info-modal h-full">
            <div className="contentArea editinfo-form-items flex-1">
              <div className="editinfo creditcardinfo">
                <FormItem
                  control={control}
                  name="cardholder_name"
                  className="w-full"
                >
                  <LabelComponent
                    labeltext={'CARDHOLDER NAME'}
                    className={''}
                    inputId={''}
                  />
                  <Input
                    placeholder="CARDHOLDER NAME"
                    size="large"
                    variant="filled"
                    className="py-3 fullname-info"
                    onChange={handleInputChange('cardholder_name')}
                  />
                </FormItem>

                <FormItem
                  control={control}
                  name="card_number"
                  className="w-full"
                >
                  <LabelComponent
                    labeltext={'CARD NUMBER'}
                    className={''}
                    inputId={''}
                  />
                  <Input
                    placeholder="CARD NUMBER"
                    size="large"
                    variant="filled"
                    className="py-3 fullname-info"
                    type="text"
                    maxLength={16} // Limit input to 16 digits
                    onChange={handleInputChange('card_number', 16)}
                  />
                </FormItem>

                <FormItem
                  control={control}
                  name="expiration_date"
                  className="w-full"
                >
                  <LabelComponent
                    labeltext={'EXPIRY DATE (MM/YYYY)'}
                    className={''}
                    inputId={''}
                  />
                  <Input
                    placeholder="MM/YYYY"
                    size="large"
                    variant="filled"
                    className="py-3 fullname-info"
                    type="text"
                    maxLength={7} // Limiting total length to MM/YYYY
                    onChange={handleExpirationChange} // Custom handler for MM/YYYY format
                  />
                </FormItem>

                <FormItem control={control} name="cvv" className="w-full">
                  <LabelComponent
                    labeltext={'CVV'}
                    className={''}
                    inputId={''}
                  />
                  <Input
                    placeholder="Enter CVV"
                    size="large"
                    variant="filled"
                    className="py-3 fullname-info"
                    type="text"
                    maxLength={3} // Limit input to 3 digits
                    onChange={handleInputChange('cvv', 3)}
                  />
                </FormItem>
              </div>
            </div>

            <div className="footerclassName">
              <div className="footerLine border-t border-gray-300 mb-2" />

              <div className="displayclassname flex justify-end gap-2">
                <Button className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit" className="save-btn">
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </FormContent>
      </FromContainer>
    </Form>
  );
};

export default CreditCardDetailEntity;
