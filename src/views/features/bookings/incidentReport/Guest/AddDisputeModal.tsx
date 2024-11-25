import { InfoCircleFilled, UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Drawer,
  Form,
  Image,
  Input,
  Modal,
  Upload,
  type UploadFile,
  type UploadProps,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { type FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import {
  FormContent,
  FormFooter,
  FromContainer,
} from 'views/components/FormComponents';
import imageOutline from '../../../../../assets/icons/add-booking.svg';

interface EditBankDetailModalProps {
  open: boolean;
  onCancel: () => void;
}
const AddDisputeModal: FC<EditBankDetailModalProps> = ({ open, onCancel }) => {
  const { control } = useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const visibleFiles = fileList.slice(0, 10);
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };
  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList((prevFileList) => [
      ...prevFileList.filter(
        (file) => !newFileList.some((newFile) => newFile.uid === file.uid),
      ),
      ...newFileList,
    ]);
  };
  const getBase64 = (file: UploadFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj as Blob);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  const handleModalOpen = () => {
    setModalVisible(true);
  };
  const handleModalClose = () => {
    setModalVisible(false);
  };
  return (
    <>
      <Drawer
        title="Add Dispute"
        placement="right"
        closable={true}
        onClose={onCancel}
        visible={open}
        width={600}
        className="add-dispute-drawer"
      >
        {/* <Modal
    className="guestdashboard-edit-card"
    title="Add Dispute"
    open={open}
    onCancel={onCancel}
    footer={null}
  > */}
        <FromContainer>
          <FormContent>
            <Form className="add-dispute-modal">
              <div>
                <h1 className="md:text-sm text-sm font-bold text-black-color">
                  Host's Claim
                </h1>
                <div className="bg-gray-d br10 p-3 my-2">
                  <div>
                    <div className="grid grid-cols-2 gap-4 mt-2 mb-0 md:grid-cols-[45%_45%]">
                      <h1 className="md:text-sm text-sm font-bold text-black-color">
                        Damages
                      </h1>
                      <span className="md:text-sm text-sm font-bold text-black-color text-end">
                        R300
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-grey-f py-2">
                    The guest accidentally broke a glass coffee table while
                    moving furniture, causing significant damage to the
                    property's furnishings.
                  </p>
                  <div>
                    {Array.from({ length: 5 }, (_, index) => (
                      <Image
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        key={index}
                        width={20}
                        src={
                          imageOutline as unknown as string as unknown as undefined
                        }
                        className="bordered-image"
                        style={{ marginLeft: index === 0 ? 0 : '10px' }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="my-2">
                <h1 className="md:text-sm text-sm font-bold text-black-color">
                  Your Dispute
                </h1>
                <div className="bg-gray-d br10 p-3 my-2 your-dispute">
                  <div>
                    <div className="grid grid-cols-2 gap-4 mt-2 mb-0 md:grid-cols-[45%_45%]">
                      <h1 className="md:text-sm text-sm font-bold text-black-color">
                        Damages
                      </h1>
                      <span className="md:text-sm text-sm font-bold text-black-color text-end flex">
                        <FormItem
                          control={control}
                          name="stepOne.bookingReference"
                          className="w-full"
                        >
                          <Controller
                            control={control}
                            name="stepOne.bookingReference"
                            render={({ field: { onChange, value } }) => (
                              <Input
                                placeholder="Disputed Amount"
                                size="large"
                                className="w-full py-0 px-1"
                                value={value}
                                onChange={onChange}
                              />
                            )}
                          />
                        </FormItem>
                        <InfoCircleFilled className="text-lg text-primary mx-2 mb-2" />
                      </span>
                    </div>
                    <FormItem
                      control={control}
                      name="stepOne.company_address"
                      className="w-full"
                    >
                      <TextArea
                        placeholder="Write about the incident"
                        size="large"
                        className="py-3"
                      />
                    </FormItem>
                    <div className="flex add-upload-report">
                      <Upload
                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                        listType="picture-card"
                        fileList={visibleFiles}
                        onPreview={handlePreview}
                        onChange={handleChange}
                        multiple
                      >
                        <UploadOutlined />
                      </Upload>
                      {fileList.length > 10 && (
                        <span
                          onClick={handleModalOpen}
                          className="upload-file-list"
                        >
                          {`+${fileList.length - 10}`}{' '}
                        </span>
                      )}
                    </div>
                    {previewImage && (
                      <Image
                        wrapperStyle={{ display: 'none' }}
                        preview={{
                          visible: previewOpen,
                          onVisibleChange: (visible) => setPreviewOpen(visible),
                          afterOpenChange: (visible) =>
                            !visible && setPreviewImage(''),
                        }}
                        src={previewImage}
                      />
                    )}
                  </div>
                </div>
              </div>
            </Form>
          </FormContent>
          <FormFooter>
            <Button className="mx-2" type="primary" htmlType="submit">
              Add Dispute
            </Button>
          </FormFooter>
        </FromContainer>
      </Drawer>

      <Modal
        visible={modalVisible}
        title="Uploaded Images"
        footer={null}
        onCancel={handleModalClose}
        width={800}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {fileList.map((file) => (
            <div key={file.uid}>
              <Image
                width={100}
                src={file.thumbUrl || (file.preview as string)}
                alt={`image-${file.uid}`}
              />
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};
export default AddDisputeModal;
