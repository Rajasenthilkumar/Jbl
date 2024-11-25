import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useEffect } from 'react';
/* import { PencilSquare } from 'react-bootstrap-icons'; */
import { useNavigate } from 'react-router-dom';
import { fetchCard, fetchCustomer } from 'stores/slice/customerSlice';
import CustomButton from 'views/components/button';
import BankDetailCardComponent from 'views/components/card/BankDetailCard';
import ProfileHistory from 'views/components/icons/ProfileHistory';

interface DebitDetail {
  bank: string;
  last4: string;
  exp_month: string;
  exp_year: string;
}

interface CustomerProfile {
  name: string;
  sur_name: string;
}

const BankDetails = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.userId);
  const debitDetails = useAppSelector((state) => {
    const result = state.customerDetails?.cardDetails?.data?.result;

    if (result && 'authorizations' in result) {
      return result.authorizations || [];
    }
    return [];
  }) as DebitDetail[];

  const profileDetails = useAppSelector(
    (state) => state.auth.profileDetails,
  ) as CustomerProfile;

  const companyDetails = useAppSelector(
    (state) => state.auth.profileDetails?.profiles ?? [],
  );
  const bankNames = debitDetails.map((card: DebitDetail) => card.bank);

  const handlePaymentHistory = () => {
    navigate('/payment-history');
  };
  useEffect(() => {
    if (userId) {
      dispatch(fetchCustomer(userId));
    }
    if (companyDetails.length > 0) {
      dispatch(fetchCard());
    }
  }, [dispatch, userId, companyDetails.length]);

  return (
    <div>
      <div className="card-header-details custom-card-header bank-detail-header">
        <h1 className="card-detail-heading">Bank Details</h1>
        <div className="flex">
          {/*    <CustomButton
            componentType="btnwithIcon"
            className="edit-btn bank-detail-editbtn"
            icon={<PencilSquare className="fill-primary" />}
            onClick={handleClick}
          >
            <span className="text-primary-color fw700">Edit</span>
          </CustomButton> Commenting this till paystack integration*/}
          <CustomButton
            componentType="btnwithIcon"
            className="add-history-button"
            icon={<ProfileHistory />}
            onClick={handlePaymentHistory}
          >
            <span className="text-primary-color fw700">Payment History</span>
          </CustomButton>
        </div>
      </div>
      <BankDetailCardComponent
        cardinfoclassName={'cardinfoclassName'}
        title={'BANK NAME'}
        titleValue={bankNames[0] || ''}
        subclassName={'sub-classname'}
        textDetailsclassName={'textDetailsclassName'}
        accountholderName={'AC. HOLDER NAME'}
        accountholderValue={`${profileDetails?.name} ${profileDetails?.sur_name}`}
        accountNumber={'AC. NUMBER'}
        accountNumberValue={9876543210}
        bankCodeName={'BANK BRANCH NUMBER'}
        bankCodeValue={543210}
        bankPincodeName={'BIC CODE'}
        bankPincodeValue={'SNBZAJJXXX'}
      />
    </div>
  );
};
export default BankDetails;
