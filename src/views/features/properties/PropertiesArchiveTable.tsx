import { Button, Image, Input, Space, Table } from 'antd';
import { type FC, useEffect, useRef, useState } from 'react';

import SearchOutlined from '@ant-design/icons/SearchOutlined';
import type { InputRef, TableColumnsType, TableProps } from 'antd';
import type { ColumnType } from 'antd/es/table';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import {
  PropertyStatusEnum,
  fetchArchiveProperties,
  setPropertyArchivePaginationData,
  setPropertyArchiveSearchField,
  setPropertyArchiveSortByOrder,
  updatePropertyStatus,
} from 'stores/slice/propertiesSlice';
import type {
  GetAlPropertySearchField,
  GetAllPropertySortByOrder,
} from 'types/getAllProperties';
import PropertiesDoc from './PropertiesDoc';
import AddOrAssignFormModal from './addOrAssignDocuments/AddOrAssignFormModal';

interface PropertiesDataType {
  key: number;
  propertyImage: string;

  PropertyName: string;
  address: string;
  noOfBeds: number;
  maxGuests: number;
  docs: [];
}

type DataIndex = keyof PropertiesDataType;

const PropertiesArchiveTable: FC = () => {
  const dispatch = useAppDispatch();

  const [showAddAssignModal, setShowAddAssignModal] = useState(false);

  const allArchiveProperty = useAppSelector(
    (state) => state.properties.archiveProperty.data,
  );

  const editPropertyStatus = useAppSelector(
    (state) => state.properties.editProperty.status,
  );

  const allArchiveStatus = useAppSelector(
    (state) => state.properties.archiveProperty.status,
  );

  const lastUpdated = useAppSelector(
    (state) => state.properties.archiveProperty.lastUpdated,
  );

  const paginationData = useAppSelector(
    (state) => state.properties.archiveProperty.paginationData,
  );

  const sortByOrder = useAppSelector(
    (state) => state.properties.archiveProperty.sortByOrder,
  );
  const searchField = useAppSelector(
    (state) => state.properties.archiveProperty.searchField,
  );

  const totalPages = useAppSelector(
    (state) => state.properties.archiveProperty.serverMetaData?.totalPages,
  );

  const isLoading =
    allArchiveStatus === 'pending' || allArchiveStatus === 'idle';

  const searchInput = useRef<InputRef>(null);

  const tableData: PropertiesDataType[] = allArchiveProperty
    ? allArchiveProperty?.map((property) => {
        return {
          key: property.id,
          propertyImage: property.manualProperty.propertyImage,
          PropertyName: property.manualProperty.propertyName,
          address: property.manualProperty.propertyLocation,
          noOfBeds: property.manualProperty.noOfBedrooms,
          maxGuests: property.manualProperty.maxGuest,
          docs: [],
        };
      })
    : [];

  // fetch all properties
  // biome-ignore lint/correctness/useExhaustiveDependencies: last updated is added so when ever the user publish back a property, the effect will run
  useEffect(() => {
    dispatch(
      fetchArchiveProperties({
        pageNumber: paginationData.currentPage,
        pageLimit: paginationData.pageSize,
        propertyStatus: 'Archives',
        sortByOrder: sortByOrder ?? {},
        searchField: searchField ?? {},
      }),
    );
  }, [lastUpdated, paginationData.currentPage, sortByOrder, searchField]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: clean the search field and sort by order when the component unmounts
  useEffect(() => {
    return () => {
      dispatch(setPropertyArchiveSearchField({}));
      dispatch(setPropertyArchiveSortByOrder({}));
    };
  }, []);

  const handleClickAddAssign = () => {
    setShowAddAssignModal(true);
  };

  const handleCancelAddAssign = () => {
    setShowAddAssignModal(false);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight, scrollLeft } =
      e.currentTarget;

    if (scrollLeft === 0 && scrollTop + clientHeight >= scrollHeight - 50) {
      loadMoreData();
    }
  };

  const handleClickPublishBack = (id: number | string) => {
    dispatch(
      updatePropertyStatus({
        propertyId: id,
        propertyStatusId: PropertyStatusEnum.PUBLISHED,
      }),
    );
  };

  const loadMoreData = () => {
    const isLastPage = paginationData.currentPage === totalPages;
    if (!isLastPage && allArchiveStatus !== 'pending') {
      dispatch(
        setPropertyArchivePaginationData({
          currentPage: paginationData.currentPage + 1,
          pageSize: paginationData.pageSize,
        }),
      );
    }
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex,
  ): ColumnType<PropertiesDataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={`${selectedKeys[0] || ''}`}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              if (clearFilters) {
                clearFilters();
                confirm();
              }
            }}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => text,
  });

  const handleTableChange: TableProps<PropertiesDataType>['onChange'] = (
    _,
    filters,
    sorter,
  ) => {
    // Map the order to ASC or DESC
    const OrderKey: Record<string, 'ASC' | 'DESC'> = {
      descend: 'DESC',
      ascend: 'ASC',
    };

    const addressSearch = filters?.address?.[0];
    const PropertyNameSearch = filters?.PropertyName?.[0];

    const sortByOrder: GetAllPropertySortByOrder = {};
    const searchValue: GetAlPropertySearchField = {};

    if (
      'field' in sorter &&
      'order' in sorter &&
      sorter.field &&
      sorter.order &&
      OrderKey[sorter.order]
    ) {
      const order = OrderKey[sorter.order];

      if (sorter.field === 'PropertyName') {
        sortByOrder['manualProperty.propertyName'] = order;
      }

      if (sorter.field === 'address') {
        sortByOrder['manualProperty.propertyLocation'] = order;
      }

      if (sorter.field === 'noOfBeds') {
        sortByOrder['manualProperty.noOfBedrooms'] = order;
      }

      if (sorter.field === 'maxGuests') {
        sortByOrder['manualProperty.maxGuest'] = order;
      }
    }

    if (typeof addressSearch === 'string') {
      searchValue['manualProperty.propertyLocation'] = addressSearch;
    }

    if (typeof PropertyNameSearch === 'string') {
      searchValue['manualProperty.propertyName'] = PropertyNameSearch;
    }

    dispatch(setPropertyArchiveSearchField(searchValue));

    dispatch(setPropertyArchiveSortByOrder(sortByOrder));
  };

  const columns: TableColumnsType<PropertiesDataType> = [
    {
      title: 'Image',
      dataIndex: 'image',
      width: '14%',
      render: (_, record) => (
        <Image
          width={'50px'}
          height={'40px'}
          src={record.propertyImage}
          className="rounded"
        />
      ),
    },
    {
      title: 'Property Name',
      dataIndex: 'PropertyName',
      width: '14%',
      ...getColumnSearchProps('PropertyName'),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      width: '14%',
      ...getColumnSearchProps('address'),
    },
    {
      title: 'No of Beds',
      dataIndex: 'noOfBeds',
      width: '14%',
      sorter: true,
    },
    {
      title: 'Max Guests',
      dataIndex: 'maxGuests',
      width: '14%',
      sorter: true,
    },
    {
      title: 'Docs',
      dataIndex: 'numberOfDocs',
      width: '14%',
      render: (_, record) => (
        <PropertiesDoc
          totalCount={record.docs.length}
          onClickAddAssignDocs={handleClickAddAssign}
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: '14%',
      render: (_, record) => (
        <Button
          disabled={editPropertyStatus === 'pending'}
          type="text"
          className="font-bold underline cursor-pointer text-primary"
          onClick={() => handleClickPublishBack(record.key)}
        >
          Publish back
        </Button>
      ),
    },
  ];

  return (
    <>
      <div className="table-container">
        <Table
          columns={columns}
          dataSource={tableData}
          showSorterTooltip={{ target: 'sorter-icon' }}
          pagination={false}
          scroll={{ y: 'calc(100vh - 340px)' }}
          onScroll={handleScroll}
          loading={isLoading}
          onChange={handleTableChange}
          id="archive-table"
        />
      </div>
      <AddOrAssignFormModal
        open={showAddAssignModal}
        handleCancel={handleCancelAddAssign}
        handleOk={handleCancelAddAssign}
      />
    </>
  );
};

export default PropertiesArchiveTable;
