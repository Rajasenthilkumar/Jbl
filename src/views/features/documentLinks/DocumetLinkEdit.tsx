import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Divider,
  Drawer,
  Form,
  Input,
  Select,
  Space,
  Switch,
} from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { type FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import toast from 'react-hot-toast';
import { editDocumentById, getDocumentById } from 'stores/slice/documentsSlice';
import { extractFileName, maxSize } from 'utilities/utils';
import AppLabel from 'views/components/AppLabel';
import FileUpload from 'views/components/FileUpload';
import SuspenseLoading from 'views/components/SuspenseLoading';
import CustomMultiSelect, {
  type CustomSelectOnChangeType,
} from 'views/components/select/CustomMultiSelect';
import {
  type EditDocumentSchemaType,
  editDocumentSchema,
} from './editDocumentSchema';
type Props = {
  onCloseDrawer: () => void;
  open: boolean;
};

const DocumentsEdit: FC<Props> = ({ onCloseDrawer, open }) => {
  const dispatch = useAppDispatch();

  const { selectedDocumentLoading } = useAppSelector(
    (state) => state.fetchDocuments,
  );

  const selectedDocumentId = useAppSelector(
    (state) => state.fetchDocuments.edit.selectedDocumentId,
  );

  useEffect(() => {
    if (selectedDocumentId) {
      dispatch(getDocumentById(selectedDocumentId));
    }
  }, [selectedDocumentId, dispatch]);

  return (
    <Drawer
      title="Edit Document"
      onClose={onCloseDrawer}
      open={open}
      width={423}
      style={{ padding: '0px' }}
    >
      {selectedDocumentLoading ? <SuspenseLoading type="secondary" /> : null}

      {!selectedDocumentLoading && selectedDocumentId ? (
        <EditForm onCloseDrawer={onCloseDrawer} docId={selectedDocumentId} />
      ) : null}
    </Drawer>
  );
};

type EditFormProps = {
  onCloseDrawer: () => void;
  docId: number;
};

const EditForm: FC<EditFormProps> = ({ onCloseDrawer, docId }) => {
  const dispatch = useAppDispatch();

  const { selectedDocument, documentType, documentTypeStatus, propertiesData } =
    useAppSelector((state) => state.fetchDocuments);

  const status = useAppSelector(
    (state) => state.properties.editProperty.status,
  );

  const handleChange = (value: number) => {
    setValue('document_type_id', value);
  };

  const { control, handleSubmit, setValue, setError, getValues, watch } =
    useForm<EditDocumentSchemaType>({
      resolver: zodResolver(editDocumentSchema),
      mode: 'onChange',
      defaultValues: {
        document_title: selectedDocument.document_title,
        document_link: selectedDocument?.document_link || '',
        document_url: selectedDocument?.document_url || '',
        document_type_id: selectedDocument.document_type_id,
        property_id: [
          ...new Set(
            selectedDocument.propertyDocuments.map(
              (doc) => doc.property.manualProperty.id,
            ),
          ),
        ],
        // there is no need for this value in the UI but it is required in the API
        is_terms_accepted: true,
        is_visible: selectedDocument.is_visible,
      },
    });

  const document_link = watch('document_link');
  const document_url = watch('document_url');
  const document_title = watch('document_title');

  const eitherDocumentTitleError = !document_title;

  const eitherDocumentOrUrlError = !document_link && !document_url;
  const onlyProvideAnyOneDocumentOrUrlError = document_link && document_url;
  const handleSaveChanges = (data: EditDocumentSchemaType) => {
    const updatedData = {
      ...data,
      document_link: data.document_link || '',
      document_url: data.document_url || '',
    };

    if (eitherDocumentTitleError) {
      toast.error('Document name should not be empty');
      return;
    }

    if (data.property_id.length === 0) {
      toast.error('Document should not be empty');
      return;
    }
    if (eitherDocumentOrUrlError) {
      toast.error('Either document or url must be provided');
      return;
    }

    if (onlyProvideAnyOneDocumentOrUrlError) {
      toast.error('Only provide either document or url');
      return;
    }

    // biome-ignore lint/performance/noDelete: API expects either document_link or document_url
    if (data.document_link) delete data.document_url;
    // biome-ignore lint/performance/noDelete: API expects either document_link or document_url
    if (data.document_url) delete data.document_link;

    dispatch(
      editDocumentById({
        id: docId,
        data: updatedData,
      }),
    );
  };

  const handleChangeProperty = (value: CustomSelectOnChangeType) => {
    if (Array.isArray(value)) {
      const newValue = value.map((item) => Number(item));
      setValue('property_id', newValue);
    }
  };

  const initialValues = {
    property_id: getValues().property_id || [],
  };

  const handleCancel = () => {
    onCloseDrawer();
  };

  return (
    <Form
      initialValues={initialValues}
      onFinish={handleSubmit(handleSaveChanges)}
    >
      <div className="mb-4">
        <AppLabel label="DOCUMENT NAME">
          <FormItem control={control} name="document_title">
            <Input size="middle" variant="filled" />
          </FormItem>
        </AppLabel>
      </div>

      <div>
        <AppLabel label="DOCUMENT TYPE">
          <FormItem control={control} name="document_type_id">
            <div className="edit-drawer-select-box">
              <Select
                className="flex items-center w-full"
                variant="filled"
                onChange={handleChange}
                loading={documentTypeStatus}
                defaultValue={getValues().document_type_id}
              >
                {documentType.map((item) => (
                  <Select.Option key={item.value} value={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </FormItem>
        </AppLabel>
      </div>
      <div>
        <AppLabel label="ASSIGNED PROPERTIES">
          <FormItem control={control} name="property_id" className="w-full">
            <Controller
              control={control}
              name="property_id"
              render={({ field }) => (
                <CustomMultiSelect
                  {...field}
                  placeholder="Assigned Property"
                  size="large"
                  options={propertiesData}
                  searchPlaceholder="Search for Properties"
                  defaultValue={getValues().property_id}
                  onChange={(value) => {
                    field.onChange(value);
                    handleChangeProperty(value);
                  }}
                />
              )}
            />
          </FormItem>
        </AppLabel>
      </div>
      <FormItem control={control} name="is_visible" className="w-full">
        <span className="mr-5 text-base font-bold">Visible to Guests ?</span>
        <Switch checkedChildren="On" unCheckedChildren="Off" />
      </FormItem>

      <div>
        <AppLabel label="UPLOADED DOCUMENTS">
          <FormItem control={control} name="document_url">
            <Controller
              control={control}
              name="document_url"
              render={({ field: { value } }) => (
                <>
                  <FileUpload
                    type="button"
                    fileName={extractFileName(value || '')}
                    fileLocation={value}
                    setValue={(value) => setValue('document_url', value)}
                    acceptedFileTypes={'.pdf,'}
                    draggerText={'Upload property image'}
                    maxSize={maxSize}
                    setError={(error) =>
                      setError('document_url', {
                        message: error,
                      })
                    }
                  />
                </>
              )}
            />
          </FormItem>
          <p className="pb-5 text-center">Or</p>

          <FormItem control={control} name="document_link">
            <Input size="middle" variant="filled" placeholder="Paste link" />
          </FormItem>
        </AppLabel>
      </div>

      <div className="absolute bottom-0 z-20 w-full pb-2 bg-white">
        <Divider className="m-0 mb-4" />
        <Space
          direction="horizontal"
          size={10}
          className="justify-end w-full pr-8"
        >
          <Button
            disabled={status === 'pending'}
            size="large"
            className="font-bold bg-lightBlue"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="font-bold"
            loading={status === 'pending'}
          >
            Save changes
          </Button>
        </Space>
      </div>
    </Form>
  );
};

export default DocumentsEdit;
