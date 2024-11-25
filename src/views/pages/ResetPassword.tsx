import { useSearchParams } from 'react-router-dom';
import UpdatePasswordFeature from 'views/features/updatePassword/UpdatePasswordFeature';
import AuthLayout from 'views/layout/AuthLayout';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  return (
    <AuthLayout>
      <UpdatePasswordFeature token={token} mode={'Host'} />
    </AuthLayout>
  );
};

export default ResetPassword;
