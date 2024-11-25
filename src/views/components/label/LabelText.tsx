import { useMediaQuery } from 'react-responsive';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const LabelText = (Props: any) => {
  const isSm = useMediaQuery({ query: '(max-width: 500px)' });

  return (
    <>
      <p className={`text-Grey text-xs uppercase ${isSm ? 'text-sm' : ''}`}>
        {Props.label}
      </p>
      <p className={`text-[#000000] text-base ${isSm ? 'text-sm' : ''}`}>
        {Props.value}
      </p>
    </>
  );
};

export default LabelText;
