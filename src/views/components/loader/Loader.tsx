import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import { Spin } from 'antd';
import type { FC } from 'react';

const antIcon = (fontSize: number) => (
  <LoadingOutlined style={{ fontSize: fontSize }} spin />
);

type Props = {
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
  fontSize?: number;
};

const Loader: FC<Props> = ({
  loading = false,
  children,
  className = '',
  fontSize = 44,
}) => {
  return (
    <Spin
      indicator={antIcon(fontSize)}
      spinning={loading}
      className={className}
    >
      {children}
    </Spin>
  );
};

export default Loader;
