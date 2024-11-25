import { Button, Modal } from 'antd';
import type { FC } from 'react';

type Props = {
  open: boolean;
  content?: string;
  title: string;
  handleContinue: () => void;
  handleCancel: () => void;
  cancelText?: string;
  continueText?: string;
};

const ConfirmationModal: FC<Props> = ({
  open,
  handleCancel,
  content,
  handleContinue,
  title,
  cancelText = 'Cancel',
  continueText = 'Continue',
}) => {
  return (
    <>
      <Modal
        open={open}
        width={650}
        onCancel={handleCancel}
        footer={null}
        closable={false}
        maskClosable={false}
      >
        <div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="py-2 text-2xl font-semibold"> {title} </h1>
            {content && <p className="text-sm text-Grey">{content}</p>}
          </div>
          <div className="flex items-center justify-center gap-2">
            <Button
              className="mt-6 text-base font-semibold bg-lightBlue text-PrimaryText"
              htmlType="button"
              size="large"
              onClick={handleCancel}
            >
              {cancelText}
            </Button>
            <Button
              type="primary"
              className="mt-6 text-base font-semibold"
              htmlType="button"
              size="large"
              onClick={handleContinue}
            >
              {continueText}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ConfirmationModal;
