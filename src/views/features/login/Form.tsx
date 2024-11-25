import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox, Form, Input, Segmented } from 'antd';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import * as z from 'zod';
import './login.scss';
import { Link } from 'react-router-dom';
import AuthFromContainer from 'views/components/containers/AuthFromContainer';
import GuestLoginIcon from 'views/components/icons/GuestLoginIcon';
import LockIcon from 'views/components/icons/LockIcon';
import './login.scss';
import type { FC } from 'react';
import MailIcon from 'views/components/icons/MailIcon';

export type LoginFormType = {
  id_number?: string;
  email?: string;
  password: string;
  rememberMe: boolean;
  rememberGuest: boolean;
  mode: string;
};

const HostSchema = z.object({
  mode: z.literal('Host'),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(5, { message: 'Password must be at least 5 characters' }),
  rememberMe: z.boolean(),
});

const GuestSchema = z.object({
  mode: z.literal('Guest'),
  id_number: z
    .string()
    .min(1, { message: 'Identification Number is required' }),
  password: z
    .string()
    .min(5, { message: 'Password must be at least 5 characters' }),
  rememberMe: z.boolean(),
});

const schema = z.discriminatedUnion('mode', [HostSchema, GuestSchema]);

type Props = {
  onFinishForm: (formData: LoginFormType) => void;
  isSubmitting: boolean;
  handleRememberMe: (value: boolean) => void;
  handleRememberGuest: (value: boolean) => void;
  id_number: string;
  email: string | undefined;
  rememberMe: boolean;
  rememberGuest: boolean;
  mode: 'Host' | 'Guest';
  setMode: (value: 'Host' | 'Guest') => void;
};

const LoginForm: FC<Props> = ({
  onFinishForm,
  isSubmitting,
  handleRememberMe,
  handleRememberGuest,
  id_number,
  email,
  rememberMe,
  rememberGuest,
  mode,
  setMode,
}) => {
  const { control, handleSubmit, reset } = useForm<LoginFormType>({
    defaultValues: {
      id_number: id_number,
      email: email,
      password: '',
      rememberMe: rememberMe,
      rememberGuest: rememberGuest,
      mode: mode,
    },
    resolver: zodResolver(schema),
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    reset({
      email: mode === 'Host' ? email : '',
      id_number: mode === 'Guest' ? id_number : '',
      password: '',
      rememberMe: mode === 'Host' ? rememberMe : rememberGuest,
      mode: mode,
    });
  }, [mode, reset, email, id_number]);

  return (
    <>
      <div className="flex justify-start mb-4">
        <Segmented
          options={['Host', 'Guest']}
          value={mode}
          onChange={(value) => setMode(value as 'Host' | 'Guest')}
          size="large"
          className="custom-segmented"
        />
      </div>

      <AuthFromContainer
        title={`Log in to your ${mode} account`}
        subTitle={
          mode === 'Host'
            ? `Log in to your ${mode.toLowerCase()} account by entering your registered email address and password.`
            : 'To log in, enter your ID number and password.'
        }
      >
        <Form onFinish={handleSubmit(onFinishForm)} id="login-form">
          <div className="flex flex-col gap-1">
            {mode === 'Host' ? (
              <FormItem control={control} name="email">
                <Input
                  prefix={<MailIcon />}
                  placeholder="Enter your email address"
                  size="large"
                  variant="filled"
                  className="py-3"
                  id="email"
                  value={email}
                  // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
                  onChange={(e) => (email = e.target.value)}
                />
              </FormItem>
            ) : (
              <FormItem control={control} name="id_number">
                <Input
                  prefix={<GuestLoginIcon />}
                  placeholder="Enter your Identification Number"
                  size="large"
                  variant="filled"
                  className="py-3"
                  id="id_number"
                  value={id_number}
                  // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
                  onChange={(e) => (id_number = e.target.value)}
                />
              </FormItem>
            )}

            <FormItem control={control} name="password">
              <Input.Password
                placeholder="Password"
                size="large"
                variant="filled"
                className="py-3"
                prefix={<LockIcon />}
                id="password"
              />
            </FormItem>

            <div className="flex justify-between mb-6">
              {mode === 'Host' ? (
                <FormItem
                  control={control}
                  className="mx-2"
                  name="rememberMe"
                  valuePropName="checked"
                >
                  <Checkbox
                    onChange={(e) => handleRememberMe(e.target.checked)}
                  >
                    Remember Me
                  </Checkbox>
                </FormItem>
              ) : (
                <FormItem
                  control={control}
                  className="mx-2"
                  name="rememberMe"
                  valuePropName="checked"
                >
                  <Checkbox
                    onChange={(e) => handleRememberGuest(e.target.checked)}
                  >
                    Remember Me
                  </Checkbox>
                </FormItem>
              )}
              <Link
                to={`/forgot-password?mode=${mode}`}
                id="forgot-password"
                className="font-bold text-primary"
              >
                Forgot password?
              </Link>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="w-full py-6 mt-2 font-bold"
                loading={isSubmitting}
                id="login-button"
              >
                Log In
              </Button>
            </Form.Item>
          </div>
        </Form>

        {mode === 'Host' && (
          <p className="mt-16 text-center text-PrimaryText" id="signup-link">
            Don't have an account?{' '}
            <Link to={'/sign-up'} className="font-bold text-primary">
              Sign up
            </Link>
          </p>
        )}
      </AuthFromContainer>
    </>
  );
};

export default LoginForm;
