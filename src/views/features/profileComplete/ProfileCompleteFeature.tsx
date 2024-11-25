import { Button } from 'antd';
import VerifyImage from 'assets/banners/email-verify.svg';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setProfileStatus } from 'stores/slice/authSlice';
import { ProfileStatus } from 'types/host';
import AuthFromContainer from 'views/components/containers/AuthFromContainer';
import SuccessModal from 'views/components/modals/SuccessModal';
import CompleteProfileForm from './CompleteProfileForm';
import { useCompleteProfile, useSkipProfile } from './hook';

const ProfileCompleteFeature = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const { completeProfile } = useCompleteProfile();

  const profileStatus = useAppSelector((state) => state.auth.profileStatus);
  const { skipProfile, loading } = useSkipProfile();

  useEffect(() => {
    if (
      profileStatus === ProfileStatus.COMPLETED ||
      profileStatus === ProfileStatus.SKIP
    ) {
      navigate('/');
    }
  }, [profileStatus, navigate]);

  const showModal = () => {
    setOpen(true);
  };

  const handleSuccess = async () => {
    setSuccessModal(true);
    setOpen(false);
    await completeProfile();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleClickSkip = async () => {
    await skipProfile();
    dispatch(setProfileStatus(ProfileStatus.SKIP));
    navigate('/');
  };

  const handleSuccessContinue = () => {
    setSuccessModal(false);
    dispatch(setProfileStatus(ProfileStatus.COMPLETED));
    navigate('/dashboard');
  };

  return (
    <div>
      <AuthFromContainer>
        <div className="flex flex-col items-center w-full">
          <img src={VerifyImage as unknown as string} alt="verify-image" />
          <h2 className="mb-5 text-3xl font-bold text-PrimaryText">
            Complete the Profile
          </h2>
          <p className="mb-4 text-base text-center text-Grey">
            Begin your journey by completing your host profile.
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={handleClickSkip}
              size="large"
              className="w-full py-6 font-bold bg-bg_primary"
              loading={loading}
              id="skip-button"
            >
              Skip{' '}
            </Button>
            <Button
              type="primary"
              size="large"
              className="w-full py-6 font-bold"
              onClick={showModal}
              disabled={loading}
              id="complete-profile-button"
            >
              Complete My Profile
            </Button>
          </div>
        </div>
      </AuthFromContainer>
      {open && (
        <CompleteProfileForm
          open={open}
          handleSuccess={handleSuccess}
          handleCancel={handleCancel}
        />
      )}

      {successModal && (
        <SuccessModal
          open={successModal}
          handleOk={handleSuccess}
          handleCancel={handleCancel}
          content="Your account has been submitted for approval. Our team will review your details and come back to you within 48 hours"
          title="Thanks for completing your profile."
          handleContinue={handleSuccessContinue}
        />
      )}
    </div>
  );
};

export default ProfileCompleteFeature;
