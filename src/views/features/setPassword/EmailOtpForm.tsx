import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Input, message } from 'antd';
import { useAppDispatch } from 'hooks/redux';
import { useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import { useNavigate, useParams } from 'react-router-dom';
import {
  guestSetPassword,
  guestVerifyOtp,
} from 'stores/slice/setPasswordSlice';
import AuthFromContainer from 'views/components/containers/AuthFromContainer';
import AuthLayout from 'views/layout/AuthLayout';
import { z } from 'zod';

export type GuestEmailOtpFormType = {
  identificationNumber: string;
  otp: string;
};

const schema = z.object({
  identificationNumber: z.string().min(2),
  otp: z.string().min(6),
});

const GuestOtpForm = () => {
  const { identificationNumber: paramId } = useParams();

  const identificationNumber = paramId || '';

  const { control, handleSubmit } = useForm<GuestEmailOtpFormType>({
    defaultValues: {
      identificationNumber: identificationNumber,
      otp: '',
    },
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleOtp = async (data: GuestEmailOtpFormType) => {
    const result = await dispatch(
      guestVerifyOtp({
        identificationNumber: data.identificationNumber,
        otp: data.otp,
      }),
    );

    if (result.meta.requestStatus === 'fulfilled') {
      setTimeout(() => {
        navigate('/guest-password-form');
      }, 2000);
    } else {
      message.error('Invalid OTP. Please try again.');
    }
  };

  const handleResendCode = async () => {
    const isValidId = await dispatch(
      guestSetPassword({ identificationNumber }),
    );

    if (isValidId.meta.requestStatus === 'fulfilled') {
      message.success('OTP has been resent to your email.');
    } else {
      message.error('The ID number is not valid.');
    }
  };

  return (
    <AuthLayout>
      <AuthFromContainer
        title="Check your mail for Code"
        subTitle="Enter the 6 digit code which is sent to the email address"
      >
        <Form onFinish={handleSubmit(handleOtp)}>
          <div className="flex flex-col gap-1">
            <FormItem control={control} name="otp">
              <Input.OTP size="large" variant="filled" />
            </FormItem>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="w-full py-6 mt-2 font-bold"
              >
                Continue
              </Button>
            </Form.Item>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-black">Didn't receive the code?</p>
              </div>
              <Button
                className="border-none br-bottom-gray"
                onClick={handleResendCode}
              >
                Resend Code
              </Button>
            </div>
          </div>
        </Form>
      </AuthFromContainer>
    </AuthLayout>
  );
};

export default GuestOtpForm;
