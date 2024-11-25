import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import EditBankDetailModal from 'views/features/guestDashboard/EditBankDetailModal';
import CardIcon from '../../../assets/icons/rupay.svg';
//import CustomButton from '../button';

const GuestDashboardBankDetails = () => {
  const methods = useForm({
    defaultValues: {
      card_holder_name: '',
      card_number: '',
      expiration_date: '',
      cvv: '',
    },
  });
  const [editModal, setEditModal] = useState(false);

  const handleClick = () => {
    setEditModal(true);
  };

  const handleCancel = () => {
    setEditModal(false);
  };

  return (
    <div className="bg-white br10 p-5 mt20">
      <p className="color-[#051621] font-medium text-base mb-2">
        Payment Details
      </p>
      <div className="block lg:flex md:block justify-between items-center mt-4 mb-0 br-gray-a p-4">
        <div className="flex items-center">
          <div className="flex">
            <img src={CardIcon as unknown as string} alt="card" />
            <div className="ms-2">
              <p className="text-[#969696] text-xs uppercase">
                **** **** **** 7892
              </p>
              <p className="text-[#000000] text-base">Exp.Date 18/28</p>
            </div>
          </div>
        </div>

        {/*       feature need to be enabled for future use
  
  <div className="ml-auto my-2">
          <CustomButton
            componentType="btnwithIcon"
            className="additional-class mt-0"
            onClick={handleClick}
          >
            <span className="text-primary-color fw700">Edit</span>
          </CustomButton>
        </div> */}
      </div>

      {editModal && (
        <FormProvider {...methods}>
          <div>
            <button onClick={handleClick}>Open Edit Modal</button>

            <EditBankDetailModal open={editModal} onCancel={handleCancel} />
          </div>
        </FormProvider>
      )}
    </div>
  );
};

export default GuestDashboardBankDetails;
