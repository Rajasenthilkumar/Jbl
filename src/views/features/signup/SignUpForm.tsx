import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox, Form, Input } from 'antd';
import type { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import { Link } from 'react-router-dom';
import { AntPhone } from 'views/components/AntPhone';
import AuthFromContainer from 'views/components/containers/AuthFromContainer';
import LockIcon from 'views/components/icons/LockIcon';
import MailIcon from 'views/components/icons/MailIcon';
import UserIcon from 'views/components/icons/UserIcon';
import { type SignUpFormType, signUpSchema } from './schema';

type Props = {
  onFinish: (data: SignUpFormType) => void;
  isSubmitting: boolean;
};

const SignUpForm: FC<Props> = ({ onFinish, isSubmitting }) => {
  const { control, handleSubmit, setValue } = useForm<SignUpFormType>({
    defaultValues: {
      country_code: '+27',
      email: '',
      is_terms_approved: false,
      name: '',
      password: '',
      phone: '',
      sur_name: '',
      is_verified: false,
    },
    resolver: zodResolver(signUpSchema),
  });

  const handleChangeCountryCode = (countryCode: string) => {
    setValue('country_code', countryCode);
  };

  return (
    <AuthFromContainer
      title="Sign Up for a Host Account"
      subTitle="Join other property host like you and start taking control of your properties damage claims management"
    >
      <Form
        id="signup-form"
        onFinish={handleSubmit((_data) => {
          onFinish(_data);
        })}
      >
        <div className="flex flex-col gap-1 ">
          <div className="flex gap-4">
            <FormItem control={control} name="name" className="w-full">
              <Input
                prefix={<UserIcon />}
                placeholder="First name"
                size="large"
                variant="filled"
                className="py-3"
                id="first-name"
              />
            </FormItem>
            <FormItem control={control} name="sur_name" className="w-full">
              <Input
                prefix={<UserIcon />}
                placeholder="Surname"
                size="large"
                variant="filled"
                className="py-3"
                id="last-name"
              />
            </FormItem>
          </div>

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

          <FormItem control={control} name="phone">
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <AntPhone
                  value={value}
                  onChange={(countryCode, phoneNumber) => {
                    onChange(phoneNumber);
                    handleChangeCountryCode(countryCode);
                  }}
                  onBlur={onBlur}
                  countryCode={''}
                />
              )}
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
          <FormItem
            control={control}
            name="is_terms_approved"
            valuePropName="checked"
          >
            <Checkbox id="terms-and-conditions">
              <p className="text-base text-PrimaryText">
                <span className="mr-1">I agree to the</span>
                <Link
                  target="_blank"
                  className="underline text-primary"
                  to={'/sign-up-terms-and-conditions'}
                >
                  Terms and Conditions
                </Link>
              </p>
            </Checkbox>
          </FormItem>
          <Form.Item>
            <Button
              id="signup-button"
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full py-6 font-bold"
              loading={isSubmitting}
            >
              Register
            </Button>
          </Form.Item>
        </div>
      </Form>
      <p className="mt-2 text-center text-PrimaryText" id="login-link">
        <span className="mr-1"> Already have an account ?</span>
        <Link to={'/login'} className="font-bold text-primary">
          Log in
        </Link>
      </p>
    </AuthFromContainer>
  );
};

export default SignUpForm;
