import { useSearchParams } from 'react-router-dom';
import UpdateGuestPasswordFeature from 'views/features/updatePassword/UpdateGuestPasswordFeature';
import AuthLayout from 'views/layout/AuthLayout';

const ResetGuestPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  return (
    <AuthLayout>
      <UpdateGuestPasswordFeature token={token} mode={'Guest'} />
    </AuthLayout>
  );
};

export default ResetGuestPassword;
