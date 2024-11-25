import type { BookingDetails } from 'types/guest';
import DateIcon from 'views/components/icons/DateIcon';

interface GuestDashboardBookingDetailsProps {
  bookingDetails: BookingDetails;
}

const GuestDashboardBookingDetails = ({
  bookingDetails,
}: GuestDashboardBookingDetailsProps) => {
  if (!bookingDetails) return <p>No booking data found</p>;

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
    <div className="bg-white br10 p-5 mt20">
      <p className="color-[#051621] font-medium text-base mb-4">
        Booking Details
      </p>
      <div className="block lg:flex md:flex justify-between items-center mt-5 mb-6">
        <div>
          <p className="text-[#969696] text-xs uppercase">Booking Date</p>
          <p className="text-[#000000] text-base">12.02.2024</p>
        </div>
        <div>
          <p className="text-[#969696] text-xs uppercase">
            Protection Reference
          </p>
          <p className="text-[#000000] text-base w150 custom-text-truncate">
            {bookingDetails.protectionRef}
          </p>
        </div>
        <div>
          <p className="text-[#969696] text-xs uppercase">Booking Reference</p>
          <p className="text-[#000000] text-base w150 custom-text-truncate">
            {bookingDetails.bookingReference}
          </p>
        </div>
      </div>
      <div className="block lg:flex md:flex justify-between items-center mt-4 mb-8">
        <div className="flex items-center">
          <DateIcon />
          <div className="">
            <p className="text-[#969696] text-xs uppercase">Check In</p>
            <p className="text-[#000000] text-base">
              {' '}
              {new Date(bookingDetails.CheckInDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <DateIcon />
          <div className="">
            <p className="text-[#969696] text-xs uppercase">Check Out</p>
            <p className="text-[#000000] text-base">
              {' '}
              {new Date(bookingDetails.CheckOutDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
      <div className="block lg:flex md:flex justify-between items-center mt-4 mb-8">
        <div className="flex items-center">
          <div className="">
            <p className="text-[#969696] text-xs uppercase">NO.OF GUESTS</p>
            <p className="text-[#000000] text-base">
              {bookingDetails.TotalGuest}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="">
            <p className="text-[#969696] text-xs uppercase">NO.OF NIGHTS</p>
            <p className="text-[#000000] text-base">
              {' '}
              {calculateNights(
                bookingDetails.CheckInDate,
                bookingDetails.CheckOutDate,
              )}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="">
            <p className="text-[#969696] text-xs uppercase">BOOKING SOURCE</p>
            <p className="text-[#000000] text-base">
              {bookingDetails.BookingSource}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GuestDashboardBookingDetails;
