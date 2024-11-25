import { Avatar, List } from 'antd';
import { Link } from 'react-router-dom';
import type { upcomingBookings } from 'types/guest';
import DateIcon from '../../../assets/icons/guest-stay/date.svg';
import DayIcon from '../../../assets/icons/guest-stay/days.svg';
import TickIcon from '../../../assets/icons/guest-stay/green-tick.svg';
import LocationIcon from '../../../assets/icons/guest-stay/locate.svg';
import NightIcon from '../../../assets/icons/guest-stay/night.svg';
import RateIcon from '../../../assets/icons/guest-stay/star.svg';
import sampleImgGuest from '../../../assets/profile/sample-img-guest.svg';

interface GuestUpcomingStayCardProps {
  data: upcomingBookings[];
}

const GuestUpcomingStayCard = ({ data }: GuestUpcomingStayCardProps) => {
  if (!data || data.length === 0) {
    return <div>No upcoming stays available.</div>;
  }
  const list = data || [];

  const calculateNights = (
    checkInDate: string,
    checkOutDate: string,
  ): number => {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    const timeDifference = checkOut.getTime() - checkIn.getTime();
    const nights = timeDifference / (1000 * 60 * 60 * 24);

    return Math.max(nights, 0);
  };

  return (
    <div>
      <p className="pt-4 md:text-lg text-sm font-bold text-black-color">
        Upcoming Stay
      </p>
      <div className="upcomingstay-card-list">
        <List
          itemLayout="horizontal"
          dataSource={list}
          renderItem={(item, index) => (
            <List.Item key={index}>
              <div className="md:flex block">
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={
                        item.property.manualProperty.propertyImage ||
                        (sampleImgGuest as unknown as string)
                      }
                    />
                  }
                  title={
                    <span className="font-semibold">
                      {item.property.manualProperty.propertyName}
                    </span>
                  }
                  description={
                    <div>
                      <div className="flex items-center">
                        <img
                          src={LocationIcon as unknown as string}
                          alt="Location Icon"
                          className="mr-3"
                        />
                        <span>
                          {item.property.manualProperty.propertyLocation}
                        </span>
                      </div>
                      <div className="flex items-center mt-1">
                        <p className="flex">
                          <img
                            src={DateIcon as unknown as string}
                            alt="Date Icon"
                            className=""
                          />
                          <span className="ms-1">{item.CheckInDate}</span>
                        </p>
                        <p className="flex">
                          <img
                            src={DayIcon as unknown as string}
                            alt="Date Icon"
                            className="ms-1"
                          />
                          <span className="ms-1">{item.TotalGuest} </span>
                        </p>
                        <p className="flex">
                          <img
                            src={NightIcon as unknown as string}
                            alt="Date Icon"
                            className="ms-1"
                          />
                          <span className="ms-1">
                            {' '}
                            {calculateNights(
                              item.CheckInDate,
                              item.CheckOutDate,
                            )}
                          </span>
                        </p>
                        <p className="flex">
                          <img
                            src={RateIcon as unknown as string}
                            alt="Rating Icon"
                            className="ms-1"
                          />
                          <span className="ms-1">5</span>
                        </p>
                      </div>
                      <div className="card-header-details review-card-header p-0">
                        <div className="flex items-center review-status">
                          <span className="">Damage Waiver</span>
                          <img
                            src={TickIcon as unknown as string}
                            alt="Location Icon"
                            className="ms-2"
                          />
                        </div>
                        <div className="flex">
                          <Link
                            to="/GuestViewUpcomingDetails"
                            state={{ bookingDetails: item }}
                            className="flex items-center text-blue-500 view-detail-previousstay-link mt-7"
                          >
                            <span className="md:text-sm text-xs text-blue-500 font-normal text-start">
                              View Details
                            </span>
                            <svg
                              className="text-blue-500 ms-2 my-2"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              width="24"
                              height="24"
                            >
                              <path d="M10 6l6 6-6 6" stroke="currentColor" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  }
                />
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default GuestUpcomingStayCard;
