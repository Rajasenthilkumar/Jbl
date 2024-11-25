import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useEffect, useMemo, useState } from 'react';
import { Plus } from 'react-bootstrap-icons';
import { fetchCard, fetchCustomer } from 'stores/slice/customerSlice';
import CustomButton from 'views/components/button';
import CreditCardComponent from 'views/components/card/CreditCard';
import CreditCardDetailsModal from './CreditCardDetailsModal';

interface DebitDetail {
  account_name: string;
  last4: string;
  exp_month: string;
  exp_year: string;
}

interface CustomerProfile {
  name: string;
  sur_name: string;
}

const CreditCardDetails = () => {
  const [addCreditModal, setCreditModal] = useState(false);
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
  const codeDetails = useAppSelector(
    (state) => state.auth.profileDetails?.profiles?.[0]?.paystack_customer_code,
  );
  const cardNumbers = debitDetails.map((card) => card.last4).filter(Boolean);
  const expMonths = debitDetails.map((card) => card.exp_month).filter(Boolean);
  const expYears = debitDetails.map((card) => card.exp_year).filter(Boolean);
  const hasDebitDetails = useMemo(
    () => debitDetails.length > 0,
    [debitDetails.length],
  );

  const handleClick = () => {
    setCreditModal(true);
  };

  const handleCloseModal = () => {
    setCreditModal(false);
  };

  const handleOk = () => {
    handleCloseModal();
  };

  useEffect(() => {
    if (userId && hasDebitDetails) {
      dispatch(fetchCustomer(userId));
    }

    if (companyDetails.length > 0) {
      dispatch(fetchCard());
    }
  }, [dispatch, userId, hasDebitDetails, companyDetails.length]);

  const getCardName = () => {
    if (debitDetails.length > 0) {
      return `Mastercard... ${codeDetails && cardNumbers.length ? cardNumbers.join(', ') : ''}`;
    }
    return '';
  };

  const getCardNumber = () => {
    if (debitDetails.length > 0) {
      return `${codeDetails && expMonths.length ? expMonths.join(', ') : 'N/A'}/${codeDetails && expYears.length ? expYears.join(', ') : 'N/A'}`;
    }
    return '';
  };

  const getAccountName = () => {
    if (
      debitDetails.length > 0 &&
      profileDetails &&
      profileDetails.name &&
      profileDetails.sur_name
    ) {
      return `${profileDetails?.name} ${profileDetails?.sur_name}`;
    }
    return '';
  };

  return (
    <>
      <div className="card-detail-style credit-card-style">
        <div className="card-header-details custom-card-header">
          <h1 className="card-detail-heading">Credit Card Details</h1>
          {debitDetails.length > 0 ? (
            <CustomButton
              componentType="btnwithIcon"
              className="additional-class"
              icon={<Plus className="fill-primary" />}
              onClick={handleClick}
            >
              <span className="text-primary-color fw700">Add</span>
            </CustomButton>
          ) : null}
        </div>
        {debitDetails.length > 0 ? (
          <CreditCardComponent
            cardLogo={'cardlogo'}
            cardinfoclassName={'flex'}
            title={'CARD NAME'}
            imageUrl={''}
            textValue={getCardName()}
            expirydateValue={getCardNumber()}
            infoClassname={'infoClassname'}
            subclassName={'sub-classname'}
            textDetailsclassName={
              'textDetailsclassName custom-text-truncate w200'
            }
            cardNameValue={getAccountName()}
            cardName={'CARDHOLDER NAME'}
            expirydateLabel={'EXPIRATION DATE'}
            titleDetail={''}
          />
        ) : (
          <div className="bg-white p-4 br-bl-10px custom-creditcard">
            No Credit card found
          </div>
        )}
      </div>
      {addCreditModal && (
        <CreditCardDetailsModal
          open={addCreditModal}
          handleOk={handleOk}
          handleCancel={handleCloseModal}
        />
      )}
    </>
  );
};

export default CreditCardDetails;
