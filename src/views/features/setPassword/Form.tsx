import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Input, message } from 'antd';
import { useAppDispatch } from 'hooks/redux';
import { useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import { useNavigate } from 'react-router-dom';
import { guestSetPassword } from 'stores/slice/setPasswordSlice';
import AuthFromContainer from 'views/components/containers/AuthFromContainer';
import GuestLoginIcon from 'views/components/icons/GuestLoginIcon';
import { z } from 'zod';

export type GuestRegisterFormType = {
  identificationNumber: string;
};

const schema = z.object({
  identificationNumber: z.string().min(2),
});

const SetPasswordForm = () => {
  const { control, handleSubmit } = useForm<GuestRegisterFormType>({
    defaultValues: {
      identificationNumber: '',
    },
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleOpt = async (data: GuestRegisterFormType) => {
    const isValidId = await dispatch(
      guestSetPassword({ identificationNumber: data.identificationNumber }),
    );

    if (isValidId.meta.requestStatus === 'fulfilled') {
      setTimeout(() => {
        navigate(`/email-otp-form/${data.identificationNumber}`);
      }, 2000);
    } else {
      message.error('The ID number is not valid.');
    }
  };

  return (
    <AuthFromContainer
      title="Get Registered for your guest account"
      subTitle="Enter your ID number to get started"
    >
      <Form onFinish={handleSubmit(handleOpt)}>
        <div className="flex flex-col gap-1 ">
          <FormItem control={control} name="identificationNumber">
            <label htmlFor="identity" className="text-gray-400 text-xs mb-2">
              IDENTIFICATION NUMBER
            </label>
            <Input
              id="identity"
              prefix={<GuestLoginIcon />}
              placeholder="IDENTIFICATION NUMBER"
              size="large"
              variant="filled"
              className="py-3"
            />
          </FormItem>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full py-6 mt-2 font-bold"
            >
              Request Code
            </Button>
          </Form.Item>
        </div>
      </Form>
    </AuthFromContainer>
  );
};

export default SetPasswordForm;
