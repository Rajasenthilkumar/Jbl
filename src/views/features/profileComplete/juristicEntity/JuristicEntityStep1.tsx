import { Button, Input, Select } from 'antd';
import { type FC, useMemo, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import {
  FormContent,
  FormFooter,
  FromContainer,
} from 'views/components/FormComponents';
import type { JuristicEntitySchema } from './JuristicEntitySchema';
type Props = {
  setStep: (value: number) => void;
};

import TextArea from 'antd/es/input/TextArea';
import { countries } from 'constants/countries';

import { maxSize } from 'utilities/utils';
import FileUpload from 'views/components/FileUpload';
import { JuristicEntitySteps } from './JuristicEntity';

const JuristicEntityStep1: FC<Props> = ({ setStep }) => {
  const { control, trigger, setValue, setError } =
    useFormContext<JuristicEntitySchema>();
  const [_, setRevalidateState] = useState(false);

  const onNext = async () => {
    // Triggers only the validation schema for stepOne
    const isValid = await trigger('stepOne');
    if (!isValid) {
      setRevalidateState(true);
    }
    if (isValid) {
      setStep(JuristicEntitySteps.STEP2);
    }
  };

  const countriesOptions = useMemo(() => {
    return countries.map((country) => {
      return {
        title: country.name,
        value: country.name,
      };
    });
  }, []);

  return (
    <FromContainer>
      <FormContent>
        <FormItem
          control={control}
          name="stepOne.company_name"
          className="w-full"
        >
          <Input
            placeholder="Company Name"
            size="large"
            variant="filled"
            className="py-3"
          />
        </FormItem>

        <FormItem
          control={control}
          name="stepOne.company_address"
          className="w-full"
        >
          <TextArea
            placeholder="Company Address"
            size="large"
            variant="filled"
            className="py-3"
          />
        </FormItem>
        <FormItem
          control={control}
          name="stepOne.business_registration_number"
          className="w-full"
        >
          <Input
            placeholder="Business Registration Number"
            size="large"
            variant="filled"
            className="py-3"
          />
        </FormItem>
        <FormItem
          control={control}
          name="stepOne.country_of_registration"
          className="w-full"
        >
          <Select
            placeholder="Country of Registration"
            size="large"
            variant="filled"
            filterOption={true}
            showSearch
            optionFilterProp="title"
            options={countriesOptions}
          />
        </FormItem>

        <FormItem
          control={control}
          name="stepOne.vat_number"
          className="w-full"
        >
          <Input
            placeholder="VAT number"
            size="large"
            variant="filled"
            className="py-3"
          />
        </FormItem>

        <FormItem
          control={control}
          name="stepOne.document_path"
          className="w-full"
        >
          <Controller
            control={control}
            name="stepOne.document_path"
            render={({ field: { onChange, value } }) => (
              <FileUpload
                acceptedFileTypes={'.pdf'}
                draggerText={'Business Registration Document'}
                maxSize={maxSize}
                fileName={value}
                fileLocation={value}
                setValue={(value) => {
                  onChange(value);
                  setValue('stepOne.document_path', value);
                }}
                setError={(error) =>
                  setError('stepOne.document_path', {
                    message: error,
                  })
                }
              />
            )}
          />
        </FormItem>
        <FormItem
          control={control}
          name="stepOne.address_proof"
          className="w-full"
        >
          <Controller
            control={control}
            name="stepOne.address_proof"
            render={({ field: { onChange, value } }) => (
              <FileUpload
                acceptedFileTypes={'.pdf'}
                draggerText={'Proof of address'}
                maxSize={maxSize}
                fileName={value}
                fileLocation={value}
                setValue={(value) => {
                  onChange(value);
                  setValue('stepOne.address_proof', value);
                }}
                setError={(error) =>
                  setError('stepOne.address_proof', {
                    message: error,
                  })
                }
              />
            )}
          />
        </FormItem>
        <FormItem control={control} name="stepOne.id_proof" className="w-full">
          <Controller
            control={control}
            name="stepOne.id_proof"
            render={({ field: { onChange, value } }) => (
              <FileUpload
                acceptedFileTypes={'.pdf'}
                draggerText={"Director's ID Document"}
                maxSize={maxSize}
                fileName={value}
                fileLocation={value}
                setValue={(value) => {
                  onChange(value);
                  setValue('stepOne.id_proof', value);
                }}
                setError={(error) =>
                  setError('stepOne.id_proof', {
                    message: error,
                  })
                }
              />
            )}
          />
        </FormItem>
      </FormContent>
      <FormFooter>
        <Button
          type="primary"
          className="font-medium"
          htmlType="button"
          onClick={onNext}
          size="large"
        >
          Next
        </Button>
      </FormFooter>
    </FromContainer>
  );
};

export default JuristicEntityStep1;
