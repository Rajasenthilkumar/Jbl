import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useEffect, useState } from 'react';
import { PencilSquare } from 'react-bootstrap-icons';
import { fetchCustomer } from 'stores/slice/customerSlice';
import CustomButton from 'views/components/button';
import EmergencyCardComponent from 'views/components/card/EmergencyCard';
import EmergencyDetailsModal from './EmergencyDetailsModal';

interface Profile {
  host_id: number;
  profile_type: string;
  alternative_contact_number: string;
}

interface ProfileDetails {
  profiles: Profile[];
}
const EmergencyDetails = () => {
  const [addEmergencyModal, setEmergencyModal] = useState(false);
  const dispatch = useAppDispatch();

  const profileDetails = useAppSelector((state) => state.auth.profileDetails) as
    | ProfileDetails
    | undefined;

  const customerDetails = profileDetails || { profiles: [] };

  const profileId =
    customerDetails.profiles.length > 0
      ? customerDetails.profiles[0].host_id
      : 0;

  const companyDetails =
    useAppSelector((state) => state.auth.profileDetails?.profiles) || [];

  const profileType = Array.isArray(profileDetails?.profiles)
    ? profileDetails.profiles.map((profile) => profile.profile_type)[0]
    : '';

  const alternateNumber = companyDetails.map(
    (company) => company.alternative_contact_number,
  )[0]; // Get the first alternate number

  function handleClick(): void {
    setEmergencyModal(true);
  }
  const handleCloseModal = () => {
    setEmergencyModal(false);
  };

  const handleOk = () => {
    handleCloseModal();
  };

  useEffect(() => {
    if (customerDetails.profiles.length > 0) {
      dispatch(fetchCustomer(profileId));
    }
  }, [dispatch, profileId, customerDetails]);

  return (
    <>
      <div className="card-detail-style emergency-card-style">
        <div className="card-header-details custom-card-header">
          <h1 className="card-detail-heading">Emergency Details</h1>
          {customerDetails.profiles.length > 0 ? (
            <CustomButton
              componentType="btnwithIcon"
              className="additional-class"
              icon={<PencilSquare className="fill-primary" />}
              onClick={handleClick}
            >
              <span className="text-primary-color fw700">Edit</span>
            </CustomButton>
          ) : null}
        </div>
        {customerDetails.profiles.length > 0 ? (
          <EmergencyCardComponent
            cardinfoclassName={'cardinfoclassName'}
            emergencycardtitle={'Alternate Contact Number'}
            emergencycardValue={alternateNumber}
            profileType={profileType}
            subclassName={'sub-classname'}
            textDetailsclassName={'textDetailsclassName'}
          />
        ) : (
          <div className="bg-white p-4 br-bl-10px custom-creditcard">
            No Emergency details found
          </div>
        )}
      </div>
      {addEmergencyModal && (
        <EmergencyDetailsModal
          emergencycardValue={alternateNumber}
          profileType={profileType}
          open={addEmergencyModal}
          handleOk={handleOk}
          handleCancel={handleCloseModal}
          profileIdValue={profileId}
        />
      )}
    </>
  );
};
export default EmergencyDetails;
