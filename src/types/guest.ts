export interface GuestInfo {
  result: Result;
  sc: boolean;
  time: number;
}

export interface DashboardType {
  result: {
    upcomingBookings: upcomingBookings[];
    pastBookings: pastBookings[];

    totalBookings: number;
    rating: number;
    totalReviews: number;
  };
  sc: boolean;
  time: number;
}

export interface upcomingBookings {
  id: string;
  bookingReference: string;
  guestName: string;
  CheckInDate: string;
  CheckOutDate: string;
  CurrencyType: string;
  GrossBookingValue: string;
  BookingSource: string;
  TotalGuest: number;
  guestEmail: string;
  guestPhone: string;
  createdAt: string;
  updatedAt: string;
  propertyId: string;
  guestId: string;
  protectionRef: string;
  report: string | null;
  claim_status: string | null;
  property: {
    id: string;
    host_id: string;
    property_type_id: string;
    property_status_id: string;
    manual_property_id: string;
    manualProperty: {
      id: string;
      propertyName: string;
      propertyLocation: string;
      propertyImage: string;
      noOfBedrooms: number;
      noOfBathrooms: number;
      maxGuest: number;
      damage_protection_id: string;
      refundCurrencyType: string;
      refundAmount: string;
      nonRefundCurrencyType: string | null;
      nonRefundAmount: string | null;
      created_at: string;
      updated_at: string;
    };
    created_at: string;
    updated_at: string;
  };
  status: string;
  is_booking_verifird: boolean;
  guest_protection_details_id: string | null;
}
[];

export interface pastBookings {
  id: string;
  bookingReference: string | null;
  guestName: string;
  CheckInDate: string;
  CheckOutDate: string;
  CurrencyType: string;
  GrossBookingValue: string;
  BookingSource: string;
  TotalGuest: number;
  guestEmail: string;
  guestPhone: string;
  createdAt: string;
  updatedAt: string;
  propertyId: string;
  guestId: string;
  protectionRef: string | null;
  report: string | null;
  claim_status: string | null;
  property: {
    id: string;
    host_id: string;
    property_type_id: string;
    property_status_id: string;
    manual_property_id: string;
    manualProperty: {
      id: string;
      propertyName: string;
      propertyLocation: string;
      propertyImage: string;
      noOfBedrooms: number;
      noOfBathrooms: number;
      maxGuest: number;
      damage_protection_id: string;
      refundCurrencyType: string;
      refundAmount: string;
      nonRefundCurrencyType: string | null;
      nonRefundAmount: string | null;
      created_at: string;
      updated_at: string;
    };
    created_at: string;
    updated_at: string;
  };
  status: string;
  is_booking_verifird: boolean;
  guest_protection_details_id: string | null;
}
[];

export interface BookingDetails {
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

export interface Result {
  profiles: never[];
  google_token: string;
  id: number;
  id_number: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  is_verified: boolean;
  country_code: string | undefined;
  is_terms_approved: boolean;
  created_at: Date;
  updated_at: Date;
  profile_status: ProfileStatus;
  image_url: string | null;
  is_deleted: boolean;
  bio: string;
}

export enum ProfileStatus {
  COMPLETED = 'completed',
  INCOMPLETE = 'incomplete',
  SKIP = 'skip',
}

export interface profileGuestDetails {
  id: number;
  email: string;
  id_number: string;
  last_name: string;
  first_name: string;
  phone: string;
  google_token: string;
  is_verified: boolean;
  country_code: string | undefined;
  is_terms_approved: boolean;
  created_at: Date | string;
  updated_at: Date | string;
  profile_status: ProfileStatus;
  is_deleted: boolean;
  image_url: string | null;
  bio: string;
  profiles: profileData[];
}

export interface profileData {
  id: number;
  user_id: number;
  host_id: number;
  company_name: string;
  company_address: string;
  business_registration_number: string;
  country_of_registration: string;
  id_number: number | null;
  country_of_issue: string;
  vat_number: string;
  protected_properties_count: number;
  pms: string | null;
  alternative_contact_number: string;
  company_website: string | null;
  document_path: string;
  paystack_customer_code: string | null;
  paystack_authorization_code: string | null;
  is_terms_approved: boolean;
  address_proof: string | null;
  image_url: string | null;
  id_proof: string | null;
  residential_address: null;
  createdAt: Date;
  updatedAt: Date;
  is_deleted: boolean;
}
