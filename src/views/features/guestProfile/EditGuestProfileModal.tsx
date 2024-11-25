import { Drawer } from 'antd';
import type { FC } from 'react';
import EditGuestInformation from './EditGuestInformation';

type Props = {
  visible: boolean;
  firstName: string;
  lastName?: string;
  profileImageUrl?: string;
  profileType?: string;
  phoneNumber: string;
  email: string;
  countryCode: string | undefined;
  bio?: string;
  handleOk: () => void;
  handleCancel: () => void;
};

const EditGuestProfileModal: FC<Props> = ({
  firstName,
  lastName = '',
  phoneNumber = '',
  email = '',
  countryCode,
  visible,
  profileType = '',
  profileImageUrl = '',
  bio = '',
  handleCancel,
  handleOk,
}) => {
  return (
    <Drawer
      title="Edit Information"
      placement="right"
      onClose={handleCancel}
      visible={visible}
      width={400}
    >
      <EditGuestInformation
        firstNameValue={firstName}
        surNameValue={lastName}
        handleCancel={handleCancel}
        profileImageUrlValue={profileImageUrl}
        handleOk={handleOk}
        email={email}
        profileTypeValue={profileType}
        phoneNumber={phoneNumber}
        countryCode={countryCode}
        bio={bio}
      />
    </Drawer>
  );
};

export default EditGuestProfileModal;
