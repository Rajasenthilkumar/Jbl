import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useEffect, useState } from 'react';
import { PencilSquare } from 'react-bootstrap-icons';
import { fetchCustomer } from 'stores/slice/customerSlice';
import CustomButton from 'views/components/button';
import CompanyCardComponent from 'views/components/card/CompanyCard';
import CompanyDetailsModal from './CompanyDetailsModal';

const CompanyDetails = () => {
  const [addCompanyDetailsModal, setCompanyDetailsModal] = useState(false);
  const dispatch = useAppDispatch();

  // Safely accessing profileDetails and providing a default empty object
  const profileDetails = useAppSelector(
    (state) => state.auth.profileDetails,
  ) || { profiles: [] };

  const companyDetails = profileDetails.profiles || [];

  const profileId =
    companyDetails.length > 0 ? companyDetails[0].host_id : null;

  const profileType =
    Array.isArray(companyDetails) && companyDetails.length > 0
      ? companyDetails[0].profile_type
      : '';

  // Juristic details
  const companyNames =
    companyDetails.length > 0 ? companyDetails[0].company_name : '';
  const registrationNumber =
    companyDetails.length > 0
      ? companyDetails[0].business_registration_number
      : '';
  const countryofRegistration =
    companyDetails.length > 0 ? companyDetails[0].country_of_registration : '';
  const vatNumber =
    companyDetails.length > 0 ? companyDetails[0].vat_number : '';
  const companyAddress =
    companyDetails.length > 0 ? companyDetails[0].company_address : '';
  const documentPath =
    companyDetails.length > 0 ? companyDetails[0].document_path : '';

  const addressProof =
    companyDetails.length > 0 ? companyDetails[0].address_proof : [];
  const firstDocumentPath = documentPath;
  const firstAddressPath =
    Array.isArray(addressProof) && addressProof.length > 0
      ? addressProof[0]
      : '';

  // Individual details
  const nameDetails = useAppSelector((state) => state.auth.profileDetails);
  const fullName = `${nameDetails?.name || ''} ${nameDetails?.sur_name || ''}`;

  const idNumber = companyDetails.length > 0 ? companyDetails[0].id_number : '';
  const countryOfIssue =
    companyDetails.length > 0 ? companyDetails[0].country_of_issue : '';
  const residentialAddress =
    companyDetails.length > 0 ? companyDetails[0].residential_address : '';
  const idProof =
    companyDetails.length > 0 ? companyDetails[0].document_path : ''; // Individual flow Id Proff

  function handleClick(): void {
    setCompanyDetailsModal(true);
  }

  const handleCloseModal = () => {
    setCompanyDetailsModal(false);
  };

  const handleOk = () => {
    handleCloseModal();
  };

  useEffect(() => {
    if (profileId) {
      dispatch(fetchCustomer(profileId));
    }
  }, [dispatch, profileId]);

  return (
    <>
      <div className="card-detail-style credit-card-style">
        <div className="card-header-details custom-card-header company-detail-header">
          {companyDetails.map((item) => {
            const displayText =
              item.profile_type === 'Juristic'
                ? 'Company Details'
                : item.profile_type === 'Individual'
                  ? 'Personal Details'
                  : item.profile_type;

            return (
              <h1
                key={item.id || item.profile_type} // Use a unique identifier here
                className="card-detail-heading"
                title="individual's details"
              >
                {displayText}
              </h1>
            );
          })}

          <CustomButton
            componentType="btnwithIcon"
            className="additional-class"
            icon={<PencilSquare className="fill-primary" />}
            onClick={handleClick}
          >
            <span className="text-primary-color fw700">Edit</span>
          </CustomButton>
        </div>

        {companyDetails.map((item) => {
          return (
            <CompanyCardComponent
              key={item.id || item.profile_type} // Use a unique identifier here
              profileType={item.profile_type}
              cardinfoclassName={'cardinfoclassName'}
              // Conditional rendering based on profile_type
              title={
                item.profile_type === 'Juristic' ? 'COMPANY NAME' : 'FULL NAME'
              }
              titleValue={
                item.profile_type === 'Juristic' ? companyNames : fullName
              }
              companytitle={
                item.profile_type === 'Juristic'
                  ? 'BUSINESS REGISTRATION NUMBER'
                  : 'ID NUMBER'
              }
              companyValue={
                item.profile_type === 'Juristic' ? registrationNumber : idNumber
              }
              countrytitle={
                item.profile_type === 'Juristic'
                  ? 'COUNTRY OF REGISTRATION'
                  : 'COUNTRY OF ISSUE'
              }
              countrytitleValue={
                item.profile_type === 'Juristic'
                  ? countryofRegistration
                  : countryOfIssue
              }
              vatDetail={item.profile_type === 'Juristic' ? 'VAT NUMBER' : ''}
              vatDetailValue={item.profile_type === 'Juristic' ? vatNumber : ''}
              addresstitle={
                item.profile_type === 'Juristic'
                  ? 'COMPANY ADDRESS'
                  : 'RESIDENTIAL ADDRESS'
              }
              addresstextValue={
                item.profile_type === 'Juristic'
                  ? companyAddress
                  : residentialAddress
              }
              documenttitle={
                item.profile_type === 'Juristic'
                  ? 'BUSINESS REGISTRATION DOCUMENT'
                  : 'ID PROOF'
              }
              documenttitleValue={
                item.profile_type === 'Juristic' ? firstDocumentPath : idProof
              }
              // addressProofTitle={'ADDRESS PROOF'}
              addressProofTitleValue={firstAddressPath}
              subclassName={'sub-classname'}
              textDetailsclassName={
                'textDetailsclassName companyDetailsclassName d-flex custom-text-truncate w200'
              }
              companyclassName={
                'textDetailsclassName d-flex custom-text-truncate w200'
              }
            />
          );
        })}
      </div>

      {addCompanyDetailsModal && (
        <CompanyDetailsModal
          titleValue={companyNames || ''}
          idNumber={`${idNumber}`}
          countryOfIssue={countryOfIssue || ''}
          companyValue={registrationNumber || ''}
          residentialAddress={residentialAddress || ''}
          countrytitleValue={countryofRegistration || ''}
          addressProof={
            Array.isArray(addressProof)
              ? addressProof.join(', ')
              : addressProof || ''
          }
          vatDetailValue={vatNumber || ''}
          addresstextValue={companyAddress || ''}
          documenttitleValue={firstDocumentPath || ''}
          open={addCompanyDetailsModal}
          profileType={profileType}
          profileId={profileId}
          handleOk={handleOk}
          handleCancel={handleCloseModal}
        />
      )}
    </>
  );
};

export default CompanyDetails;
