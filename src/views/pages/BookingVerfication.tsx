import { useSearchParams } from 'react-router-dom';
import BookingVerificationDetails from 'views/features/bookingVerification/BookingVerificationDetails';

const BookingVerification = () => {
  const [searchParams] = useSearchParams();
  const guestToken = searchParams.get('token') || '';
  const handleOk = () => {
    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log('Handle OK clicked');
  };
  return (
    <BookingVerificationDetails guestToken={guestToken} handleOk={handleOk} />
  );
};

export default BookingVerification;
