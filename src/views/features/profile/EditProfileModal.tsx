import { Drawer } from 'antd';
import type { FC } from 'react';
import EditInformation from './EditInformation';

type Props = {
  visible: boolean;
  firstName: string;
  lastName?: string;
  profileImageUrl?: string;
  profileType?: string;
  phoneNumber: string;
  countryCode: string;
  handleOk: () => void;
  handleCancel: () => void;
};

const EditProfileModal: FC<Props> = ({
  firstName,
  lastName = '',
  phoneNumber = '',
  countryCode = '',
  visible,
  profileType = '',
  profileImageUrl = '',
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
      <EditInformation
        firstNameValue={firstName}
        surNameValue={lastName}
        handleCancel={handleCancel}
        profileImageUrlValue={profileImageUrl}
        handleOk={handleOk}
        profileTypeValue={profileType}
        phoneNumber={phoneNumber}
        countryCode={countryCode}
      />
    </Drawer>
  );
};

export default EditProfileModal;
