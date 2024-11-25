import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import reportIcon from '../../../../../assets/report/incidentreport.svg';
interface IncidentReportClaimProps {
  id: string;
}
const IncidentReportClaim: React.FC<IncidentReportClaimProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const handleViewReport = () => {
    navigate('/damage-waiver-report');
  };
  return (
    <div>
      <div className="incident-report-claim">
        <img
          src={reportIcon as unknown as string}
          alt="email"
          className="w42 h42"
        />
        <h1 className="pt-0 md:text-lg text-sm font-bold text-black-color">
          Incident Report {id}
        </h1>
        <p className="text-grey-f md:text-xs text-sm">
          For the stay between 18.03.24 to 24.03.24 at Bushvelt Self Catering
          Lodgee
        </p>
        <p className="pt-7">
          Do you have any claims to be made for this report ?
        </p>
      </div>
      <div className="text-center pt-5">
        <Button
          // disabled={status === 'pending'}
          size="large"
          className="font-medium bg-white text-xs py-1 h35"
          onClick={handleViewReport}
        >
          Yes
        </Button>
        <Button
          // disabled={status === 'pending'}
          size="large"
          className="font-medium bg-white text-xs py-1 h35 ms-2"
          // onClick={handleCancel}
        >
          No
        </Button>
      </div>
    </div>
  );
};
export default IncidentReportClaim;
