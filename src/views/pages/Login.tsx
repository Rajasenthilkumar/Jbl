import LoginFeature from 'views/features/login/LoginFeature';
import AuthLayout from 'views/layout/AuthLayout';

const Login = () => {
  return (
    <AuthLayout>
      <LoginFeature />
    </AuthLayout>
  );
};

export default Login;
