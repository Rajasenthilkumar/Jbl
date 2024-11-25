import {
  DeleteOutlined,
  UploadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Avatar, Button, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { countries } from 'constants/countries';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { type FC, useEffect } from 'react';
import { Controller, useForm, useFormState } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import toast from 'react-hot-toast';
import { fetchGuestInfo } from 'stores/slice/authSlice';
import {
  editGuestNameDetails,
  toggleChangePasswordVisibility,
} from 'stores/slice/profileGuestSlice';
import type { ApiError } from 'utilities/api';
import { AntPhone } from 'views/components/AntPhone';
import { FormContent, FromContainer } from 'views/components/FormComponents';
import CustomButton from 'views/components/button';
import CustomFileUploadButton from 'views/components/button/customButton';
import ChangeGuestPasswordForm from '../profile/changePassword/ChangeGuestPasswordForm';
import { type EditGuestNameSchema, editGuestNameSchema } from './schema';

// Convert the input code to a string, even if it's not already a string
// and remove unwanted characters like quotes (") and backslashes (\)
const sanitizeCountryCode = (code: unknown): string => {
  return String(code).replace(/["\\]/g, '');
};

interface Props {
  firstNameValue: string;
  surNameValue: string;
  profileImageUrlValue: string;
  phoneNumber: string;
  countryCode: string | undefined;
  profileTypeValue: string;
  email: string;
  bio: string;
  handleCancel: () => void;
  handleOk: () => void;
}

const EditGuestInformation: FC<Props> = ({
  firstNameValue,
  surNameValue,
  phoneNumber,
  email,
  countryCode,
  profileImageUrlValue,
  bio,
  handleCancel,
  handleOk,
}) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.userId);
  const isChangePasswordVisible = useAppSelector(
    (state) => state.profile.isChangePasswordVisible,
  );
  const { control, handleSubmit, setValue, getValues } =
    useForm<EditGuestNameSchema>({
      mode: 'onChange',
      resolver: zodResolver(editGuestNameSchema),
      defaultValues: {
        first_name: firstNameValue,
        last_name: surNameValue,
        phone: phoneNumber,
        country_code: countryCode,
        image_url: profileImageUrlValue,
        bio: bio,
        email: email,
      },
    });

  const { errors } = useFormState({ control });

  useEffect(() => {
    if (userId) {
      dispatch(fetchGuestInfo(userId));
    }
  }, [dispatch, userId]);

  const handleToggleChangePassword = () => {
    dispatch(toggleChangePasswordVisibility());
  };

  const onSave = async () => {
    const formValues = getValues();
    try {
      const sanitizedFormValues = {
        ...formValues,
        country_code: sanitizeCountryCode(formValues.country_code), //The 'country_code' is expected to be either a dialing code (e.g., +1 for the US) * or an ISO country code (e.g., US), so the sanitization ensures proper formatting for either case.
      };

      editGuestNameSchema.parse(sanitizedFormValues);
    } catch (error) {
      const apiError: ApiError = error as ApiError;
      const errorMsgString = apiError.data.error.msg;
      toast.error(
        typeof errorMsgString === 'string'
          ? errorMsgString.replace(/\\/g, '')
          : String(errorMsgString),
      );
      return;
    }

    const requestData: EditGuestNameSchema = {
      first_name: formValues.first_name,
      last_name: formValues.last_name,
      image_url: formValues.image_url,
      email: formValues.email,
      phone: formValues.phone,
      country_code: sanitizeCountryCode(formValues.country_code),
      bio: formValues.bio,
    };

    dispatch(
      editGuestNameDetails({
        profileData: requestData,
      }),
    );
    toast.success('Profile details updated successfully!');

    setTimeout(() => {
      if (userId) {
        dispatch(fetchGuestInfo(userId));
      }
    }, 50);

    handleOk();
  };

  const handleChangeCountryCode = (countryCode: string) => {
    setValue('country_code', countryCode);
  };

  const handlePhoneNumber = (phoneNumber: string) => {
    setValue('phone', phoneNumber, {
      shouldValidate: true,
    });
  };

  const handleGetCountryCode = () => {
    if (!countryCode) {
      console.error('countryCode is undefined or null');
      return '';
    }
    // Check if '+' is already present in the countryCode
    const countryCodeData = countryCode.startsWith('+')
      ? countryCode
      : `+${countryCode}`;

    const matchedCountry = countries.find(
      (country) => country.dialCode === countryCodeData,
    );

    return matchedCountry ? `${matchedCountry.code.toLowerCase()}` : '';
  };

  return (
    <Form onFinish={handleSubmit(onSave)}>
      <FromContainer>
        <FormContent>
          <div className="flex flex-col gap-1 edit-info-modal profile-modal-custom">
            <div className="avatar-containers">
              <Avatar
                shape="circle"
                className="avatar-profiles w90 h90"
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
                  setValue={(value) => setValue('image_url', value)}
                >
                  <span className="text-primary-color fw700">Upload</span>
                </CustomFileUploadButton>

                <CustomButton
                  componentType="btnwithIcon"
                  className="edit-info-modal-btns"
                  icon={<DeleteOutlined className="fill-primary" />}
                  onClick={() => {
                    setValue('image_url', '');
                    toast.success('Profile image removed!');
                    onSave();
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
                    setValue('image_url', file.name);
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
                  Full Name
                </label>
                <Input
                  id="fullName"
                  placeholder="Enter Full Name"
                  size="large"
                  className="py-3 fullname-info mb-2"
                  defaultValue={firstNameValue}
                  onChange={(e) =>
                    setValue('first_name', e.target.value, {
                      shouldValidate: true,
                    })
                  }
                />
                {errors?.first_name && (
                  <div className="red__color mb-1">
                    {errors.first_name.message}
                  </div>
                )}

                <Input
                  placeholder="Enter Surname"
                  size="large"
                  className="py-3 surname-info mb-2"
                  defaultValue={surNameValue}
                  onChange={(e) =>
                    setValue('last_name', e.target.value, {
                      shouldValidate: true,
                    })
                  }
                />

                {errors?.last_name && (
                  <div className="red__color mb-1">
                    {errors.last_name.message}
                  </div>
                )}
                <div className="mt-1">
                  <label
                    htmlFor="fullName"
                    className="block mb-1 text-sm font-semibold text-[#051621] form-label"
                  >
                    Email
                  </label>

                  <Input
                    placeholder="Enter Email"
                    size="large"
                    className="py-3 surname-info mb-2"
                    defaultValue={email}
                    onChange={(e) =>
                      setValue('email', e.target.value, {
                        shouldValidate: true,
                      })
                    }
                  />

                  {errors?.email && (
                    <div className="red__color mb-1">
                      {errors.email.message}
                    </div>
                  )}
                </div>

                <div className="mt-1">
                  <label
                    htmlFor="bio"
                    className="block mb-1 text-sm font-semibold text-[#051621] form-label"
                  >
                    Phone
                  </label>
                  <FormItem control={control} name="phone">
                    <Controller
                      control={control}
                      name="phone"
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
                  </FormItem>
                </div>

                <div className="mt-1">
                  <label
                    htmlFor="bio"
                    className="block mb-1 text-sm font-semibold text-[#051621] form-label"
                  >
                    Bio
                  </label>
                  <TextArea
                    id="bio"
                    placeholder="Enter your bio"
                    size="small"
                    className="py-3 fullname-info mb-2"
                    defaultValue={bio}
                    onChange={(e) =>
                      setValue('bio', e.target.value, {
                        shouldValidate: true,
                      })
                    }
                    rows={4}
                  />
                </div>
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
                  <ChangeGuestPasswordForm
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
                <Button
                  type="primary"
                  htmlType="submit"
                  className="save-btn"
                  onClick={onSave}
                >
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

export default EditGuestInformation;
