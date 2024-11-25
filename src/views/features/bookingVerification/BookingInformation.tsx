import dayjs from 'dayjs';
import { useAppSelector } from 'hooks/redux';
import DateIcon from 'views/components/icons/DateIcon';
import GuestIcon from 'views/components/icons/GuestIcon';
import NightIcon from 'views/components/icons/NightIcon';

const BookingInformation = () => {
  const bookingDetails = useAppSelector(
    (state) => state.guestBookingVerification.getBooking.data,
  );

  const bookingDate =
    dayjs(bookingDetails?.bookingDate).format('DD.MM.YYYY') || 'N/A';
  const protectionReference = bookingDetails?.protectionReference || 'N/A';
  const bookingReference = bookingDetails?.bookingReference || 'N/A';
  const checkIn = dayjs(bookingDetails?.checkIn).format('DD.MM.YYYY') || 'N/A';
  const checkOut =
    dayjs(bookingDetails?.checkOut).format('DD.MM.YYYY') || 'N/A';
  const guests = bookingDetails?.guests || 'N/A';
  const nights = bookingDetails?.nights || 'N/A';

  return (
    <div>
      <p className="color-[#051621] font-medium text-base mb-2">
        Booking Details
      </p>
      <div className="block lg:flex md:flex justify-between items-center mt-4 mb-6">
        <div>
          <p className="text-[#969696] text-xs uppercase">Booking Date</p>
          <p className="text-[#000000] text-base">{bookingDate}</p>
        </div>
        <div>
          <p className="text-[#969696] text-xs uppercase">
            Protection Reference
          </p>
          <p className="text-[#000000] text-base w150 custom-text-truncate">
            {protectionReference}
          </p>
        </div>
        <div>
          <p className="text-[#969696] text-xs uppercase">Booking Reference</p>
          <p className="text-[#000000] text-base w150 custom-text-truncate">
            {bookingReference}
          </p>
        </div>
      </div>
      <div className="block lg:flex md:flex justify-between items-center mt-4 mb-8">
        <div className="flex items-center">
          <DateIcon />
          <div className="">
            <p className="text-[#969696] text-xs uppercase">Check In</p>
            <p className="text-[#000000] text-base">{checkIn}</p>
          </div>
        </div>
        <div className="flex items-center">
          <DateIcon />
          <div className="">
            <p className="text-[#969696] text-xs uppercase">Check Out</p>
            <p className="text-[#000000] text-base">{checkOut}</p>
          </div>
        </div>
        <div className="flex items-center">
          <GuestIcon />
          <div className="">
            <p className="text-[#969696] text-xs uppercase">Guests</p>
            <p className="text-[#000000] text-base">{guests}</p>
          </div>
        </div>
        <div className="flex items-center">
          <NightIcon />
          <div className="">
            <p className="text-[#969696] text-xs uppercase">Nights</p>
            <p className="text-[#000000] text-base">{nights}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingInformation;
