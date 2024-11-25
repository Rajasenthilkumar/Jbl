import type { FC } from 'react';

type Props = {
  title?: string;
  children: React.ReactNode;
  subTitle?: string;
};

const AuthFromContainer: FC<Props> = ({ title, children, subTitle }) => {
  return (
    <div className="bg-white rounded-[10px] p-[2.20rem] md-login-form-detail">
      <div className="mb-7">
        {title && (
          <h2 className="mb-4 md:text-3xl font-medium text-xl">{title}</h2>
        )}
        {subTitle && <p className="text-sm text-Grey font-book">{subTitle}</p>}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default AuthFromContainer;
