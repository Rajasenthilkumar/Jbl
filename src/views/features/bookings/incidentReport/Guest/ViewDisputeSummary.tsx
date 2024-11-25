import { Button, Image } from 'antd';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import type React from 'react';
import { useState } from 'react';
import imageOutline from '../../../../../assets/icons/add-booking.svg';
import AddDisputeModal from './AddDisputeModal';

const text = `
During the guest's stay at our property, significant damage was caused to the living room furniture. 
The coffee table was scratched extensively, and one of the armchairs had a large tear in the upholstery.
 Additionally, there were multiple stains on the carpet that required professional cleaning. 
 We have attached photographs of the damages and receipts for the cleaning services and furniture repair. 
 The total claim amount for these damages is R3,000.
`;

const ViewDisputeSummary: React.FC = () => {
  const [showFullText, setShowFullText] = useState(false);
  const [addDispute, setAddDispute] = useState(false);
  const onChange = (key: string | string[]) => {
    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log(key);
  };
  const disputeHandler = () => {
    setAddDispute(true);
  };
  const trimmedText = text.substring(0, 100);
  const isLongText = text.length > 100;

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <div className="panel-header">
          <div className="panel-heading">Damages</div>
          <div className="panel-value">R4000</div>
        </div>
      ),

      children: (
        <div className="panel-content text-grey-f d-flex p-4">
          <div className="w-50">
            <p className="text-xs">
              {showFullText ? text : trimmedText}
              {isLongText && !showFullText && (
                <span
                  className="read-more"
                  onClick={() => setShowFullText(true)}
                  style={{ color: 'blue', cursor: 'pointer' }}
                >
                  ... Read more
                </span>
              )}
              {isLongText && showFullText && (
                <span
                  className="read-more"
                  onClick={() => setShowFullText(false)}
                  style={{ color: 'blue', cursor: 'pointer' }}
                >
                  ... Read less
                </span>
              )}
            </p>
            <Button
              size="large"
              className="font-medium bg-transparent text-xs py-0 border-0 h20 px-0 text-grey-f"
              onClick={disputeHandler}
            >
              View Dispute
            </Button>
          </div>
          <div className="w-50 text-end">
            <div className="flex justify-end">
              <div>
                <h1>Original Claim</h1>
                <p className="text-start">R4000</p>
              </div>
              <div className="mx-2">
                <h1>Disputed Amount</h1>
                <p className="text-center">R4000</p>
              </div>
            </div>
            {Array.from({ length: 5 }, (_, index) => (
              <Image
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={index}
                width={20}
                src={imageOutline as unknown as string as unknown as undefined}
                className="bordered-image"
              />
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="incident-report">
        <h1 className="pt-0 md:text-sm text-sm font-bold text-black-color pb-2">
          Disputes Summary
        </h1>
        <Collapse defaultActiveKey={['1']} onChange={onChange} items={items} />
        <div className="grid grid-cols-3 gap-4 mt-2 mb-4 md:grid-cols-[70%_12%_10%] br-btm-gray">
          <div className="text-end">
            <span>Total:</span>
          </div>
          <div className="text-end">
            <span>R10200</span>
          </div>
          <div className="text-end">
            <span>R10200</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-2 mb-4 md:grid-cols-[70%_12%_10%] br-btm-gray">
          <div className="text-end">
            <span>15% JBL Service Fee:</span>
          </div>
          <div className="text-end">
            <span>R10200</span>
          </div>
          <div className="text-end">
            <span>R10200</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-2 mb-4 md:grid-cols-[70%_12%_10%] br-btm-gray">
          <div className="text-end">
            <span>Total Claim Amount:</span>
          </div>
          <div className="text-end">
            <span>R10200</span>
          </div>
          <div className="text-end">
            <span>R10200</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-2 mb-4 md:grid-cols-[70%_12%_10%] br-btm-gray">
          <div className="text-end">
            <span>Security Deposit:</span>
          </div>
          <div className="text-end">
            <span>R10200</span>
          </div>
          <div className="text-end">
            <span>R10200</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-2 mb-4 md:grid-cols-[70%_12%_10%] br-btm-gray">
          <div className="text-end">
            <span>Outstanding Amount:</span>
          </div>
          <div className="text-end">
            <span className="text-red">R10200</span>
          </div>
          <div className="text-end">
            <span className="text-red">R10200</span>
          </div>
        </div>
      </div>
      <div className="text-end">
        <Button
          size="large"
          className="font-medium bg-primary text-xs py-1 h35 text-white"
        >
          Submit Dispute
        </Button>
      </div>
      {addDispute && (
        <AddDisputeModal open={true} onCancel={() => setAddDispute(false)} />
      )}
    </>
  );
};

export default ViewDisputeSummary;
