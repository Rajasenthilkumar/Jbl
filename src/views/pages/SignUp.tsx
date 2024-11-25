import SignUpFeature from 'views/features/signup/SignUpFeature';
import AuthLayout from 'views/layout/AuthLayout';

const SignUp = () => {
  return (
    <AuthLayout>
      <SignUpFeature />
    </AuthLayout>
  );
};

export default SignUp;
