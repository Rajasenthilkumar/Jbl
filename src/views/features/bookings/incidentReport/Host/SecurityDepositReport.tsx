import { Button } from 'antd';
import { useState } from 'react';
import CustomButton from 'views/components/button';
import reportIcon from '../../../../../assets/report/incidentreport.svg';
import playIcon from '../../../../../assets/report/play.svg';
import SecurityDepositTable from './SecurityDepositTable';

const SecurityDepositReport = () => {
  const deleteHandler = (key: string) => {
    setData((prevDataSource) =>
      prevDataSource.filter((item) => item.key !== key),
    );
  };
  const [data, setData] = useState([
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      amount: 1000,
      onDelete: deleteHandler,
      visibleFiles: [],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      amount: 1000,
      onDelete: deleteHandler,
      visibleFiles: [],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      amount: 1000,
      onDelete: deleteHandler,
      visibleFiles: [],
    },
  ]);

  const addNewClaim = () => {
    const newClaim = {
      key: String(data.length + 1),
      name: '',
      age: 0,
      address: '',
      amount: 0,
      onDelete: deleteHandler,
      visibleFiles: [],
    };
    setData([...data, newClaim]);
  };

  return (
    <div>
      <div className="incident-report-details">
        <div className="grid grid-cols-2 gap-4 mt-2 mb-4 md:grid-cols-[55%_45%] justify-between">
          <div className="flex">
            <img
              src={reportIcon as unknown as string}
              alt="email"
              className="w42 h42"
            />
            <div className="mx-2">
              <h1 className="pt-0 md:text-sm text-sm font-bold text-black-color">
                Incident Report
              </h1>
              <p className="text-grey-f md:text-xs text-sm">
                For the stay between 18.03.24 to 24.03.24 at Bushvelt Self
                Catering Lodgee
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <img
              src={playIcon as unknown as string}
              alt="play"
              className="w42 h42"
            />
            <Button
              type="primary"
              className="py-5 px-7 ml-4 text-sm font-bold"
              htmlType="button"
              onClick={() => {
                addNewClaim();
              }}
            >
              Add New Claim
            </Button>
          </div>
        </div>

        <div>
          <SecurityDepositTable dataSource={data} onDelete={deleteHandler} />
          <div className="grid grid-cols-6 gap-4 mt-0 display-total">
            <div className="col-span-4 text-right bg-gray">Total:</div>
            <div className="col-span-1 text-center bg-white">R3500</div>
          </div>
          <div className="grid grid-cols-6 gap-4 mt-0 display-total">
            <div className="col-span-4 text-right bg-gray">
              15% JBL Service Fee:
            </div>
            <div className="col-span-1 text-center bg-white">(-R3000)</div>
          </div>
          <div className="grid grid-cols-6 gap-4 mt-0 display-total">
            <div className="col-span-4 text-right bg-gray">
              Total Claim Amount:
            </div>
            <div className="col-span-1 text-center bg-white">R500</div>
          </div>
          <div className="grid grid-cols-6 gap-4 mt-0 display-total">
            <div className="col-span-4 text-right bg-gray">
              Security Deposit:
            </div>
            <div className="col-span-1 text-center bg-white">(-R10000)</div>
          </div>
          <div className="grid grid-cols-6 gap-4 mt-0 display-total">
            <div className="col-span-4 text-right bg-gray">
              Outstanding Amount:
            </div>
            <div className="col-span-1 text-center bg-white text-red">
              R1740
            </div>
          </div>
          <div className="flex my-2 justify-end">
            <CustomButton
              componentType="btnwithIcon"
              className="add-history-button font-medium text-xs py-1 text-white"
            >
              <span className="text-primary-color fw700">Save & Exit</span>
            </CustomButton>
            <CustomButton
              componentType="btnwithIcon"
              className="font-medium bg-primary text-xs py-1 text-white ms-2"
            >
              <span className="text-white fw700">Finish</span>
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityDepositReport;
