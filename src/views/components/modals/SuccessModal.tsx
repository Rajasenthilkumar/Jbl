import { Button, Modal } from 'antd';
import type { FC } from 'react';
import { Check2Circle } from 'react-bootstrap-icons';

type Props = {
  open: boolean;
  handleOk?: () => void;
  handleCancel?: () => void;
  handleContinue: () => void;
  content?: string;
  title: string;
};

const SuccessModal: FC<Props> = ({
  open,
  handleOk,
  handleCancel,
  content,
  handleContinue,
  title,
}) => {
  return (
    <>
      <Modal
        open={open}
        width={650}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        closable={false}
        maskClosable={false}
      >
        <div>
          <div className="flex flex-col items-center justify-center">
            <Check2Circle className="h-[35vh] w-[35vw] text-primary my-6" />
            <h1 className="py-2 text-2xl text-center font-semibold">{title}</h1>
            {content && (
              <p className="text-sm mx-4 text-center text-Grey">{content}</p>
            )}
          </div>
          <Button
            type="primary"
            className="mt-6 text-base font-semibold"
            htmlType="button"
            size="large"
            block
            onClick={handleContinue}
          >
            Continue
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default SuccessModal;
