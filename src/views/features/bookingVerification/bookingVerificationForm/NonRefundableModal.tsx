import { Modal } from 'antd';
import type { FC } from 'react';

type Props = {
  open: boolean;
  handleCancel: () => void;
};
const NonRefundableModal: FC<Props> = ({ open, handleCancel }) => {
  return (
    <Modal
      open={open}
      width={650}
      footer={null}
      closable={true}
      maskClosable={true}
      onCancel={handleCancel}
    >
      <div className="refundable-modal">
        <div className="flex flex-col flex-start">
          <h1 className="w-100 py-2 text-xl font-semibold">
            {' '}
            Non - Refundable security deposit
          </h1>
          <p>
            By completing the process herein, you authorise Just Be Lekker Inc.
            to process the non-refundable damage waiver amount on your card that
            will provide you with cover, for accidental guest damage, up to the
            relevant coverage amount.{' '}
          </p>
          <ol className="modal-ordered-list">
            <li>
              If any accidental damages caused by the guest amount to less than
              the coverage amount, the damage waiver will cover these costs.
              However, if damages exceed the coverage amount, you will be
              responsible for paying the excess.{' '}
            </li>
            <li>
              {' '}
              The damage waiver also does not cover any damages that are caused
              due to malicious or negligent behaviour.{' '}
            </li>
            <li>
              The damage waiver does not cover fines or penalties that are
              levied against the guest for any rule violations. If you are
              charged with any fines or penalties, they will be billed to your
              card separately and will attract an additional 15% service fee.
            </li>
          </ol>
        </div>
      </div>
    </Modal>
  );
};
export default NonRefundableModal;
