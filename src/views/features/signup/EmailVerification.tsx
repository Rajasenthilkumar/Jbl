import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import { Button, Spin } from 'antd';
import VerifyImage from 'assets/banners/email-verify.svg';
import { type FC, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { toastErrorDisplay } from 'utilities/toastErrorDisplay';
import AuthFromContainer from 'views/components/containers/AuthFromContainer';
import { useEmailVerification } from './hooks';

type Props = {
  token: string | null;
};

const ErrorVerify = () => {
  return (
    <>
      <h2 className="mb-5 text-3xl font-bold text-PrimaryText">
        Email Verification Failed
      </h2>
      <Link to={'/login'} className="w-full">
        <Button
          type="primary"
          size="large"
          className="w-full py-6 my-5 font-bold"
        >
          Login
        </Button>
      </Link>
    </>
  );
};

const SuccessVerify = () => {
  return (
    <>
      <h2 className="mb-5 text-3xl font-bold text-PrimaryText">
        Email Verified!
      </h2>
      <p className="mb-4 text-base font-medium text-PrimaryText">
        Thank you for joining
        <span className="text-primary">Just Be Lekker! </span>
      </p>
      <Link to={'/login'} className="w-full">
        <Button
          type="primary"
          size="large"
          className="w-full py-6 my-5 font-bold"
        >
          Login
        </Button>
      </Link>
    </>
  );
};

// UI display when user click on email verification link
const EmailVerificationFeature: FC<Props> = ({ token }) => {
  const { loading, verifyMail, success, error } = useEmailVerification();

  // biome-ignore lint/correctness/useExhaustiveDependencies: verifyMail cause endless calling
  useEffect(() => {
    const triggerVerifyMail = async () => {
      if (token) {
        try {
          await verifyMail({ token });
          toast.success('Email verified successfully');
        } catch (error) {
          toastErrorDisplay(error);
        }
      }
    };

    triggerVerifyMail();
  }, [token]);

  return (
    <Spin spinning={loading} indicator={<LoadingOutlined spin />}>
      <AuthFromContainer>
        <div className="flex flex-col items-center">
          <img src={VerifyImage as unknown as string} alt="verify-image" />
          {success && <SuccessVerify />}
          {error && <ErrorVerify />}
        </div>
      </AuthFromContainer>
    </Spin>
  );
};

export default EmailVerificationFeature;
