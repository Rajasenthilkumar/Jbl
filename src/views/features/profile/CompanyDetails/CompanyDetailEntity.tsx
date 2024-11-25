import { DeleteOutlined } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Input, Select } from 'antd';
import { countries } from 'constants/countries';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { type FC, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import toast from 'react-hot-toast';
import { fetchHostInfo } from 'stores/slice/authSlice';
import { extractFileName, maxSize } from 'utilities/utils';
import FileUpload from 'views/components/FileUpload';
import { FormContent, FromContainer } from 'views/components/FormComponents';
import LabelComponent from 'views/components/label';
import {
  type EditCompanySchema,
  editCompanySchema,
} from '../../profile/schema';
import { editCompanyDetails } from '../GuestCardSlice';

type Props = {
  titleValue: string;
  idNumber: string;
  countryOfIssue: string;
  residentialAddress: string;
  addressProof: string;
  companyValue: string;
  countrytitleValue: string;
  vatDetailValue: string;
  addresstextValue: string;
  documenttitleValue: string;
  profileTypeValue: string;
  handleCancel: () => void;
  handleOk: () => void;
};

const CompanyDetailEntity: FC<Props> = ({
  titleValue,
  idNumber,
  countryOfIssue,
  residentialAddress,
  addressProof,
  companyValue,
  countrytitleValue,
  vatDetailValue,
  documenttitleValue,
  profileTypeValue,
  addresstextValue,
  handleCancel,
  handleOk,
}) => {
  const dispatch = useAppDispatch();
  const [documentPath, setDocumentPath] = useState<string | undefined>(
    undefined,
  );
  const [companyDetails, setCompanyDetails] = useState(false);
  const userId = useAppSelector((state) => state.auth.userId);

  const getStringValue = (value: string | string[] | undefined) => {
    return Array.isArray(value) ? value[0] : value;
  };
  const intialJuristic = {
    profile: {
      company: {
        company_name: getStringValue(titleValue),
        business_registration_number: getStringValue(companyValue),
        country_of_registration: getStringValue(countrytitleValue),
        vat_number: getStringValue(vatDetailValue),
        document_path: getStringValue(documenttitleValue),
        company_address: getStringValue(addresstextValue),
      },
    },
  };

  const intialIndividual = {
    profile: {
      company: {
        id_number: getStringValue(idNumber),
        country_of_issue: getStringValue(countryOfIssue),
        residential_address: getStringValue(residentialAddress),
        address_proof: getStringValue(addressProof),
      },
    },
  };

  const countriesOptions = useMemo(() => {
    return countries.map((country) => {
      return {
        title: country.name,
        value: country.name,
      };
    });
  }, []);

  const { control, setValue, handleSubmit, setError } =
    useForm<EditCompanySchema>({
      mode: 'onChange',
      resolver: zodResolver(editCompanySchema),
      defaultValues:
        profileTypeValue === 'Juristic' ? intialJuristic : intialIndividual,
    });

  const handleInputChange =
    (field: keyof EditCompanySchema['profile']['company']) =>
    (e: React.ChangeEvent<HTMLInputElement> | string | number) => {
      let value: string | number | undefined;

      if (
        field === 'country_of_registration' &&
        (typeof e === 'string' || typeof e === 'number')
      ) {
        value = e;
      } else if (typeof e === 'object' && 'target' in e) {
        if (
          field === 'business_registration_number' ||
          field === 'vat_number'
        ) {
          value = e.target.value
            ? Number.parseInt(e.target.value, 10)
            : undefined;
        } else {
          value = e.target.value ? Number(e.target.value) : undefined;
        }
      }

      setValue(
        `profile.company.${field}`,
        value !== undefined ? String(value) : undefined,
        { shouldValidate: true },
      );
    };

  const onSave = (data: EditCompanySchema) => {
    const documentError =
      profileTypeValue === 'Juristic'
        ? !data.profile.company.document_path
        : !data.profile.company.address_proof;
    if (documentError) {
      toast.error('Document must be provided');
      return;
    }

    const requestData: EditCompanySchema = { ...data };

    dispatch(
      editCompanyDetails({
        profileData: requestData,
        profileType: profileTypeValue,
      }),
    );

    toast.success('Company details updated');

    setTimeout(() => {
      if (userId) {
        dispatch(fetchHostInfo(userId));
      }
    }, 100);

    handleOk();
  };

  useEffect(() => {
    setDocumentPath(
      profileTypeValue === 'Juristic' ? documenttitleValue : addressProof,
    );
  }, [profileTypeValue, documenttitleValue, addressProof]);

  return (
    <Form onFinish={handleSubmit(onSave)}>
      <FromContainer>
        <FormContent>
          <div className="drawerContainer flex flex-col gap-1 edit-info-modal company-detail-modal">
            <div className="contentArea editinfo-form-items">
              <div className="editinfo creditcardinfo">
                {/* Conditional Rendering Based on Profile Type */}
                {profileTypeValue === 'Juristic' ? (
                  <>
                    {/* Company Name */}
                    <FormItem
                      control={control}
                      name="profile.company.company_name"
                      className="w-full"
                    >
                      <LabelComponent
                        labeltext={'COMPANY NAME'}
                        className={''}
                        inputId={''}
                      />
                      <Input
                        placeholder="COMPANY NAME"
                        size="large"
                        className="py-3 fullname-info"
                        onChange={handleInputChange('company_name')}
                      />
                    </FormItem>

                    {/* Company Address */}
                    <FormItem
                      control={control}
                      name="profile.company.company_address"
                      className="w-full"
                    >
                      <LabelComponent
                        labeltext={'COMPANY ADDRESS'}
                        className={''}
                        inputId={''}
                      />
                      <Input
                        placeholder="COMPANY ADDRESS"
                        size="large"
                        className="py-3 fullname-info"
                        onChange={handleInputChange('company_address')}
                      />
                    </FormItem>

                    {/* Business Registration Number */}
                    <FormItem
                      control={control}
                      name="profile.company.business_registration_number"
                      className="w-full"
                    >
                      <LabelComponent
                        labeltext={'BUSINESS REGISTRATION NUMBER'}
                        className={''}
                        inputId={''}
                      />
                      <Input
                        placeholder="BUSINESS REGISTRATION NUMBER"
                        size="large"
                        className="py-3 fullname-info"
                        onChange={handleInputChange(
                          'business_registration_number',
                        )}
                      />
                    </FormItem>

                    {/* Country of Registration */}
                    <FormItem
                      control={control}
                      name="profile.company.country_of_registration"
                      className="w-full"
                    >
                      <LabelComponent
                        labeltext={'COUNTRY OF REGISTRATION'}
                        className={''}
                        inputId={''}
                      />
                      <Select
                        placeholder="Country of Registration"
                        size="large"
                        variant="filled"
                        filterOption={true}
                        showSearch
                        optionFilterProp="title"
                        options={countriesOptions}
                        onChange={handleInputChange('country_of_registration')}
                      />
                    </FormItem>

                    {/* VAT Number */}
                    <FormItem
                      control={control}
                      name="profile.company.vat_number"
                      className="w-full"
                    >
                      <LabelComponent
                        labeltext={'VAT NUMBER'}
                        className={''}
                        inputId={''}
                      />
                      <Input
                        placeholder="VAT NUMBER"
                        size="large"
                        className="py-3 fullname-info"
                        onChange={handleInputChange('vat_number')}
                      />
                    </FormItem>

                    {/* Business Registration Document */}
                    <FormItem
                      control={control}
                      name="profile.company.document_path"
                      className="w-full"
                    >
                      <LabelComponent
                        labeltext={'BUSINESS REGISTRATION DOCUMENT'}
                        className={''}
                        inputId={''}
                      />
                      <Input
                        addonAfter={
                          <DeleteOutlined
                            onClick={() => setCompanyDetails(true)}
                          />
                        }
                        placeholder="BUSINESS REGISTRATION DOCUMENT"
                        size="large"
                        className="py-3 fullname-info"
                        onChange={handleInputChange('document_path')}
                        value={documentPath}
                      />
                      {companyDetails && (
                        <FileUpload
                          type="button"
                          fileName={extractFileName(documentPath || '')}
                          fileLocation={documentPath}
                          setValue={(filePath: string | undefined) => {
                            setDocumentPath(filePath);
                            setValue('profile.company.document_path', filePath);
                          }}
                          acceptedFileTypes={'.jpg, .jpeg, .png, .pdf, .txt'}
                          draggerText={'Upload Document'}
                          maxSize={maxSize}
                          setError={(error) =>
                            setError('profile.company.document_path', {
                              message: error,
                            })
                          }
                        />
                      )}
                    </FormItem>
                  </>
                ) : (
                  <>
                    {/* ID Number */}
                    <FormItem
                      control={control}
                      name="profile.company.id_number"
                      className="w-full"
                    >
                      <LabelComponent
                        labeltext={'ID NUMBER'}
                        className={''}
                        inputId={''}
                      />
                      <Input
                        placeholder="ID NUMBER"
                        size="large"
                        className="py-3 fullname-info"
                        onChange={handleInputChange('id_number')}
                      />
                    </FormItem>

                    {/* Country of Issue */}
                    <FormItem
                      control={control}
                      name="profile.company.country_of_issue"
                      className="w-full"
                    >
                      <LabelComponent
                        labeltext={'COUNTRY OF ISSUE'}
                        className={''}
                        inputId={''}
                      />
                      <Select
                        placeholder="Country of issue"
                        size="large"
                        variant="filled"
                        filterOption={true}
                        showSearch
                        optionFilterProp="title"
                        options={countriesOptions}
                        onChange={handleInputChange('country_of_issue')}
                      />
                    </FormItem>

                    {/* Residential Address */}
                    <FormItem
                      control={control}
                      name="profile.company.residential_address"
                      className="w-full"
                    >
                      <LabelComponent
                        labeltext={'RESIDENTIAL ADDRESS'}
                        className={''}
                        inputId={''}
                      />
                      <Input
                        placeholder="RESIDENTIAL ADDRESS"
                        size="large"
                        className="py-3 fullname-info"
                        onChange={handleInputChange('residential_address')}
                      />
                    </FormItem>

                    {/* ID Proof Upload */}
                    <FormItem
                      control={control}
                      name="profile.company.address_proof"
                      className="w-full"
                    >
                      <LabelComponent
                        labeltext={'ADDRESS PROOF'}
                        className={''}
                        inputId={''}
                      />
                      <Input
                        addonAfter={
                          <DeleteOutlined
                            onClick={() => setCompanyDetails(true)}
                          />
                        }
                        placeholder="ID PROOF"
                        size="large"
                        className="py-3 fullname-info"
                        onChange={handleInputChange('address_proof')}
                        value={documentPath}
                      />
                      {companyDetails && (
                        <FileUpload
                          type="button"
                          fileName={extractFileName(documentPath || '')}
                          fileLocation={documentPath}
                          setValue={(filePath: string | undefined) => {
                            setDocumentPath(filePath);
                            setValue('profile.company.document_path', filePath);
                          }}
                          acceptedFileTypes={'.jpg, .jpeg, .png, .pdf, .txt'}
                          draggerText={'Upload Document'}
                          maxSize={maxSize}
                          setError={(error) =>
                            setError('profile.company.document_path', {
                              message: error,
                            })
                          }
                        />
                      )}
                    </FormItem>
                  </>
                )}
              </div>
            </div>

            <div className="footerArea">
              <div className="actions flex justify-end gap-2">
                <Button
                  onClick={handleCancel}
                  className="cancel-btn"
                  size="large"
                  htmlType="button"
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  className="save-btn"
                  size="large"
                  htmlType="submit"
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </FormContent>
      </FromContainer>
    </Form>
  );
};

export default CompanyDetailEntity;
