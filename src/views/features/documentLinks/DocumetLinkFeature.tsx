import { Button } from 'antd';
import { DEFAULT_PAGE_LIMIT } from 'constants/pageLimit';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { type FC, useEffect } from 'react';
import { Plus } from 'react-bootstrap-icons';
import {
  closeDocumentCreateDocumentModal,
  closeDocumentCreateDocumentSuccessModal,
  getDocumentTypes,
  getProperties,
  openDocumentCreateDocumentModal,
  resetCreateDocumentState,
} from 'stores/slice/documentsSlice';
import SuccessModal from 'views/components/modals/SuccessModal';
import DocumentLinkTable from './DocumetLinkTable';
import AddDocumentLinkFormModal from './addDocumentLink/AddDocumetLinkFormModal';

type HeaderProps = {
  onAddDocumentLink: () => void;
};

const Header: FC<HeaderProps> = ({ onAddDocumentLink }) => {
  return (
    <div className="flex items-center justify-end">
      <div className="flex items-center gap-3">
        <Button
          type="primary"
          size="large"
          icon={<Plus className="w-5 h-5 fill-white" />}
          className="py-5 text-sm font-bold rounded"
          onClick={onAddDocumentLink}
        >
          Add Document
        </Button>
      </div>
    </div>
  );
};

const DocumentLinkFeature = () => {
  const dispatch = useAppDispatch();

  const createDocumentOpen = useAppSelector(
    (state) => state.fetchDocuments.create.openModal,
  );
  const createDocumentSuccess = useAppSelector(
    (state) => state.fetchDocuments.create.openSuccessModal,
  );

  const handleClickAddDocumentLink = () => {
    dispatch(openDocumentCreateDocumentModal());
  };

  const handleCloseAddDocumentLinkModal = () => {
    dispatch(closeDocumentCreateDocumentModal());
    dispatch(resetCreateDocumentState());
  };

  const handleCloseSuccessModal = () => {
    dispatch(closeDocumentCreateDocumentSuccessModal());
  };

  useEffect(() => {
    const getAllAssignedProperties = (searchValue: '') => {
      dispatch(
        getProperties({
          pageNumber: 1,
          pageLimit: DEFAULT_PAGE_LIMIT,
          searchField: {
            'manualProperty.propertyName': searchValue,
          },
        }),
      );
    };

    getAllAssignedProperties('');
  }, [dispatch]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: run this effect only once;
  useEffect(() => {
    dispatch(getDocumentTypes());
  }, []);

  return (
    <div>
      <Header onAddDocumentLink={handleClickAddDocumentLink} />
      <div className="py-3" />
      <DocumentLinkTable />
      {createDocumentOpen ? (
        <AddDocumentLinkFormModal
          open={createDocumentOpen}
          handleCancel={handleCloseAddDocumentLinkModal}
          handleOk={handleCloseAddDocumentLinkModal}
        />
      ) : null}

      <SuccessModal
        open={createDocumentSuccess}
        handleCancel={handleCloseSuccessModal}
        handleOk={handleCloseSuccessModal}
        handleContinue={handleCloseSuccessModal}
        title={'Document Added Successfully'}
      />
    </div>
  );
};

export default DocumentLinkFeature;
