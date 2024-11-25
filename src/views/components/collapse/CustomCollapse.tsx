import { SearchOutlined } from '@ant-design/icons';
import { Checkbox, Collapse, Input } from 'antd';
import type { CollapseProps } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

// Destructure Search from Input
const { Search } = Input;

// Correctly type the onSearch function for the Search component
const onSearch = (
  value: string,
  _event?:
    | React.ChangeEvent<HTMLInputElement>
    | React.MouseEvent<HTMLElement>
    | React.KeyboardEvent<HTMLInputElement>,
  info?: { source?: 'clear' | 'input' },
) => {
  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log(info?.source, value);
};

const locationInput = [
  'Limpopo',
  'Capetown',
  'Johannesburg',
  'Durban',
  'Pretoria',
];

const CustomCollapse = () => {
  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Locations',
      children: (
        <div>
          <Search
            placeholder="Search for locations"
            className="m-0"
            onSearch={onSearch}
            prefix={<SearchOutlined />}
          />

          {locationInput.map((i) => (
            <div key={i} className="m-0 br-btm-gray">
              <Checkbox onChange={handleCheckboxChange}>{i}</Checkbox>
            </div>
          ))}
        </div>
      ),
      style: { marginBottom: 10 },
    },
    {
      key: '2',
      label: 'Date',
      children: (
        <div>
          <Search
            placeholder="Search for dates"
            className="m-0"
            onSearch={onSearch}
            prefix={<SearchOutlined />}
          />

          {locationInput.map((i) => (
            <div key={i} className="m-0 br-btm-gray">
              <Checkbox onChange={handleCheckboxChange}>{i}</Checkbox>
            </div>
          ))}
        </div>
      ),
    },
  ];

  const onChange = (key: string | string[]) => {
    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log(key);
  };
  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    const {
      target: { checked, value },
    } = e;
    // Here you can manage checked state or perform other actions
    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log(value, checked);
  };

  return (
    <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />
  );
};

export default CustomCollapse;
