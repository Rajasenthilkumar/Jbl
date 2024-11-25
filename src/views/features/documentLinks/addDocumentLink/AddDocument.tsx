import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Input, Switch } from 'antd';
import { propertyTypes } from 'constants/SelectOptions';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { Link45deg } from 'react-bootstrap-icons';
import { Controller, useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import toast from 'react-hot-toast';
import { createDocument } from 'stores/slice/documentsSlice';
import FileUpload from 'views/components/FileUpload';
import {
  FormContent,
  FormFooter,
  FromContainer,
} from 'views/components/FormComponents';
import CustomMultiSelect, {
  type CustomSelectOnChangeType,
} from 'views/components/select/CustomMultiSelect';
import CustomRadioSelect from 'views/components/select/CustomRadioSelect';
import {
  type AddDocumentApiSchema,
  type AddDocumentEntitySchema,
  addDocumentSchemaSchema,
} from './schema';

const AddDocument = () => {
  const dispatch = useAppDispatch();

  const { propertiesData } = useAppSelector((state) => state.fetchDocuments);
  const { control, handleSubmit, setValue, setError } =
    useForm<AddDocumentEntitySchema>({
      mode: 'onChange',
      defaultValues: {
        is_visible: false,
      },
      resolver: zodResolver(addDocumentSchemaSchema),
    });

  const isSubmitting = useAppSelector(
    (state) => state.fetchDocuments.create.status === 'pending',
  );

  const handleChange = (value: CustomSelectOnChangeType) => {
    if (typeof value === 'number') {
      setValue('document_type_id', value);
    }
  };

  const handleChangeProperty = (value: CustomSelectOnChangeType) => {
    if (Array.isArray(value)) {
      const newValue = value.map((item) => Number(item));
      setValue('property_id', newValue);
    }
  };

  const onSave = async (data: AddDocumentEntitySchema) => {
    const eitherDocumentOrUrlError = !data.document_link && !data.document_url;
    const onlyProvideAnyOneDocumentOrUrlError =
      data.document_link && data.document_url;

    if (!data.document_title) {
      toast.error('Document Title is required.');
      return;
    }

    if (!data.property_id || data.property_id.length === 0) {
      toast.error('Assigned Property is required.');
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

    const requestData: AddDocumentApiSchema = {
      ...data,
      is_visible: data.is_visible ?? false,
      is_terms_accepted: true,
    };

    // Remove document_link if document_url exists
    if (requestData.document_url) {
      // biome-ignore lint/performance/noDelete: <explanation>
      delete requestData.document_link;
    } else if (requestData.document_link) {
      // biome-ignore lint/performance/noDelete: <explanation>
      delete requestData.document_url;
    }

    dispatch(createDocument(requestData));
  };

  return (
    <>
      <FromContainer>
        <Form
          onFinish={handleSubmit((data) => {
            onSave(data);
          })}
        >
          <FormContent>
            <div className="py-4">
              <FormItem
                control={control}
                name="document_title"
                className="w-full"
              >
                <Input
                  placeholder="Document Title"
                  size="large"
                  variant="filled"
                  className="py-3"
                />
              </FormItem>
              <FormItem
                control={control}
                name="document_type_id"
                className="w-full"
              >
                <Controller
                  control={control}
                  name="document_type_id"
                  render={({ field: { onChange } }) => (
                    <CustomRadioSelect
                      placeholder="Document Type"
                      size="large"
                      options={propertyTypes}
                      onChange={(value) => {
                        onChange(value);
                        handleChange(value);
                      }}
                    />
                  )}
                />
              </FormItem>

              <FormItem control={control} name="property_id" className="w-full">
                <Controller
                  control={control}
                  name="property_id"
                  // biome-ignore lint/correctness/noUnusedVariables: <explanation>
                  render={({ field }) => (
                    <CustomMultiSelect
                      placeholder="Assigned Property"
                      size="large"
                      options={propertiesData}
                      searchPlaceholder="Search for Properties"
                      onChange={(value) => {
                        handleChangeProperty(value);
                      }}
                    />
                  )}
                />
              </FormItem>

              <FormItem control={control} name="is_visible" className="w-full">
                <span className="mr-5 text-base font-bold">
                  Visible to Guests ?
                </span>
                <Switch checkedChildren="On" unCheckedChildren="Off" />
              </FormItem>

              <FormItem
                control={control}
                name="document_url"
                className="w-full"
              >
                <FileUpload
                  acceptedFileTypes=".docs, .pdf, .docx"
                  draggerText="Document (Max size 5MB)"
                  maxSize={10485760}
                  setValue={(value) => {
                    setValue('document_url', value);
                  }}
                  setError={(error) =>
                    setError('document_url', {
                      message: error,
                    })
                  }
                  iconType="file"
                />
              </FormItem>

              <p className="mb-6 text-center">Or</p>
              <FormItem
                control={control}
                name="document_link"
                className="w-full"
              >
                <Input
                  placeholder="Paste link here"
                  size="large"
                  variant="filled"
                  className="py-3 text-base font-semibold rounded-none bg-lightBlue text-Grey placeholder:text-base placeholder:font-semibold placeholder:text-Grey focus:bg-lightBlue focus-within:bg-lightBlue focus:border-lightBlue focus-within:border-lightBlue hover:bg-lightBlue"
                  prefix={<Link45deg className="mr-4 text-2xl text-primary" />}
                />
              </FormItem>
            </div>
          </FormContent>
          <FormFooter>
            <Button
              type="primary"
              className="font-medium"
              htmlType="submit"
              loading={isSubmitting}
            >
              Save
            </Button>
          </FormFooter>
        </Form>
      </FromContainer>
    </>
  );
};

export default AddDocument;
