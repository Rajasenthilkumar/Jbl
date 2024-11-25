import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Input, Modal } from 'antd';
import { useAppDispatch } from 'hooks/redux';
import { useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import toast from 'react-hot-toast';
import { editGuestCardDetails } from 'stores/slice/profileGuestSlice';
import {
  type EditCardDetailsSchema,
  editCardDetailsSchema,
} from 'views/features/guestProfile/schema';

import type { FC } from 'react';
import { FormContent, FormFooter, FromContainer } from '../FormComponents';
import MasterCardIcon from '../icons/MasterCardIcon';

type currentCard = {
  id: string;
  cardHolderName: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
};
type Props = {
  open: boolean;
  currentCard: currentCard;
  handleCancel: () => void;
  handleOk: () => void;
};

const GuestEditCard: FC<Props> = ({
  currentCard,
  handleOk,
  open,
  handleCancel,
}) => {
  const dispatch = useAppDispatch();
  const { control, handleSubmit, setValue, getValues } =
    useForm<EditCardDetailsSchema>({
      shouldUnregister: false,
      mode: 'onChange',
      resolver: zodResolver(editCardDetailsSchema),
      defaultValues: currentCard,
    });
  //const userId = useAppSelector((state) => state.customerDetails.cardDetails.data?.result?.authorizations.authorization_code);

  // useEffect(() => {
  //   if (currentCard) {
  //     console.log("currentCard", currentCard);
  //     setValue("card_holder_name", currentCard.cardHolderName);
  //     setValue("card_number", currentCard.cardNumber);
  //     setValue("expiration_date", currentCard.expirationDate);
  //     setValue("cvv", currentCard.cvv);
  //   }
  // }, [dispatch, setValue, currentCard]);

  // useEffect(() => {
  //   // Assuming the fetched card details are stored in the Redux store.

  //   if (cardDetails) {
  //     // Dynamically set form values if the card details are fetched
  //     setValue('card_holder_name', cardDetails.cardHolderName);
  //     setValue('card_number', cardDetails.cardNumber);
  //     setValue('expiration_date', cardDetails.expirationDate);
  //     setValue('cvv', cardDetails.cvv);
  //   }
  // }, [dispatch, id, setValue]);

  const onSave = async () => {
    const formValues = getValues();

    const requestData: EditCardDetailsSchema = {
      card_holder_name: formValues.card_holder_name,
      card_number: formValues.card_number,
      expiration_date: formValues.expiration_date,
      cvv: formValues.cvv,
    };

    dispatch(
      editGuestCardDetails({
        profileData: requestData,
      }),
    );
    toast.success('Card details updated successfully!');

    /*   setTimeout(() => {
      if (id) {
        dispatch(fetchCard(id));
      }
    }, 50); */

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
          <h1 className="w-100 py-2 text-xl font-semibold">
            {' '}
            Edit Card Details
          </h1>
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
                          prefix={
                            <div className="masterCard">
                              <MasterCardIcon />
                            </div>
                          }
                          defaultValue={currentCard.cardNumber}
                          onChange={(e) =>
                            setValue('card_number', e.target.value, {
                              shouldValidate: true,
                            })
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
                          type="text"
                          maxLength={16}
                          defaultValue={currentCard.cardHolderName}
                          onChange={(e) =>
                            setValue('card_holder_name', e.target.value, {
                              shouldValidate: true,
                            })
                          }
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
                          defaultValue={currentCard.expirationDate}
                          onChange={(e) =>
                            setValue('expiration_date', e.target.value, {
                              shouldValidate: true,
                            })
                          }
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
                          defaultValue={currentCard.cvv}
                          onChange={(e) =>
                            setValue('cvv', e.target.value, {
                              shouldValidate: true,
                            })
                          }
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
                <Button
                  type="primary"
                  htmlType="submit"
                  className="save-btn"
                  onClick={onSave}
                >
                  Save Changes
                </Button>
              </div>
            </FormFooter>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default GuestEditCard;
