import { Button, Popover, Space, Table } from 'antd';
import { type FC, useEffect, useState } from 'react';

import type { TableColumnsType } from 'antd';
import classNames from 'classnames';
import { DEFAULT_PAGE_LIMIT } from 'constants/pageLimit';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import toast from 'react-hot-toast';
import {
  closeDocumentDeleteDocumentModal,
  closeDocumentEditDocumentDrawer,
  deleteDocument,
  fetchDocuments,
  openDocumentDeleteDocumentModal,
  openDocumentEditDocumentDrawer,
} from 'stores/slice/documentsSlice';
import type { PropertyDocument } from 'types/getAllDocuments';
import ConfirmationModal from 'views/components/modals/ConfirmationModal';
import DocumentLinkEdit from './DocumetLinkEdit';

interface DocumentLinkDataType {
  documentName: string;
  document_id: number;
  documentType: string;
  created_at: string;
  propertyDocuments: PropertyDocument[];
}

const PropertyCell = ({ data }: { data: PropertyDocument[] }) => {
  const [showPopOver, setShowPopOver] = useState(false);

  const firstPropertyName = data[0]?.property.manualProperty.propertyName;

  const remainingProperties = data.length >= 2 ? data.slice(1) : [];

  const remainingCount = remainingProperties.length;

  const showRemainingProperties = remainingCount > 0;

  const handleClickButton = () => {
    setShowPopOver(!showPopOver);
  };

  const content = (
    <div className="w-64 p-1 overflow-auto rounded max-h-60">
      {remainingProperties?.map((item, index) => {
        return (
          <div
            className={classNames('flex items-center justify-start py-2', {
              'border-b-2': index !== remainingProperties.length - 1,
            })}
            key={item.id}
          >
            <div className="flex items-center gap-2">
              <div>{item.property.manualProperty.propertyName} </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="flex items-center justify-center gap-1">
      <div>{firstPropertyName} </div>
      {remainingCount !== 0 ? (
        <div>
          <Popover
            content={content}
            title={false}
            trigger="click"
            arrow={false}
            open={showPopOver}
            onOpenChange={showRemainingProperties ? setShowPopOver : undefined}
          >
            <Button
              size="small"
              className="font-bold bg-lightBlue"
              onClick={handleClickButton}
            >
              +{remainingCount}
            </Button>
          </Popover>
        </div>
      ) : null}
    </div>
  );
};

const DocumentLinkTable: FC = () => {
  const dispatch = useAppDispatch();
  const [sorter, setSorter] = useState({
    order: 'ASC',
    field: null,
  });

  const { documents, loading, lastDocumentModified } = useAppSelector(
    (state) => state.fetchDocuments,
  );
  const openEditDrawer = useAppSelector(
    (state) => state.fetchDocuments.edit.openDrawer,
  );

  const openDeleteDrawer = useAppSelector(
    (state) => state.fetchDocuments.delete.openModal,
  );

  const deleteSelectedDocument = useAppSelector(
    (state) => state.fetchDocuments.delete.selectedDocumentId,
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: lastDocumentModified will be updated when the user creates a new document or edits an existing document
  useEffect(() => {
    // Explicitly define the type for sortByOrder
    const sortByOrder: Record<string, 'ASC' | 'DESC'> = {
      'document.document_title': 'ASC', // Default order for document_title
      'manualProperty.propertyName': 'ASC', // Default order for propertyName
    };

    if (sorter?.field) {
      const fieldMap: Record<string, string> = {
        documentName: 'document.document_title',
        property: 'manualProperty.propertyName',
      };

      const sortField = fieldMap[sorter.field] || 'document.document_title';
      // Safely assign ASC/DESC based on the sort order
      sortByOrder[sortField] = sorter.order === 'ascend' ? 'ASC' : 'DESC';
    }

    const sortObject = {
      pageNumber: 1,
      pageLimit: DEFAULT_PAGE_LIMIT,
      sortByOrder, // Pass the sortByOrder object here
    };

    dispatch(fetchDocuments(sortObject));
  }, [dispatch, lastDocumentModified, sorter]);

  const handleClickEdit = (docId: number) => {
    dispatch(openDocumentEditDocumentDrawer(docId));
  };

  const handleDelete = () => {
    if (!deleteSelectedDocument) {
      toast.error('Please select a document to delete');
      return;
    }
    dispatch(deleteDocument(deleteSelectedDocument));
  };

  const onCloseDrawer = () => {
    dispatch(closeDocumentEditDocumentDrawer());
  };

  const onCloseDeleteDrawer = () => {
    dispatch(closeDocumentDeleteDocumentModal());
  };

  const handleClickDelete = (id: number) => {
    dispatch(openDocumentDeleteDocumentModal(id));
  };

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const handleTableChange = (_: any, __: any, sorting: any) => {
    setSorter({
      order: sorting?.order,
      field: sorting?.field,
    });
  };

  const columns: TableColumnsType<DocumentLinkDataType> = [
    {
      title: 'Document Name',
      dataIndex: 'documentName',
      key: 'documentName',
      sorter: true,
      width: '20%',
    },
    {
      title: 'Type',
      dataIndex: 'documentType',
      render: (_, data) => <p>{data?.documentType}</p>,
      width: '20%',
    },
    {
      title: 'Property',
      dataIndex: 'property',
      sorter: true,
      align: 'left',
      render: (_, data) => (
        <div className="text-right flex justify-start">
          <PropertyCell data={data?.propertyDocuments} />
        </div>
      ),
      width: '20%',
    },
    {
      title: 'Created',
      dataIndex: 'created_at',
      width: '20%',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, doc) => (
        <Space size="middle">
          <Button
            icon={<Trash className="fill-primary" />}
            className="bg-lightBlue"
            size="small"
            shape="circle"
            onClick={() => handleClickDelete(doc?.document_id)}
          />
          <Button
            onClick={() => {
              handleClickEdit(doc?.document_id);
            }}
            className="bg-lightBlue"
            icon={<PencilSquare className="fill-primary" />}
            size="small"
            shape="circle"
          />
        </Space>
      ),
      width: '20%',
    },
  ];

  const dataSource: DocumentLinkDataType[] = documents.map((document) => {
    return {
      key: document.id,
      document_id: document.id,
      documentName: document.document_title,
      documentType: document.documentType.name,
      created_at: dayjs(document.created_at).format('DD.MM.YYYY'),
      propertyDocuments: document.propertyDocuments,
    };
  });

  return (
    <>
      <div className="table-container">
        <Table
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          scroll={{ y: 'calc(100vh - 340px)' }}
          showSorterTooltip={{ target: 'sorter-icon' }}
          pagination={false}
          onChange={handleTableChange}
        />
      </div>
      {openEditDrawer && (
        <DocumentLinkEdit open={openEditDrawer} onCloseDrawer={onCloseDrawer} />
      )}

      {openDeleteDrawer && (
        <ConfirmationModal
          open={openDeleteDrawer}
          handleCancel={onCloseDeleteDrawer}
          title="Delete Document"
          content="Are you sure you want to delete this document?"
          handleContinue={handleDelete}
        />
      )}
    </>
  );
};

export default DocumentLinkTable;
