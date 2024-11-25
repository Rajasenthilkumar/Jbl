import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import { Button, Spin } from 'antd';
import VerifyImage from 'assets/banners/email-verify.svg';
import type { FC } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { toastErrorDisplay } from 'utilities/toastErrorDisplay';
import AuthFromContainer from 'views/components/containers/AuthFromContainer';
import { useResendEmail } from './hooks';

type Props = {
  email: string;
  onClickGotIt?: () => void;
};

// This page will show once user is sighup successfully
const EmailVerify: FC<Props> = ({ email, onClickGotIt }) => {
  const { resendEmail, loading } = useResendEmail();

  const handleClickResendMail = async () => {
    try {
      await resendEmail({ email });
      toast.success('Email sent successfully');
    } catch (error) {
      toastErrorDisplay(error);
    }
  };

  return (
    <Spin spinning={loading} indicator={<LoadingOutlined spin />}>
      <AuthFromContainer>
        <div className="flex flex-col items-center">
          <img src={VerifyImage as unknown as string} alt="verify-image" />
          <h2 className="mb-5 text-3xl font-bold text-PrimaryText">
            Verify Your Email
          </h2>
          <p className="mb-4 text-base font-medium text-PrimaryText">
            Thank you for joining{' '}
            <span className="text-primary">Just Be Lekker! </span>
          </p>
          <p className="mb-4 text-base text-center text-Grey">
            We just sent a verification link to your email.
            <br />
            Click the link in the email to verify your account
          </p>

          {onClickGotIt !== undefined ? (
            <Button
              type="primary"
              size="large"
              className="w-full py-6 my-5 font-bold "
              onClick={onClickGotIt}
            >
              Got it
            </Button>
          ) : (
            <Link to={'/login'} className="w-full">
              <Button
                type="primary"
                size="large"
                className="w-full py-6 my-5 font-bold "
              >
                Got it
              </Button>
            </Link>
          )}

          <p className="text-center text-PrimaryText">
            Don’t see the email?{' '}
            <span
              className="ml-1 font-bold cursor-pointer text-primary"
              onClick={handleClickResendMail}
            >
              Click here to resend it.
            </span>
          </p>
        </div>
      </AuthFromContainer>
    </Spin>
  );
};

export default EmailVerify;
