import { Input, type InputProps } from 'antd';
import type { FC } from 'react';
import { removeNonDigits } from 'utilities/utils';

type DecimalInputProps = {
  value: number | string;
  onChange: (value: string) => void;
  maxLength?: number;
};

const DecimalInput: FC<DecimalInputProps & InputProps> = ({
  value,
  onChange,
  maxLength,
  ...rest
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const digitsOnly = removeNonDigits(value);

    if (maxLength && digitsOnly.length > maxLength) {
      return;
    }

    onChange(digitsOnly);
  };

  return <Input {...rest} onChange={handleChange} value={value} />;
};

export default DecimalInput;
