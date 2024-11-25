import { Button, Checkbox, Form, Input } from 'antd';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormItem } from 'react-hook-form-antd';
import * as z from 'zod';

import type { FC } from 'react';
import { Link } from 'react-router-dom';
import AuthFromContainer from 'views/components/containers/AuthFromContainer';
import LockIcon from 'views/components/icons/LockIcon';
import PerssonIcon from 'views/components/icons/PersonIcon';

export type GuestLoginFormType = {
  identificationnumber: string;
  password: string;
};

const schema = z.object({
  identificationnumber: z
    .string()
    .min(1, { message: 'identificationnumber is required' }),
});

type GuestLoginFormProps = {
  onFinishForm: () => void;
  isSubmitting: boolean;
  handleRememberMe: (value: boolean) => void;
};

const GuestLoginForm: FC<GuestLoginFormProps> = ({
  onFinishForm,
  isSubmitting,
  handleRememberMe,
}) => {
  const { control, handleSubmit } = useForm<GuestLoginFormType>({
    defaultValues: {
      identificationnumber: '',
      password: '',
    },
    resolver: zodResolver(schema),
  });
  return (
    <AuthFromContainer
      title="Log in to your Guest Account."
      subTitle="To log in, enter your ID number and password."
    >
      <Form onFinish={handleSubmit(onFinishForm)} id="login-form">
        <div className="flex flex-col gap-1 ">
          <FormItem control={control} name="identificationnumber">
            <Input
              prefix={<PerssonIcon />}
              placeholder="Identification Number"
              size="large"
              variant="filled"
              className="py-3"
              id="identificationnumber"
            />
          </FormItem>

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
            <Form.Item
              className="mx-2"
              name="rememberMe"
              valuePropName="checked"
            >
              <Checkbox onChange={(e) => handleRememberMe(e.target.checked)}>
                Remember Me
              </Checkbox>
            </Form.Item>
            <Link
              to={'/forgot-password'}
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
      <p className="mt-16 text-center text-PrimaryText" id="signup-link">
        {' '}
        Don't have an account?{' '}
        <Link to={'/sign-up'} className="font-bold text-primary">
          Sign up{' '}
        </Link>
      </p>
    </AuthFromContainer>
  );
};

export default GuestLoginForm;
