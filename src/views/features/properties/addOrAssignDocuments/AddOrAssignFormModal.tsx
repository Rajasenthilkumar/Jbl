import { Button } from 'antd';
import { type FC, useState } from 'react';
import { FaFilePdf } from 'react-icons/fa';
import FormModal from 'views/components/modals/FormModal';
import AddDocuments from './addDocuments/AddDocuments';
import AssignDocuments from './assignDocuments/AssignDocuments';

type FormType = 'AddDocuments' | 'AssignDocuments';

type Props = {
  open: boolean;
  handleOk: () => void;
  handleCancel: () => void;
};

const AddOrAssignFormModal: FC<Props> = ({ open, handleCancel, handleOk }) => {
  return (
    <FormModal
      open={open}
      handleOk={handleOk}
      handleCancel={handleCancel}
      headerIcon={<FaFilePdf />}
      title="Add/Assign Document"
      subTitle=""
    >
      <FormBody onUploadSuccess={handleOk} />
    </FormModal>
  );
};

type FormBodyProps = {
  onUploadSuccess: () => void;
};

const FormBody: FC<FormBodyProps> = ({ onUploadSuccess }) => {
  const [formType, setFormType] = useState<FormType>('AddDocuments');

  const handleAddDocuments = () => {
    setFormType('AddDocuments');
  };

  const handleAssignDocuments = () => {
    setFormType('AssignDocuments');
  };
  return (
    <div>
      <div className="grid grid-cols-2">
        <Button
          type={formType === 'AddDocuments' ? 'primary' : 'default'}
          className="w-full py-5 font-medium rounded-none rounded-l-2xl"
          onClick={handleAddDocuments}
        >
          Add
        </Button>
        <Button
          type={formType === 'AssignDocuments' ? 'primary' : 'default'}
          className="w-full py-5 font-medium rounded-none rounded-r-2xl"
          onClick={handleAssignDocuments}
        >
          Assign
        </Button>
      </div>
      {formType === 'AddDocuments' && (
        <AddDocuments onUploadSuccess={onUploadSuccess} />
      )}
      {formType === 'AssignDocuments' && <AssignDocuments />}
    </div>
  );
};

export default AddOrAssignFormModal;
