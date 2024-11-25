import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Input, Modal } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import { changeGuestPassword } from 'stores/slice/profileGuestSlice';
import * as z from 'zod';

export type ChangeGuestPasswordFormType = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const schema = z
  .object({
    oldPassword: z.string().min(1, 'Old password required'),
    newPassword: z
      .string()
      .min(5, { message: 'Password must be at least 8 characters' })
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

type ChangeGuestPasswordFormProps = {
  open: boolean;
  onClose: () => void; // Add this prop
};

const ChangeGuestPasswordForm = ({
  open,
  onClose,
}: ChangeGuestPasswordFormProps) => {
  const { control, handleSubmit, reset } = useForm<ChangeGuestPasswordFormType>(
    {
      defaultValues: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
      resolver: zodResolver(schema),
    },
  );

  const dispatch = useAppDispatch();

  const isLoading = useAppSelector((state) => {
    return state.guestProfile.changePassword.status === 'pending';
  });

  const onFinish = async (data: ChangeGuestPasswordFormType) => {
    await dispatch(changeGuestPassword(data));
    reset();
    onClose();
  };

  return (
    <Modal title="Change Password" open={open} onCancel={onClose} footer={null}>
      <Form onFinish={handleSubmit(onFinish)}>
        <FormItem control={control} name="oldPassword">
          <label
            htmlFor="oldPassword"
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
            htmlFor="newPassword"
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
            htmlFor="confirmPassword"
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

export default ChangeGuestPasswordForm;
