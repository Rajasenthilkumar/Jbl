import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import { Spin } from 'antd';
import type { FC } from 'react';

type Props = {
  type?: 'primary' | 'secondary';
};

const SuspenseLoading: FC<Props> = ({ type = 'primary' }) => {
  const getBackground = () => {
    switch (type) {
      case 'primary':
        return 'bg-bg_primary';

      case 'secondary':
        return 'bg-white';

      default:
        return 'bg-bg_primary';
    }
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen ${getBackground()}`}
    >
      <Spin indicator={<LoadingOutlined spin />} size="large" />
    </div>
  );
};

export default SuspenseLoading;
