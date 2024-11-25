import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Input, Modal } from 'antd';
import { useAppDispatch } from 'hooks/redux';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import toast from 'react-hot-toast';
import { addCardDetails } from 'stores/slice/profileGuestSlice';
import {
  type AddCardDetailsSchema,
  addCardDetailsSchema,
} from 'views/features/guestProfile/schema';
import { FormContent, FormFooter, FromContainer } from '../FormComponents';
import MasterCardIcon from '../icons/MasterCardIcon';

interface AddNewCardProps {
  open: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  onAddCard: (cardDetails: {
    type: string;
    number: string;
    name: string;
    expiration: string;
    cvv: string;
  }) => void;
}
const AddNewCard: FC<AddNewCardProps> = ({
  handleOk,
  open,
  handleCancel,
  onAddCard,
}) => {
  const dispatch = useAppDispatch();
  const { control, setValue, handleSubmit, reset } =
    useForm<AddCardDetailsSchema>({
      shouldUnregister: false,
      mode: 'onChange',
      resolver: zodResolver(addCardDetailsSchema),
      defaultValues: {},
    });

  const handleInputChange =
    (field: keyof AddCardDetailsSchema, maxLength?: number) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value.replace(/\D/g, '');
      if (maxLength && value.length > maxLength) {
        value = value.slice(0, maxLength);
      }
      setValue(field, value, { shouldValidate: true });
    };

  const handleExpirationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) {
      value = value.slice(0, 4);
    }

    let month = value.slice(0, 2);
    const year = value.slice(2, 4);

    if (month && (Number.parseInt(month) > 12 || Number.parseInt(month) < 1)) {
      month = '12';
    }

    if (value.length >= 3) {
      value = `${month}/${year}`;
    }

    setValue('expiration_date', value, { shouldValidate: true });
  };

  const isValidCardNumber = (number: string) => {
    const regex = /^[0-9]{13,19}$/;
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
    if (!isValidCardNumber(data.card_number)) {
      toast.error('Invalid card number');
      return;
    }
    const cardDetails = {
      type: 'Mastercard',
      number: data.card_number.slice(-4),
      name: data.card_holder_name,
      expiration: data.expiration_date,
      cvv: data.cvv,
    };
    onAddCard(cardDetails);
    const requestData: AddCardDetailsSchema = { ...data };

    dispatch(addCardDetails(requestData));
    toast.success('Card Details added successfully!');
    reset();
    handleOk();
  };

  return (
    <Modal
      open={open}
      width={650}
      footer={null}
      closable={true}
      maskClosable={true}
      onCancel={handleCancel}
    >
      <div className="add-new-card-modal">
        <div className="flex flex-col flex-start">
          <h1 className="w-100 py-2 text-xl font-semibold"> Add New Card </h1>
          <Form onFinish={handleSubmit(onSave)}>
            <FromContainer>
              <FormContent>
                <div className="drawerContainer flex flex-col gap-1">
                  <div className="flex-1">
                    <div className="grid grid-cols-2 gap-4 mt-2 mb-4 md:grid-cols-[50%_50%]">
                      {/* Card Number Field */}
                      <FormItem
                        control={control}
                        name="card_number"
                        className="w-full"
                      >
                        <Input
                          placeholder="CARD NUMBER"
                          size="large"
                          variant="filled"
                          className="py-3 fullname-info"
                          type="text"
                          maxLength={16}
                          onChange={handleInputChange('card_number', 16)}
                          prefix={
                            <div className="masterCard">
                              <MasterCardIcon />
                            </div>
                          }
                        />
                      </FormItem>

                      {/* Cardholder Name Field */}
                      <FormItem
                        control={control}
                        name="card_holder_name"
                        className="w-full"
                      >
                        <Input
                          placeholder="CARDHOLDER NAME"
                          size="large"
                          variant="filled"
                          className="py-3 fullname-info"
                          onChange={handleInputChange('card_holder_name')}
                        />
                      </FormItem>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-2 mb-4 md:grid-cols-[30%_30%]">
                      {/* Card Number Field */}
                      <FormItem
                        control={control}
                        name="expiration_date"
                        className="w-full"
                      >
                        <Input
                          placeholder="MM/YY"
                          size="large"
                          variant="filled"
                          className="py-3 fullname-info"
                          type="text"
                          maxLength={5}
                          onChange={handleExpirationChange}
                        />
                      </FormItem>

                      {/* Cardholder Name Field */}
                      <FormItem control={control} name="cvv" className="w-full">
                        <Input
                          placeholder="CVV"
                          size="large"
                          variant="filled"
                          className="py-3 fullname-info"
                          type="text"
                          maxLength={3}
                          onChange={handleInputChange('cvv', 3)}
                        />
                      </FormItem>
                    </div>
                  </div>
                </div>
              </FormContent>
            </FromContainer>
            <FormFooter>
              <div className="displayclassname flex justify-end gap-2">
                <Button className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit" className="save-btn">
                  Add
                </Button>
              </div>
            </FormFooter>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default AddNewCard;
