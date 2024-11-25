import { Divider, Modal } from 'antd';
import type { FC, ReactNode } from 'react';

type Props = {
  open: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  title: string;
  subTitle?: string;
  className?: string;
  headerIcon: ReactNode;
  children: ReactNode;
};

const FormModal: FC<Props> = ({
  open,
  handleOk,
  handleCancel,
  title,
  subTitle,
  className,
  headerIcon,
  children,
}) => {
  return (
    <>
      <Modal
        className={className}
        open={open}
        width={650}
        maskClosable={false}
        title={
          <div>
            <div className="flex gap-3">
              <div className="flex items-center justify-center text-2xl rounded-full h-14 w-14 bg-bg_primary text-primary">
                {headerIcon}
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-xl font-medium text-PrimaryText modal-header">
                  {title}
                </h2>
                {subTitle && (
                  <p className="mt-1 text-sm text-Grey">{subTitle}</p>
                )}
              </div>
            </div>
            <Divider className="my-4" />
          </div>
        }
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {children}
      </Modal>
    </>
  );
};

export default FormModal;
