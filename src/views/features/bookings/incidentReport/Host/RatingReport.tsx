import { Button, Rate } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const RatingReport = () => {
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log('Change:', e.target.value);
  };
  return (
    <div>
      <div className="incident-report-claim">
        <h1 className="pt-0 md:text-lg text-sm font-bold text-black-color">
          What is your rating ?
        </h1>
        <p className="text-grey-f">Rate your guest out of 5!</p>
        <p className="pt-7">
          Do you have any claims to be made for this report ?
        </p>
        <div className="pb-5">
          <Rate />
          <span className="md:text-lg text-sm font-bold text-grey-f mx-2">
            4
          </span>
        </div>
        <TextArea
          showCount
          maxLength={250}
          onChange={onChange}
          placeholder="disable resize"
          style={{ height: 120, resize: 'none' }}
        />
      </div>
      <div className="text-center pt-5">
        <Button
          size="large"
          className="font-medium bg-primary text-xs py-1 h35 text-white"
          // onClick={handleCancel}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
export default RatingReport;
