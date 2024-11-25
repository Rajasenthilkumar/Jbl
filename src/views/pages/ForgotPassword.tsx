import ForgotPasswordFeature from 'views/features/forgotPassword/ForgotPasswordFeature';
import AuthLayout from 'views/layout/AuthLayout';

const ForgotPassword = () => {
  return (
    <AuthLayout>
      <ForgotPasswordFeature />
    </AuthLayout>
  );
};

export default ForgotPassword;
