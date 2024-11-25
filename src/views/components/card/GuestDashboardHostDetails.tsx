import { Image } from 'antd';
import StayPic from 'assets/bookingVerification/staypic.png';
import dayjs from 'dayjs';
import LocationIcon from 'views/components/icons/LocationIcon';
import PreviewIcon from 'views/components/icons/PreviewIcon';
import RatingIcon from 'views/components/icons/RatingIcon';

interface BookingDetails {
  BookingSource: string;
  CheckInDate: string;
  CheckOutDate: string;
  CurrencyType: string;
  GrossBookingValue: string;
  TotalGuest: number;
  bookingReference: string;
  createdAt: string;
  property: {
    manualProperty: {
      propertyName: string;
      propertyLocation: string;
      propertyImage: string;
      noOfBedrooms: string;
      maxGuest: string;
    };
    manual_property_id: string;
    propertyId: string;
    status: 'idle' | 'loading' | 'error' | 'success';
  };
  guestEmail: string;
  guestId: number;
  guestName: string;
  guestPhone: string;
  guest_protection_details_id: number;
  id: number;
  is_booking_verifird: boolean;
  protectionRef: string;
  status: string;
  updatedAt: string;
}

interface GuestDashboardHostDetailsProps {
  bookingDetails: BookingDetails;
}

const GuestDashboardHostDetails = ({
  bookingDetails,
}: GuestDashboardHostDetailsProps) => {
  if (!bookingDetails) return <p>No Host data found</p>;

  const propertyImage =
    bookingDetails?.property.manualProperty.propertyImage || 'N/A';
  const propertyName =
    bookingDetails?.property.manualProperty.propertyName || 'N/A';
  const propertyLocation =
    bookingDetails?.property.manualProperty.propertyLocation || 'N/A';
  const hostName = bookingDetails?.guestName || 'N/A';
  const hostCreatedAt = bookingDetails?.createdAt || 'N/A';

  return (
    <div className="md:w-[100%] sm:w-full">
      <div>
        <Image
          preview={{
            mask: <PreviewIcon />,
          }}
          className="rounded-xl"
          src={propertyImage || StayPic}
        />
      </div>
      <div className="px-3 py-4 mt-3 mb-5 flex justify-between">
        <div>
          <p className="font-bold capitalize text-lg leading-6">
            {propertyName || 'N/A'}
          </p>
          <div className="flex items-center">
            <LocationIcon />
            <p className="text-Grey text-base fs13">
              {propertyLocation || 'N/A'}
            </p>
          </div>
        </div>
        <div>
          <div className="bg-[#FFFEE5] p-2 rounded-[10px] flex items-center gap-1">
            <RatingIcon />
            <p className="text-xl font-bold">4</p>
          </div>
        </div>
      </div>
      <div className="border-2 border-[#E4E4E4] rounded-xl bg-[#EBF8FF] p-2">
        <p className="text-Grey uppercase">Hosted by</p>
        <div className="flex items-start justify-between mt-2">
          <div className="flex items-center">
            <div className="w-12 h-12 mr-2">
              {/* <img
                src={HostPic}
                className="w-[100%] rounded-[100%]"
                alt="Host_Picture"
              /> */}
            </div>
            <div>
              <p className="text-[#051621] text-base font-bold capitalize">
                {hostName || 'N/A'}
              </p>
              <p className="text-Grey text-xs font-normal">
                {dayjs(hostCreatedAt).year() || 'N/A'}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <RatingIcon />
            <p className="text-xs font-bold">4</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestDashboardHostDetails;
