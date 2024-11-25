import { Divider } from 'antd';
import type { FC, ReactNode } from 'react';

export const FromContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="relative w-full">{children}</div>;
};

export const FormContent: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="w-full overflow-auto min-h-80 h-80 max-h-80 custom-class">
      <div className="">{children}</div>
    </div>
  );
};

export const FormFooter: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="relative">
      <Divider className="py-0 my-4" />
      <div className="flex items-center justify-end gap-2">{children}</div>
    </div>
  );
};
