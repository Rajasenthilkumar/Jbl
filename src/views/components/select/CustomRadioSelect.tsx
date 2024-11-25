import { Menu, Radio, Select } from 'antd';
import type { RadioChangeEvent, SelectProps } from 'antd';
import type React from 'react';
import { useState } from 'react';

interface CustomRadioSelectProps {
  placeholder: string;
  size?: 'small' | 'middle' | 'large';
  options: SelectProps['options'];
  onChange: (value: string | number) => void;
}

const CustomRadioSelect: React.FC<CustomRadioSelectProps> = ({
  placeholder,
  size = 'large',
  options,
  onChange,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]); // Array for multiple values
  const [openSelect, setOpenSelect] = useState(false);

  const handleRadioChange = (e: RadioChangeEvent) => {
    setSelectedValues([e.target.value]);

    // TODO: this is not a right way to get the value from the options array right now this is a quick fix
    // get value from the options array
    const selectedOption = options?.find(
      (option) => option.label === e.target.value,
    );
    if (selectedOption?.value) {
      onChange(selectedOption?.value);
      closeSelectMenu();
    }
  };

  const openSelectMenu = () => {
    setOpenSelect(true);
  };

  const closeSelectMenu = () => {
    setOpenSelect(false);
  };

  return (
    <div className="custom-select">
      <Select
        open={openSelect}
        onFocus={openSelectMenu}
        placeholder={placeholder}
        size={size}
        value={selectedValues}
        className={'custom-radio-select'}
        onDropdownVisibleChange={(visible) => setOpenSelect(visible)}
        dropdownRender={() => (
          <div className={'radio-select'}>
            <Menu>
              <Menu.Item key="radio">
                <Radio.Group
                  onChange={handleRadioChange}
                  value={selectedValues[0]}
                  className="flex flex-col gap-2"
                >
                  {options && options?.length > 0 ? (
                    options?.map((option) => (
                      <Radio key={option.value} value={option.label}>
                        {option.label}
                      </Radio>
                    ))
                  ) : (
                    <div className="mx-4">No results found</div>
                  )}
                </Radio.Group>
              </Menu.Item>
            </Menu>
          </div>
        )}
      />
    </div>
  );
};

export default CustomRadioSelect;
