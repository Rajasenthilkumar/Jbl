import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Input, Modal } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import { changeProfilePassword } from 'stores/slice/profileSlice';
import * as z from 'zod';

export type ChangePasswordFormType = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const schema = z
  .object({
    oldPassword: z.string().min(1, 'Old password required'),
    newPassword: z
      .string()
      .min(5, { message: 'Password must be at least 5 characters' })
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
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'New Password and Confirm Password do not match.',
    path: ['confirmPassword'],
  });

type ChangePasswordFormProps = {
  open: boolean;
  onClose: () => void; // Add this prop
};

const ChangePasswordForm = ({ open, onClose }: ChangePasswordFormProps) => {
  const { control, handleSubmit, reset } = useForm<ChangePasswordFormType>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    resolver: zodResolver(schema),
  });

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(
    (state) => state.profile.changePassword.status === 'pending',
  );

  const onFinish = async (data: ChangePasswordFormType) => {
    await dispatch(changeProfilePassword(data));
    reset();
  };

  return (
    <Modal title="Change Password" open={open} onCancel={onClose} footer={null}>
      <Form onFinish={handleSubmit(onFinish)}>
        <FormItem control={control} name="oldPassword">
          <label
            htmlFor="oldPassword" // Associate the label with the input
            className="block mb-1 text-sm font-semibold text-[#051621] form-label mt-4"
          >
            CURRENT PASSWORD
          </label>
          <Input.Password
            placeholder="Enter Current Password"
            id="oldPassword"
          />
        </FormItem>
        <FormItem control={control} name="newPassword" className="w-full">
          <label
            htmlFor="newPassword" // Associate the label with the input
            className="block mb-1 text-sm font-semibold text-[#051621] form-label"
          >
            NEW PASSWORD
          </label>
          <Input.Password
            placeholder="Enter New Password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            id="newPassword"
          />
        </FormItem>
        <FormItem control={control} name="confirmPassword" className="w-full">
          <label
            htmlFor="confirmPassword" // Associate the label with the input
            className="block mb-1 text-sm font-semibold text-[#051621] form-label"
          >
            CONFIRM PASSWORD
          </label>
          <Input.Password
            placeholder="Enter Confirm Password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            id="confirmPassword"
          />
        </FormItem>
        <div className="flex justify-center my-2">
          <Button
            className="bg-lightBlue text-PrimaryText"
            htmlType="button"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            className="mx-2"
            type="primary"
            htmlType="submit"
            loading={isLoading}
          >
            Save Changes
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ChangePasswordForm;
