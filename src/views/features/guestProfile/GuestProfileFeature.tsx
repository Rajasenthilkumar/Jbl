import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useEffect, useState } from 'react';
import { fetchGuestInfo } from 'stores/slice/authSlice';
import GuestProfileCard from 'views/components/card/GuestProfileCard';
import GuestReviewCard from 'views/components/card/GuestReviewCard';
import GuestReviewCardDetails from 'views/components/card/GuestReviewCardDetails';
import RatingIcon from 'views/components/icons/RatingIcon';

const GuestProfileFeature = () => {
  const [activeTab, setActiveTab] = useState<'reviews' | 'cards'>('reviews');

  const showReviewHandler = () => {
    setActiveTab('reviews');
  };

  const showDetailHandler = () => {
    setActiveTab('cards');
  };

  const userId = useAppSelector((state) => state.auth.userId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(fetchGuestInfo(userId));
    }
  }, [userId, dispatch]);

  return (
    <>
      <div className="fixed-header guest-fixed-header">
        <div className="profile-header">
          <div className="profile-background guest-profile-bg h130">
            <div className="flex justify-end pt20">
              <div className="bg-yellow p-3 w-fit br10 guest-profile-rating mr20">
                <span className="md:text-sm text-xs text-grey-color font-normal">
                  Overall Rating
                </span>
                <div className="flex my-2">
                  <RatingIcon />
                  <span className="mx-0 md:text-lg text-sm font-bold text-black-color">
                    4.8
                  </span>
                  <span className="mx-2 md:text-sm text-xs text-grey-color font-normal fs-12 my-auto">
                    50 Reviews
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-[40%_60%] gap-4 mt-0 mx-5">
        <div className="guest-card profile-detail relative bg-white rounded-lg shadow-lg p-4 w-full -mt-20">
          <GuestProfileCard />
        </div>

        <div className="guest-card profile-review bg-white rounded-lg shadow-lg p-4 w-full ms-2 me-3">
          <div className="flex pb-2 mb-2 bg-white w-fit">
            {/* Reviews Button */}
            <Button
              type="primary"
              className={`py-2 mt-2 mx-0 guest-btn-review ${
                activeTab === 'reviews'
                  ? 'bg-blue-400 text-white'
                  : 'bg-white text-blue-400'
              }`}
              onClick={showReviewHandler}
            >
              Reviews
            </Button>

            {/* Cards Button */}
            <Button
              type="primary"
              className={`py-2 mt-2 ms-0 me-2 guest-btn-card ${
                activeTab === 'cards'
                  ? 'bg-blue-400 text-white'
                  : 'bg-white text-blue-400'
              }`}
              onClick={showDetailHandler}
            >
              Cards
            </Button>
          </div>

          {/* Conditionally Render Content */}
          {activeTab === 'reviews' && <GuestReviewCard />}
          {activeTab === 'cards' && <GuestReviewCardDetails />}
        </div>
      </div>
    </>
  );
};

export default GuestProfileFeature;
