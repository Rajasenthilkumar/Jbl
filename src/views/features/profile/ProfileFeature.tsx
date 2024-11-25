import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useEffect, useState } from 'react';
import { PencilSquare } from 'react-bootstrap-icons';
import { fetchHostInfo } from 'stores/slice/authSlice';
import type { Host } from 'types/getAllProperties';
import House from '../../../assets/profile/bi_house-heart.svg';
import Email from '../../../assets/profile/email_icon.svg';
import IDCard from '../../../assets/profile/id_icon.svg';
import Phone from '../../../assets/profile/ph_icon.svg';
import CustomButton from '../../components/button/index';
import CreditCardDetails from '../profile/CreditCardDetails/CreditCardDetails';
import BankDetails from './BankDetails';
import CompanyDetails from './CompanyDetails/CompanyDetails';
import EditProfileModal from './EditProfileModal';
import EmergencyDetails from './EmergencyDetails/EmergencyDetails';
import WebsiteDetails from './WebsiteDetails';

const ProfileFeature = () => {
  const [editProfileModal, setEditProfileModal] = useState(false);
  const userId = useAppSelector((state) => state.auth.userId);
  const dispatch = useAppDispatch();
  const profileValues = useAppSelector(
    (state) => state.customerDetails?.customerDetails?.data?.result || [],
  );
  const nameDetails = useAppSelector((state) => state.auth.profileDetails);

  const profileDetails = useAppSelector(
    (state) => state.auth.profileDetails,
  ) || { profiles: [] };

  const companyDetails = profileDetails.profiles || [];

  const profileImageUrl = Array.isArray(profileDetails?.profiles)
    ? profileDetails.profiles.map((profile) => profile.profile_image_url)[0]
    : '';

  const profileType = Array.isArray(profileDetails?.profiles)
    ? profileDetails.profiles.map((profile) => profile.profile_type)[0]
    : '';

  const handleCloseModal = () => {
    setEditProfileModal(false);
  };

  const handleClick = () => {
    setEditProfileModal(true);
  };

  const handleOk = () => {
    handleCloseModal();
  };
  useEffect(() => {
    if (userId) {
      dispatch(fetchHostInfo(userId));
    }
  }, [userId, dispatch]);

  return (
    <>
      <div className="fixed-header">
        <div className="profile-header">
          <div className="profile-background" />
          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-cols-[15%_55%_25%] gap-2 profile-grid mb-0">
            <div className="avatar-container">
              <Avatar
                shape="circle"
                className="avatar-profile"
                src={profileImageUrl || undefined}
                icon={!profileImageUrl && <UserOutlined />}
              />
              <span className="p-2 avatar-info">
                <img
                  src={House as unknown as string}
                  alt="id"
                  className="me-1"
                />

                {nameDetails?.profiles?.map((item) => (
                  <span
                    key={item.id || item.profile_type}
                    className="custom-text-truncate cursor-pointer"
                    title="individual's details"
                  >
                    {item.profile_type}{' '}
                  </span>
                ))}
              </span>
            </div>
            <div className="p-0 md:pl-0 profile-ul-list">
              <h1
                className="md:text-lg text-sm font-bold text-black-color profile-name custom-text-truncate"
                title={`${nameDetails?.name || ''} ${nameDetails?.sur_name || ''}`}
              >
                {nameDetails?.name} {nameDetails?.sur_name}
              </h1>

              <ul className="flex flex-wrap space-x-4">
                <li className="flex py-2 px-0 profile-list-item">
                  <img src={Email as unknown as string} alt="email" />
                  <p
                    className="md:text-sm text-xs text-grey-color font-normal ms-2 w170 custom-text-truncate"
                    title={nameDetails?.email || ''}
                  >
                    {nameDetails?.email}
                  </p>
                </li>
                <li className="flex p-2 profile-list-item">
                  <img src={Phone as unknown as string} alt="phone" />
                  <p
                    className="md:text-sm text-xs text-grey-color font-normal ms-2 w85 custom-text-truncate"
                    title={nameDetails?.phone || ''}
                  >
                    {nameDetails?.phone}
                  </p>
                </li>
                <li className="flex py-2 profile-list-item">
                  <img src={IDCard as unknown as string} alt="id" />
                  <p className="md:text-sm text-xs text-grey-color font-normal ms-2 w100 custom-text-truncate">
                    {(profileValues as unknown as Host)?.id || 'N/A'}
                  </p>
                </li>
              </ul>
            </div>
            <div className="px-0 py-md-4 py-0 text-end">
              <CustomButton
                componentType="btnwithIcon"
                className="additional-class mt-2"
                icon={<PencilSquare className="fill-primary" />}
                onClick={handleClick}
              >
                <span className="text-primary-color fw700">Edit</span>
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-body">
        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-[45%_55%] gap-2 profile-card-details">
          <div>
            <CreditCardDetails />
            <BankDetails />
            <EmergencyDetails />
          </div>
          <div className="common-company-detail">
            {companyDetails.length > 0 && <CompanyDetails />}
            <WebsiteDetails />
          </div>
        </div>
      </div>
      {editProfileModal && (
        <EditProfileModal
          handleOk={handleOk}
          handleCancel={handleCloseModal}
          visible={editProfileModal}
          firstName={nameDetails?.name || ''}
          lastName={nameDetails?.sur_name || ''}
          profileImageUrl={profileImageUrl || ''}
          profileType={profileType || ''}
          phoneNumber={(profileValues as unknown as Host)?.phone || ''}
          countryCode={(profileValues as unknown as Host)?.country_code || ''}
        />
      )}
    </>
  );
};

export default ProfileFeature;
