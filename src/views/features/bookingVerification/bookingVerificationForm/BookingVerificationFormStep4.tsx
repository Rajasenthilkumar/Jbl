import { Button } from 'antd';
import { useAppSelector } from 'hooks/redux';
import { type FC, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
import { extractFileName, maxSize } from 'utilities/utils';
import FileUpload from 'views/components/FileUpload';
import {
  FormContent,
  FormFooter,
  FromContainer,
} from 'views/components/FormComponents';
import CloseIcon from 'views/components/icons/CloseIcon';
import ReloadIcon from 'views/components/icons/ReloadIcon';
import TickIcon from 'views/components/icons/TickIcon';
import WarningIcon from 'views/components/icons/WarningIcon';
import { AddBookingVerificationFormSteps } from './BookingVerificationEntity';
import type { BookingVerificationFormSchema } from './BookingVerificationSchema';

interface Props {
  setStep: (value: number) => void;
  guestToken: string;
  setImageURL: React.Dispatch<React.SetStateAction<string | boolean>>;
  setShowMannualSign: React.Dispatch<React.SetStateAction<string | boolean>>;
  setCloseMannualSign: React.Dispatch<React.SetStateAction<string | boolean>>;
}

interface SignaturePadProps {
  setShowMannualSign: React.Dispatch<React.SetStateAction<string | boolean>>;
  setImageURL: React.Dispatch<React.SetStateAction<string | boolean>>;
  setCloseMannualSign: React.Dispatch<React.SetStateAction<string | boolean>>;
  // penColor: string;
}

interface SignatureCanvasWithPenColor extends SignatureCanvas {
  penColor: string;
}

const BookingVerificationFormStep4: FC<Props> = ({
  setStep,
  guestToken,
  setShowMannualSign,
  setCloseMannualSign,
}) => {
  const [_imageURL, setLocalImageURL] = useState<string>('');
  const [drawSign, setDrawSign] = useState(false);
  const [uploadSign, setUploadSign] = useState(false);
  const SignaturePad: React.FC<SignaturePadProps> = ({
    setImageURL,
    setShowMannualSign,
    setCloseMannualSign,
  }) => {
    const sigCanvas = useRef<SignatureCanvasWithPenColor>(null);

    const clearSignature = () => {
      if (sigCanvas.current) {
        sigCanvas.current?.clear();
      }
      setLocalImageURL('');
    };

    const saveSignature = () => {
      if (sigCanvas.current) {
        const url = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
        setLocalImageURL(url);
        setImageURL(url);
      }
      setShowMannualSign(false);
    };
    const onClose = () => {
      setDrawSign(false);
      setCloseMannualSign(true);
    };

    return (
      <div className="App">
        <div className="flex align-middle justify-between ">
          <p className="color-[#051621] font-medium text-base my-4">
            Add Signature
          </p>
          <div className="cursor-pointer" onClick={onClose}>
            <CloseIcon />
          </div>
        </div>
        <div className="w-full flex items-center justify-between p-3 mb-3 border border-gray-200 rounded-lg shadow-sm">
          <SignatureCanvas
            ref={sigCanvas}
            canvasProps={{
              width: 600,
              height: 300,
              style: {
                backgroundColor: 'white',
                boxSizing: 'border-box',
              },
            }}
          />
          {/* <button onClick={() => setIsErasing((prev) => !prev)}>
            {isErasing ? 'Stop Erasing' : 'Erase'}
          </button> */}
        </div>
        <div className="flex gap-16 justify-center">
          <div
            onClick={clearSignature}
            className="cursor-pointer px-4 py-4 bg-[#EBF8FF] rounded-md"
          >
            <ReloadIcon />
          </div>
          <div
            onClick={saveSignature}
            className="cursor-pointer px-4 py-4 bg-[#EBF8FF] rounded-md"
          >
            <TickIcon />
          </div>
        </div>
      </div>
    );
  };
  const { trigger, setValue, setError, getValues } =
    useFormContext<BookingVerificationFormSchema>();

  const check_visible = useAppSelector(
    (state) =>
      state.guestBookingVerification.getBooking.data?.propertyDocuments_visible,
  );
  const documentUrl: string[] | undefined = useAppSelector((state) => {
    const urls =
      state.guestBookingVerification.getBooking.data?.propertyDocuments_url;
    return Array.isArray(urls) ? urls : urls ? [urls] : undefined;
  });

  const documentVisible = useAppSelector(
    (state) =>
      state.guestBookingVerification.getBooking.data?.propertyDocuments_visible,
  );

  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log('Doc Visible', documentVisible);

  const onPrevious = () => {
    setStep(AddBookingVerificationFormSteps.STEP3);
  };

  async function onNext() {
    const isValid = await trigger('stepFour');
    if (!isValid) {
      toast.error('Please upload the signature.');
    }
  }

  const drawSignature = () => {
    setDrawSign(true);
    setUploadSign(false);
  };

  const uploadSignature = () => {
    setUploadSign(true);
    setDrawSign(false);
  };

  const createFileFromBlob = (blob: Blob) => {
    const fileName = 'signature.png';
    const lastModified = Date.now();
    const file = new File([blob], fileName, {
      type: 'image/png',
      lastModified,
    });
    return file;
  };
  const fileValue = getValues('stepFour.signatureFile');
  return (
    <div className="booking-verify-esign">
      <FromContainer>
        <FormContent>
          <p className="color-[#051621] font-bold text-base mb-4">
            Terms & Conditions
          </p>
          <div>
            {documentUrl?.map((url: string) => (
              <div
                key={url}
                className="mb-2 flex justify-between terms_cond_style"
              >
                <Link
                  to={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  {url.split('/').pop()?.split('-').pop()?.split('.')[0] ||
                    'No document available'}
                </Link>
                <FaExternalLinkAlt
                  className="text-blue-500"
                  style={{ pointerEvents: 'auto' }}
                />
              </div>
            ))}
          </div>
          <div className="flex items-center mt-7">
            <WarningIcon />{' '}
            <p className="ms-2">
              By signing, you are agreeing to the above terms & conditions
            </p>
          </div>

          {check_visible === false && <p>No documents available.</p>}
          <div className="mt-7">
            <Button
              type="default"
              htmlType="button"
              className="font-medium bg-gray-b py-5 px-6 border-0 ml-4 text-sm font-bold"
              onClick={drawSignature}
            >
              Draw
            </Button>
            <Button
              type="default"
              htmlType="button"
              className="font-medium bg-gray-b py-5 px-6 border-0 ml-4 text-sm font-bold"
              onClick={uploadSignature}
            >
              Upload
            </Button>
          </div>
          {drawSign && (
            <SignaturePad
              setImageURL={(url) => {
                const base64Data =
                  typeof url === 'string' ? url.split(',')[1] : '';
                const byteCharacters = atob(base64Data);
                const byteArrays: Uint8Array[] = [];
                for (
                  let offset = 0;
                  offset < byteCharacters.length;
                  offset += 1024
                ) {
                  const slice = byteCharacters.slice(offset, offset + 1024);
                  const byteNumbers = new Array(slice.length);
                  for (let i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                  }
                  byteArrays.push(new Uint8Array(byteNumbers));
                }
                const blob = new Blob(byteArrays, { type: 'image/png' });
                const file = createFileFromBlob(blob);
                setValue('stepFour.signatureFile', file);
              }}
              setShowMannualSign={setShowMannualSign}
              setCloseMannualSign={setCloseMannualSign}
              // penColor={''}
            />
          )}
          <div className="flex flex-col md:flex-row justify-between items-center my-4">
            {uploadSign && (
              <div className="bookverify-step4-fileupload">
                <FileUpload
                  type="button"
                  fileName={
                    typeof fileValue === 'string'
                      ? extractFileName(fileValue)
                      : ''
                  }
                  fileLocation={
                    getValues('stepFour.signatureFile') as unknown as string
                  }
                  setValue={(newValue) =>
                    setValue('stepFour.signatureFile', newValue)
                  }
                  acceptedFileTypes={'.pdf'}
                  draggerText={'Upload property image'}
                  maxSize={maxSize}
                  setError={(error) =>
                    setError('stepFour.signatureFile', { message: error })
                  }
                  token={guestToken}
                />
              </div>
            )}
          </div>
        </FormContent>
        <FormFooter>
          <div style={{ marginTop: 24 }}>
            <Button
              type="default"
              htmlType="button"
              className="font-medium bg-gray-b py-5 px-6 border-0 ml-4 text-sm font-bold"
              onClick={onPrevious}
            >
              Previous
            </Button>
            <Button
              type="primary"
              className="p-5 ml-4 text-sm font-bold"
              htmlType="submit"
              onClick={onNext}
            >
              Submit
            </Button>
          </div>
        </FormFooter>
      </FromContainer>
    </div>
  );
};

export default BookingVerificationFormStep4;
