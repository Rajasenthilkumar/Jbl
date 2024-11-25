import { Upload, type UploadProps } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import {
  useDeleteFile,
  useDeleteFileWithToken,
  useFileUpload,
} from 'hooks/useFileUpload';
import { type FC, useState } from 'react';
import { FiletypeDoc } from 'react-bootstrap-icons';
import toast from 'react-hot-toast';
import { FaImage } from 'react-icons/fa';
import FileDisplay from './FileDisplay';

type UploadResponse = {
  result: {
    fileUrl: string;
  };
};
type Props = {
  setValue: (value: string) => void;
  acceptedFileTypes: string;
  draggerText: string;
  maxSize: number; // in bytes
  setError: (error: string) => void;
  type?: 'dragger' | 'button';
  fileName?: string;
  fileLocation?: string;
  iconType?: 'image' | 'file';
  token?: string;
  disabled?: string;
};

const FileUpload: FC<Props> = ({
  setValue,
  acceptedFileTypes,
  draggerText,
  maxSize,
  setError,
  type = 'dragger',
  fileName = undefined,
  fileLocation = undefined,
  iconType = 'file',
  token,
}) => {
  const {
    loading: fileUploadLoading,
    uploadFile,
    uploadFileWithToken,
  } = useFileUpload();
  const { loading: deleteFileLoading, deleteFile } = useDeleteFile();
  const { deleteFileWithToken } = useDeleteFileWithToken();

  const [uploadedFile, setUploadedFile] = useState<{
    name?: string;
    location?: string;
  }>({
    name: fileName,
    location: fileLocation,
  });

  const [deleteWithTokenLoading, setDeleteWithTokenLoading] = useState(false);
  const toastErrorDisplay = (error: unknown) => {
    const errorMessage = error?.toString
      ? error.toString()
      : 'An unknown error occurred';
    toast.error(errorMessage);
  };

  const props: UploadProps = {
    name: 'file',
    multiple: false,
    accept: acceptedFileTypes,
    maxCount: 1,
    showUploadList: false,
    beforeUpload: (file) => {
      if (file.size > maxSize) {
        toast.error(`File must be smaller than ${maxSize / 1024 / 1024}MB!`);
        setError(`File must be smaller than ${maxSize / 1024 / 1024}MB!`);
        return false;
      }
      return true;
    },
    customRequest: async (options) => {
      try {
        await handleRemoveFile();
        setUploadedFile({
          name:
            typeof options.file !== 'string' && 'name' in options.file
              ? options.file.name
              : '',
          location: '',
        });

        let response: UploadResponse;

        if (token) {
          response = await uploadFileWithToken(options.file, token);
        } else {
          response = await uploadFile(options.file);
        }

        setValue(response.result.fileUrl);
        setUploadedFile({
          name:
            typeof options.file !== 'string' && 'name' in options.file
              ? options.file.name
              : '',
          location: response.result.fileUrl,
        });

        if (options.onSuccess) {
          options.onSuccess('ok');
        }
      } catch (error) {
        toastErrorDisplay(error);
        await handleRemoveFile();
      }
    },
  };

  const handleRemoveFile = async () => {
    if (uploadedFile.location) {
      try {
        setDeleteWithTokenLoading(true);
        if (token) {
          await deleteFileWithToken(uploadedFile.location, token);
        } else {
          await deleteFile(uploadedFile.location);
        }
        clearFileState();
      } catch (error) {
        toastErrorDisplay(error);
      } finally {
        setDeleteWithTokenLoading(false);
      }
    }
  };

  // Clear file-related states
  const clearFileState = () => {
    setUploadedFile({
      name: undefined,
      location: undefined,
    });
    setValue('');
  };

  if (type === 'button') {
    return (
      <div className={`custom-ant-select ${token ? 'mt-3' : 'mt-2'}`}>
        {uploadedFile?.name ? (
          <FileDisplay
            fileName={uploadedFile.name}
            deleteFile={handleRemoveFile}
            isLoading={
              deleteWithTokenLoading || deleteFileLoading || fileUploadLoading
            }
          />
        ) : (
          <Upload
            {...props}
            className={`w-full p-2 my-0 rounded-sm cursor-pointer ${token ? 'bg-white' : 'bg-lightBlue'}`}
          >
            <p className="color-[#051621] font-medium mb-0">
              Upload Your ID File
            </p>
            <div
              className={`flex items-center justify-between ${token ? 'border-b border-gray-300' : ''}`}
            >
              <div
                className={`${token ? '"font-medium text-PrimaryText mobile-view-fileupload"' : '"italic font-medium text-PrimaryText mobile-view-fileupload"'}`}
              >
                {`${token ? 'Upload Document' : 'No File Selected'}`}
              </div>
              <div
                className={`${token ? 'text-primary ms-2 font-medium mx-auto me-3' : 'text-primary'}`}
              >
                {token ? 'Upload' : 'Browse'}
              </div>
            </div>
          </Upload>
        )}
      </div>
    );
  }

  return (
    <>
      <Dragger {...props}>
        <div className="flex flex-col items-center justify-center h-40 gap-1">
          {iconType === 'image' && (
            <FaImage className="h-[10vh] w-[10vw] text-xl text-primary" />
          )}
          {iconType === 'file' && (
            <FiletypeDoc className="h-[5vh] w-[5vw] text-xl text-primary" />
          )}

          <p className="text-sm italic font-bold ant-upload-text">
            {draggerText}
          </p>
          <p className="text-sm text-primary">upload</p>
        </div>
      </Dragger>

      {uploadedFile?.name && (
        <FileDisplay
          fileName={uploadedFile.name}
          deleteFile={handleRemoveFile}
          isLoading={
            deleteWithTokenLoading || deleteFileLoading || fileUploadLoading
          } // Include loading state
        />
      )}
    </>
  );
};

export default FileUpload;
