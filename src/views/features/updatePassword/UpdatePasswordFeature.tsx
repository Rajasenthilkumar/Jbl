import type { FC } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { toastErrorDisplay } from 'utilities/toastErrorDisplay';
import UpdatePasswordForm, { type ResetPasswordFormType } from './Form';
import { useUpdatePassword } from './hooks';

type Props = {
  token: string | null;
  mode: 'Host' | 'Guest';
};

const UpdatePasswordFeature: FC<Props> = ({ token, mode }) => {
  const { updatePassword, loading } = useUpdatePassword();
  const navigate = useNavigate();

  const onFinishForm = async (updatePasswordForm: ResetPasswordFormType) => {
    try {
      if (token === null) {
        toast.error('Token is null');
        return;
      }

      const payload = {
        password: updatePasswordForm.password,
        token,
        mode,
      };
      await updatePassword(payload);
      toast.success('Password reset is successful');
      navigate('/login');
    } catch (error) {
      toastErrorDisplay(error);
    }
  };

  return (
    <div>
      <UpdatePasswordForm
        onFinish={onFinishForm}
        isSubmitting={loading}
        mode={mode}
      />
    </div>
  );
};

export default UpdatePasswordFeature;
