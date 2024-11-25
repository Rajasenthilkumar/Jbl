import { useSearchParams } from 'react-router-dom';
import EmailVerificationFeature from 'views/features/signup/EmailVerification';
import AuthLayout from 'views/layout/AuthLayout';

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  return (
    <AuthLayout>
      <EmailVerificationFeature token={token} />
    </AuthLayout>
  );
};

export default EmailVerification;
