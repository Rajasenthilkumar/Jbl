import { Button } from 'antd';
import type { FC } from 'react';
import { CiFileOn } from 'react-icons/ci';
import { RiDeleteBinLine } from 'react-icons/ri';

type Props = {
  fileName: string;
  deleteFile: () => void;
  isLoading: boolean;
  disabled?: boolean;
  hideDeleteButton?: boolean; // New prop to control visibility of delete button
};

const FileDisplay: FC<Props> = ({
  fileName,
  deleteFile,
  isLoading,
  disabled = false,
  hideDeleteButton = false,
}) => {
  return (
    <div className="flex items-center justify-between gap-2 p-1 my-2 rounded-sm bg-lightBlue custom-class-file-token">
      <div className="flex items-center gap-2">
        <CiFileOn />
        <div className="text-sm font-medium">{fileName}</div>
      </div>

      {/* Conditionally render the delete button based on hideDeleteButton prop */}
      {!hideDeleteButton && (
        <Button
          onClick={deleteFile}
          type="text"
          loading={isLoading}
          shape="circle"
          size="middle"
          icon={<RiDeleteBinLine className="text-primary" />}
          disabled={disabled || isLoading}
        />
      )}
    </div>
  );
};

export default FileDisplay;
