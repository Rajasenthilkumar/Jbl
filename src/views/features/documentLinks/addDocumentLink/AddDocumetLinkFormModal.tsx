import type { FC } from 'react';
import { FileEarmarkPdfFill } from 'react-bootstrap-icons';
import FormModal from 'views/components/modals/FormModal';
import AddDocument from './AddDocument';

type Props = {
  open: boolean;
  handleOk: () => void;
  handleCancel: () => void;
};

const AddDocumentLinkFormModal: FC<Props> = ({
  open,
  handleCancel,
  handleOk,
}) => {
  return (
    <FormModal
      open={open}
      handleOk={handleOk}
      handleCancel={handleCancel}
      headerIcon={<FileEarmarkPdfFill />}
      title="Add Document"
      subTitle=""
    >
      <AddDocument />
    </FormModal>
  );
};

export default AddDocumentLinkFormModal;
