import { Button } from 'antd';
import { type FC, useState } from 'react';
import { BuildingFill } from 'react-bootstrap-icons';
import Stepper from 'views/components/FormStepper/Stepper';
import {
  StepperProvider,
  useStepper,
} from 'views/components/FormStepper/StepperProvider';
import FormModal from 'views/components/modals/FormModal';
import { TOTAL_INDIVIDUAL_STEPS } from 'views/features/profileComplete/constants';
import { TOTAL_MANUAL_STEPS, TOTAL_PMS_MANAGER_STEPS } from './constants';
import AddManualListing from './manualListing/ManualListing';
import PmsManager from './pmsManager/PmsManager';

type FormType = 'PMSManager' | 'ManualListing';

type Props = {
  open: boolean;
  handleOk: () => void;
  handleCancel: () => void;
};

const AddPropertiesFormModal: FC<Props> = ({
  open,
  handleCancel,
  handleOk,
}) => {
  return (
    <FormModal
      open={open}
      handleOk={handleOk}
      handleCancel={handleCancel}
      headerIcon={<BuildingFill />}
      title="Add properties"
      subTitle=""
    >
      <StepperProvider initialSteps={TOTAL_INDIVIDUAL_STEPS}>
        <FormBody />
      </StepperProvider>
    </FormModal>
  );
};

const FormBody = () => {
  const [formType, setFormType] = useState<FormType>('ManualListing');
  const { activeStep, setTotalSteps, totalSteps } = useStepper();

  const handleSetManualListing = () => {
    setFormType('ManualListing');
    setTotalSteps(TOTAL_PMS_MANAGER_STEPS);
  };

  const handleSetPmsManager = () => {
    setFormType('PMSManager');
    setTotalSteps(TOTAL_MANUAL_STEPS);
  };

  return (
    <div>
      <p className="mb-4 text-base font-medium">
        How would you like to add your properties?
      </p>
      <div className="grid grid-cols-2">
        <Button
          type={formType === 'PMSManager' ? 'primary' : 'default'}
          className="w-full py-5 font-medium rounded-none rounded-l-2xl"
          onClick={handleSetPmsManager}
        >
          PMS/Channel Manager
        </Button>
        <Button
          type={formType === 'ManualListing' ? 'primary' : 'default'}
          className="w-full py-5 font-medium rounded-none rounded-r-2xl"
          onClick={handleSetManualListing}
        >
          Manual listing
        </Button>
      </div>
      <Stepper steps={totalSteps} active={activeStep} />
      {formType === 'ManualListing' && <AddManualListing />}
      {formType === 'PMSManager' && <PmsManager />}
    </div>
  );
};

export default AddPropertiesFormModal;
