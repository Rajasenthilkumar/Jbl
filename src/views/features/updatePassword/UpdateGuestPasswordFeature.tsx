import type { FC } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { toastErrorDisplay } from 'utilities/toastErrorDisplay';
import UpdateGuestPasswordForm, {
  type ResetGuestPasswordFormType,
} from './GuestPassForm';
import { useGuestUpdatePassword } from './hook';

type Props = {
  token: string | null;
  mode: 'Host' | 'Guest';
};

const UpdateGuestPasswordFeature: FC<Props> = ({ token, mode }) => {
  const { updatePassword, loading } = useGuestUpdatePassword();
  const navigate = useNavigate();

  const onFinishForm = async (
    UpdateGuestPasswordForm: ResetGuestPasswordFormType,
  ) => {
    try {
      if (token === null) {
        toast.error('Token is null');
        return;
      }

      const payload = {
        password: UpdateGuestPasswordForm.password,
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
      <UpdateGuestPasswordForm
        onFinish={onFinishForm}
        isSubmitting={loading}
        mode={mode}
      />
    </div>
  );
};

export default UpdateGuestPasswordFeature;
