import { Button, Input, type InputRef, Space } from 'antd';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  CountrySelector,
  type ParsedCountry,
  usePhoneInput,
} from 'react-international-phone';
import 'react-international-phone/style.css';
import { removeNonDigits } from 'utilities/utils';

interface AntPhoneProps {
  value: string;
  countryCode: string;
  onChange: (countryCode: string, phoneNumber: string) => void;
  onBlur: () => void;
  yourDetails?: { id_number?: string | null };
}

export const AntPhone: React.FC<AntPhoneProps> = ({
  value,
  countryCode,
  onChange,
  onBlur,
  // yourDetails,
}) => {
  const phoneInput = usePhoneInput({
    disableFormatting: true,
    defaultCountry: countryCode || 'za',
    disableDialCodeAndPrefix: true,
    value,
  });

  const inputRef = useRef<InputRef>(null);
  const [selectedCountryCode, setSelectedCountryCode] = useState(
    phoneInput.country,
  );

  const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = removeNonDigits(event.target.value);

    if (digitsOnly.length > 15) {
      return;
    }

    const dialCode = `+${phoneInput.country.dialCode}`;
    onChange(dialCode, digitsOnly);
  };

  const handleChangeCountryCode = (country: ParsedCountry) => {
    setSelectedCountryCode(country);
    const dialCode = `+${country.dialCode}`;
    onChange(dialCode, value);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (phoneInput.inputRef && inputRef.current?.input) {
      phoneInput.inputRef.current = inputRef.current.input;
    }
  }, [inputRef]);

  return (
    <div className="w-full">
      <Space.Compact size="large" className="w-full">
        <CountrySelector
          selectedCountry={selectedCountryCode.iso2}
          onSelect={handleChangeCountryCode}
          renderButtonWrapper={({ children, rootProps }) => (
            <Button
              {...rootProps}
              style={{
                background: 'rgba(0, 0, 0, 0.04)',
                height: '100%',
                zIndex: 1,
                border: '0px',
              }}
            >
              {children}
            </Button>
          )}
          dropdownStyleProps={{
            style: {
              top: '35px',
            },
          }}
        />
        <Input
          placeholder="Phone"
          value={value}
          onChange={handleChangePhone}
          ref={inputRef}
          name="phone"
          autoComplete="tel"
          variant="filled"
          onBlur={onBlur}
          className="w-full py-3"
        />
      </Space.Compact>
    </div>
  );
};
