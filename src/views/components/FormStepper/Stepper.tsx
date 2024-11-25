import type { FC } from 'react';

type StepperProps = {
  steps: number;
  active: number;
};

const Stepper: FC<StepperProps> = ({ steps, active }) => {
  return (
    <div className={'flex gap-2 my-4'} key={steps}>
      {Array.from({ length: steps }, (_, i) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: we are generating a static array
          key={i}
          className={`w-full h-[0.443333rem] ${i <= active ? 'bg-primary' : 'bg-bg_primary'} rounded transition-colors duration-300`}
        />
      ))}
    </div>
  );
};

export default Stepper;
