import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useEffect, useState } from 'react';
import { PencilSquare } from 'react-bootstrap-icons';
import { fetchGuestInfo } from 'stores/slice/authSlice';
import EditGuestProfileModal from 'views/features/guestProfile/EditGuestProfileModal';
import Email from '../../../assets/profile/email_icon.svg';
import Phone from '../../../assets/profile/ph_icon.svg';
import CustomButton from '../button';

const GuestProfileCard = () => {
  const userId = useAppSelector((state) => state.auth.userId);
  const nameDetails = useAppSelector((state) => state.auth.profileGuestDetails);
  const [editProfileModal, setEditProfileModal] = useState(false);
  const profileImageUrl = useAppSelector(
    (state) => state.auth.profileGuestDetails?.image_url,
  );
  const dispatch = useAppDispatch();

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
      dispatch(fetchGuestInfo(userId));
    }
  }, [userId, dispatch]);

  return (
    <>
      <div className="mb-0">
        <div className="avatar-container">
          <Avatar
            shape="circle"
            className="avatar-profile"
            src={profileImageUrl || undefined}
            icon={!profileImageUrl && <UserOutlined />}
          />
        </div>
      </div>
      <div className="p-0 md:pl-0 profile-ul-list">
        <h1
          className="md:text-lg text-sm font-bold text-black-color profile-name custom-text-truncate text-center mt-7"
          title={`${nameDetails?.first_name || ''} ${nameDetails?.last_name || ''}`}
        >
          {nameDetails?.first_name} {nameDetails?.last_name}
        </h1>

        <ul className="flex flex-col items-center space-y-4">
          <li className="py-2 px-0 profile-list-item">
            <div className="flex">
              <img src={Email as unknown as string} alt="email" />
              <span
                className="md:text-sm text-xs text-grey-color font-normal ms-2 custom-guest-list custom-text-truncate"
                title={nameDetails?.email || ''}
              >
                {nameDetails?.email}
              </span>
            </div>
          </li>
          <li className="flex px-0 pb-2 profile-list-item phone-detail-item mt-0 pt-0">
            <div className="flex">
              <img src={Phone as unknown as string} alt="phone" />
              <span
                className="md:text-sm text-xs text-grey-color font-normal ms-2 custom-guest-list custom-text-truncate"
                title={nameDetails?.phone || ''}
              >
                {nameDetails?.phone}
              </span>
            </div>
          </li>
        </ul>
      </div>
      <div className="br-gray-a br8 guest-profile-info">
        <p className="md:text-sm text-xs text-grey-color font-normal p-1">
          {nameDetails?.bio}
        </p>
      </div>

      <div className="px-0 py-md-4 py-0 my-2 md:my-2 text-center">
        <CustomButton
          componentType="btnwithIcon"
          className="additional-class mt-0"
          icon={<PencilSquare className="fill-primary" />}
          onClick={handleClick}
        >
          <span className="text-primary-color fw700">Edit</span>
        </CustomButton>
      </div>
      <EditGuestProfileModal
        handleOk={handleOk}
        handleCancel={handleCloseModal}
        visible={editProfileModal}
        firstName={nameDetails?.first_name || ''}
        lastName={nameDetails?.last_name || ''}
        phoneNumber={nameDetails?.phone || ''}
        email={nameDetails?.email || ''}
        countryCode={nameDetails?.country_code || ''}
        bio={nameDetails?.bio || ''}
        profileImageUrl={profileImageUrl || ''}
      />
    </>
  );
};

export default GuestProfileCard;
