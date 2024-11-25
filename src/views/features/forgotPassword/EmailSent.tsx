import EmailSentSvg from 'assets/banners/email-sent.svg';
import type { FC } from 'react';
import AuthFromContainer from 'views/components/containers/AuthFromContainer';

type Props = {
  email: string;
  idNumber?: string;
};
const EmailSent: FC<Props> = ({ email, idNumber }) => {
  return (
    <AuthFromContainer>
      <div className="flex flex-col items-center">
        <img src={EmailSentSvg as unknown as string} alt="verify-image" />
        <h2 className="mb-5 text-3xl font-bold text-PrimaryText">Email sent</h2>

        <p className="mb-4 text-base text-center text-Grey">
          A password reset link has been sent to {email}
          {idNumber && <span> (ID: {idNumber})</span>}
        </p>
      </div>
    </AuthFromContainer>
  );
};

export default EmailSent;
