import { Button, Input, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { countries } from 'constants/countries';
import { type FC, useMemo, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import { maxSize } from 'utilities/utils';
import FileUpload from 'views/components/FileUpload';
import {
  FormContent,
  FormFooter,
  FromContainer,
} from 'views/components/FormComponents';
import { IndividualEntitySteps } from './Individual';
import type { IndividualSchema } from './IndividualSchema';

type Props = {
  setStep: (value: number) => void;
};

const IndividualStep1: FC<Props> = ({ setStep }) => {
  const { control, trigger, setValue, setError } =
    useFormContext<IndividualSchema>();
  const [_, setRevalidateState] = useState(false);

  const onNext = async () => {
    // Triggers only the validation schema for stepOne

    const isValid = await trigger('stepOne');

    if (!isValid) {
      setRevalidateState(true);
    }

    if (isValid) {
      setStep(IndividualEntitySteps.STEP2);
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
        <FormItem control={control} name="stepOne.name" className="w-full">
          <Input
            placeholder="First Name"
            size="large"
            variant="filled"
            className="py-3"
          />
        </FormItem>
        <FormItem control={control} name="stepOne.sur_name" className="w-full">
          <Input
            placeholder="Sur Name"
            size="large"
            variant="filled"
            className="py-3"
          />
        </FormItem>
        <FormItem control={control} name="stepOne.id_number" className="w-full">
          <Input
            placeholder="ID Number"
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
                fileName={value}
                fileLocation={value}
                setValue={(value) => {
                  onChange(value);
                  setValue('stepOne.document_path', value);
                }}
                acceptedFileTypes={'.pdf'}
                draggerText={'ID document'}
                maxSize={maxSize}
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
          name="stepOne.country_of_issue"
          className="w-full"
        >
          <Select
            placeholder="Country of issue"
            size="large"
            variant="filled"
            options={countriesOptions}
            filterOption={true}
            showSearch
            optionFilterProp="title"
          />
        </FormItem>

        <FormItem
          control={control}
          name="stepOne.residential_address"
          className="w-full"
        >
          <TextArea
            placeholder="Ressidential Address"
            size="large"
            variant="filled"
            className="py-3"
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
                fileName={value}
                fileLocation={value}
                setValue={(value) => {
                  onChange(value);
                  setValue('stepOne.address_proof', value);
                  setRevalidateState(true);
                }}
                acceptedFileTypes={'.pdf'}
                draggerText={'Proof of address'}
                maxSize={maxSize}
                setError={(error) =>
                  setError('stepOne.address_proof', {
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
          size="large"
          onClick={onNext}
        >
          Next
        </Button>
      </FormFooter>
    </FromContainer>
  );
};

export default IndividualStep1;
