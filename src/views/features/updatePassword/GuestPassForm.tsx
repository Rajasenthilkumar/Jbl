import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Input } from 'antd';
import type { FC } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import AuthFromContainer from 'views/components/containers/AuthFromContainer';
import LockIcon from 'views/components/icons/LockIcon';
import { z } from 'zod';

export type ResetGuestPasswordFormType = {
  password: string;
  mode: 'Host' | 'Guest';
};

const schema = z.object({
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(5, { message: 'Password must be at least 5 characters long' })
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
});

type Props = {
  onFinish: (data: ResetGuestPasswordFormType) => void;
  isSubmitting: boolean;
  mode: 'Host' | 'Guest';
};

const UpdateGuestPasswordForm: FC<Props> = ({
  onFinish,
  isSubmitting,
  mode,
}) => {
  const { control, handleSubmit, setValue } =
    useForm<ResetGuestPasswordFormType>({
      defaultValues: {
        password: '',
        mode: mode,
      },
      resolver: zodResolver(schema),
    });

  useEffect(() => {
    setValue('mode', mode);
  }, [mode, setValue]);

  return (
    <AuthFromContainer title="Update Password">
      <Form
        id="update-password-form"
        onFinish={handleSubmit((_data) => {
          onFinish(_data);
        })}
      >
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

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full py-6 mt-2 font-bold"
              loading={isSubmitting}
              id="update-password-button"
            >
              Update Password
            </Button>
          </Form.Item>
        </div>
      </Form>
    </AuthFromContainer>
  );
};

export default UpdateGuestPasswordForm;
