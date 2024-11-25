import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Popconfirm, Select, Table, Upload } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { UploadFile } from 'antd/es/upload/interface';
import { useState } from 'react';
import { Trash } from 'react-bootstrap-icons';
import CustomSwitch from 'views/components/switch/CustomSwitch';

interface Claim {
  key: string;
  name: string;
  description: string;
  amount: number;
  covereddw: boolean;
  visibleFiles: UploadFile[];
}

const claimTypes = ['Cleaning', 'Cooking', 'Washing'];

const DamageWaiverTable: React.FC = () => {
  // State for the table data
  const [dataSource, setDataSource] = useState<Claim[]>([
    {
      key: '1',
      name: 'Cleaning',
      description: 'Initial claim for cleaning services',
      amount: 100,
      covereddw: false,
      visibleFiles: [],
    },
    {
      key: '2',
      name: 'Cooking',
      description: 'Initial claim for cooking services',
      amount: 200,
      covereddw: true,
      visibleFiles: [],
    },
  ]);

  // Update function for table data
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const handleUpdate = (key: string, field: keyof Claim, value: any) => {
    setDataSource((prev) =>
      prev.map((item) =>
        item.key === key
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  };

  // Delete function for removing records
  const handleDelete = (key: string) => {
    setDataSource((prev) => prev.filter((item) => item.key !== key));
  };

  // Function for updating uploaded files
  const handleUploadChange = (key: string, files: UploadFile[]) => {
    handleUpdate(key, 'visibleFiles', files);
  };

  // Define table columns
  const columns: ColumnsType<Claim> = [
    {
      title: 'Claim Type',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <Select
          value={record.name}
          onChange={(value) => handleUpdate(record.key, 'name', value)}
          options={claimTypes.map((type) => ({ label: type, value: type }))}
        />
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (_, record) => (
        <Input
          value={record.description}
          onChange={(e) =>
            handleUpdate(record.key, 'description', e.target.value)
          }
        />
      ),
    },
    {
      title: 'Upload',
      dataIndex: 'visibleFiles',
      key: 'visibleFiles',
      render: (_, record) => (
        <Upload
          listType="picture-card"
          fileList={record.visibleFiles}
          onChange={({ fileList }) => handleUploadChange(record.key, fileList)}
          multiple
        >
          <Button icon={<PlusOutlined />} />
        </Upload>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (_, record) => (
        <Input
          type="number"
          value={record.amount}
          onChange={(e) =>
            handleUpdate(record.key, 'amount', Number(e.target.value))
          }
        />
      ),
    },
    {
      title: 'Covered by DW?',
      dataIndex: 'covereddw',
      key: 'covereddw',
      render: (_, record) => (
        <CustomSwitch
          checked={record.covereddw}
          onChange={(checked) => handleUpdate(record.key, 'covereddw', checked)}
        />
      ),
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete?"
          onConfirm={() => handleDelete(record.key)}
        >
          <Button
            icon={<Trash />}
            shape="circle"
            size="small"
          />
        </Popconfirm>
      ),
    },
  ];

  return <Table columns={columns} dataSource={dataSource} rowKey="key" />;
};

export default DamageWaiverTable;
