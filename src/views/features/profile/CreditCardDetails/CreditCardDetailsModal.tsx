import { Drawer } from 'antd';
import type { FC } from 'react';
import CreditCardDetailEntity from './CreditCardDetailEntity';

type Props = {
  open: boolean;
  handleOk: () => void;
  handleCancel: () => void;
};

const CreditCardDetailsModal: FC<Props> = ({
  open,
  handleCancel,
  handleOk,
}) => {
  return (
    <Drawer
      title="Card Details"
      placement="right"
      closable={true}
      onClose={handleCancel}
      visible={open}
      width={400}
    >
      <CreditCardDetailEntity handleCancel={handleCancel} handleOk={handleOk} />
    </Drawer>
  );
};

export default CreditCardDetailsModal;
