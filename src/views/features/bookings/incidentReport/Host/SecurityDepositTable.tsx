import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Image,
  Modal,
  Popconfirm,
  Select,
  Table,
  type TableProps,
  Upload,
} from 'antd';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import type React from 'react';
import { useState } from 'react';
import { Trash } from 'react-bootstrap-icons';

const { Option } = Select;

interface DataType {
  onDelete(key: string): void;
  key: string;
  name: string;
  age: number;
  address: string;
  amount: number;
  visibleFiles: UploadFile[];
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Claim Type',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => (
      <Select
        defaultValue={text}
        style={{ width: 120 }}
        onChange={(value) => {
          record.name = value;
        }}
      >
        <Option value="John Brown">John Brown</Option>
        <Option value="Jim Green">Jim Green</Option>
        <Option value="Joe Black">Joe Black</Option>
      </Select>
    ),
    width: '20%',
  },
  {
    title: 'Description',
    dataIndex: 'age',
    key: 'age',
    width: '40%',
  },
  {
    title: 'Upload',
    dataIndex: 'address',
    key: 'address',
    width: '30%',
    render: () => <UploadButton />,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    width: '30%',
  },
  {
    title: '',
    key: 'action',
    width: '5%',
    render: (_, record) => (
      <Popconfirm
        title="Sure to delete?"
        onConfirm={() => record.onDelete(record.key)}
      >
        <Button
          icon={<Trash className="fill-primary" />}
          className="bg-lightBlue"
          size="small"
          shape="circle"
        />
      </Popconfirm>
    ),
  },
];

const getBase64 = (file: UploadFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.originFileObj as Blob);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const UploadButton: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

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

  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const visibleFiles = fileList.slice(0, 3);

  return (
    <>
      <div className="flex add-upload-report">
        <Upload
          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          listType="picture-card"
          fileList={visibleFiles}
          onPreview={handlePreview}
          onChange={handleChange}
          multiple
        >
          <PlusOutlined />
        </Upload>
        {fileList.length > 3 && (
          <span onClick={handleModalOpen} className="upload-file-list">
            {`+${fileList.length - 3}`}{' '}
          </span>
        )}
      </div>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}

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

const SecurityDepositTable = ({
  dataSource,
  onDelete,
}: { dataSource: DataType[]; onDelete: (key: string) => void }) => {
  return (
    <div className="incident-table">
      <Table<DataType>
        columns={columns}
        dataSource={dataSource.map((item) => ({
          ...item,
          onDelete: (key: string) => onDelete(key),
        }))}
        pagination={false}
      />
    </div>
  );
};

export default SecurityDepositTable;
