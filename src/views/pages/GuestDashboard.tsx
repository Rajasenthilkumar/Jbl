import { Rate } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useEffect, useState } from 'react';
import GuestDashboardReviewCard from 'views/components/card/GuestDashboardReviewCard';
import GuestPreviousStayCard from 'views/components/card/GuestPreviousStayCard';
import GuestRegionMapCard from 'views/components/card/GuestRegionMapCard';
import GuestUpcomingStayCard from 'views/components/card/GuestUpcomingStayCard';
import stay from '../../assets/icons/bx-hotel.svg';
import star from '../../assets/icons/bx-star.svg';
import { guestDashboard } from '../../stores/slice/profileGuestSlice';

const GuestDashboard = () => {
  const dispatch = useAppDispatch();

  const dashboard = useAppSelector(
    (state) => state.guestProfile.guestDashboard.data?.result,
  );

  const initialRating = dashboard?.rating ?? 'N/A';
  const [ratingValue, setRatingValue] = useState(initialRating);

  useEffect(() => {
    dispatch(guestDashboard());
  }, [dispatch]);

  useEffect(() => {
    if (dashboard) {
      setRatingValue(dashboard.rating ?? 'N/A');
    }
  }, [dashboard]);

  return (
    <div className="main-container">
      {' '}
      <div
        className="grid grid-cols-1 md:grid-cols-3 md:grid-cols-[65%_35%] gap-5 
        guest-dashboard-grid mb-0"
      >
        <div>
          <div className="block lg:flex md:flex">
            <div className="bg-yellow p-3 w-fit br10 guest-profile-rating guest-dashborad-style mx-0">
              <div>
                <p className="md:text-sm text-xs text-grey-color font-normal text-start">
                  Your Rating
                </p>
                <div className="flex my-2">
                  <span className="ms-0 md:text-lg text-sm font-bold text-black-color me-1">
                    {ratingValue}
                  </span>
                  <Rate value={dashboard?.rating} disabled />
                </div>
              </div>
            </div>
            <div className="bg-white p-3 w200 br10 guest-profile-stays guest-dashborad-style">
              <p className="md:text-sm text-xs text-grey-color font-normal text-start">
                Total Stays
              </p>
              <div className="flex my-2 justify-between items-center">
                <span className="ms-0 md:text-lg text-sm font-bold text-black-color me-1">
                  {dashboard?.totalBookings ?? 0}
                </span>
                <img src={stay as unknown as string} alt="stay" />
              </div>
            </div>

            <div className="bg-white p-3 w200 br10 guest-profile-stays guest-dashborad-style">
              <p className="md:text-sm text-xs text-grey-color font-normal text-start">
                Your Reviews
              </p>
              <div className="flex my-0 justify-between items-center">
                <span className="ms-0 md:text-lg text-sm font-bold text-black-color me-1">
                  {dashboard?.totalReviews ?? 0}
                </span>
                <img src={star as unknown as string} alt="star" />
              </div>
            </div>
          </div>

          <GuestUpcomingStayCard data={dashboard?.upcomingBookings || []} />
          <GuestPreviousStayCard data={dashboard?.pastBookings || []} />
        </div>
        <div className="guest-dashboard-right-container">
          <GuestDashboardReviewCard /* data={dashboard?.reviews} */ />
          <GuestRegionMapCard />
        </div>
      </div>
    </div>
  );
};

export default GuestDashboard;
