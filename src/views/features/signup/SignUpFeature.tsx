import { useState } from 'react';
import { toastErrorDisplay } from 'utilities/toastErrorDisplay';
import EmailVerify from './EmailVerify';
import SignUpForm from './SignUpForm';
import { useSignUp } from './hooks';
import type { SignUpFormType } from './schema';

const SignUpFeature = () => {
  const { signUp, success, loading } = useSignUp();
  const [email, setEmail] = useState('');

  const onFinishForm = async (signUpForm: SignUpFormType) => {
    try {
      await signUp(signUpForm);
      setEmail(signUpForm.email);
    } catch (error) {
      toastErrorDisplay(error);
    }
  };

  if (success) {
    return <EmailVerify email={email} />;
  }

  return (
    <div>
      <SignUpForm onFinish={onFinishForm} isSubmitting={loading} />
    </div>
  );
};

export default SignUpFeature;
