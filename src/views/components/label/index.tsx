interface LabelProps {
  className?: string;
  labeltext: string;
  inputId: string;
}

const LabelComponent: React.FC<LabelProps> = ({
  className = '',
  labeltext,
  inputId,
}) => {
  return (
    <>
      <label
        htmlFor={inputId}
        className={`block mb-1 text-sm font-semibold text-[#051621] form-label ${className}`}
      >
        {labeltext}
      </label>
    </>
  );
};

export default LabelComponent;
