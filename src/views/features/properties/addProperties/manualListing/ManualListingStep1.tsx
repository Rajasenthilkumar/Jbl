import { Button, Input } from 'antd';
import { type FC, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import {
  FormContent,
  FormFooter,
  FromContainer,
} from 'views/components/FormComponents';
import type { ManualListingEntitySchema } from './ManualListingSchema';

import FileUpload from 'views/components/FileUpload';
import { ManualListingSteps } from './ManualListing';

type Props = {
  setStep: (value: number) => void;
};

const ManualListingStep1: FC<Props> = ({ setStep }) => {
  const { control, trigger, setValue, setError } =
    useFormContext<ManualListingEntitySchema>();
  const [_, setRevalidateState] = useState(false);

  const onNext = async () => {
    // Triggers only the validation schema for stepOne
    const isValid = await trigger('stepOne');
    if (!isValid) {
      setRevalidateState(true);
    }
    if (isValid) {
      setStep(ManualListingSteps.STEP2);
    }
  };

  return (
    <FromContainer>
      <FormContent>
        <p className="pb-2 text-base font-bold text-PrimaryText">
          About the property
        </p>
        <FormItem
          control={control}
          name="stepOne.propertyName"
          className="w-full"
        >
          <Input
            placeholder="Property Name"
            size="large"
            variant="filled"
            className="py-3"
          />
        </FormItem>

        <FormItem
          control={control}
          name="stepOne.propertyLocation"
          className="w-full"
        >
          <Input
            placeholder="Property Location"
            size="large"
            variant="filled"
            className="py-3"
          />
        </FormItem>

        <FormItem
          control={control}
          name="stepOne.propertyImage"
          className="w-full"
        >
          <FileUpload
            acceptedFileTypes=".jpg, .jpeg, .png"
            draggerText="Drag and drop the property image"
            maxSize={10485760}
            setValue={(value) => {
              setValue('stepOne.propertyImage', value);
            }}
            setError={(error) =>
              setError('stepOne.propertyImage', {
                message: error,
              })
            }
            iconType="image"
          />
        </FormItem>
      </FormContent>
      <FormFooter>
        <Button
          type="primary"
          className="font-medium"
          htmlType="button"
          onClick={onNext}
        >
          Next
        </Button>
      </FormFooter>
    </FromContainer>
  );
};

export default ManualListingStep1;
