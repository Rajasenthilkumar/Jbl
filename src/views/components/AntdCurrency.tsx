import { Input, Select, Space } from 'antd';
import { COUNTRIES_CURRENCY } from 'constants/countriesCurrency';
import { type ChangeEvent, type FC, useMemo, useState } from 'react';
import { removeNonDigits } from 'utilities/utils';

type Props = {
  value?: number | string;
  onChange: (currency: string, value: string | number | undefined) => void;
  placeholder?: string;
  defaultCurrency?: string | null;
};

const AntdCurrency: FC<Props> = ({
  value,
  onChange,
  placeholder,
  defaultCurrency,
}) => {
  const [currency, setCurrency] = useState(
    defaultCurrency ? defaultCurrency : 'ZAR',
  );

  const options = useMemo(
    () =>
      COUNTRIES_CURRENCY.map((country) => ({
        value: country.currency,
        label: country.currency,
      })),
    [],
  );

  const handleCurrencyChange = (currency: string) => {
    setCurrency(currency);
    onChange(currency, value);
  };

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = removeNonDigits(e.target.value);
    onChange(currency, digitsOnly);
  };
  return (
    <Space.Compact className="w-full">
      <Select
        style={{ width: 100 }}
        className="currency-select"
        options={options}
        defaultValue={currency}
        onChange={handleCurrencyChange}
        id="currency-select"
      />
      <Input
        size="large"
        variant="filled"
        className="w-full py-3"
        value={value}
        onChange={handleValueChange}
        placeholder={placeholder}
        id="input-currency"
      />
    </Space.Compact>
  );
};

export default AntdCurrency;
