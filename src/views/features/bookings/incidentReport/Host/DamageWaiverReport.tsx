import { Button, Modal, type UploadFile } from 'antd';
import { useState } from 'react';
import CustomButton from 'views/components/button';
import videoUrl from '../../../../../../public/videos/dw_report.mp4';
import reportIcon from '../../../../../assets/report/incidentreport.svg';
import playIcon from '../../../../../assets/report/play.svg';
import DamageWaiverTable from './DamageWaiverTable';

interface Claim {
  key: string;
  name: string;
  age: number;
  description: string;
  address: string;
  amount: number;
  covereddw?: number;
  visibleFiles: UploadFile[];
}

interface DamageWaiverReportProps {
  claimsData?: Claim[];
  onSaveAndExit: () => void;
  onFinish: () => void;
}

const DamageWaiverReport: React.FC<DamageWaiverReportProps> = ({
  claimsData = [],
  //onAddNewClaim,
  onSaveAndExit,
  onFinish,
}) => {
  const [claims, setClaims] = useState(claimsData);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handlePlayClick = () => {
    setIsVideoOpen(true);
  };

  const handleModalClose = () => {
    setIsVideoOpen(false);
  };

  //const claimsCovered = claims && claims.length > 0;

  const handleAddNewClaim = () => {
    const newClaim = {
      key: Math.random().toString(36).substr(2, 9),
      name: '',
      description: '',
      age: 0,
      address: '',
      amount: 0,
      covereddw: 0,
      visibleFiles: [],
    };

    setClaims((prevClaims) => [...prevClaims, newClaim]);
  };

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const handleUpdate = (key: string, field: keyof Claim, value: any) => {
    setClaims((prevClaims) =>
      prevClaims.map((claim) =>
        claim.key === key ? { ...claim, [field]: value } : claim,
      ),
    );
  };

  const handleDelete = (key: string) => {
    setClaims((prevClaims) => prevClaims.filter((claim) => claim.key !== key));
  };

  const renderTotals = () => (
    <div>
      <div className="grid grid-cols-6 gap-4 mt-0 display-total">
        <div className="col-span-4 text-right bg-gray">Total:</div>
        <div className="col-span-1 text-center bg-white">R3500</div>
      </div>
      <div className="grid grid-cols-6 gap-4 mt-0 display-total">
        <div className="col-span-4 text-right bg-gray">
          Damage Waiver Cover:
        </div>
        <div className="col-span-1 text-center bg-white">(-R3000)</div>
      </div>
      <div className="grid grid-cols-6 gap-4 mt-0 display-total">
        <div className="col-span-4 text-right bg-gray">
          Damage Waiver Excess:
        </div>
        <div className="col-span-1 text-center bg-white text-red">R500</div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="incident-report-details">
        <div className="grid grid-cols-1 gap-4 mt-2 mb-4 md:grid-cols-[55%_45%] justify-between">
          <div className="flex">
            <img
              src={reportIcon as unknown as string}
              alt="Incident Report"
              className="w42 h42 cursor-pointer"
              onClick={handlePlayClick}
            />
            <div className="mx-2">
              <h1 className="pt-0 md:text-sm text-sm font-bold text-black-color">
                Incident Report
              </h1>
              <p className="text-grey-f md:text-xs text-sm">
                For the stay between 18.03.24 to 24.03.24 at Bushvelt Self
                Catering Lodge
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <img
              src={playIcon as unknown as string}
              alt="Play"
              className="w42 h42 cursor-pointer"
              onClick={handlePlayClick}
            />
            <Button
              type="primary"
              className="py-5 px-7 ml-4 text-sm font-bold"
              onClick={handleAddNewClaim}
            >
              Add New Claim
            </Button>
          </div>
        </div>

        <DamageWaiverTable
          dataSource={claims}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />

        {claims.length > 0 && (
          <>
            {renderTotals()}
            <div className="flex my-2 justify-end">
              <CustomButton
                componentType="btnwithIcon"
                className="add-history-button font-medium text-xs py-1 text-white"
                onClick={onSaveAndExit}
              >
                <span className="text-primary-color fw700">Save & Exit</span>
              </CustomButton>
              <CustomButton
                componentType="btnwithIcon"
                className="font-medium bg-primary text-xs py-1 text-white ms-2"
                onClick={onFinish}
              >
                <span className="text-white fw700">Finish</span>
              </CustomButton>
            </div>
          </>
        )}

        <Modal
          title="Damage Waiver Report Video"
          open={isVideoOpen}
          onCancel={handleModalClose}
          footer={null}
          width="60%"
        >
          <div className="video-container">
            {/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
            <video controls autoPlay>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default DamageWaiverReport;
