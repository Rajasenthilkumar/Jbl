export interface PropertyDetail {
  result: PropertyDetailResult;
  sc: boolean;
  time: number;
}

export interface PropertyDetailResult {
  id: number;
  host_id: number;
  property_type_id: number;
  property_status_id: number;
  manual_property_id: number;
  host: Host;
  propertyType: Property;
  propertyStatus: Property;
  manualProperty: ManualProperty;
  propertyDocuments: PropertyDocument[];
  created_at: Date;
  updated_at: Date;
}

interface Host {
  id: number;
  email: string;
  name: string;
  sur_name: string;
  phone: string;
  password: string;
  google_token: null;
  is_verified: boolean;
  country_code: number;
  is_terms_approved: boolean;
  created_at: Date;
  updated_at: Date;
  profile_status: string;
  is_deleted: boolean;
}

interface ManualProperty {
  id: number;
  propertyName: string;
  propertyLocation: string;
  propertyImage: string;
  noOfBedrooms: number;
  noOfBathrooms: number;
  maxGuest: number;
  damage_protection_id: number;
  refundCurrencyType: string;
  refundAmount: string;
  nonRefundCurrencyType: string | null;
  nonRefundAmount: number | null;
  created_at: Date;
  updated_at: Date;
}

interface PropertyDocument {
  id: number;
  property_id: number;
  document_id: number;
  created_at: Date;
  updated_at: Date;
}

interface Property {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}
