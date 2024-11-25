import { Button, Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import ExportXL from 'assets/bookings/exportXL.svg';
import dayjs from 'dayjs';
import { useAppDispatch } from 'hooks/redux';
import { useEffect, useRef, useState } from 'react';
import { Plus } from 'react-bootstrap-icons';
import {
  BsCheckCircle,
  BsFilter,
  BsInfoCircle,
  BsXCircle,
} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import {
  handleBookingCreationModal,
  handleBookingSuccessModal,
  resetCurrentData,
  resetPastData,
  resetUpcomingData,
  updateSortOrder,
} from 'stores/slice/bookingSlice';
import type { ApiError } from 'utilities/api';
import { toastErrorDisplay } from 'utilities/toastErrorDisplay';
import DrawerComponent from 'views/components/drawer/Drawer';
import SuccessModal from 'views/components/modals/SuccessModal';
import { utils, writeFile } from 'xlsx';
import AddBookingFormModal from './AddBookingFormModal';
import type { AddBookingFormSchema } from './addBookingForm/StepFormSchema';
import { useAddBookings, useGetBookings } from './hooks';
import type { BookingFormType, Data, MetaData } from './types';

const BookingFeature = () => {
  const navigate = useNavigate();
  const {
    status: loadAllBooking,
    getBookings,
    upcomingBookingData,
    currentBookingData,
    pastBookingData,
    totalCurrentData,
    totalUpcomingData,
    totalPastData,
    currentPaginationData,
    pastPaginationData,
    upcomingPaginationData,
    lastUpdated,
    openNewBooking,
    openNewBookingSuccessModal,
  } = useGetBookings();
  const dispatch = useAppDispatch();
  const { addBooking } = useAddBookings();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [activeButton, setActiveButton] = useState<string>('current');
  const previousScrollTop = useRef(0);

  const fetchBookings = async (
    page: number,
    activeStatus: string,
    isInitialLoad?: boolean,
  ) => {
    try {
      await getBookings(page, activeStatus, isInitialLoad);
    } catch (error) {
      toastErrorDisplay(error);
      const apiError: ApiError = error as ApiError;
      if (apiError.data?.error?.msg) {
        const msg = apiError.data.error.msg;
        // biome-ignore lint/suspicious/noConsoleLog: <explanation>
        console.log(msg, 'error msg');
      }
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const getAllBookingsData = async () => {
      await fetchBookings(1, 'current');
      await fetchBookings(1, 'past');
      await fetchBookings(1, 'upcoming');
    };
    getAllBookingsData();
  }, [lastUpdated, openNewBookingSuccessModal]);

  const addNewBookingFunc = async (bookingForm: BookingFormType) => {
    addBooking(bookingForm);
  };

  const showModal = () => {
    dispatch(handleBookingCreationModal(true));
  };

  const handleOk = (data: AddBookingFormSchema) => {
    addNewBookingFunc({
      ...data.stepOne,
      ...data.stepTwo,
      bookingReference: String(data.stepOne.bookingReference),
      guestPhone: String(data.stepTwo.guestPhone),
      CheckInDate: dayjs(data.stepOne.CheckInDate, 'DD-MM-YYYY').format(
        'YYYY-MM-DD',
      ),
      CheckOutDate: dayjs(data.stepOne.CheckOutDate, 'DD-MM-YYYY').format(
        'YYYY-MM-DD',
      ),
    });
  };

  const handleCancel = () => {
    dispatch(handleBookingCreationModal(false));
  };
  const handlereport = (id: string) => {
    navigate(`/bookings/incident-report/${id}`);
  };

  const resetBookingData = () => {
    const resetFunction =
      activeButton === 'current'
        ? resetCurrentData()
        : activeButton === 'past'
          ? resetPastData()
          : resetUpcomingData();
    dispatch(resetFunction);
    dispatch(handleBookingCreationModal(false));
  };

  const handleSuccessModal = async () => {
    dispatch(handleBookingSuccessModal(false));
    resetBookingData();
  };

  const handleTableSort = async (
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    _pagination: any,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    _filters: any,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    sorter: any,
  ) => {
    const fieldName =
      sorter.field === 'propertyName'
        ? 'manualProperty.propertyName'
        : sorter.field;
    resetBookingData();
    dispatch(updateSortOrder(fieldName));
    await fetchBookings(1, activeButton);
  };

  const loadMoreData = async () => {
    const paginationData: {
      current: MetaData;
      past: MetaData;
      upcoming: MetaData;
    } = {
      current: currentPaginationData,
      past: pastPaginationData,
      upcoming: upcomingPaginationData,
    };
    const isLastPage =
      paginationData[activeButton as keyof typeof paginationData].pageNumber ===
      paginationData[activeButton as keyof typeof paginationData].totalPages;
    if (isLastPage || loadAllBooking === 'pending') {
      return;
    }
    await fetchBookings(
      paginationData[activeButton as keyof typeof paginationData].pageNumber +
        1,
      activeButton,
      false,
    );
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const scrollThreshold = 2; // Adjust this value as needed
    const isNearBottom =
      scrollTop + clientHeight >= scrollHeight - scrollThreshold;
    const isNotAtTop = scrollTop > 0;
    const isScrollable =
      (activeButton === 'current' && currentBookingData.length > 0) ||
      (activeButton === 'past' && pastBookingData.length > 0) ||
      (activeButton === 'upcoming' && upcomingBookingData.length > 0);

    // Check if scrolling down
    if (isScrollable) {
      if (isNearBottom && isNotAtTop) {
        loadMoreData();
      }
    }

    // Update previous scroll position
    previousScrollTop.current = scrollTop;
  };

  const columns: ColumnsType<Data> = [
    // This column is not yet configured.

    // {
    //   title: 'Protection Ref',
    //   dataIndex: 'protectionRef',
    //   fixed: 'left',
    //   key: 'protectionRef',
    //   render: (text: string) => <a>{text.toUpperCase()}</a>,
    //   filterIcon: <BsFilter />,
    //   sortIcon: () => <BsThreeDotsVertical />,
    //   filters: [
    //     {
    //       text: 'London',
    //       value: 'London',
    //     },
    //     {
    //       text: 'New York',
    //       value: 'New York',
    //     },
    //   ],
    // },
    {
      title: 'Protection Ref',
      dataIndex: 'protectionRef',
      key: 'protectionRef',
      fixed: 'left',
      sortIcon: () => <BsFilter />,
      sorter: true,
      sortDirections: ['ascend', 'descend'],
      width: '16%',
    },

    {
      title: 'Booking Ref',
      dataIndex: 'bookingReference',
      key: 'bookingReference',
      sortIcon: () => <BsFilter />,
      sorter: true,
      sortDirections: ['ascend', 'descend'],
      width: '16%',
    },
    {
      title: 'Guest Name',
      dataIndex: 'guestName',
      key: 'guestName',
      // fixed: 'left',
      sortIcon: () => <BsFilter />,
      sorter: true,
      sortDirections: ['ascend', 'descend'],
      width: '16%',
    },
    // This column is not yet configured.

    // {
    //   title: 'Guest Rating',
    //   dataIndex: 'guestRating',
    //   key: 'guestRating',
    //   filterIcon: <BsFilter />,
    //   sortIcon: () => <BsThreeDotsVertical />,
    //   render: (rating: number) => (
    //     <Tag
    //       className={
    //         rating > 2.5 ? 'rating_tag green__border' : 'rating_tag red__border'
    //       }
    //       onClick={showLoading}
    //     >
    //       <BsFillStarFill className="rating__star" /> {rating}
    //     </Tag>
    //   ),
    //   filters: [
    //     {
    //       text: 'London',
    //       value: 'London',
    //     },
    //     {
    //       text: 'New York',
    //       value: 'New York',
    //     },
    //   ],
    // },
    {
      title: 'Property',
      dataIndex: 'propertyName',
      key: 'propertyName',
      sortIcon: () => <BsFilter />,
      sorter: true,
      sortDirections: ['ascend', 'descend'],
      width: '16%',
    },
    {
      title: 'Check In',
      dataIndex: 'CheckInDate',
      key: 'checkIn',
      sortIcon: () => <BsFilter />,
      sorter: true,
      sortDirections: ['ascend', 'descend'],
      width: '16%',
      render: (date) => dayjs(date).format('DD/MM/YYYY'),
    },
    ...(activeButton !== 'upcoming'
      ? [
          {
            title: 'Check Out',
            dataIndex: 'CheckOutDate',
            key: 'checkOut',
            sortIcon: () => <BsFilter />,
            render: (
              date: string | number | Date | dayjs.Dayjs | null | undefined,
            ) => dayjs(date).format('DD/MM/YYYY'),
            sorter: true,
            width: '16%',
          },
        ]
      : []),
    {
      title: 'Protection Status',
      dataIndex: 'status',
      key: 'status',
      sortIcon: () => <BsFilter />,
      sorter: true,
      sortDirections: ['ascend', 'descend'],
      width: '16%',
      render: (text) => {
        let backgroundColor: string;
        let color: string;
        let displayText: string;
        let icon: JSX.Element | null = null;

        if (text === 'Refundable') {
          backgroundColor = '#E6F4EA';
          color = '#2E7D32';
          displayText = 'Security Deposit';
          icon = (
            <BsCheckCircle style={{ color: '#2E7D32', marginLeft: '5px' }} />
          );
        } else if (text === 'Pending') {
          backgroundColor = '#E0E0E0';
          color = '#616161';
          displayText = 'Unverified';
          icon = (
            <BsInfoCircle style={{ color: '#616161', marginLeft: '5px' }} />
          );
        } else if (text === 'NonRefundable') {
          backgroundColor = '#FFF3E0';
          color = '#F57C00';
          displayText = 'Damage Waiver';
          icon = (
            <BsInfoCircle style={{ color: '#F57C00', marginLeft: '5px' }} />
          );
        } else if (text === 'Declined') {
          backgroundColor = '#FFEBEE';
          color = '#D32F2F';
          displayText = 'Damage Waiver';
          icon = <BsXCircle style={{ color: '#D32F2F', marginLeft: '5px' }} />;
        } else {
          backgroundColor = 'transparent';
          color = 'inherit';
          displayText = text;
        }

        return (
          <span
            style={{
              backgroundColor,
              color,
              padding: '5px 10px',
              borderRadius: '12px',
              fontWeight: '500',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            {displayText}
            {icon}
          </span>
        );
      },
    },
    {
      title: 'Report',
      key: 'report',
      width: '16%',
      render: (record: Data) => (
        <Button
          type="link"
          onClick={() => handlereport(String(record.id))} 
          style={{ padding: 0 }}
        >
          completed
        </Button>
      ),
    },

    // This column is not yet configured.

    // {
    //   title: 'Protection Status',
    //   dataIndex: 'protectionStatus',
    //   key: 'protectionStatus',
    //   className: 'protectionStatus',
    //   filterIcon: <BsFilter />,
    //   sortIcon: () => <BsThreeDotsVertical />,
    //   render: (protectionStatus: string) => (
    //     <Tag className="protectionStatus_tag">
    //       {protectionStatus} <CheckOutlined />
    //     </Tag>
    //   ),
    //   filters: [
    //     {
    //       text: 'London',
    //       value: 'London',
    //     },
    //     {
    //       text: 'New York',
    //       value: 'New York',
    //     },
    //   ],
    // },
    // ...(activeButton !== 'upcoming'
    //   ? [
    //       {
    //         title: 'Report',
    //         dataIndex: 'report',
    //         key: 'report',
    //         filterIcon: <BsFilter />,
    //         sortIcon: () => <BsThreeDotsVertical />,
    //         render: (report: string) => (
    //           <p>
    //             <ContainerOutlined /> {report}
    //           </p>
    //         ),
    //         filters: [
    //           {
    //             text: 'London',
    //             value: 'London',
    //           },
    //           {
    //             text: 'New York',
    //             value: 'New York',
    //           },
    //         ],
    //       },
    //     ]
    //   : []),
    // ...(activeButton === 'past'
    //   ? [
    //       {
    //         title: 'Claim Status',
    //         dataIndex: 'claimReport',
    //         key: 'claimReport',
    //         filterIcon: <BsFilter />,
    //         sortIcon: () => <BsThreeDotsVertical />,
    //         render: (claimReport: string) => (
    //           <p>
    //             <ContainerOutlined /> {claimReport}
    //           </p>
    //         ),
    //         filters: [
    //           {
    //             text: 'London',
    //             value: 'London',
    //           },
    //           {
    //             text: 'New York',
    //             value: 'New York',
    //           },
    //         ],
    //       },
    //     ]
    //   : []),
  ];

  const handleButtonClick = (buttonType: string) => {
    setActiveButton(buttonType);
    const isDataEmpty =
      buttonType === 'current'
        ? currentBookingData.length === 0
        : buttonType === 'past'
          ? pastBookingData.length === 0
          : upcomingBookingData.length === 0;
    isDataEmpty && fetchBookings(1, buttonType);
  };

  const exportToExcel = () => {
    const data =
      activeButton === 'current'
        ? currentBookingData
        : activeButton === 'past'
          ? pastBookingData
          : upcomingBookingData;
    const filteredData = data.map(
      ({ guestName, CheckInDate, CheckOutDate, property }) => ({
        guestName,
        CheckInDate,
        CheckOutDate,
        property: property?.manualProperty.propertyName,
      }),
    );
    const ws = utils.json_to_sheet(filteredData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Sheet1');

    writeFile(wb, 'bookingData.xlsx');
  };

  const isExportButtonDisabled = () => {
    return activeButton === 'current'
      ? currentBookingData.length === 0
      : activeButton === 'past'
        ? pastBookingData.length === 0
        : upcomingBookingData.length === 0;
  };

  return (
    <div className="booking__feature">
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
              Upcoming&nbsp;{' '}
              <span className="data_count">{totalUpcomingData}</span>
            </Button>
            <Button
              type="primary"
              onClick={() => handleButtonClick('current')}
              className={
                activeButton === 'current'
                  ? 'rounded-none border-x-0 booking__feature--active'
                  : 'rounded-none booking__feature--notactive'
              }
            >
              Current&nbsp;{' '}
              <span className="data_count">{totalCurrentData}</span>
            </Button>
            <Button
              type="primary"
              onClick={() => handleButtonClick('past')}
              className={
                activeButton === 'past'
                  ? 'rounded-r-3xl rounded-l-none booking__feature--active'
                  : 'rounded-r-3xl rounded-l-none booking__feature--notactive'
              }
            >
              Past&nbsp; <span className="data_count">{totalPastData}</span>
            </Button>
          </div>
        </div>
        <div className="booking__feature--action_part-right">
          <Tooltip
            title="Export the booking data in this particular view in a Excel/Google sheets"
            placement="bottomLeft"
          >
            <Button
              className="py-5 rounded export_btn"
              type="primary"
              onClick={exportToExcel}
              disabled={isExportButtonDisabled()}
            >
              <img src={ExportXL as unknown as string} alt="" />
            </Button>
          </Tooltip>
          <Button
            type="primary"
            size="large"
            icon={<Plus className="w-5 h-5 fill-white" />}
            className="py-5 text-sm font-bold rounded"
            onClick={showModal}
          >
            Add Booking
          </Button>

          {openNewBooking && (
            <AddBookingFormModal
              open={openNewBooking}
              handleOk={handleOk}
              handleCancel={handleCancel}
            />
          )}

          <SuccessModal
            open={openNewBookingSuccessModal}
            handleCancel={handleSuccessModal}
            handleOk={handleSuccessModal}
            handleContinue={handleSuccessModal}
            content="You Will receive a notification once the guest verifies the link"
            title="Booking Captured!"
          />
        </div>
      </div>
      <div className="booking-table-container">
        <Table
          className="booking__feature-table"
          columns={columns}
          dataSource={
            activeButton === 'current'
              ? currentBookingData
              : activeButton === 'past'
                ? pastBookingData
                : upcomingBookingData
          }
          sortDirections={['ascend', 'descend']}
          showSorterTooltip={false}
          pagination={false}
          scroll={{ x: 1300, y: 'calc(100vh - 340px)' }}
          onScroll={handleScroll}
          loading={loadAllBooking === 'pending'}
          onChange={handleTableSort}
        />
      </div>
      <DrawerComponent openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </div>
  );
};

export default BookingFeature;
