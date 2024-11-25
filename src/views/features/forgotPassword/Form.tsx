import { Button, Form, Input } from 'antd';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormItem } from 'react-hook-form-antd';
import * as z from 'zod';

import LeftOutlined from '@ant-design/icons/LeftOutlined';
import { type FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthFromContainer from 'views/components/containers/AuthFromContainer';
import GuestLoginIcon from 'views/components/icons/GuestLoginIcon';
import MailIcon from 'views/components/icons/MailIcon';

export type ForgetPasswordFormType = {
  id_number?: string;
  email?: string;
  mode: 'Host' | 'Guest';
};

const HostSchema = z.object({
  mode: z.literal('Host'),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
});

const GuestSchema = z.object({
  mode: z.literal('Guest'),
  id_number: z
    .string()
    .min(1, { message: 'Identification Number is required' }),
});

const schema = z.discriminatedUnion('mode', [HostSchema, GuestSchema]);

type Props = {
  onFinish: (data: ForgetPasswordFormType) => void;
  isSubmitting: boolean;
  mode: 'Host' | 'Guest' | undefined;
};

const ForgotPasswordForm: FC<Props> = ({
  onFinish,
  mode = 'Host',
  isSubmitting,
}) => {
  const { control, handleSubmit, setValue } = useForm<ForgetPasswordFormType>({
    defaultValues: {
      email: '',
      id_number: '',
      mode: mode,
    },
    resolver: zodResolver(schema),
  });
  useEffect(() => {
    setValue('mode', mode || 'Host');

    if (mode === 'Host') {
      setValue('email', '');
    } else {
      setValue('id_number', '');
    }
  }, [mode, setValue]);

  return (
    <AuthFromContainer
      title="Forgot Your Password?"
      subTitle={
        mode === 'Host'
          ? 'Enter the email address associated with your account and we’ll email you a link to reset your password.'
          : "We'll help you reset it and get back on track"
      }
    >
      <Form
        id="forgot-password-form"
        onFinish={handleSubmit((_data) => {
          onFinish(_data);
        })}
      >
        <div className="flex flex-col gap-1">
          {mode === 'Host' ? (
            <FormItem control={control} name="email">
              <Input
                prefix={<MailIcon />}
                placeholder="Email"
                size="large"
                variant="filled"
                className="py-3"
                id="email"
              />
            </FormItem>
          ) : (
            <FormItem control={control} name="id_number">
              <Input
                prefix={<GuestLoginIcon />}
                placeholder="Identification Number"
                size="large"
                variant="filled"
                className="py-3"
                id="id_number"
              />
            </FormItem>
          )}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full py-6 mt-2 font-bold"
              loading={isSubmitting}
              id="forgot-password-button"
            >
              Send reset link
            </Button>
          </Form.Item>
        </div>
      </Form>
      <p
        className="flex items-center w-full gap-2 mt-16 text-center text-PrimaryText"
        id="login-link"
      >
        <Link to="/login" className="w-full">
          {' '}
          <LeftOutlined /> Return to login
        </Link>
      </p>
    </AuthFromContainer>
  );
};

export default ForgotPasswordForm;
