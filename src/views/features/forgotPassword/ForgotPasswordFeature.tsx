import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toastErrorDisplay } from 'utilities/toastErrorDisplay';
import EmailSent from './EmailSent';
import ForgotPasswordForm, { type ForgetPasswordFormType } from './Form';
import { useForgertPassword } from './hooks';

const ForgotPasswordFeature = () => {
  const { forgetPassword, success, loading } = useForgertPassword();
  const [email, setEmail] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [mode, setMode] = useState<'Host' | 'Guest' | undefined>(undefined);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const modeFromUrl = searchParams.get('mode');

  useEffect(() => {
    if (modeFromUrl === 'Host' || modeFromUrl === 'Guest') {
      setMode(modeFromUrl);
    } else if (modeFromUrl) {
      console.warn(`Unexpected mode value from URL: ${modeFromUrl}`);
    }
  }, [modeFromUrl]);

  const onFinishForm = async (forgetPasswordForm: ForgetPasswordFormType) => {
    if (!mode) {
      console.warn("Mode is undefined. Please specify 'Host' or 'Guest'.");
      return;
    }
    try {
      const updatedFormData = { ...forgetPasswordForm, mode };
      const response = await forgetPassword(updatedFormData);

      if (response?.data?.result?.email) {
        setEmail(response.data.result.email);
      }
      if (mode === 'Guest' && updatedFormData.id_number) {
        setIdNumber(updatedFormData.id_number);
      }
    } catch (error) {
      toastErrorDisplay(error);
    }
  };

  if (success) {
    if (mode === 'Guest') {
      return <EmailSent email={email} idNumber={idNumber} />;
    }
    return <EmailSent email={email} />;
  }

  return (
    <div>
      <ForgotPasswordForm
        onFinish={onFinishForm}
        isSubmitting={loading}
        mode={mode}
      />
    </div>
  );
};

export default ForgotPasswordFeature;
