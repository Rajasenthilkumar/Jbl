import { Button } from 'antd';
import { type FC, useState } from 'react';
import { HouseHeartFill } from 'react-bootstrap-icons';
import Stepper from 'views/components/FormStepper/Stepper';
import {
  StepperProvider,
  useStepper,
} from 'views/components/FormStepper/StepperProvider';
import FormModal from 'views/components/modals/FormModal';
import {
  TOTAL_INDIVIDUAL_STEPS,
  TOTAL_JURISTIC_ENTITY_STEPS,
} from './constants';
import Individual from './individual/Individual';
import JuristicEntity from './juristicEntity/JuristicEntity';

type FormType = 'JuristicEntity' | 'Individual';

type Props = {
  open: boolean;
  handleSuccess: () => void;
  handleCancel: () => void;
};

const CompleteProfileForm: FC<Props> = ({
  open,
  handleCancel,
  handleSuccess,
}) => {
  return (
    <FormModal
      open={open}
      handleOk={handleSuccess}
      handleCancel={handleCancel}
      headerIcon={<HouseHeartFill />}
      title="Host Verification"
      subTitle="Take these easy steps to complete your PROFILE!."
    >
      <StepperProvider initialSteps={TOTAL_JURISTIC_ENTITY_STEPS}>
        <FormBody handleSuccess={handleSuccess} />
      </StepperProvider>
    </FormModal>
  );
};

type FormBodyProps = {
  handleSuccess: () => void;
};

const FormBody: FC<FormBodyProps> = ({ handleSuccess }) => {
  const [formType, setFormType] = useState<FormType>('JuristicEntity');
  const { activeStep, setTotalSteps, totalSteps } = useStepper();

  const handleSetJuridicEntity = () => {
    setFormType('JuristicEntity');
    setTotalSteps(TOTAL_JURISTIC_ENTITY_STEPS);
  };

  const handleSetIndividual = () => {
    setFormType('Individual');
    setTotalSteps(TOTAL_INDIVIDUAL_STEPS);
  };
  return (
    <div id="complete-profile-modal">
      <Stepper steps={totalSteps} active={activeStep} />
      {activeStep === 0 && (
        <>
          <p className="mb-4 text-base font-medium">
            How would you like to verify yourself?
          </p>
          <div className="grid grid-cols-2">
            <Button
              type={formType === 'JuristicEntity' ? 'primary' : 'default'}
              className="w-full py-5 font-medium rounded-none rounded-l-2xl"
              onClick={handleSetJuridicEntity}
            >
              Juristic Entity
            </Button>
            <Button
              type={formType === 'Individual' ? 'primary' : 'default'}
              className="w-full py-5 font-medium rounded-none rounded-r-2xl"
              onClick={handleSetIndividual}
            >
              Individual
            </Button>
          </div>
        </>
      )}

      <div className="py-4">
        {formType === 'JuristicEntity' && (
          <JuristicEntity handleSuccess={handleSuccess} />
        )}
        {formType === 'Individual' && (
          <Individual handleSuccess={handleSuccess} />
        )}
      </div>
    </div>
  );
};

export default CompleteProfileForm;
