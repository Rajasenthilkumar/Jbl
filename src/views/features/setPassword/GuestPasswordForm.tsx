import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Input, message } from 'antd';
import { useAppDispatch } from 'hooks/redux';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import { useNavigate } from 'react-router-dom';
import { guestUpdatePasssword } from 'stores/slice/setPasswordSlice';
import AuthFromContainer from 'views/components/containers/AuthFromContainer';
import LockIcon from 'views/components/icons/LockIcon';
import AuthLayout from 'views/layout/AuthLayout';
import { z } from 'zod';

export type SetPasswordFormType = {
  token: string;
  password: string;
  confirmPassword: string;
};

const guestSetPassword = z
  .object({
    token: z.string().min(1),
    password: z
      .string()
      .min(1, { message: 'Password is required' })
      .min(8, { message: 'Password must be at least 8 characters long' })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
      })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter',
      })
      .regex(/\d/, { message: 'Password must contain at least one number' })
      .regex(/[\W_]/, {
        message: 'Password must contain at least one special character',
      }),

    confirmPassword: z.string().min(1, 'Confirm password required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'New Password and Confirm Password do not match.',
    path: ['confirmPassword'],
  });

type GuestSetPasswordFormType = z.infer<typeof guestSetPassword>;

const GuestPasswordForm = () => {
  const guestToken = sessionStorage.getItem('guestToken') || '';
  const { control, handleSubmit } = useForm<GuestSetPasswordFormType>({
    defaultValues: {
      token: guestToken,
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(guestSetPassword),
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [navigatedToLogin, setNavigatedToLogin] = useState(false);

  const onSubmit = async (data: GuestSetPasswordFormType) => {
    const isValid = await dispatch(
      guestUpdatePasssword({
        token: data.token,
        password: data.password,
        confirmPassword: data.confirmPassword,
      }),
    );
    if (isValid.meta.requestStatus === 'fulfilled') {
      setNavigatedToLogin(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      message.error('Could not update password.');
    }
  };

  // Disable back navigation
  useEffect(() => {
    if (navigatedToLogin) {
      const handleBeforeUnload = (event: {
        preventDefault: () => void;
        returnValue: string;
      }) => {
        event.preventDefault();
        event.returnValue = ''; // For some browsers
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [navigatedToLogin]);

  return (
    <AuthLayout>
      <AuthFromContainer title="Set Password" subTitle="Set a unique password">
        <Form onFinish={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1">
            <FormItem control={control} name="password">
              <Input.Password
                placeholder="Password"
                size="large"
                variant="filled"
                className="py-3"
                prefix={<LockIcon />}
              />
            </FormItem>
            <FormItem control={control} name="confirmPassword">
              <Input.Password
                placeholder="Confirm Password"
                size="large"
                variant="filled"
                className="py-3"
                prefix={<LockIcon />}
              />
            </FormItem>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="w-full py-6 mt-2 font-bold"
              >
                Back to Login
              </Button>
            </Form.Item>
          </div>
        </Form>
      </AuthFromContainer>
    </AuthLayout>
  );
};

export default GuestPasswordForm;
