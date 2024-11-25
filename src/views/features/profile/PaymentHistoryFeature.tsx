import { DownloadOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { BsFilter } from 'react-icons/bs';
import { useGetBookings } from '../bookings/hooks';

type Data = {
  key: string;
  month?: string;
  totalValue?: number;
  damageWaiver?: number;
  securityDeposit?: number;
  downloadText?: string;
  downloadUrl?: { icon: JSX.Element; url: string };
  statementId?: number;
  protectionRef?: string;
  bookingRef?: number;
  guestName?: string;
  property?: string;
  transactionDate?: string;
};

const PaymentHistoryFeature = () => {
  const { status: loadAllBooking } = useGetBookings();
  const [activeButton, setActiveButton] = useState<string>('current');

  const columns: ColumnsType<Data> = [
    {
      title: 'Month',
      dataIndex: 'month',
      key: 'month',
      fixed: 'left',
      sortIcon: () => <BsFilter />,
      sorter: true,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Total Value',
      dataIndex: 'totalValue',
      key: 'totalValue',
      sortIcon: () => <BsFilter />,
      sorter: true,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Damage Waiver',
      dataIndex: 'damageWaiver',
      key: 'damageWaiver',
      sortIcon: () => <BsFilter />,
      sorter: true,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Security Deposit',
      dataIndex: 'securityDeposit',
      key: 'securityDeposit',
      sortIcon: () => <BsFilter />,
      sorter: true,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Download',
      dataIndex: 'download',
      key: 'download',
      sortIcon: () => <BsFilter />,
      sorter: true,
      sortDirections: ['ascend', 'descend'],
      render: (_, record) => (
        <a
          href={record.downloadUrl?.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {record.downloadUrl?.icon}
          {record.downloadText}
        </a>
      ),
    },
  ];

  const dataSource: Data[] = [
    {
      key: '1',
      month: 'January',
      totalValue: 1500,
      damageWaiver: 100,
      securityDeposit: 200,
      downloadText: 'Download Link 1',
      downloadUrl: {
        icon: (
          <DownloadOutlined
            style={{ marginRight: 8 }}
            className="fill-primary"
          />
        ),
        url: '#', // Replace with actual URL
      },
    },
    {
      key: '2',
      month: 'February',
      totalValue: 2000,
      damageWaiver: 150,
      securityDeposit: 250,
      downloadText: 'Download Link 2',
      downloadUrl: {
        icon: (
          <DownloadOutlined
            style={{ marginRight: 8 }}
            className="fill-primary"
          />
        ),
        url: '#',
      },
    },
    {
      key: '3',
      month: 'March',
      totalValue: 2500,
      damageWaiver: 200,
      securityDeposit: 300,
      downloadText: 'Download Link 3',
      downloadUrl: {
        icon: (
          <DownloadOutlined
            style={{ marginRight: 8 }}
            className="fill-primary"
          />
        ),
        url: '#', // Replace with actual URL
      },
    },
  ];

  const columns1: ColumnsType<Data> = [
    {
      title: 'Statement ID',
      dataIndex: 'statementId',
      key: 'statementId',
      fixed: 'left',
      sortIcon: () => <BsFilter />,
      sorter: true,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Protection Ref',
      dataIndex: 'protectionRef',
      key: 'protectionRef',
      sortIcon: () => <BsFilter />,
      sorter: true,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Booking Ref',
      dataIndex: 'bookingRef',
      key: 'bookingRef',
      sortIcon: () => <BsFilter />,
      sorter: true,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Guest Name',
      dataIndex: 'guestName',
      key: 'guestName',
      sortIcon: () => <BsFilter />,
      sorter: true,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Property',
      dataIndex: 'property',
      key: 'property',
      sortIcon: () => <BsFilter />,
      sorter: true,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Transaction Date',
      dataIndex: 'transactionDate', // Ensure this matches the data source
      key: 'transactionDate',
      sortIcon: () => <BsFilter />,
      sorter: true,
      sortDirections: ['ascend', 'descend'],
    },
  ];

  const dataSource1: Data[] = [
    {
      key: '1',
      statementId: 16031880,
      protectionRef: 'JBL-724dfg63',
      bookingRef: 4675784,
      guestName: 'Alan Walker',
      property: 'Bushveld Self-Catering Lodge',
      transactionDate: '11.12.2024', // Ensure this is a string
    },
  ];

  const handleButtonClick = (buttonType: string) => {
    setActiveButton(buttonType);
  };

  return (
    <div className="booking__feature payment_history_feature">
      <div className="booking__feature--action_part">
        <div className="booking__feature--action_part-left">
          <div className="booking__feature--action_part-left-btns">
            <Button
              type="primary"
              onClick={() => handleButtonClick('upcoming')}
              className={
                activeButton === 'upcoming'
                  ? 'rounded-l-3xl rounded-r-none booking__feature--active'
                  : 'rounded-l-3xl rounded-r-none booking__feature--notactive'
              }
            >
              Invoices&nbsp;{' '}
            </Button>
            <Button
              type="primary"
              onClick={() => handleButtonClick('current')}
              className={
                activeButton === 'current'
                  ? 'rounded-r-3xl rounded-l-none booking__feature--active'
                  : 'rounded-r-3xl rounded-l-none booking__feature--notactive'
              }
            >
              Statement&nbsp;{' '}
            </Button>
          </div>
        </div>
      </div>
      {activeButton === 'upcoming' ? (
        <Table
          className="booking__feature-table payment_history_table"
          columns={columns}
          dataSource={dataSource}
          sortDirections={['ascend', 'descend']}
          showSorterTooltip={false}
          pagination={false}
          scroll={{ x: 1300, y: 'calc(100vh - 340px)' }}
          loading={loadAllBooking === 'pending'}
        />
      ) : (
        <Table
          className="booking__feature-table payment_history_table"
          columns={columns1}
          dataSource={dataSource1}
          sortDirections={['ascend', 'descend']}
          showSorterTooltip={false}
          pagination={false}
          scroll={{ x: 1300, y: 'calc(100vh - 340px)' }}
          loading={loadAllBooking === 'pending'}
        />
      )}
    </div>
  );
};

export default PaymentHistoryFeature;
