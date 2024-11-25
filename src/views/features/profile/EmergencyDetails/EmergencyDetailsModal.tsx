import { Drawer } from 'antd';
import type { FC } from 'react';
import EmergencyDetailEntity from './EmergencyDetailEntity';

type Props = {
  emergencycardValue: string;
  profileIdValue: number;
  open: boolean;
  profileType: string;
  handleOk: () => void;
  handleCancel: () => void;
};

const EmergencyDetailsModal: FC<Props> = ({
  emergencycardValue,
  profileType,
  profileIdValue,
  open,
  handleCancel,
  handleOk,
}) => {
  return (
    <Drawer
      title="Emergency Details"
      placement="right"
      closable={true}
      onClose={handleCancel}
      visible={open}
      width={400}
    >
      <EmergencyDetailEntity
        profileTypeValue={profileType}
        profileIdValue={profileIdValue}
        emergencycardValue={emergencycardValue}
        handleCancel={handleCancel}
        handleOk={handleOk}
      />
    </Drawer>
  );
};

export default EmergencyDetailsModal;
