import type { FC } from 'react';

type Props = {
  children: React.ReactNode;
  label: string;
};

const AppLabel: FC<Props> = ({ children, label }) => {
  return (
    <div>
      <div className="text-sm font-medium capitalize text-Grey"> {label} </div>
      {children}
    </div>
  );
};

export default AppLabel;
