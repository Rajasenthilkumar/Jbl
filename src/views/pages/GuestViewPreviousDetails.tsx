import { Breadcrumb } from 'antd';
import { useLocation } from 'react-router-dom';
import GuestDashboardBankDetails from 'views/components/card/GuestDashboardBankDetails';
import GuestDashboardBookingDetails from 'views/components/card/GuestDashboardBookingDetails';
import GuestDashboardHostDetails from 'views/components/card/GuestDashboardHostDetails';
import GuestDashboardTermsConditions from 'views/components/card/GuestDashboardTermsConditions';

const GuestViewPreviousDetails = () => {
  const location = useLocation();
  const { bookingDetails } = location.state || {};
  if (!bookingDetails) {
    return <p>No booking details available</p>;
  }
  return (
    <div className="mb-5">
      <Breadcrumb
        items={[
          {
            title: 'Dashboard',
          },
          {
            title: <a href="">Booking Details</a>,
          },
        ]}
      />

      <div
        className="grid grid-cols-1 md:grid-cols-3 md:grid-cols-[50%_50%] gap-5 
      guest-dashboard-grid mb-0"
      >
        <div>
          <GuestDashboardBookingDetails bookingDetails={bookingDetails} />
          <GuestDashboardBankDetails />
          <GuestDashboardTermsConditions />
        </div>
        <div>
          <GuestDashboardHostDetails bookingDetails={bookingDetails} />
        </div>
      </div>
    </div>
  );
};
export default GuestViewPreviousDetails;
