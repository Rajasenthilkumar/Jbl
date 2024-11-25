import { Checkbox, Input, Menu, type RefSelectProps, Select } from 'antd';
import { type SelectProps, Tag } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Search } from 'react-bootstrap-icons';

export type CustomSelectOnChangeType = number[] | number | string | string[];

interface CustomSelectProps {
  placeholder: string;
  size?: 'small' | 'middle' | 'large';
  options: SelectProps['options'];
  searchPlaceholder?: string;
  onChange: (value: CustomSelectOnChangeType) => void;
  defaultValue?: string[] | number[];
}

const CustomMultiSelect: React.FC<CustomSelectProps> = ({
  placeholder,
  size = 'large',
  options,
  searchPlaceholder = 'Search...',
  onChange,
  defaultValue = [],
}) => {
  const [selectedValues, setSelectedValues] =
    useState<(string | number | null)[]>(defaultValue);
  const [searchText, setSearchText] = useState<string>('');
  const ref = useRef<RefSelectProps>(null);

  const handleChange = (value: string[]) => {
    setSelectedValues(
      selectedValues.filter(
        (selectedValue) =>
          selectedValue != null && value.includes(selectedValue.toString()),
      ),
    );
  };

  const handleCheckboxChange = (event: CheckboxChangeEvent) => {
    const value = event.target.value;
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((item) => item !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filteredOptions = options?.filter((option) =>
    option.label?.toString().toLowerCase().includes(searchText.toLowerCase()),
  );

  const labelFromValue = (value: string | number | undefined) => {
    return options?.find(
      (option) => option.value?.toString() === value?.toString(),
    )?.label;
  };

  useEffect(() => {
    const normalizedValues: CustomSelectOnChangeType = selectedValues.every(
      (val) => typeof val === 'number',
    )
      ? (selectedValues as number[])
      : (selectedValues
          .filter((val) => val != null)
          .map((val) => val?.toString()) as string[]);

    onChange(normalizedValues);
  }, [selectedValues, onChange]);

  return (
    <div className="custom-select">
      <Select
        mode={'multiple'}
        placeholder={placeholder}
        size={size}
        value={selectedValues
          .filter((val) => val != null)
          .map((val) => val?.toString())}
        ref={ref}
        tagRender={(props) => (
          <Tag {...props}>{labelFromValue(props.value)}</Tag>
        )}
        className={'custom-checkbox-select'}
        onChange={handleChange}
        dropdownRender={(_menu) => (
          <div className={'checkbox-select'}>
            <Input
              placeholder={searchPlaceholder}
              size={size}
              className="py-3 m-4 w-[95%] text-base font-medium placeholder:text-base placeholder:font-semibold"
              value={searchText}
              onChange={handleSearch}
              prefix={<Search className="mr-4" />}
              onKeyDown={(e) => e.stopPropagation()}
            />
            <Menu>
              <Menu.Item key="checkbox">
                <Checkbox.Group
                  value={selectedValues}
                  className="flex flex-col gap-2"
                >
                  {filteredOptions && filteredOptions.length > 0 ? (
                    filteredOptions.map((option) => (
                      <Checkbox
                        key={option.value}
                        value={option.value}
                        checked={
                          option.value !== undefined &&
                          selectedValues.includes(option.value)
                        }
                        onChange={handleCheckboxChange}
                        className="w-full square-checkbox"
                      >
                        {option.label}
                      </Checkbox>
                    ))
                  ) : (
                    <div className="mx-4">No results found</div>
                  )}
                </Checkbox.Group>
              </Menu.Item>
            </Menu>
          </div>
        )}
      />
    </div>
  );
};

export default CustomMultiSelect;
