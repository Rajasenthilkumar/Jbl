import { Modal } from 'antd';
import type { FC } from 'react';

type Props = {
  open: boolean;
  handleCancel: () => void;
};
const RefundableModal: FC<Props> = ({ open, handleCancel }) => {
  return (
    <Modal
      open={open}
      width={650}
      footer={null}
      closable={true}
      maskClosable={true}
      onCancel={handleCancel}
    >
      <div className="refundable-modal">
        <div className="flex flex-col flex-start">
          <h1 className="w-100 py-2 text-xl font-semibold">
            {' '}
            Refundable security deposit
          </h1>
          <p>
            By completing the process herein, you authorise Just Be Lekker Inc.
            (JBL) to process the refundable security deposit amount on your
            card, and to charge your card for any damages, fines or fees up to
            the hold amount, as per the Booking/Rental Ts and Cs, incurred
            during your stay and agree to the terms stated below.
          </p>
          <ol className="modal-ordered-list">
            <li>
              A hold will be placed on your credit/debit card for the security
              deposit amount one day before your check-in date, or on the day of
              check-in for same-day bookings. Additionally, JBL will charge a
              R47 service fee to your card for all refundable security deposits.
            </li>
            <li>
              As long as there are no damages, fines or fees as per the
              Booking/Rental Ts and Cs, the hold on your card will be released
              within 7 days of your check-out date. Your bank may take 3-12
              business days to process the release of funds.
              <li>
                Once the hold has been released, the original authorisation
                amount will simply disappear from your statement.
              </li>
              If it turns out that the hold for the security deposit amount
              cannot be authorised, you'll be notified by email and will need to
              provide another card. Failure to process the hold prior to your
              check-in will result in your access to the property being denied
              and your booking may be cancelled without refund.
            </li>
            <li>
              In the event of damages, fines or fees as per the Booking/Rental
              Ts and Cs, these will be reported to you via email and/or
              WhatsApp. This may include photo(s) and/or video(s) along with
              receipts, invoices, written estimates, or links to comparable
              items showing the actual cash value for repair or replacement. If
              it is determined that money is owed, the total claim amount, plus
              a 15% service fee, will be charged to the card and the balance of
              the hold, if any, will then be released.
            </li>
            <li>
              In the event that there are damages, fines or fees that exceed the
              hold amount, we will charge the card the full hold amount which
              includes the service fee and reserve the right to claim the excess
              amount from you directly plus the 15% service fee. Please ensure
              that your card has enough of an available balance to cover the
              refundable security deposit amount plus the R47 service fee. JBL
              is not responsible for any associated bank fees, including
              overdraft fees or international transaction fees.
            </li>
          </ol>
        </div>
      </div>
    </Modal>
  );
};
export default RefundableModal;
