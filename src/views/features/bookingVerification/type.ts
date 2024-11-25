import type { SerializedError } from 'vitest';
export interface PropertyDocument {
  id: number;
  property_id: number;
  document_id: {
    id: null;
    is_visible: boolean;
    propertyDocuments_visible: boolean;
    document_url: string | null;
    propertyDocuments_id: number;
  };
}

export interface ApiResponse {
  result: {
    booking: {
      id: number;
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
      propertyId: number;
      guestId: number;
      protectionRef: string;
      status: string;
      is_booking_verified: boolean;
      guest_protection_details_id: number | null;
    };
    property: {
      manualProperty: {
        propertyImage: string;
        propertyName: string;
        propertyLocation: string;
        damage_protection_id: number;
        refundAmount: number;
        refundCurrencyType: string;
        nonRefundAmount: number;
        nonRefundCurrencyType: string;
      };
      propertyDocuments: PropertyDocument[];
      host: {
        name: string;
        created_at: string;
      };
    };
    guestDetails: {
      id: number;
      id_number: string;
      first_name: string;
      last_name: string;
      phone: number;
      email: string;
      id_document: string;
      password: string;
      is_verified: boolean;
      country: string;
      select_type: string;
      bio: string;
      image_url: string;
      country_code: number;
      customer_id: number;
      created_at: Date;
      updated_at: Date;
      is_deleted: boolean;
    };
  };
}

export interface BookingDetails {
  bookingDate: string;
  protectionReference: string;
  bookingReference: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  propertyImage: string;
  propertyName: string;
  propertyLocation: string;
  damage_protection_id: number;
  refundAmount: number;
  refundCurrencyType: string;
  nonRefundAmount: number;
  nonRefundCurrencyType: string;
  name: string;
  host_created_at: string;
  propertyDocuments_visible: boolean;
  propertyDocuments_id: number;
  propertyDocuments_url: string;
  id_number: string;
  first_name: string;
  last_name: string;
  phone: string;
  country: string;
  country_code: string;
  email: string;
  id_document: string;
  created_at: string;
  updated_at: string;
}

export interface ManualPropertyDetails {
  propertyName: string;
  propertyLocation: string;
  propertyImage: string;
  damage_protection_id: number;
  refundAmount: number;
  refundCurrencyType: string;
  nonRefundAmount: number;
  nonRefundCurrencyType: string;
}

export interface Coverage {
  id: number;
  name: string;
}

export interface DamageProtection {
  result: undefined;
  status: string | null;
  error: string | null;
  data: Coverage;
}

export interface GetYourDetails {
  id_number: string;
  id_document: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  damage_protection_id: number;
  card_holder_name: string;
  card_number: string;
  expiration_date: string;
  cvv: string;
  signatureFile: string;
}

export interface UpdateGuestPayload {
  guest: Guest;
  damage: Damage;
  paymentDetails: PaymentDetails;
  ESignature: string;
}

export interface Damage {
  damage_protection_id: number;
}

export interface Guest {
  id_number: string;
  id_document: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  country_code: string | undefined;
}

export interface PaymentDetails {
  card_holder_name: string;
  card_number: string;
  expiration_date: string;
  cvv: string;
}

export interface GuestBookingVerificationState {
  updateGuest: {
    status: string | null;
    error: string | null;
  };
  getBooking: {
    status: string | null;
    error: string | null;
    data: BookingDetails | null;
  };
  getYourDetails: {
    status: string | null;
    error: string | null;
    data: GetYourDetails | null;
    token: string;
  };
  manualPropertyDetails: ManualPropertyDetails | null;
  damageProtection: {
    status: string | null;
    error: string | null;
    data: DamageProtection | null;
  };
  documentUrl: Document[];
  error: SerializedError | null;
}
