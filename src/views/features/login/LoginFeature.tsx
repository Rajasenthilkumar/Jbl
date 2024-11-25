import { useAppDispatch } from 'hooks/redux';
import { type FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { setAuthInfo } from 'stores/slice/authSlice';
import type { ApiError } from 'utilities/api';
import {
  getRememberGuestData,
  getRememberMeData,
  saveLoginDataToLocal,
  saveRememberGuestDataToLocal,
  saveRememberMeDataToLocal,
} from 'utilities/auth.storage';
import { toastErrorDisplay } from 'utilities/toastErrorDisplay';

import EmailVerify from '../signup/EmailVerify';
import LoginForm, { type LoginFormType } from './Form';
import { useLogin } from './hook';

const LoginFeature: FC = () => {
  const { loading, login } = useLogin();
  const [emailNotVerified, setEmailNotVerified] = useState(false);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [idNumber, setIdNumber] = useState<string | undefined>(undefined);
  const [rememberMe, setRememberMe] = useState(false);
  const [rememberGuest, setRememberGuest] = useState(false);
  const [mode, setMode] = useState<'Host' | 'Guest'>('Host');

  const dispatch = useAppDispatch();

  const handleRememberMe = (value: boolean) => {
    setRememberMe(value);
  };
  const handleRememberGuest = (value: boolean) => {
    setRememberGuest(value);
  };

  useEffect(() => {
    if (mode === 'Host') {
      const userInfo = getRememberMeData();
      if (userInfo?.email) {
        setEmail(userInfo.email);
        setRememberMe(userInfo.remember_me ?? false);
      }
    } else if (mode === 'Guest') {
      const userInfo = getRememberGuestData();
      if (userInfo?.id_number) {
        setIdNumber(userInfo.id_number);
        setRememberGuest(userInfo.remember_me ?? false);
      }
    }
  }, [mode]);

  const onFinishForm = async (formData: LoginFormType) => {
    try {
      const updatedFormData = { ...formData, mode };
      const { data } = await login(updatedFormData);
      saveLoginDataToLocal({
        token: data.result.data.token,
        id: data.result.data.id,
        mode,
      });

      if (mode === 'Host' && rememberMe) {
        saveRememberMeDataToLocal({
          email: updatedFormData.email,
          remember_me: true,
        });
      } else if (mode === 'Guest' && rememberGuest) {
        saveRememberGuestDataToLocal({
          id_number: updatedFormData.id_number,
          remember_me: true,
        });
      }

      dispatch(
        setAuthInfo({
          userId: data.result.data.id,
          token: data.result.data.token,
          mode,
        }),
      );

      toast.success('Login successful!');
    } catch (error) {
      toastErrorDisplay(error);
      const apiError: ApiError = error as ApiError;
      if (apiError.data?.error?.msg) {
        const msg = apiError.data.error.msg;
        if (typeof msg === 'string' && msg === 'Email is not verified') {
          setEmailNotVerified(true);
          setEmail(formData.email);
        }
      }
    }
  };

  const onClickGotItEmailVerify = () => {
    setEmailNotVerified(false);
    setEmail(undefined);
  };

  if (email && emailNotVerified) {
    return <EmailVerify email={email} onClickGotIt={onClickGotItEmailVerify} />;
  }

  return (
    <LoginForm
      key={email}
      onFinishForm={onFinishForm}
      handleRememberMe={handleRememberMe}
      handleRememberGuest={handleRememberGuest}
      isSubmitting={loading}
      email={email}
      rememberMe={rememberMe}
      mode={mode}
      setMode={setMode}
      id_number={idNumber || ''}
      rememberGuest={rememberGuest}
    />
  );
};

export default LoginFeature;
