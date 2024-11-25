import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Input } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import type React from 'react';
import { useEffect, useState } from 'react';
import { PencilSquare } from 'react-bootstrap-icons';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BsLink45Deg } from 'react-icons/bs';
import { fetchCard } from 'stores/slice/customerSlice';
import { editWebsitedetails } from 'views/features/profile/GuestCardSlice';
import {
  type EditWebsiteDetailsSchema,
  editWebsiteDetailsSchema,
} from 'views/features/profile/schema';
import CustomButton from '../button';

interface CardProps {
  className: string;
  cardinfoclassName: string;
  subclassName: string;
  textDetailsclassName: string;
  websiteDetailsclassname: string;
  titleclassName: string;
  cardtitle: string;
  websiteIcon: string;
  link: string;
  profileType: string;
  imageiconname: string;
  websiteValue: string;
  emergencycardtitle: string;
  inputStyleclassName: string;
  webSaveclassname: string;
  handleCancel: () => void;
  handleOk: () => void;
}

const WebsiteDetailCardComponent: React.FC<CardProps> = ({
  handleOk,
  className,
  cardinfoclassName,
  profileType,
  subclassName,
  textDetailsclassName,
  inputStyleclassName,
  websiteDetailsclassname,
  webSaveclassname,
  titleclassName,
  cardtitle,
  emergencycardtitle,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();
  const companyDetails = useAppSelector(
    (state) => state.auth.profileDetails?.profiles ?? [],
  );

  const websiteLink =
    companyDetails.length > 0 && companyDetails[0].company_website
      ? companyDetails[0].company_website
      : '';
  const [websitedetailValue, setWebsiteDetailValue] = useState(websiteLink);

  useEffect(() => {
    if (companyDetails.length > 0) {
      dispatch(fetchCard());
    }
  }, [dispatch, companyDetails]);
  const handleEditClick = () => {
    setIsEditing(true);
    setValue('company_website', websitedetailValue);
  };

  const { handleSubmit, setValue } = useForm<EditWebsiteDetailsSchema>({
    mode: 'onChange',
    resolver: zodResolver(editWebsiteDetailsSchema),
  });

  const onSave = async () => {
    const requestData = {
      company_website: websitedetailValue || '',
    };
    await dispatch(
      editWebsitedetails({
        websiteDetails: requestData,
        profileType: profileType,
      }),
    );

    toast.success('Website Link updated successfully!');
    setIsEditing(false);
    handleOk();
  };

  return (
    <Form onFinish={handleSubmit(onSave)}>
      <div className="bg-white p-4 br10 website-details">
        <div className={className}>
          <h1 className={titleclassName}>{cardtitle}</h1>
          {companyDetails.length > 0 && !isEditing ? (
            <CustomButton
              componentType="btnwithIcon"
              className="additional-class"
              icon={<PencilSquare className="fill-primary" />}
              onClick={handleEditClick}
            >
              <span className="text-primary-color fw700">Edit</span>
            </CustomButton>
          ) : null}
        </div>
        {companyDetails.length > 0 ? (
          <div className="">
            <div className="">
              <h2 className={subclassName}>{emergencycardtitle}</h2>
              <div className={cardinfoclassName}>
                <div
                  className={`${textDetailsclassName} ${websiteDetailsclassname}`}
                >
                  <Input
                    prefix={<BsLink45Deg className="fill-primary" />}
                    value={websitedetailValue || ''}
                    onChange={(e) => setWebsiteDetailValue(e.target.value)}
                    disabled={!isEditing}
                    placeholder="Paste link here"
                    bordered={false}
                    className={inputStyleclassName}
                  />
                </div>

                {isEditing && (
                  <div className={webSaveclassname}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="save-btn"
                    >
                      Save Changes
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-4 br10 website-details">
            {' '}
            No website Details found{' '}
          </div>
        )}
      </div>
    </Form>
  );
};

export default WebsiteDetailCardComponent;
