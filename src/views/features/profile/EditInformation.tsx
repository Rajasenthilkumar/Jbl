import { Avatar, Button, Form, Input } from 'antd';
import { countries } from 'constants/countries';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { type FC, useEffect } from 'react';

import {
  DeleteOutlined,
  UploadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, useFormState } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import toast from 'react-hot-toast';
import { fetchHostInfo } from 'stores/slice/authSlice';
import {
  editNameDetails,
  toggleChangePasswordVisibility,
} from 'stores/slice/profileSlice';
import type { ApiError } from 'utilities/api';
import { AntPhone } from 'views/components/AntPhone';
import { FormContent, FromContainer } from 'views/components/FormComponents';
import CustomButton from 'views/components/button';
import CustomFileUploadButton from 'views/components/button/customButton';
import ChangePasswordForm from './changePassword/ChangePasswordForm';
import { type EditProfileNameSchema, editProfileNameSchema } from './schema';

interface Props {
  firstNameValue: string;
  surNameValue: string;
  profileImageUrlValue: string;
  phoneNumber: string;
  countryCode: string;
  profileTypeValue: string;
  handleCancel: () => void;
  handleOk: () => void;
}

const EditInformation: FC<Props> = ({
  firstNameValue,
  surNameValue,
  phoneNumber,
  countryCode,
  profileImageUrlValue,
  profileTypeValue,
  handleCancel,
  handleOk,
}) => {
  const dispatch = useAppDispatch();
  const isChangePasswordVisible = useAppSelector(
    (state) => state.profile.isChangePasswordVisible,
  );
  const userId = useAppSelector((state) => state.auth.userId);

  const { control, setValue, watch } = useForm<EditProfileNameSchema>({
    mode: 'onChange',
    resolver: zodResolver(editProfileNameSchema),
    defaultValues: {
      profile: {
        other_details: {
          name: firstNameValue,
          sur_name: surNameValue,
          phone: phoneNumber,
          country_code: countryCode,
          profile_image_url: profileImageUrlValue,
        },
      },
    },
  });

  const { errors } = useFormState({ control });

  useEffect(() => {
    if (userId) {
      dispatch(fetchHostInfo(userId));
    }
  }, [dispatch, userId]);

  const handleToggleChangePassword = () => {
    dispatch(toggleChangePasswordVisibility());
  };

  const onSave = async () => {
    const formValues = watch();

    try {
      const sanitizedFormValues = {
        ...formValues,
        profile: {
          ...formValues.profile,
          other_details: {
            ...formValues.profile.other_details,
            country_code: String(formValues.profile.other_details.country_code),
          },
        },
      };

      // Validate the sanitized data with your schema
      editProfileNameSchema.parse(sanitizedFormValues);
    } catch (error) {
      const apiError: ApiError = error as ApiError;

      const errorMsgString = apiError.data.error.msg;
      if (typeof errorMsgString === 'string') {
        toast.error(errorMsgString.replace(/\\/g, ''));
      } else {
        const test = String(errorMsgString).replace(/\\/g, '');
        toast.error(test);
      }
    }

    const sanitizedCountryCode = String(
      formValues.profile.other_details.country_code,
    ).replace(/["\\]/g, '');
    const requestData: EditProfileNameSchema = {
      profile: {
        other_details: {
          name: formValues.profile.other_details.name,
          sur_name: formValues.profile.other_details.sur_name,
          profile_image_url: formValues.profile.other_details.profile_image_url,
          phone: formValues.profile.other_details.phone,
          country_code: sanitizedCountryCode,
        },
      },
    };

    // Dispatch action to update profile
    dispatch(
      editNameDetails({
        profileData: requestData,
        profileType: profileTypeValue,
      }),
    );

    toast.success('Profile details updated successfully!');

    // Fetch updated info
    setTimeout(() => {
      if (userId) {
        dispatch(fetchHostInfo(userId));
      }
    }, 50);

    handleOk();
  };

  const handleChangeCountryCode = (countryCode: string) => {
    setValue('profile.other_details.country_code', countryCode);
  };

  const handlePhoneNumber = (phoneNumber: string) => {
    setValue('profile.other_details.phone', phoneNumber, {
      shouldValidate: true,
    });
  };

  const handleGetCountryCode = () => {
    const countryCodeStr = String(countryCode);

    // Check if '+' is already present in the countryCode
    const countryCodeData = countryCodeStr.startsWith('+')
      ? countryCodeStr
      : `+${countryCodeStr}`;

    const matchedCountry = countries.find(
      (country) => country.dialCode === countryCodeData,
    );
    return matchedCountry ? `${matchedCountry.code.toLowerCase()}` : '';
  };

  return (
    <Form>
      <FromContainer>
        <FormContent>
          <div className="flex flex-col gap-1 edit-info-modal profile-modal-custom">
            <div className="avatar-containers">
              <Avatar
                shape="circle"
                className="avatar-profiles"
                src={profileImageUrlValue || undefined}
                icon={!profileImageUrlValue && <UserOutlined />}
              />
            </div>

            <div className="d-flex">
              <div className="edit-profile-btn">
                <CustomFileUploadButton
                  componentType="btnwithIcon"
                  className="edit-info-modal-btns"
                  icon={<UploadOutlined className="fill-primary" />}
                  setValue={(value) =>
                    setValue('profile.other_details.profile_image_url', value)
                  }
                >
                  <span className="text-primary-color fw700">Upload</span>
                </CustomFileUploadButton>

                <CustomButton
                  componentType="btnwithIcon"
                  className="edit-info-modal-btns"
                  icon={<DeleteOutlined className="fill-primary" />}
                  onClick={() => {
                    setValue('profile.other_details.profile_image_url', '');
                    toast.success('Profile image removed!');
                    onSave();
                    setTimeout(() => {
                      if (userId) {
                        dispatch(fetchHostInfo(userId));
                      }
                    }, 100);
                  }}
                >
                  <span className="text-primary-color fw700">Remove</span>
                </CustomButton>
              </div>
              <input
                id="fileUploadInput"
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setValue(
                      'profile.other_details.profile_image_url',
                      file.name,
                    );
                  }
                }}
              />
            </div>

            <div className="editinfo-form-items">
              <div className="editinfo">
                <label
                  htmlFor="fullName"
                  className="block mb-1 text-sm font-semibold text-[#051621] form-label"
                >
                  FULL NAME
                </label>
                <Input
                  id="fullName"
                  placeholder="Enter Full Name"
                  size="large"
                  className="py-3 fullname-info mb-2"
                  defaultValue={firstNameValue}
                  onChange={(e) =>
                    setValue('profile.other_details.name', e.target.value, {
                      shouldValidate: true,
                    })
                  }
                />
                {errors?.profile?.other_details?.name && (
                  <div className="red__color mb-1">
                    {errors.profile.other_details.name.message}
                  </div>
                )}

                <Input
                  placeholder="Enter Surname"
                  size="large"
                  className="py-3 surname-info mb-2"
                  defaultValue={surNameValue}
                  onChange={(e) =>
                    setValue('profile.other_details.sur_name', e.target.value, {
                      shouldValidate: true,
                    })
                  }
                />

                {errors?.profile?.other_details?.sur_name && (
                  <div className="red__color mb-1">
                    {errors.profile.other_details.sur_name.message}
                  </div>
                )}

                <FormItem control={control} name="profile.other_details.phone">
                  <Controller
                    control={control}
                    name="profile.other_details.phone"
                    render={({ field: { onBlur, value } }) => (
                      <AntPhone
                        value={value}
                        onChange={(countryCode, phoneNumber) => {
                          handlePhoneNumber(phoneNumber);
                          handleChangeCountryCode(countryCode);
                        }}
                        onBlur={onBlur}
                        countryCode={handleGetCountryCode()}
                      />
                    )}
                  />

                  {/* {errors?.profile?.other_details?.phone && (
										<div className="red__color mt-1 mb-1">
											{errors.profile.other_details.phone.message}
										</div>
									)} */}
                </FormItem>

                <div className="flex items-center gap-2">
                  <Button
                    className="w-2/5 mt-2"
                    type="primary"
                    onClick={handleToggleChangePassword}
                  >
                    Change Password
                  </Button>
                </div>
                {isChangePasswordVisible && (
                  <ChangePasswordForm
                    onClose={() => dispatch(toggleChangePasswordVisibility())}
                    open={true}
                  />
                )}
              </div>
            </div>

            <div className="footerclassName">
              <div className="footerLine border-t border-gray-300 mb-2" />
              <div className="displayclassname flex justify-end gap-2">
                <Button className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="primary" className="save-btn" onClick={onSave}>
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </FormContent>
      </FromContainer>
    </Form>
  );
};

export default EditInformation;
