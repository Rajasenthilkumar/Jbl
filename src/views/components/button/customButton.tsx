import { UploadOutlined } from '@ant-design/icons';
import { useDeleteFile, useFileUpload } from 'hooks/useFileUpload';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { toastErrorDisplay } from 'utilities/toastErrorDisplay';
import CustomButton from '.';
import FileDisplay from '../FileDisplay';

interface CustomFileUploadButtonProps {
  componentType?: string;
  className?: string;
  icon?: React.ReactNode;
  buttonLabel?: string;
  acceptedFileTypes?: string;
  maxSize?: number;
  fileName?: string;
  fileLocation?: string;
  setValue?: (value: string) => void;
  setError?: (error: string) => void;
  children?: React.ReactNode;
}

const CustomFileUploadButton: React.FC<CustomFileUploadButtonProps> = ({
  componentType,
  className,
  icon,
  buttonLabel = 'Upload',
  acceptedFileTypes = '.jpg,.jpeg,.png,.pdf',
  maxSize = 1024 * 1024 * 5,
  fileName,
  fileLocation,
  setValue = () => {},
  setError = () => {},
  children,
}) => {
  const { loading: fileUploadLoading, uploadFile } = useFileUpload();
  const { loading: deleteFileLoading, deleteFile } = useDeleteFile();
  const [uploadedFile, setUploadedFile] = useState<{
    name?: string;
    location?: string;
  }>({
    name: fileName,
    location: fileLocation,
  });
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > maxSize) {
      toast.error(`File must be smaller than ${maxSize / 1024 / 1024}MB!`);
      setError(`File must be smaller than ${maxSize / 1024 / 1024}MB!`);
      return;
    }

    try {
      handleRemoveFile();
      e.target.value = '';

      setUploadedFile({
        name: file.name,
        location: '',
      });

      const response = await uploadFile(file);

      setValue(response.result.fileUrl);
      setUploadedFile({
        name: file.name,
        location: response.result.fileUrl,
      });
    } catch (error) {
      toastErrorDisplay(error);
      handleRemoveFile();
    }
  };

  const handleRemoveFile = async () => {
    if (uploadedFile.location) {
      try {
        await deleteFile(uploadedFile.location);
      } catch (error) {
        toastErrorDisplay(error);
      }
    }
    clearFileState();
  };

  const clearFileState = () => {
    setUploadedFile({
      name: undefined,
      location: undefined,
    });
    setValue('');
  };
  return (
    <div>
      <CustomButton
        componentType={componentType}
        className={className}
        icon={icon || <UploadOutlined className="fill-primary" />}
        onClick={() => {
          document.getElementById('fileUploadInput')?.click();
        }}
      >
        {children || (
          <span className="text-primary-color fw700">{buttonLabel}</span>
        )}
      </CustomButton>

      <input
        type="file"
        id="fileUploadInput"
        style={{ display: 'none' }}
        accept={acceptedFileTypes}
        onChange={handleFileChange}
      />

      {uploadedFile?.name && (
        <FileDisplay
          fileName={uploadedFile.name}
          deleteFile={handleRemoveFile}
          isLoading={deleteFileLoading || fileUploadLoading}
        />
      )}
    </div>
  );
};

export default CustomFileUploadButton;
