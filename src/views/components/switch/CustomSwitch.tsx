import { Switch } from 'antd';

interface CustomSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({ checked, onChange }) => {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      checkedChildren="YES"
      unCheckedChildren="NO"
    />
  );
};

export default CustomSwitch;
