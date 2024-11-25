import { Drawer } from 'antd';
import type { FC } from 'react';
import CompanyDetailEntity from './CompanyDetailEntity';

type Props = {
  titleValue: string;
  idNumber: string;
  countryOfIssue: string;
  residentialAddress: string;
  addressProof: string;
  companyValue: string;
  countrytitleValue: string;
  vatDetailValue: string;
  addresstextValue: string;
  documenttitleValue: string;
  profileType: string;
  profileId: number | null;
  open: boolean;
  handleOk: () => void;
  handleCancel: () => void;
};

const CompanyDetailsModal: FC<Props> = ({
  titleValue,
  idNumber,
  countryOfIssue,
  residentialAddress,
  addressProof,
  profileType,
  companyValue,
  countrytitleValue,
  vatDetailValue,
  documenttitleValue,
  addresstextValue,
  open,
  handleCancel,
  handleOk,
}) => {
  return (
    <Drawer
      title="Company Details"
      placement="right"
      closable={true}
      onClose={handleCancel}
      visible={open}
      width={400}
    >
      <CompanyDetailEntity
        titleValue={titleValue}
        idNumber={idNumber}
        countryOfIssue={countryOfIssue}
        residentialAddress={residentialAddress}
        addressProof={addressProof}
        companyValue={companyValue}
        countrytitleValue={countrytitleValue}
        vatDetailValue={vatDetailValue}
        documenttitleValue={documenttitleValue}
        addresstextValue={addresstextValue}
        profileTypeValue={profileType}
        handleCancel={handleCancel}
        handleOk={handleOk}
      />
    </Drawer>
  );
};

export default CompanyDetailsModal;
