import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Input } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import toast from 'react-hot-toast';
import { fetchHostInfo } from 'stores/slice/authSlice';
import { FormContent, FromContainer } from 'views/components/FormComponents';
import LabelComponent from 'views/components/label';
import { editEmergencydetails } from '../GuestCardSlice';
import {
  type EditEmergencyDetailsSchema,
  editEmergencyDetailsSchema,
} from '../schema';

type Props = {
  emergencycardValue: string;
  profileIdValue: number;
  handleCancel: () => void;
  handleOk: () => void;
  profileTypeValue: string;
};

const EmergencyDetailEntity: FC<Props> = ({
  emergencycardValue,
  profileTypeValue,
  handleOk,
  handleCancel,
}) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.userId);

  const { control, handleSubmit, setValue } =
    useForm<EditEmergencyDetailsSchema>({
      mode: 'onChange',
      resolver: zodResolver(editEmergencyDetailsSchema),
      defaultValues: {
        alternative_contact_number: emergencycardValue,
      },
    });

  const onSave = async (data: EditEmergencyDetailsSchema) => {
    const requestData = {
      alternative_contact_number: data.alternative_contact_number,
    };

    await dispatch(
      editEmergencydetails({
        emergencyDetails: requestData,
        profileType: profileTypeValue,
      }),
    );

    toast.success('Emergency details update request sent!');

    setTimeout(() => {
      if (userId) {
        dispatch(fetchHostInfo(userId));
      }
    }, 100);

    handleOk();
  };

  return (
    <Form onFinish={handleSubmit(onSave)}>
      <FromContainer>
        <FormContent>
          <div className="drawerContainer flex flex-col gap-1 edit-info-modal emergency-modal h-full">
            <div className="contentArea editinfo-form-items flex-1">
              <div className="editinfo creditcardinfo emergency-info">
                <FormItem
                  control={control}
                  name="alternative_contact_number"
                  className="w-full"
                >
                  <LabelComponent
                    labeltext={'ALTERNATE CONTACT NUMBER'}
                    className={''}
                    inputId={''}
                  />
                  <Input
                    placeholder="Enter Alternate Contact Number"
                    size="large"
                    variant="filled"
                    className="py-3 fullname-info"
                    type="tel"
                    maxLength={10} // Limit input length to 10
                    onInput={(e) => {
                      const value = e.currentTarget.value.replace(/\D/g, ''); // Remove non-digit characters
                      setValue('alternative_contact_number', value, {
                        shouldValidate: true,
                      });
                    }}
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

export default EmergencyDetailEntity;
