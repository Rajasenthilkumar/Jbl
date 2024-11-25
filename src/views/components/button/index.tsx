import { Button } from 'antd';
import type React from 'react';
import type { ReactNode } from 'react';

interface CustomButtonProps {
  componentType?: string;
  className?: string;
  icon?: ReactNode;
  onClick?: () => void;
  children?: ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  componentType,
  className,
  icon,
  onClick,
  children,
}) => {
  return (
    <>
      {componentType === 'btnwithIcon' ? (
        <Button
          className={`custom-button ${className}`}
          onClick={onClick}
          icon={icon}
        >
          {children}
        </Button>
      ) : null}
    </>
  );
};

export default CustomButton;
